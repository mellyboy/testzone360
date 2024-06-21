
# TestZone360

A versatile QA and automation practice playground featuring a collection of UI and API examples, perfect for practicing with tools like Cypress and Playwright.

## Contents
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Test Connection to Database](#test-connection-to-database)
- [Test Frontend](#test-frontend)
- [Sample Screenshots](#sample-screenshots)
- [API Reference](#api-reference)
    - [User APIs](#user-apis)
        - [Register](#register-api)
        - [Login](#login-api)
        - [Get User Details](#get-user-api)
        - [Update User Details](#update-user-profile-api)
    - [Task APIs](#task-apis)
        - [Create Task](#create-task-api)
        - [Get Tasks](#get-tasks-api)
        - [Update Task](#update-task-api)
        - [Delete Task](#delete-task-api)
    - [Feeds APIs](#feeds-api)
        - [Create Feed](#create-feed-api)
        - [Get Global Feeds](#get-global-feeds-api)
        - [Get User's Feeds](#get-user-feeds-api)
        - [Update Feed](#update-feed-api)
        - [Delete Feed](#delete-feed-api)
        - [Like Feed](#like-a-feed-api)
        - [Unlike Feed](#unlike-a-feed-api)
        - [isLike Feed](#islike-api)
        - [isLike Feed (batched)](#islike-api-batched)
        - [Create Comment](#create-comment-api)
        - [Delete Comment](#delete-comment-api)
- [Development Status](#development-status)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Installation

1. Fork the repository: Click the "Fork" button at the top right of this repository page to create a copy of this repository under your own GitHub account.

2. Clone the forked repository: Replace yourusername with your GitHub username in the URL below, and then run the following command in your terminal to clone the repository to your local machine:

```bash
 git clone https://github.com/yourusername/testzone360.git
```
3. Install dependencies
- For frontend, navigate to root directory and run npm install
```bash
 cd testzone360
 npm install
```
- For backend, navigate to pg/ directory and run npm install
```bash
 cd pg
 npm install
```
4. Setup your local database using postgresql
- Follow this [link](https://www.w3schools.com/postgresql/postgresql_install.php) to setup postgresql in your local machine.
- [Create tables](https://www.w3schools.com/postgresql/postgresql_create_table.php) using the sql script found inside the directory [pg/sql/](pg/sql/sql.sql) . Once executed, you should have the following tables in your database.

<img src="img/pg-tables.png" alt="PostgreSQL Tables" style="width: 300px; height: auto;">

5. Once you have setup your database, you can create an ```.env.dev``` file inside the pg/config/ directory to contain your credentials and secret. So your files might look like this:

<img src="img/config-files.png" alt="Config Files" style="width: 300px; height: auto;">

6. Inside your ```.env.dev``` file, add your credentials and secret key for APIs. It might look like this:

<img src="img/env-variables.png" alt="env file" style="width: 300px; height: auto;">

## Running the App
- If you only want to use the APIs, you can run the below command inside the pg/ directory
```bash
npm start
```
- If you want both frontend and backend running, you can run the below command inside the project root directory to start all
```bash
npm run start:all
```

## Test Connection to Database

1. Inside pg/ directory, run the command:

```bash
  npm start
```
2. Test any of the APIs using Postman. (*if you haven't installed Postman, you can download [here](https://www.postman.com/downloads/)*). In this example, the Register API is used:
- In Postman, create a new POST request, or import the following cUrl:
```bash
curl --location 'http://localhost:5000/api/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Dummy",
    "lastName": "User",
    "address": "123 Main St",
    "email": "dummy123@demo.xyz",
    "password": "password"
}'
```
- It should have response like this:

![response](img/test-db-connection-response.png)

- Check the database if data is successfully inserted.

![check-table](img/test-db-connection.png)

## Test Frontend

- In project root directory, run the following command

```bash
# serve
npm start

# build
npm run build
```
- Visit localhost:3000 , login page will be displayed
![login](img/login-page.png)


## Sample Screenshots
Once you have already run the app and registered a test account, you can now start navigating the whole application using your account.

<table>
  <tr>
    <td>
      <img src="img/welcome-page.png" alt="welcome page" style="width: 100%;">
    </td>
    <td>
      <img src="img/sample-dnd.png" alt="sample drag-n-drop" style="width: 100%;">
    </td>
  </tr>
  <tr>
    <td>
      <img src="img/sample-feeds.png" alt="sample feeds" style="width: 100%;">
    </td>
    <td>
      <img src="img/sample-todo.png" alt="sample to-do" style="width: 100%;">
    </td>
  </tr>
</table>

## API Reference
### User APIs

- #### REGISTER API
    - Description: Used to register your test account
    - ```POST``` /api/user/register
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body <small>raw (json)</small>
        ```bash
        {
            "firstName": "Dummy",
            "lastName": "User",
            "address": "123 Main St",
            "email": "dummy123@demo.xyz",
            "password": "password"
        }
        ```
        - Response <small>(json)</small>
            - Status: ```201 Created```
        ```
        {
            "message": "created"
        }
        ```
- #### LOGIN API
    - Description: Used to login your test account and to get user token
    - ```POST``` /api/user/login
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body <small>raw (json)</small>
        ```bash
        {
            "email": "dummy123@demo.xyz",
            "password": "password"
        }
        ```
        - Response <small>(json)</small>
            - Status: ```200 OK```
        ```
        {
            "token": "eyJhbGciasJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwiqak0IjoxNzE4OTU5NjU1LCJleHAiOjE3MTg5NjMyNTV9.ryS5v58redXBWBAuOE8uEM4dz5abcyv0QUelvhqP4d0",
            "userId": 2
        }
        ```
- #### GET USER API
    - Description: Used to retrieve user details
    - ```GET``` /api/user/userprofile
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body (none)
        - Response <small>(json)</small>
            - Status: ```200 OK```
        ```
        {
            "id": 2,
            "firstName": "Dummy",
            "lastName": "User",
            "address": "Address Line 1",
            "addressLine2": "Address Line 2",
            "city": "Test City",
            "region": "Tester Region",
            "zipCode": "1234",
            "country": "US",
            "gender": "Female",
            "accountNumber": "13266676767",
            "email": "dummy123@demo.xyz"
        }
        ```
- #### UPDATE USER PROFILE API
    - Description: Used to update user details
    - ```PUT``` /api/user/userprofile
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body <small>raw (json)</small>
        ```bash
        {
            "firstName": "Update Firstname",
            "lastName": "Update Lastname",
            "address": "Dummy Address Line 1",
            "addressLine2": "Dummy Address Line 2",
            "city": "Tester City",
            "region": "Tester Region",
            "zipCode": "1234",
            "country": "US",
            "gender": "Male",
            "accountNumber": "1234679999",
            "email": "dummy123@demo.xyz"
        }
        ```
        - Response <small>(json)</small>
            - Status: ```200 OK```
        ```
        {
            "message": "Profile updated successfully"
        }
        ```

### Task APIs
- #### CREATE TASK API
    - Description: Used to create to-do tasks
    - ```POST``` /api/tasks
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body <small>raw (json)</small>
        ```bash
        {
            "title": "Test Title",
            "content": "Test Content",
            "start_date": "2024-06-21",
            "target_end_date": "2024-06-21",
            "status": "Doing"
        }
        ```
        - Response <small>(json)</small>
            - Status: ```201 Created```
        ```
        {
            "id": 21
        }
        ```
    - NOTE: ```status``` can only have value either ```To Do```, ```Doing```, ```Done```
- #### GET TASKS API
    - Description: Used to get user's to-do tasks
    - ```GET``` /api/tasks
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body (none)
        - Response <small>(json)</small>
            - Status: ```200 OK```
        ```
        [
            {
                "id": 22,
                "title": "Test Title",
                "content": "Test Content",
                "start_date": "2024-06-20T16:00:00.000Z",
                "target_end_date": "2024-06-20T16:00:00.000Z",
                "user_id": 2,
                "status": "Doing",
                "created_at": "2024-06-21T09:29:14.986Z",
                "updated_at": "2024-06-21T09:29:14.986Z"
            }
        ]
        ```
- #### UPDATE TASK API
    - Description: Used to update a to-do task
    - ```PUT``` /api/tasks/*```{{taskID}}```*
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body <small>raw (json)</small>
        ```bash
        {
            "title": "UPDATE Title",
            "content": "UPDATE Content",
            "start_date": null,
            "target_end_date": null,
            "status": "To Do"
        }
        ```
        - Response <small>(json)</small>
            - Status: ```200 OK```
        ```
        {
            "message": "Task updated successfully"
        }
        ```
- #### DELETE TASK API
    - Description: Used to delete to-do tasks
    - ```DELETE``` /api/tasks/*```{{taskID}}```*
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body (none)
        - Response <small>(json)</small>
            - Status: ```200 OK```
        ```
        {
            "message": "Task deleted successfully"
        }
        ```

### Feeds API
- #### CREATE FEED API
    - Description: Used to publish feed
    - ```POST``` /api/feeds
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body <small>raw (json)</small>
        ```bash
        {
            "title": "Test Feed Title",
            "content": "Test Feed Content"
        }
        ```
        - Response <small>(json)</small>
            - Status: ```201 Created```
        ```
        {
            "id": 23
        }
        ```
- #### GET GLOBAL FEEDS API
    - Description: Used to get all feeds (global)
    - ```GET``` /api/feeds
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body (none)
        - Response <small>(json)</small>
            - Status: ```200 OK```
        ```
        [
            {
                "id": 23,
                "title": "1718963391",
                "content": "Spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce intently stare at the same spot always ensure to lay down in such a manner that tail can lightly brush human's nose or dead stare with ears cocked human give me attention meow.",
                "author_id": 2,
                "created_at": "2024-06-21T09:49:51.167Z",
                "likes_count": 0,
                "first_name": "User",
                "last_name": "Tester"
            },
            {
                "id": 22,
                "title": "Test12345678901Test12345678901Test12345678901",
                "content": "Test12345678901Test12345678901Test12345678901Test12345678901Test12345678901",
                "author_id": 2,
                "created_at": "2024-06-15T09:11:00.059Z",
                "likes_count": 0,
                "first_name": "User",
                "last_name": "Tester"
            }
        ]
        ```
- #### GET USER FEEDS API
    - Description: Used to get user's published feeds
    - ```GET``` /api/feeds/*```{{userId}}```* - *userId* is also from login API
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body (none)
        - Response <small>(json)</small>
            - Status: ```200 OK```
        ```
        [
            {
                "id": 23,
                "title": "1718963391",
                "content": "Spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce intently stare at the same spot always ensure to lay down in such a manner that tail can lightly brush human's nose or dead stare with ears cocked human give me attention meow.",
                "author_id": 2,
                "created_at": "2024-06-21T09:49:51.167Z",
                "likes_count": 0,
                "first_name": "User",
                "last_name": "Tester"
            },
            {
                "id": 22,
                "title": "Test12345678901Test12345678901Test12345678901",
                "content": "Test12345678901Test12345678901Test12345678901Test12345678901Test12345678901",
                "author_id": 2,
                "created_at": "2024-06-15T09:11:00.059Z",
                "likes_count": 0,
                "first_name": "User",
                "last_name": "Tester"
            }
        ]
        ```
- #### UPDATE FEED API
    - Description: Used to update user's published feed.
    - ```PUT``` /api/feeds/*```{{feedID}}```*
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body <small>raw (json)</small>
        ```
        {
            "title": "UPDATED Title",
            "content": "UPDATED Content"
        }
        ```
        - Response <small>(json)</small>
            - Status: ```200 OK```
        ```
        {
            "message": "Feed updated successfully"
        }
        ```
- #### DELETE FEED API
    - Description: Used to delete user's published feed.
    - ```DELETE``` /api/feeds/*```{{feedID}}```*
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body (none)
        - Response <small>(json)</small>
            - Status: ```200 OK```
        ```
        {
            "message": "Feed deleted successfully"
        }
        ```
- #### LIKE A FEED API
    - Description: Used to like a published feed.
    - ```POST``` /api/feeds/*```{{feedID}}```*/likes
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body (none)
        - Response <small>(json)</small>
            - Status: ```201 Created```
        ```
        {
            "id": 18
        }
        ```
- #### UNLIKE A FEED API
    - Description: Used to unlike a published feed.
    - ```DELETE``` /api/feeds/*```{{feedID}}```*/likes
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body (none)
        - Response <small>(json)</small>
            - Status: ```200 OK```
        ```
        1
        ```
- #### isLike API
    - Description: Used to retrieve likes count and if a feed is liked by the user.
    - ```GET``` /api/feeds/*```{{userId}}```*/*```{{targetFeedId}}```*/isLiked
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body (none)
        - Response <small>(json)</small>
            - Status: ```200 OK```
        ```
        {
            "isLiked": false,
            "likesCount": 0
        }
        ```
- #### isLike API (Batched)
    - Description: Used to retrieve liked feeds and total likes of each feed.
    - ```POST``` /api/feeds/likes
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body <small>raw (json)</small> - feed IDs in array
        ```
        {
            "feedIds": [20, 21, 22, 23]
        }
        ```
        - Response <small>(json)</small>
            - Status: ```200 OK```
        ```
        {
            "likedFeeds": [
                22,
                21
            ],
            "likesCounts": {
                "21": 1,
                "22": 1
            }
        }
        ```
- #### CREATE COMMENT API
    - Description: Used to comment on a published feed.
    - ```POST``` /api/feeds/*```{{feedID}}```*/comments
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body <small>raw (json)</small>
        ```
        {
            "content": "This is my comment."
        }
        ```
        - Response <small>(json)</small>
            - Status: ```201 Created```
        ```
        {
            "id": 15
        }
        ```
- #### GET COMMENTS API
    - Description: Used to retrieve comments on a published feed.
    - ```GET``` /api/feeds/*```{{feedID}}```*/comments
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body (none)
        - Response <small>(json)</small>
            - Status: ```200 OK```
        ```
        [
            {
                "id": 15,
                "content": "This is my comment",
                "created_at": "2024-06-21T10:22:12.949Z",
                "user_id": 2,
                "first_name": "User",
                "last_name": "Tester"
            }
        ]
        ```
- #### DELETE COMMENT API
    - Description: Used to retrieve comments on a published feed.
    - ```DELETE``` /api/comments/*```{{feedID}}```*
    - Authorization:
        - Auth Type: Bearer token
        - Token: *token from login API*
    - Header:
        - Content-Type: application/json
    - Example:
        - Request body (none)
        - Response <small>(json)</small>
            - Status: ```200 OK```
        ```
        {
            "message": "Comment deleted successfully"
        }
        ```
## Development Status
Currently under active development. New features are being added regularly, and you may experience bugs. We appreciate your patience and welcome any feedback or contributions to help improve the project.


## Acknowledgements

We like to thank the creators of the following repositories. Their work has been instrumental in the development of the UI components for this project.

- [CoreUI](https://github.com/coreui/coreui)
- [Hello Pangea DnD](https://github.com/hello-pangea/dnd)
- [React-Date-Picker](https://github.com/wojtekmaj/react-date-picker)

## License
The MIT License