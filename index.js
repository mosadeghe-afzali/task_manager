require("dotenv").config();

const express = require("express");
const path = require("path");
const router = require("./src/routes");
const i18next = require('i18next');
const middleware = require('i18next-http-middleware');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const errorHandler = require('./src/middlewares/ErrorHandler');

i18next.use(middleware.LanguageDetector).init({
  fallbackLng: 'fa',
  supportedLngs: ['fa', 'en'],
  detection: {
    order: ['querystring', 'cookie', 'header'], // هدر هم اضافه شد که فرانت‌اند راحت‌تر زبان را بفرستد
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    caches: ['cookie'],
  },
  resources: {
    fa: { translation: require('./src/langs/fa.json') },
    en: { translation: require('./src/langs/en.json') },
  }
});

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(middleware.handle(i18next));

app.use("/public", express.static(path.join(__dirname, "src", "public"))); 

app.use(passport.initialize());
require('./src/helpers/passport')(passport);

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "مسیر یا منبع مورد نظر یافت نشد"
  });
});
app.use(errorHandler)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "خطایی در سمت سرور رخ داده است",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined // نمایش جزئیات خطا فقط در محیط توسعه
  });
});

app.listen(port, () => {
  console.log(`سرور API با موفقیت روی پورت ${port} روشن شد`);
});