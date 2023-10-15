# period-app-for-teens
An app built to educate teens about menstruation, reduce stigma, and help teenagers keep track of their period. 

<br><br>

# Instructions

### Clone this repo to your local machine
1. `fork` this repo to your own github account
2. From your forked repo, click on `<> Code`, then copy the HTTPS URL
3. In the terminal, `cd` into where you want to save this repo
4. Run `git clone paste-the-copied-url-here`
5. `cd` into the cloned repo
6. Run `git checkout -b your-own-branch` to checkout (create) a new branch to work on

### Install
1. Install [Node.js](https://nodejs.org/en)
2. In the terminal, run `npm run dev`
3. In `config` folder, change `config-example.env` to `config.env`

### Start server
1. In the terminal, run `npm start`
2. If you see `Server is running on port 3000`, you have successfully started the server 
3. Open browser, go to `localhost:3000`
4. You should be able to see content from `views/dashboard.ejs` file
5. You can now edit any files, then refresh the page in the browser to view changes
6. To stop the server from running (in order to use the terminal in VS Code again), press `Ctrl + C`

### Add/edit files
1. To add a new EJS file, run `touch views/file-name-you-want.ejs` from the terminal
2. All EJS files should be in `views` folder
3. All CSS, JS, and image files should be in their own folder in `public` folder
4. You can copy everything from `dashboard.ejs` to your newly created EJS file, then replace the content.
5. To link to your own JS file from an EJS file, add `<%- include('/js/your-js-file.js') %>` to the bottom of the EJS file (where you would add your `<script>` tag)
6. To view your new EJS file, go to `routes/index.js` and follow the instruction there
7. I've added Bootstrap framework. You guys can take a look at the [documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/).

### Create a pull request
1. Before you push your commit, run `git pull` to make sure your local repo is up-to-date with the original remote repo
2. Do your `git add .` and `git commit -m 'msg'`
3. `git push -u origin your-own-branch` to push
4. Go to your cloned repo and make a pull request
5. The `base` should be the original repo, `head` is your own local copy `your-own-branch`
6. Create pull request
