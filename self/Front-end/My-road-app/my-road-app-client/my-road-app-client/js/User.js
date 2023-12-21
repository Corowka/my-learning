class User {

    constructor() {
        this.serverUrl = 'http://localhost:5000';
        this.jwtToken = null;
        this.username = null;
    }

    async signIn() {
        const email = document.getElementById('sign-in-email').value;
        const password = document.getElementById('sign-in-password').value;
        const url = this.serverUrl + '/auth/login';
        const user = { email, password };

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
                this.username = data.username;
                this.jwtToken = data.token;
            })
            .catch(error => {
                alert('Authorization error: ', error);
            });
    }

    async signUp() {
        const username = document.getElementById('sign-up-username').value;
        const email = document.getElementById('sign-up-email').value;
        const password = document.getElementById('sign-up-password').value;
        const passwordRepeated = document.getElementById('sign-up-password-repeat').value;
        if (password !== passwordRepeated) {
            alert('The passwords entered are different');
        }
        const url = this.serverUrl + '/auth/registration';
        const user = { username, email, password };

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
                this.username = username;
                this.jwtToken = data.token;
            })
            .catch(error => {
                alert('Registration error: ', error);
            });
    }

    async saveTodo() {
        try {
            const date = document.getElementById('toggle-calendar-btn').textContent;
            const [tasks, flags] = [[], []];
            const taksItems = document.querySelectorAll('.task');
            taksItems.forEach((item) => {
                const task = item.querySelector('.task-name').value;
                const flag = +item.querySelector('.checkbox').checked;
                tasks.push(task);
                flags.push(flag);
            });
            const todo = { tasks, flags, date };
            const url = this.serverUrl + '/todo/save';
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo),
            };
            await fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(`HTTP ${response.status} error: ${errorData.message}`);
                    });
                }
            })
            .catch(error => {
                alert('Todo save error: ', error);
            });
        } catch(e) {
            console.log(e);
        }
    } 

}

window.user = new User();