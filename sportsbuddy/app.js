// Main JavaScript entry. Using ES modules. This file wires up UI and delegates
// Firebase operations to separate modules (auth.js and firestore-api.js)

import { initFirebase, getAuthInstance } from './auth.js';
import { createEvent, fetchEvents, logAction, addContactMessage, signOutUser } from './firestore-api.js';

// initialize firebase (replace config in auth.js)
initFirebase();

// simple UI wiring
const yearEls = document.querySelectorAll('#year, #year2');
yearEls.forEach(e => e && (e.innerText = new Date().getFullYear()));

const loginForm = document.getElementById('login-form');
const signupBtn = document.getElementById('signup-btn');
const authMsg = document.getElementById('auth-msg');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    try {
      const auth = getAuthInstance();
      // use firebase auth signIn handled in auth.js
      const user = await auth.signInWithEmailAndPassword(email, password);
      await logAction(user.user.uid, 'login', { email });
      window.location.href = 'projects.html';
    } catch (err) {
      console.error('login error', err);
      authMsg.innerText = 'Login failed — ' + err.message;
    }
  });
  signupBtn?.addEventListener('click', async () => {
    // simple sign up flow
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!email || !password) return authMsg.innerText = 'Enter email and password to create account';
    try {
      const auth = getAuthInstance();
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      await logAction(cred.user.uid, 'signup', { email });
      authMsg.innerText = 'Account created — check dashboard.';
      window.location.href = 'projects.html';
    } catch (err)