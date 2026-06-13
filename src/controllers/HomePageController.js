const HomePageController = (req, res) => {
    res.render('index.ejs', {
        title: "خانه"
    })
}

module.exports = HomePageController;