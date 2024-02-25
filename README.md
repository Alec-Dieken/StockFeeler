# StockFeeler
> An easy and convenient way to improve your decision making in stock trading.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Schema](#schema)
- [API Endpoints](#api-endpoints)
- [License](#license)
- [Contact](#contact)

## Overview

StockFeeler was created with the purpose of giving it's users a quick and convenient way to practice and improve their decision making when trading stocks, as well as comparing their prediction abilities with other users. Users are presented with a year of data from a randomly chosen stock from the top 500 stocks. The user then predicts where the stock price will stand in X amount of days. After submitting their guess, the system displays the average prediction by all users for that stock. The user's guess is stored, and after those X amount of days, the server will check for the actual result of that stock's price. The closer the user's guess to the actual price, the more points they earn.
A leaderboard will also be featured, showcasing the users with the highest prediction accuracies. The stock data needed for these games will be sourced from the Polygon.io API. In order to continuously update data and scores, node-CRON is used to schedule server side functions that perform all the necessary tasks such as: fetching new stock data, updating news, updating player scores, removing old stocks from the queries, and updating predication averages.


## Features

- **User Authentication**: Uses NextAuth.js in combination with backend logic to allow users to sign up, log in, and sign out securely.
- **Clean & Responsive UI**: MaterialUI is used to keep the app responsive, clean, and intuitive to use and navigate.
- **Interactive Charts**: TradingView's free-to-use chart modules provide an interactive and modern chart used to display stock price data.
- **Leaderboard**: View the 'Leaderboard' page to compare yourself with other users.


## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: React, Next.js, NextAuth.js
- **Database**: MongoDB
- **Others**: MaterialUI, Node-Cron

## Installation and Setup

To get the StockFeeler application up and running on your local environment, follow these steps:

1. **Clone the Repository**:

```bash
git clone [repository_url] StockFeeler
cd StockFeeler
```

2. **Organize Folders**:

- After cloning, ensure that the 'client' and 'server' folders are directly inside the main StockFeeler directory.

3. **Setup Environment Variables**:

- Before starting the servers, you need to setup your environment variables. Navigate to the .env file inside both client and server directories.
- Change the variables, particularly those related to the database, to match your configuration.

4. Install Dependencies:

- You will need to install the required packages for both the client and the server.

First, for the server:

```bash
cd server
npm install
```

Then, for the client:

```bash
cd ../client
npm install
```

5. Starting the Application:

- You will need two separate terminal/console windows or tabs, one for the client and one for the server.

To start the server:

```bash
cd server
npm start
```

To start the client in another terminal:

```bash
cd client
npm run dev
```

6. Access the Application:
- After starting both the client and the server, open your browser and navigate to http://localhost:3000 (or the port specified) to access the StockFeeler application.

Congratulations! You've successfully set up and started the StockFeeler application on your local environment. Enjoy improving your stock trading decisions!

## Schema
```
Table users {
  _id ObjectId
  username string
  email string
  password string
  rankedScore double
  trustScore double
  avatar string
}

Table queries {
  _id ObjectId
  ticker string
  duration integer
  chartData Array
  lastClosingPrice double
  avgChange double
  result double
  average double
  isActive boolean
  needsUpdate boolean
  updateAt timestamp
  random double
  createAt timestamp
}

Table votes {
  _id ObjectId
  userID ObjectId
  queryID ObjectId
  prediction double
  isActive boolean
  score double
  addScoreToUser boolean
  createdAt timestamp
}

Table assets {
  _id ObjectId
  ticker string
  name string
  description string
  website string
  type string
  news Array
}

ref: votes.userID - users._id
ref: votes.queryID - queries._id
```

## API Endpoints
