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

Using typescript with Node
https://github.com/TypeStrong/ts-node

Using express
https://expressjs.com/

***

## Run on local

If yarn is not installed, follow the steps here: https://yarnpkg.com/lang/en/docs/install/<br>
* Go to node-api `cd node-api`
* Run `yarn install`
* Run `yarn run start`

API server will start on http://localhost:3000/

***

## Assumptions

***

## TODO

### Frontend
* Create login view
* Create common header and footer
* Create admin employees view
* Create admin reviews view
* Create user reviews list view
* Create user individual review view

### Backend
* Use a better authentication mechanism - use passport or similar for saving auth token in database instead of application state
* Encrypt passwords

## General
* Set up for production