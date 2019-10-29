# Andela_Cycle_12_Chalenge_Two
[![Build Status](https://travis-ci.org/aime19/Andela_Cycle_12_Chalenge_Two.svg?branch=develop)](https://travis-ci.org/aime19/Andela_Cycle_12_Chalenge_Two)



# My diary

My diary is a social initiative where people will be able to post  stories and read them in the future.

## Features
- Users can sign up.
- Users can sign in.
- user can add a diary
- Users can view all his diary.
- Users can view his specific diary.
- Users can delete his diary.
- Users can set a reminder.


## Getting Started
To get started with this project you have to follow all instruction below carefully and implement.

## Prerequisites
Install the software on your local machine [NodeJs](https://nodejs.org/en/download/)

## Installing
Make sure you have cloned this repo to your local machine, and after then run `cd project_directory` command using your terminal. install all dependencies by this command below

```
> npm i
```

## Run the server
```
> npm run dev
```

## API Endpoints

| Request Url | Methods  | Description  |
| ------- | --- | --- |
| /api/v1/auth/Register | POST | Create user account |
| /api/v1/auth/Login | POST | User Login  |
| /api/v1/Add-Story | POST | User can add diary |
| /api/v1/Delete-Story/:storyId | DELETE | delete a specific diary |
| /api/v1/Update-Story/:storyId | PATCH | User can update a specific story |
| /api/v1/Reset-Password | PATCH | User can reset password |
| /api/v1/Read-Story/:storyId | GET | user can get a single story |
| /api/v1/Password-Update/:userId | PATCH | User can update password |
| /api/v1/Profile/:userId  | PATCH | User can update profile |



### UI Link Example
[My diary UI](https://aime19.github.io/Andela_Cycle_12_Chalenge_One/)


## Tools Used

### Back End
* Node Js

### Framework
* Express

### User Interface (UI)
* HTML
* CSS
* Javascript

### Deployment
```
Heroku
```
### API Documentation
[Documentation](https://diaryapp2019.herokuapp.com/apiDocumentation)
### Pivotal Tracker Stories 
[Project Stories](https://www.pivotaltracker.com/n/projects/2401031)
### Heroku link

[My app on Heroku](https://diaryapp2019.herokuapp.com/)

## Author
- Aime Malaika <aimemalaika1995@@gmail.com>
---

## Copyright
Copyright (c) Aime Malaika
