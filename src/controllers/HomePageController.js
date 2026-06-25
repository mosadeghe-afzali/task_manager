const HomePageController = (req, res) => {
    res.render('index.ejs', {
        title: "خانه",
        user: req.user || null
    })
}

module.exports = HomePageController;