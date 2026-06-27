const { validationResult } = require("express-validator");
const teamService = require('../services/TeamService');
const userService = require('../services/UserService')

const create = async (req, res) => {
const users = await userService.findMany();

  console.log(users)
  res.render('teams/create.ejs', {
    title: "ایجاد تیم",
    errors: [],
    users: users

  });
}

const store = async (req, res, next) => {
  const users = await userService.findMany();
  console.log(req.body)
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('teams/create.ejs', {
      title: "ایجاد تیم",
      errors: errors.array(),
      request: req.body,
      users: users
    })
  }

  const team = await teamService.store(req.body)

  res.redirect('/');
}

module.exports = {
  create,
  store
}