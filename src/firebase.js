// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBTEdS5J1bVN9rE92LxnvdESpUv4-SQS_o',
	authDomain: 'cream11-54582.firebaseapp.com',
	projectId: 'cream11-54582',
	storageBucket: 'cream11-54582.appspot.com',
	messagingSenderId: '1037476703629',
	appId: '1:1037476703629:web:a34eaf9ecc223d13a521c4',
	measurementId: 'G-PRPMTEKQF5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
