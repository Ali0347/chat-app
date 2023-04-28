import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl4aBne8YnK9AR35oTHIpnr7J80GLRoOU",
  authDomain: "ali-react-chat.firebaseapp.com",
  databaseURL: "https://ali-react-chat-default-rtdb.firebaseio.com",
  projectId: "ali-react-chat",
  storageBucket: "ali-react-chat.appspot.com",
  messagingSenderId: "156129825058",
  appId: "1:156129825058:web:e251236ed4dbc41fba557b",
  measurementId: "G-F8867SY530"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
