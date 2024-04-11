// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBupjUZHPKECCLh-9CBY_cVdu5bcojndgg",
  authDomain: "capitai.firebaseapp.com",
  projectId: "capitai",
  storageBucket: "capitai.appspot.com",
  messagingSenderId: "1033439204368",
  appId: "1:1033439204368:web:e9eead7a102c69ba322695",
  measurementId: "G-FY0X31ML76"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Db = firebase.database();
const Auth = firebase.auth();

export { Db, Auth, firebase };
