import * as firebase from 'firebase/app'
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAIfPubyrZmcmtZqU8p_dBi9-PzcmlrgZk",
    authDomain: "smart-med-aba54.firebaseapp.com",
    projectId: "smart-med-aba54",
    storageBucket: "smart-med-aba54.appspot.com",
    messagingSenderId: "111595232367",
    appId: "1:111595232367:web:4db23f648d45fab89ec19a"
  };

const app = firebase.initializeApp(firebaseConfig);

const storage = getStorage(app)

export { storage, firebase as default }