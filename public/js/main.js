let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

// add copyright year in footer
document.getElementById('copy-year').innerHTML = year;
 
const day = document.querySelector(".calendar-dates");
 
const currdate = document
    .querySelector(".calendar-current-date");
 
const prenexIcons = document
    .querySelectorAll(".calendar-navigation span");
 
// Array of month names
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const monthabbr = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec."
];
 
// Function to generate the calendar
const manipulate = () => {
 
    // Get the first day of the month
    let dayone = new Date(year, month, 1).getDay();
 
    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();
 
    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();
 
    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();
 
    // Variable to store the generated calendar HTML
    let lit = "";
 
    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
        lit +=
            `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }
    
    // let testArr = [1, 24, 27];
    // let testMonth = 9;
    // let testYear = 2023;

    // Loop to add the dates of the current month
    // for (let i = 1; i <= lastdate; i++) {
 
    //     // Check if the current date is today
    //     let isToday = i === date.getDate()
    //         && month === new Date().getMonth()
    //         && year === new Date().getFullYear()
    //         ? "active"
    //         : "";
    //     lit += `<li class="${isToday}">${i}</li>`;
    // }

        // let log = '';
        for (let i = 1; i <= lastdate; i++) {
            // log = testArr.includes(i) ? 'log each-date' : 'each-date';
            lit += `<li class="each-date" id="day${i}"><input type="hidden" name="days" id="inputday${i}">${i}</li>`;
        }
 
    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
        lit += `<li class="inactive">${i - dayend + 1}</li>`
    }

    // Update the text of the current date element 
    // with the formatted current month and year
    currdate.innerText = `${months[month]} ${year}`;
     
    // add input values for month and year
    currdate.innerHTML += `<input type="hidden" name="month" value=${month}>`;
    currdate.innerHTML += `<input type="hidden" name="monthabbr" value=${monthabbr[month]}>`;
    currdate.innerHTML += `<input type="hidden" name="year" value=${year}>`;
    
    // update the HTML of the dates element 
    // with the generated calendar
    day.innerHTML = lit;

}
 
manipulate();
 
// generate previous/next month calendar on click
// Attach a click event listener to each icon

prenexIcons.forEach(icon => {
 
    // When an icon is clicked
    icon.addEventListener("click", () => {
 
        // Check if the icon is "calendar-prev"
        // or "calendar-next"
        month = icon.id === "calendar-prev" ? month - 1 : month + 1;
 
        // Check if the month is out of range
        if (month < 0 || month > 11) {
 
            // Set the date to the first day of the 
            // month with the new year
            date = new Date(year, month, new Date().getDate());
 
            // Set the year to the new year
            year = date.getFullYear();
 
            // Set the month to the new month
            month = date.getMonth();
        }
 
        else {
 
            // Set the date to the current date
            date = new Date();
        }
 
        // Call the manipulate function to 
        // update the calendar display
        manipulate();
        // add EventListener to each date
    const getDates = document.getElementsByClassName('each-date');
    Array.from(getDates).forEach(e => e.addEventListener('click', addPeriod));
    });
});

// // add EvenListener when submit button is clicked
// document.getElementById('submit-log').addEventListener('click', clearCalendar);

// // clear calendar after submitted
// function clearCalendar () {
//     const selectedDays = document.getElementsByClassName('log');

//     Array.from(selectedDays).forEach(e => {
//         const test = document.getElementById(`inputday${e.innerText}`);
//         console.log('test is ', test);
//         e.classList.toggle('log');
//     });
//     console.log('month ', month, 'year ', year);
    
// }

// add EventListener to each date
const getDates = document.getElementsByClassName('each-date');
Array.from(getDates).forEach(e => e.addEventListener('click', addPeriod));

function addPeriod(click) {
    if(click.target.classList.contains('each-date')){
        let inputVal = document.querySelector(`#inputday${click.target.innerText}`);
		const isTrue = document.querySelector(`#day${click.target.innerText}`).classList.toggle('log');
        if (isTrue) {
            inputVal.value = click.target.innerText;
        }
        else {
            inputVal.value = '';
        }
        console.log('istrue ', isTrue, 'inputval ', inputVal.value);

	}else{
		document.querySelector('.each-date').classList.add('log');
	}
    // console.log(click.target.innerText);  
}

// get selected days to log
// const btnSubmitLog = document.getElementById('submit-log');
// btnSubmitLog.addEventListener('click', submitLog);
// function submitLog() {
//     let daysArr = [];
//     const selectedDays = document.getElementsByClassName('log');
//     console.log(selectedDays);

//     Array.from(selectedDays).forEach(e => {
//         daysArr.push(e.innerText);
//         e.classList.toggle('log');
//     });
//     console.log(daysArr);
// }

