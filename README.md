# instagram-clone

This instagram clone that I built using react to consolidate my learning of several new technologies I was getting familiar with, among which I highlight tailwind. I found tailwind even more incredible, easy, and fun, than working with styled components. The documentation of Tailwind is a real marvel, it is in itself a masterclass of ui ux.
However, the most important and interesting of the new technologies I implemented on this project was TypeScript, I highly doubt that TypeScript won’t be part of my projects from now on!

## Features

- User login/sign-up
- Suggested users sidebar, and button to follow suggested users if desired
- Combobox reading data from server to show suggestions when searching other users by username
- Feed to watch, comment, and like followed user's posts
- User profile showing profile picture, name, following, followed, and posts count, as well as a grid of posts



## Run Locally

Clone the project

```bash
  git clone https://github.com/Orleydovsky/instagram-clone.git
```

Go to the project directory

```bash
  cd instagram-clone
```

Install dependencies

```bash
  npm install
```

Start the Firebase emulators to have seed data base of users and posts

```bash
  cd .\src\services\firebase\
  firebase emulators:Start --import <firebase-export>  
```
The name of the firebase export file is: firebase-export-1661353637423QKbK1O\

Start the server

```bash
  npm run dev
```


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Related

Here is the project I based on to build this instagram clone

[karlhadwen instagram](https://github.com/karlhadwen/instagram)


## Tech Stack

Front End, React. Styles management, styled components. Back end as a Service, Cloud Firestore. User authentication, Firebase Authentication. Book and author's information consumed from, Google Books APIs

