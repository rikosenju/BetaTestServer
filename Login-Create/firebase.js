// firebase.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase config (replace with your own Firebase project credentials)
const firebaseConfig = {
      apiKey: "AIzaSyBzH5ViS1ZuaItHdUdltY5-uNLuxIeR7-w",
      authDomain: "beta-eco-life.firebaseapp.com",
      projectId: "beta-eco-life",
      storageBucket: "beta-eco-life.firebasestorage.app",
      messagingSenderId: "705093531450",
      appId: "1:705093531450:web:d36b3e327cd9282db1c203",
      measurementId: "G-QR5CY6K4DY"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign up function
export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
}

// Sign in function
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
}

// Sign out function
export async function signOutUser() {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
}

// Handle user authentication state change
export function onAuthStateChangedListener(callback) {
  onAuthStateChanged(auth, callback);
}

// Store user data in Firestore
export async function storeUserData(userId, username) {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, { username, createdAt: new Date() });
  console.log('User data stored in Firestore');
}

// Load user data from Firestore
export async function loadUserData(userId) {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data() : null;
}
