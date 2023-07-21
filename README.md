# sputnik-quiz-third-week
The quiz app starts with the button "Регистрация".\
After the registration you need to login.\
After the login the quiz starts.

# Getting Started

To clone quiz run in terminal: 
### `git clone https://github.com/ytpt/sputnik-quiz-third-week.git`


## Install libraries

THE PROJECT HAS TWO PACKAGE.JSON FILES

To install libraries for frontend connection run in new terminal:
### `npm install`

To install libraries for backend connection run in terminal:
### `cd server`
### `npm install`


## .env file

THE PROJECT HAS .ENV FILE IN SERVER FOLDER

If you don't have .env file in your clone project, create it.

Before start add info to .env file.\
You may use examples giving here:

`PORT=5000`\
`DB_URL=mongodb+srv://annarchive888:12345@cluster0.ozuv0bm.mongodb.net/?retryWrites=true&w=majority`\
`JWT_ACCESS_SECRET=jwt-access-secret-for-quiz`\
`JWT_REFRESH_SECRET=jwt-access-secret-for-quiz`\
`API_URL=http://localhost:5000`\
`CLIENT_URL=http://localhost:3001`


## Run project

To run backend server run in terminal:
### `cd server`
### `npm run dev`
You will see "Server started on PORT = 5000"

To run frontend run in new terminal:
### `npm run start`
You will see "Project is running at:
Loopback: http://localhost:3001/"

Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The page will reload when you make changes.\