const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 3010;
const smtp_login = process.env.SMTP_LOGIN || '---';
const smtp_password = process.env.PASSWORD || '---';




app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/send', async function (req, res) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false,
        port: 587,
        auth: {
            user: smtp_login, // generated ethereal user
            pass: smtp_password, // generated ethereal password
        },
    });

    let {message,email,name} = req.body

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'zimex-test', // sender address
        to: "gsricco@yandex.ru", // list of receivers
        subject: "Testing send message ✔", // Subject line
        // text: "Very well?", // plain text body
        html: `<h1>Сообщение с Вашей формы</h1>
                <div>email: ${email}</div>
                <div>name: ${name}</div>
                <div>message: ${message}</div>`
    });

    res.send('message send successfully')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});