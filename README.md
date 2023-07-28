
# Attendance Management System (Front-End)
## Overview
This is a web based attendance management system application. It's for **front-end**. This application require a **back-end** which you can find in [Attendance Management System (Back-End)](https://github.com/usmannasution80/attendance-management-system-backend). This application is powered by [ReactJS](https://react.dev/).
## Installation
### Requirements
- NodeJs
- [Attendance Management System (Back-End)](https://test.com).
### Development
If you want to run this application in development mode, you should  you should run the **back-end** at **port 8000** (it's default) and this **front-end** at **port 3000** (it's default).
Navigate to **back-end** directory, and run this command :
```
npm install
npm start &
```
Now, navigate to **back-end** directory and run this command :
```
php artisan serve &
```
Make sure MySQL server already running at **port 3306**.
### Production
If you want to run the production version, you can follow these steps :
- Navigate to **front-end** directory.
- Open ```web.js``` in your text editor.
- Search for ```axios``` function of the ```web``` object.
- You will find ```port = 8000```, comment or delete this line if it hasn't commented yet.
- Now run this command : ```npm install```.
- And run this command : ```npm run build```.
- If the process is finish, move content of **build** directory to **public** directory of **back-end**.
- Check more steps on [Attendance Management System (Back-End)](https://github.com/usmannasution80/attendance-management-system-backend).
## Download Production Version