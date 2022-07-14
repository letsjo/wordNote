import cryptoJs from "crypto-js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const decrypt = (encryptedText: string) => {
  const decipher = cryptoJs.AES.decrypt(
    encryptedText,
    cryptoJs.enc.Utf8.parse(process.env.REACT_APP_secretKey),
    {
      iv: cryptoJs.enc.Utf8.parse(process.env.REACT_APP_iv),
      padding: cryptoJs.pad.Pkcs7,
      mode: cryptoJs.mode.CBC,
    }
  );
  return decipher.toString(cryptoJs.enc.Utf8);
};

const firebaseConfig = {
  apiKey: decrypt(process.env.REACT_APP_API_KEY),
  authDomain: "spara-react-basic.firebaseapp.com",
  projectId: "spara-react-basic",
  storageBucket: "spara-react-basic.appspot.com",
  messagingSenderId: "958969812500",
  appId: "1:958969812500:web:7f0d845a5ccdfcf1b6b901",
  measurementId: "G-JY2SB9E770"
};

initializeApp(firebaseConfig)

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore();