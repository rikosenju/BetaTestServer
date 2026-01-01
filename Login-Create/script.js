import { signIn, signUp, signOutUser, onAuthStateChangedListener, storeUserData, loadUserData } from './firebase.js';

const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signUp');

const showSignUpButton = document.getElementById('showSignUpButton');
const showLoginButton = document.getElementById('showLoginButton');

showSignUpButton.addEventListener('click', function() {
    signInForm.style.display = 'none';
    signUpForm.style.display = 'block';
});

showLoginButton.addEventListener('click', function() {
    signUpForm.style.display = 'none';
    signInForm.style.display = 'block';
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('login-error-message');

    const email = `${username}@example.com`; // Firebase uses email, so we simulate a username with email

    try {
        const user = await signIn(email, password);
        console.log('User signed in:', user);
        window.location.href = '../Home/index.html'; // Redirect to home
    } catch (error) {
        errorMessage.style.display = 'block'; // Show error if login fails
    }
});

document.getElementById('signUpForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('signUp-username').value;
    const password = document.getElementById('signUp-password').value;
    const errorMessage = document.getElementById('signup-error-message');

    const email = `${username}@example.com`; // Firebase uses email, so we simulate a username with email

    try {
        const user = await signUp(email, password);
        console.log('User signed up:', user);
        await storeUserData(user.uid, username); // Store user data in Firestore
        errorMessage.style.display = 'none'; // Hide error if signup is successful
        signUpForm.style.display = 'none';
        signInForm.style.display = 'block'; // Switch to sign-in form
    } catch (error) {
        errorMessage.style.display = 'block'; // Show error if signup fails
    }
});

// Optional: Set up listener to check if the user is logged in or logged out
onAuthStateChangedListener((user) => {
    if (user) {
        console.log("User is logged in:", user);
    } else {
        console.log("User is logged out");
    }
});
