class User {

    constructor() {
        this.serverUrl = 'http://localhost:4444';
        this.jwtToken = null;
        this.username = null;
    }

    async signIn() {
        const phone = document.getElementById('sign-in-tel').value;
        const password = document.getElementById('sign-in-password').value;
        const url = this.serverUrl + '/auth/login';
        const user = { phone, password };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        };

        await fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(`HTTP ${response.status} error: ${errorData.message}`);
                    });
                } else {
                    return response.json();
                }
            })
            .then(data => {
                this.username = data.userName;
                this.jwtToken = data.token;
            })
            .catch(error => {
                alert('Authorization error: ', error);
            });
    }

    async signUp() {
        const signcb = document.querySelector('.sign-cb').checked;
        const userName = document.getElementById('sign-up-username').value;
        const phone = document.getElementById('sign-up-tel').value;
        const password = document.getElementById('sign-up-password').value;
        const passwordRepeated = document.getElementById('sign-up-password-repeat').value;
        if (!signcb) {
            document.querySelector('.polisy').style.color = 'red';
            return;
        } 
        if (password !== passwordRepeated) {
            alert('The passwords entered are different');
            return;
        }
        const url = this.serverUrl + '/auth/reg';
        const user = { userName, phone, password };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        };

        await fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(`HTTP ${response.status} error: ${errorData.message}`);
                    });
                } else {
                    return response.json();
                }
            })
            .then(data => {
                this.username = userName;
                this.jwtToken = data.token;
            })
            .catch(error => {
                alert('Registration error: ', error);
            });
    }

}

window.user = new User();