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

You can use https://franchise.cloud/app/ for GUI.

### TS-Node

[Using typescript with Node](https://github.com/TypeStrong/ts-node)

[Using express](https://expressjs.com/)

### Angular

[Using Angular with Typescript](https://angular.io/)

### Bulma

[Using Bulma](https://bulma.io)

***

## Run on local

### Server

If yarn is not installed, follow the steps [here](https://yarnpkg.com/lang/en/docs/install/).<br>
* Go to server `cd server`
* Run `yarn`
* Run `yarn run start`

API server will start on http://localhost:3000/

### Frontend

* Go to frontend `cd frontend`
* Run `yarn`
* Run `yarn run serve`

Front website will start on http://localhost:4200/

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
* Create login view
* Create common header and footer
* Create admin employees view
* Create admin reviews view
* Create user reviews list view
* Create user individual review view
* Cross browser testing
* Find a windows machine to test on IE :(

### Backend
* Use a better authentication mechanism - use passport or similar for saving auth token in database instead of application state
* Encrypt passwords
* Possibly use some ORM to replace SQL queries
* Use typescript definitions for API spec
* Translate database errors into human friendly API errors
* Use database transactions for atomicity

### General
* Set up for production
* Write test cases
* Internationalization/Localization
* Use better loggers and add comments