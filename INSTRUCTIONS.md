# Instructions
Follow these steps to run a demonstration of the project on your local machine.

### Clone this repo to your local machine
1. `fork` this repo to your own github account
2. From your forked repo, click on `<> Code`, then copy the HTTPS URL
3. In the terminal, `cd` into where you want to save this repo
4. Run `git clone paste-the-copied-url-here`
5. `cd` into the cloned repo
6. Run `git checkout -b your-own-branch` to checkout (create) a new branch to work on

### Install
1. Install [Node.js](https://nodejs.org/en)
2. In the terminal, run `npm install`
3. In `config` folder, change `config-example.env` to `config.env`

### Start server
1. In the terminal, run `npm run dev`
2. If you see `Server is running on port 3000`, you have successfully started the server
3. Open browser, go to `localhost:3000`
4. You should be able to see content from `views/dashboard.ejs` file
5. You can now edit any files, then refresh the page in the browser to view changes
6. To stop the server from running (in order to use the terminal in VS Code again), press `Ctrl + C`