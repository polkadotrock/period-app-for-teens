const Log = require("../models/Log");

const dashboard = async (req, res) => {
  try {
    res.render('dashboard');
  } catch (err) {
    console.error(err);
    res.redirect('/guest');
  }
};

const calendar = async (req, res) => {
  try {
    const pastCycles = await Log.find({ user: res.userID })
      .sort({ year: -1, month: -1 })
      .lean();
    res.render('calendar', { pastCycles });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};

const logCycle = async (req, res) => {
  try {
    const days = req.body.days.filter(e => e);
    const month = req.body.month;
    const monthabbr = req.body.monthabbr;
    const year = req.body.year;

    const log = await Log.create({
      days: days,
      month: month,
      monthabbr: monthabbr,
      year: year,
      user: req.res.userID,
    });

    res.redirect('/calendar');
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
};

const deleteLog = async (req, res) => {
  try {
    await Log.deleteOne({ _id: req.params.id });
    res.redirect('/calendar');
  } catch (err) {
    console.error(err);
    return res.render('calendar');
  }
};

module.exports = {
  dashboard,
  calendar,
  logCycle,
  deleteLog,
};
