# Cartoonstagram
Cartoonstagram is an Instagram clone designed for our favorite cartoon characters. The current version of the application allows users to sign up for an account, create and manage their own posts, follow other users to create a custom feed based on followed users, comment on posts, and like/unlike other posts.

## Live Site
Link to the live version of Cartoonstagram, hosted by Heroku: [Cartoonstagram](https://aa-cartoonstagram.herokuapp.com/)

## Software
Cartoonstagram is an Instragram style social media site built with the following software:

Backend - Python, Flask

Frontend - React/Redux, Javascript

Database - PostgresSQL

Styling - HTML, CSS

## Features
The current version of the site has the following fully implemented features

### Posts
Users are able to create a post from anywhere on the site by using on their navbar, and immediately be able to see it on the main page feed, or see it listed under their own list of posts on their profile page.

<img width="1436" alt="Cartoonstgram-PostFeed" src="https://user-images.githubusercontent.com/92548825/164074616-dc197df8-b6e1-4356-8844-9a1099688de3.png">

<img width="1433" alt="Cartoonstagram-UserPosts" src="https://user-images.githubusercontent.com/92548825/164074646-2e63f819-83b5-464b-99b1-011c47a8c84d.png">

### Comments
Users are able to post a comment on any posts that are on the site. Comments have a text box for users to leave the content of their comment.

<img width="1431" alt="Cartoonstagram-Comments" src="https://user-images.githubusercontent.com/92548825/164076193-e0319631-c2f0-4a35-8dd6-0c6b180d439e.png">

### Followers
Users are able to navigate to profile pages to view their own posts or the posts of others. They can follow other users, creating a custom feed of followed users posts.

<img width="1437" alt="Cartoonstagram-Profile" src="https://user-images.githubusercontent.com/92548825/164082100-d251877c-02d0-4cdb-9c1d-c4350cdd20c6.png">

### Likes
Users are able to like or unlike posts from other users, represented by a red heart or empty heart on the post.

<img width="926" alt="Cartoonstagram-Likes" src="https://user-images.githubusercontent.com/92548825/164083289-558754a7-6743-40ad-ae6e-65aaebbf4d00.png">

### AWS
Users are able to upload their own pictures on Cartoonstagram from their own desktop using AWS.

<img width="280" alt="Cartoonstagram-CreatePost" src="https://user-images.githubusercontent.com/92548825/164083810-6460982b-a9d5-4e78-95b9-9898221b45eb.png">

<img width="1336" alt="Cartoonstagram-AWS" src="https://user-images.githubusercontent.com/92548825/164083846-ae19743f-8aec-4446-906d-67f1aa46afa7.png">

## Installation
To install and start using Cartoonstagram, follow the instructions below:

1. Clone the repository from the main branch (link directly below)

   ```bash
   git clone https://github.com/Willy-Git-Man/Cartoonstagram
   ```

2. CD into root of project and install project dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file in the root of your project and add the following lines into the file:
   ```bash
   SECRET_KEY=<your-secret-key-value>
   DATABASE_URL=postgresql://<your-database-user>:<your-user-password>@localhost/<your-database-name>>
   ```

4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file. Use the following commands in your terminal:
   ```bash
   A. psql - Enter psql command line
   B. CREATE USER <your-database-user> WITH PASSWORD '<your-user-password>';
   C. CREATE DATABASE <your-database-name> WITH OWNER <your-database-user>
   D. /q - Exit psql command line
   ```

5. Get into your pipenv shell, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. Open up a second terminal, and cd into react-app directory. Use npm install to install required dependecies from package.json

   ```bash
   npm install
   ```

7. Run the server using npm start in the second terminal. The default server runs on localhost:3000. Navigate to localhost:3000 in your browser (if it does not open automatically)

   ```bash
   npm start
   ```

8. Login to the site using the demo user, or sign up for you own account, and explore the site!
