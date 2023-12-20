"use strict"

function hideItem(id) {
    const signPage = document.getElementById(id);
    signPage.style.display = 'none';
}

function displayItem(id, mode) {
    const signPage = document.getElementById(id);
    signPage.style.display = mode;
}

function openApp() {
    hideItem('sign-in-page');
    hideItem('sign-up-page');
    hideItem('sign-page'); // !!!
    displayItem('menu', 'flex');
    displayItem('profile-page', 'flex');
}

const signInButton = document.getElementById('sign-in-btn');
const signUpButton = document.getElementById('sign-up-btn');
const signInBackButton = document.getElementById('sign-in-back');
const signUpBackButton = document.getElementById('sign-up-back');
const signInSubmitButton = document.getElementById('sign-in-submit-btn');
const signUpSubmitButton = document.getElementById('sign-up-submit-btn');
const test = document.getElementById('test');

signInButton.addEventListener('click', () => {
    hideItem('sign-page');
    displayItem('sign-in-page', 'flex');
});
signUpButton.addEventListener('click', () => {
    hideItem('sign-page');
    displayItem('sign-up-page', 'flex');
});
signInBackButton.addEventListener('click', () => {
    hideItem('sign-in-page');
    displayItem('sign-page', 'flex');
});
signUpBackButton.addEventListener('click', () => {
    hideItem('sign-up-page');
    displayItem('sign-page', 'flex');
});
signInSubmitButton.addEventListener('click', async () => {
    event.preventDefault();
    await window.user.signIn();
    if (window.user.jwtToken) {
        event.preventDefault();
        openApp();
    } else {
        alert('Authorization wasn\'t successful');
    }
});
signUpSubmitButton.addEventListener('click', async () => {
    event.preventDefault()
    await window.user.signUp();
    // if (window.user.jwtToken) {
    //     openApp();
    // } else {
    //     alert('Registration wasn\'t successful');
    // }
});


test.addEventListener('click', () => openApp());