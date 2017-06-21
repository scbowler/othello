import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDhu5zXe9OY5IttNjD1jiQj7OQZp2qUT_I",
    authDomain: "othello-978df.firebaseapp.com",
    databaseURL: "https://othello-978df.firebaseio.com",
    projectId: "othello-978df",
    storageBucket: "",
    messagingSenderId: "154717875992"
};

firebase.initializeApp(config);

export const database = firebase.database();

export const auth = firebase.auth();
