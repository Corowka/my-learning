const express = require('express');
const cors = require('cors');
const { Router } = require('express');
const PORT = 5000;

class Controller {
    constructor() {
        this.mail = [];
    }

    getPublicKeys(req, res) {
        try {
            return res.json({ mail: this.mail });
        } catch (e) {
            console.log(e);
            return res.json({ message: 'Check error' });
        }
    }

    conect(req, res) {
        try {
            const { n, e, key } = req.body;
            for (let i = 0; i < this.mail.length; i++) {
                if (this.mail[i].n == n && this.mail[i].e == e) {
                    if (this.mail[i].key) {
                        const key = this.mail[i].key;
                        delete this.mail[i].key;
                        return res.json({ key });
                    } else {
                        this.mail[i].key = key;
                        return res.json({ message: '(сервер) Ключ передан' });
                    }
                }
            }
            return res.json({ message: '(сервер) Почты с таким адресом не существует' });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Check error' });
        }
    }

    checkMail(req, res) {
        try {
            const { n, e } = req.body;
            for (let i = 0; i < this.mail.length; i++) {
                if (this.mail[i].n === n && this.mail[i].e === e) {
                    if (this.mail[i].message) {
                        const message = this.mail[i].message;
                        delete this.mail[i].message;
                        return res.json({ message });
                    } else {
                        return res.json({ message: '(сервер) Сообщений нет' });
                    }
                }
            }
            this.mail.push({ n, e });
            return res.json({ message: '(сервер) Почта создана' });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Check error' });
        }
    }

    sendMessage(req, res) {
        try {
            const { n, e, message } = req.body;
            for (let i = 0; i < this.mail.length; i++) {
                if (+this.mail[i].n == +n && +this.mail[i].e === +e) {
                    if (this.mail[i].message) {
                        return res.json({ message: '(сервер) Почтовый ящик уже занят. Ожидайте' });
                    } else {
                        this.mail[i].message = message;
                        return res.json({ message: '(сервер) Сообщение успешно доставлено на почту' });
                    }
                }
            }
            return res.json({ message: '(сервер) Почты с таким адресом не существует' });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Check error' });
        }
    }
}

const controller = new Controller();
const router = new Router();
router.get('/getPublicKeys', controller.getPublicKeys.bind(controller));
router.post('/checkMail', controller.checkMail.bind(controller));
router.post('/conect', controller.conect.bind(controller));
router.post('/sendMessage', controller.sendMessage.bind(controller));


const app = express();
app.use(express.json());
app.use(cors());
app.use('/mail', router);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
