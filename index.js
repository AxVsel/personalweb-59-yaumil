const express = require("express");
var session = require("express-session");
var flash = require("express-flash");
const path = require("path");
const hbs = require("hbs");
const {
  authLogin,
  authRegister,
  authLogout,
  renderLogin,
  renderRegister,
  renderHome,
  renderMyProject,
  addMyProject,
  updateMyProject,
  deleteMyProject,
  renderMyProjectAdd,
  renderMyProjectDetail,
  renderMyProjectEdit,
  renderTestimonial,
  renderContactMe,
  render404,
} = require("./controllers/controller");
const { formatDateToWIB, getRelativeTime } = require("./utils/time");
const { truncateText } = require("./utils/text");
const { sendAlert, showSaveDialog } = require("./utils/alert");

// const { disableUncheckedCheckbox } = require("./assets/js/test");
const config = require("./config/config");
const app = express();
require("dotenv").config();
const upload = require("./middlewares/upload-file");
const port = process.env.SERVER_PORT || 2001;

app.use(
  session({
    name: "my-session",
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);
hbs.registerHelper("truncateText", truncateText);
// hbs.registerHelper("disableUncheckedCheckbox", disableUncheckedCheckbox);
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});
hbs.registerHelper("isChecked", (value) => {
  return value ? "checked" : "";
});
hbs.registerHelper("sendAlert", sendAlert);
hbs.registerHelper("showSaveDialog", showSaveDialog);

app.get("/login", renderLogin);
app.get("/register", renderRegister);
app.post("/register", authRegister);
app.post("/login", authLogin);
app.get("/logout", authLogout);

app.get("/", renderHome);
app.get("/myproject", renderMyProject);
app.post("/myproject", upload.single("image"), addMyProject);
app.get("/myproject-add", renderMyProjectAdd);
app.get("/myproject-detail/:id", renderMyProjectDetail);
app.get("/myproject-edit/:id", renderMyProjectEdit);
app.post("/myproject-update/:id", upload.single("image"), updateMyProject);
app.post("/myproject-delete/:id", deleteMyProject);

app.get("/testimonial", renderTestimonial);
app.get("/contactme", renderContactMe);

app.get("*", render404);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  // console.log(`test dotenv ${process.env.URL_TEST}`);
});
