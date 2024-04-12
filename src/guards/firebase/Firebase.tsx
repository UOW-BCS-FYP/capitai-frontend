// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBupjUZHPKECCLh-9CBY_cVdu5bcojndgg",
  authDomain: "capitai.firebaseapp.com",
  databaseURL: "https://capitai-default-rtdb.firebaseio.com",
  projectId: "capitai",
  storageBucket: "capitai.appspot.com",
  messagingSenderId: "1033439204368",
  appId: "1:1033439204368:web:96837deaee23cb8f322695",
  measurementId: "G-KM6T2WHNYF"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Db = firebase.database();
const Auth = firebase.auth();

export { Db, Auth, firebase };
