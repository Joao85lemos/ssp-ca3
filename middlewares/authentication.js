module.exports = {
    authentication: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        req.flash("error_msg", "You are not authenticated!");
        res.redirect("/")
    }
}