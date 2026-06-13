require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const router = require('./src/routes');
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'))
app.get('/', router);
const port = process.env.APP_PORT

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})