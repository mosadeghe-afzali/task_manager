require("dotenv").config();

const express = require("express");
const path = require("path");
const router = require("./src/routes");

const app = express();
const port = process.env.APP_PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

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