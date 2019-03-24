# Employee Performance Reviews

## Requirements/Features

### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedback

***

## Tools used

### PostgreSQL

Using a free instance from ElephantSQL, so no need to install it locally. Here are the credentials:

**Server:**	isilo.db.elephantsql.com<br>
**User & Default database:**	qwjszpap<br>
**Password:**	m_VyqLU2pyKDHbj9sbfG502Vn8BH8tMQ<br>
**URL:**	postgres://qwjszpap:m_VyqLU2pyKDHbj9sbfG502Vn8BH8tMQ@isilo.db.elephantsql.com:5432/qwjszpap<br>
**Max database size:**	20 MB<br>
**API Key:** e331a27f-88bd-43d5-906e-078588883acb<br>

You can use https://franchise.cloud/app/ for GUI.<br>
You may load the file Franchise-app-PostgreSQL.html to load the queries in the browser.

### TS-Node

[Using typescript with Node](https://github.com/TypeStrong/ts-node)

[Using express](https://expressjs.com/)

API Collection: https://documenter.getpostman.com/view/7033733/S17rwU3q

### Angular

[Using Angular with Typescript](https://angular.io/)

### Bulma

[Using Bulma](https://bulma.io)

***

## Run on local

Install [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/lang/en/docs/install/).<br>

### Server

* Go to server `cd server`
* If using yarn, run `yarn` & `yarn run start`
* If using npm, run `npm install` & `npm run start`

API server will start on http://localhost:3000/

### Frontend

* Go to frontend `cd frontend`
* If using yarn, run `yarn` & `yarn run serve`
* If using npm, run `npm install` & `npm run serve`

Front website will start on http://localhost:4200/<br>
*Please use Google Chrome for testing. The site hasn't been tested on other browsers.*

### Credentials

* Use smith/passw0rd for admin login
* Use karen/passw0rd for employee login
* Any new employee added from admin login, will have a user account associated.
  * If user's name is Brandon Lane, username would be `brandon-lane` and password would be `passw0rd`.

***

## Assumptions
* Feedback is question based. 
* Feedback has 4 questions, the order and the questions won't change.

***

## TODO

### Frontend
* Use cookie for saving auth token
* Add navigation guards to check for admin and user privileges during navigation
* Use state management
* Use server side pagination instead of client side, or maybe use lazy-loading instead
* Cross browser testing

### Backend
* Use a better authentication mechanism - use passport or similar for saving auth token in database instead of application state
* Encrypt passwords
* Possibly use some ORM to replace SQL queries
* Add inner joins/left joins, but don't let it slow down the app
* Use typescript definitions to create API spec
* Translate database errors into human friendly API errors
* Use database transactions for atomicity

### General
* Set up for production
* Write test cases
* Internationalization/Localization
* Use better loggers and add comments