import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBPhbDTWHq5JFMiAlRLtsW-Dqq7PXnowOQ",
  authDomain: "backend46soles.firebaseapp.com",
  projectId: "backend46soles",
  storageBucket: "backend46soles.appspot.com",
  messagingSenderId: "513798850192",
  appId: "1:513798850192:web:5cc719e92707ab3d76ba15"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)