function addKeyItem(key) {
    const item = document.createElement('div');
    item.classList.add('key')
    item.textContent = key;
    const container = document.querySelector('.open-keys-list');
    container.appendChild(item);
}

function generateRandomUnicodeString() {
    let result = '';
    const characters = '0123456789'; 
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

async function refreshKeyList() {
    await fetch('http://localhost:5000/mail/getPublicKeys')
        .then(response => {
            if (!response.ok) {
                throw new Error('Проблемы с соединением');
            }
            return response.json();
        })
        .then(data => {
            if (data.mail.length !== 0) {
                const container = document.querySelector('.open-keys-list');
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
                console.log(data.mail);
                for (item of data.mail) {
                    addKeyItem(`n: ${item.n} e: ${item.e}`);
                }
            }
        })
        .catch(error => { console.error(error); });
}

async function conect(rsa, rc4key) {
    const n = document.getElementById('n-input-con').value;
    const e = document.getElementById('e-input-con').value;
    if (!(n && e)) {
        console.log('(клиент) Неполные данные');
        return;
    }
    const keys = {n, e, key: rsa.encrypt(rc4key, n, e)};

    fetch('http://localhost:5000/mail/conect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(keys)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Проблемы с соединением');
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                console.log(data.message);
                return generateRandomUnicodeString();
            } else {
                return rsa.decrypt(data.key);
            }
        })
        .catch(error => {
            console.error(error);
        });
}

async function checkMail(keys, rc4, rc4key) {

    fetch('http://localhost:5000/mail/checkMail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(keys)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Проблемы с соединением');
            }
            return response.json();
        })
        .then(data => {
            const textItem = document.getElementById('recived');
            console.log(data.message)
            let message = data.message;
            if (!message.includes('(сервер)')) {
                message = rc4.crypt(message, rc4key);
            }
            textItem.textContent = message;
        })
        .catch(error => {
            console.error(error);
        });
}

async function sendMessage(rc4, rc4key) {
    
    const n = document.getElementById('n-input-send').value;
    const e = document.getElementById('e-input-send').value;
    const message = rc4.crypt(document.getElementById('messange-input').value, rc4key);
    if (!(n && e && message)) {
        console.log('(клиент) Неполные данные');
        return;
    }
    const keys = {n, e, message};
    console.log(keys);

    fetch('http://localhost:5000/mail/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(keys)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Проблемы с соединением');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}

class RSA {
    constructor() {
        this.p1 = this.getPrime(this.getRamdomInt(0, 100));
        this.p2 = this.getPrime(this.getRamdomInt(0, 100));
        this.e = this.getPrime(this.getRamdomInt(0, 3));
        this.n = this.p1 * this.p2;
        this.f = (this.p1 - 1) * (this.p2 - 1);
        this.k = 2;
        this.d = (this.k * this.f + 1) / this.e;
    }

    getRamdomInt(a, b) {
        return Math.round(a + Math.random() * (b - a));
    }

    getPrime(n) {
        const primes = [
            2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37,
            41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89,
            97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
            157, 163, 167, 173, 179, 181, 191, 193, 197, 199
        ];
        return primes[n % primes.length];
    }

    getPublicKey() {
        return { n: this.n, e: this.e };
    }

    encrypt(message, n, e) {
        return (+message) ** e % n + '';
    }

    decrypt(message) {
        return (+message) ** this.d % this.n + '';
    }
}

class RC4 {

    constructor() { }

    shuffle(key) {
        const s = Array.from({ length: 256 }, (_, index) => index);
        let j = 0;
        const l = key.length;
        for (let i = 0; i < 256; i++) {
            j = (j + s[i] + key[i % l]) % 256;
            [s[i], s[j]] = [s[j], s[i]];
        }
        return s;
    }

    *pseudoRandomByte(s) {
        let i = 0;
        let j = 0;
        while (true) {
            i = (i + 1) % 256;
            j = (j + s[i]) % 256;
            [s[i], s[j]] = [s[j], s[i]];
            const t = (s[i] + s[j]) % 256;
            yield s[t];
        }
    }

    crypt(str, key) {
        key = String(key).split('').map((item) => +item);
        const s = this.shuffle(key);
        const message = str.split('').map((item) => item.charCodeAt(0));
        const rand = this.pseudoRandomByte(s);
        for (let i = 0; i < message.length; i++) {
            message[i] ^= rand.next().value;
        }
        return message.map((item) => String.fromCharCode(item)).join('');
    }
}

const rsa = new RSA();
const rc4 = new RC4();

let rc4key = generateRandomUnicodeString();
console.log(rc4key)

const keys = rsa.getPublicKey();
document.querySelector('.public-key').textContent = `n: ${keys.n} e: ${keys.e}`;

(async () => {
    await checkMail(keys, rc4); 
    await refreshKeyList();
})();

document.getElementById('refresh').addEventListener('click', (async () => { await refreshKeyList(); }));
document.getElementById('send').addEventListener('click', (async () => { await sendMessage(rc4, rc4key); }));
document.getElementById('conect').addEventListener('click', (async () => { rc4key = await conect(rsa, rc4key); }));
document.getElementById('check').addEventListener('click', (async () => { await checkMail(keys, rc4, rc4key); }));

