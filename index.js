require("dotenv").config();

const express = require("express");
const path = require("path");
const router = require("./src/routes");
const i18next = require('i18next');
const middleware = require('i18next-http-middleware');

i18next.use(middleware.LanguageDetector).init({
  fallbackLng: 'fa',
  supportedLngs: ['fa', 'en'],
  detection: {
    order: ['querystring', 'cookie'],
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    caches: ['cookie'],
  },
  resources: {
    fa: { translation: require('./src/langs/fa.json') },
    en: { translation: require('./src//langs/en.json') },
  }
});
const app = express();
const port = process.env.APP_PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
// Force Persian by default
// app.use((req, res, next) => {
//   req.lng = 'fa';
//   req.language = 'fa';
//   next();
// });

app.use(middleware.handle(i18next));
app.use(express.static(path.join(__dirname, "src", "public"))); // دسترسی به پوشه استایل و عکس‌ها
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.use((req, res) => {
  res.status(404).send("صفحه مورد نظر یافت نشد");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("خطایی در سمت سرور رخ داده است");
});

app.listen(port, () => {
  console.log(`سرور با موفقیت روی پورت ${port} روشن شد`);
});