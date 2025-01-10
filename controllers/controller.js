const { Sequelize, QueryTypes, where } = require("sequelize");
require("dotenv").config();
const environment = process.env.NODE_ENV;
const config = require("../config/config");
const sequelize = new Sequelize(config[environment]);
const { Blog, User, Myproject } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

function renderHome(req, res) {
  // console.log("Logged in user", req.session.user);
  const user = req.session.user;
  res.render("index", { user });
  // res.render("index");
}
//login and register
function renderLogin(req, res) {
  const user = req.session.user;

  if (user) {
    res.redirect("/");
  } else {
    res.render("auth-login");
  }
}

function renderRegister(req, res) {
  const user = req.session.user;

  if (user) {
    res.redirect("/");
  } else {
    res.render("auth-register");
  }
}

async function authRegister(req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const emailExist = await User.findOne({
    where: {
      email: email,
    },
  });

  if (emailExist) {
    req.flash("error", "Email sudah terdaftar");
    return res.redirect("/register");
  }

  const user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });
  req.flash("success", "berhasil mendaftar silahkan login");

  res.redirect("/login");
}

async function authLogin(req, res) {
  const { email, password } = req.body;
  // check if user exist
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    req.flash("error", "user tidak ditemukan.");
    return res.redirect("/login");
  }
  //check if password is correct
  const isValidated = await bcrypt.compare(password, user.password);

  if (!isValidated) {
    req.flash("error", "password salah silahkan dicoba lagi");
    return res.redirect("/login");
  }
  console.log(req.body);

  let loggedInUser = user.toJSON();

  delete loggedInUser.password;

  req.session.user = loggedInUser;

  res.redirect("/");
}

function authLogout(req, res) {
  req.session.user = null;

  res.redirect("/login");
}
//login and register

//myproject
async function renderMyProject(req, res) {
  const { user } = req.session;

  const myprojects = await Myproject.findAll({
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["password"] },
    },
    order: [["createdAt", "DESC"]],
  });
  console.log(myprojects);
  res.render("myproject", { myprojects: myprojects, user: user });
}

function renderMyProjectAdd(req, res) {
  const { user } = req.session;

  if (!user) {
    req.flash("error", "silahkan login");
    return res.redirect("/login");
  }
  res.render("myproject-add", { user: user });
}

async function renderMyProjectEdit(req, res) {
  const { user } = req.session;
  const { id } = req.params;

  if (!user) {
    req.flash("error", "silahkan login");
    return res.redirect("/login");
  }

  const dataToEdit = await Myproject.findOne({
    where: {
      id: id,
    },
  });

  if (dataToEdit === null) {
    res.render("page-404");
  } else {
    console.log("data yang mau di edit :", dataToEdit);
    res.render("myproject-edit", { data: dataToEdit, user: user });
  }
}

async function renderMyProjectDetail(req, res) {
  const { user } = req.session;
  const { id } = req.params;
  const myprojectDetail = await Myproject.findOne({
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["password"] },
    },
    where: {
      id: id,
    },
  });

  if (myprojectDetail === null) {
    res.render("page-404");
  } else {
    console.log("myproject detail :", myprojectDetail);
    res.render("myproject-detail", { data: myprojectDetail, user: user });
  }
}

async function addMyProject(req, res) {
  console.log("informasi file", req.file);
  console.log("form submit");
  const { user } = req.session;
  const {
    projectname,
    startdate,
    enddate,
    description,
    technologiesA,
    technologiesB,
    technologiesC,
    technologiesD,
  } = req.body;
  const image = "http://localhost:2002/" + req.file.path;

  const result = await Myproject.create({
    projectname: projectname,
    startdate: startdate,
    enddate: enddate,
    description,
    technologiesA: technologiesA,
    technologiesB: technologiesB,
    technologiesC: technologiesC,
    technologiesD: technologiesD,
    image: image,
    user_id: user.id,
  });
  console.log("myproject created", result);
  res.redirect("/myproject");
}

async function updateMyProject(req, res) {
  console.log("req :", req);
  const { id } = req.params;
  const {
    projectname,
    startdate,
    enddate,
    description,
    technologiesA,
    technologiesB,
    technologiesC,
    technologiesD,
  } = req.body;

  let image;

  if (req.file) {
    // Jika ada file baru yang diunggah, gunakan file tersebut
    image = "http://localhost:2002/" + req.file.path;
  } else {
    // Jika tidak ada file baru, ambil gambar lama dari database
    const project = await Myproject.findOne({ where: { id } });
    if (!project) {
      console.error("Project not found");
      return res.status(404).send("Project not found");
    }
    image = project.image;
  }

  const result = await Myproject.update(
    {
      projectname: projectname,
      startdate: startdate,
      enddate: enddate,
      description,
      technologiesA: technologiesA,
      technologiesB: technologiesB,
      technologiesC: technologiesC,
      technologiesD: technologiesD,
      image: image,
      updatedAt: sequelize.fn("NOW"),
    },
    {
      where: {
        id: id,
      },
    }
  );
  // blogs.splice(index, 1);
  console.log("result update :", result);
  res.redirect("/myproject");
}

async function deleteMyProject(req, res) {
  console.log("req :", req);
  const { id } = req.params;

  const result = await Myproject.destroy({
    where: {
      id: id,
    },
  });
  console.log("result query delete :", result);
  res.redirect("/myproject");
}

//myproject

function renderTestimonial(req, res) {
  const user = req.session.user;
  res.render("testimonial", { user });
  // res.render("testimonial");
}

function renderContactMe(req, res) {
  res.render("contactme");
}
function render404(req, res) {
  res.render("page-403");
}
module.exports = {
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
};
