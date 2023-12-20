"use strict"

const PAGES_ID = ['profile-page', 'prizes-page', 'prof-page', 'apps-page'];

function hideItem(id) {
    const page = document.getElementById(id);
    page.style.display = 'none';
}

function displayItem(id, mode) {
    const page = document.getElementById(id);
    page.style.display = mode;
}

function openApp() {
    hideItem('sign-in-page');
    hideItem('sign-up-page');
    hideItem('sign-page');
    displayItem('prizes-page', 'flex');
}

displayItem('prizes-page', 'flex');
document.getElementById("prizes-btn").classList.add("selected");

document.getElementById('sign-back-btn').addEventListener('click', () => {
    hideItem('sign-page');
    openApp();
});

document.getElementById('sign-in-btn').addEventListener('click', () => {
    hideItem('sign-page');
    displayItem('sign-in-page', 'flex');
});

document.getElementById('sign-up-btn').addEventListener('click', () => {
    hideItem('sign-page');
    displayItem('sign-up-page', 'flex');
});

document.getElementById('sign-in-back').addEventListener('click', () => {
    hideItem('sign-in-page');
    displayItem('sign-page', 'flex');
});

document.getElementById('sign-up-back').addEventListener('click', () => {
    hideItem('sign-up-page');
    displayItem('sign-page', 'flex');
});

document.getElementById('sign-in-submit-btn').addEventListener('click', async () => {
    await window.user.signIn();
    if (window.user.jwtToken) {
        openApp();
    } else {
        alert('Authorization wasn\'t successful');
    }
});

document.getElementById('sign-up-submit-btn').addEventListener('click', async () => {
    await window.user.signUp();
    if (window.user.jwtToken) {
        openApp();
    } else {
        alert('Registration wasn\'t successful');
    }
});

document.getElementById('user_profile_btn').addEventListener('click', () => {
    PAGES_ID.forEach((item) => {
        hideItem(item);
    });
    displayItem('profile-page', 'flex');
});

document.getElementById('sign-btn').addEventListener('click', () => {
    PAGES_ID.forEach((item) => {
        hideItem(item);
    });
    
    displayItem('sign-page', 'flex');
});

document.getElementById('prizes-btn').addEventListener('click', () => {
    PAGES_ID.forEach((item) => {
        hideItem(item);
    });
    document.querySelector("#page-list .selected").classList.remove("selected");
    document.getElementById("prizes-btn").classList.add("selected");
    displayItem('prizes-page', 'flex');
});

document.getElementById('prof-btn').addEventListener('click', () => {
    PAGES_ID.forEach((item) => {
        hideItem(item);
    });
    document.querySelector("#page-list .selected").classList.remove("selected");
    document.getElementById("prof-btn").classList.add("selected");
    displayItem('prof-page', 'flex');
});

document.getElementById('apps-btn').addEventListener('click', () => {
    PAGES_ID.forEach((item) => {
        hideItem(item);
    });
    document.querySelector("#page-list .selected").classList.remove("selected");
    document.getElementById("apps-btn").classList.add("selected");
    displayItem('apps-page', 'block');
});

document.getElementById('pol-btn').addEventListener('click', () => {
    displayItem('pol-page', 'block');
});

document.getElementById('pol-back-btn').addEventListener('click', () => {
    hideItem('pol-page');
});