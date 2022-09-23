// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDjlj3f9SRPh78s6chZxng50CDwog38PeM',
  authDomain: 'poll-platform-2ecf5.firebaseapp.com',
  databaseURL: 'https://poll-platform-2ecf5-default-rtdb.firebaseio.com',
  projectId: 'poll-platform-2ecf5',
  storageBucket: 'poll-platform-2ecf5.appspot.com',
  messagingSenderId: '738767791875',
  appId: '1:738767791875:web:81c00a8df191c2d3b1ab36',
};

// Initialize Firebase
//const firebaseApp = firebase.initializeApp(firebaseConfig);
//

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
