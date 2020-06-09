# Notifications Portal

A React based SPA with 2 screens **Login**  and **Profile**

## Commands
1. Install dependencies

```bash
npm init
```

2. For starting the app, run the below command from the root folder.

```bash
npm start
```
Go to **http://localhost:3000/login** to see the application

## Screens
#### Login 
- Route : **/login**
- A login screen allowing user to login with valid credentials
- Login using the credentials:
 **email**: email@test.com
**password**: test@123

#### Profile 
- Route: **/profile**
- A private screen, can be accessed only after successful login.
- In case tried to access directly , user will get redirected back to the login screen.


## Env. Specific API Base URL
- **File to refer** : src/utils/Common.js
- **Base URL for development**: http://localhost:4000/
- **Base URL for production**: http://notificationportals/