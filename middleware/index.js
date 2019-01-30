middleware_obj={};

middleware_obj.loggedIn=function(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};


module.exports=middleware_obj