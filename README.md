 A Nodejs web application made with **Semantic UI** in frontend and **Express** framework in backend
 
 Feel free to fork and add more features.

# Package and Modules used

- Mongoose
- Passport
- Method-override
- Passport-local
- Cookie-parser
- Http-error
- Morgan
- Express
- Express-session


# Features-

## Authentication:

User login with username and password

Admin sign-up with admin code

 ### Authorization:

One cannot manage posts without being authenticated

One cannot manage comments without being authenticated

One cannot edit or delete posts and comments created by other users

Admin can manage all posts and comments


# Middleware

There are 3 middleware which are being used 

- Isloggedin: *Checks whether the user is logged in or not before posting a comment or post* 
```
function(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

```
- author: *Checks whether the user is creator of the post before editing or deleting it*
```
function(req,res,next){
    if(req.isAuthenticated()){
        post.findById(req.params.id,function (err,found) {
            if(err){
                console.log(err);
            }
            else{

                if(found.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect('back');
                }
            }

        });
    }
    else{
        res.redirect('/login');
    }
};

```
- comment-author: *Checks whether the user is creator of the comment before editing or deleting it*
```
function(req,res,next){
    if(req.isAuthenticated()){
        comment.findById(req.params.ids,function (err,found) {
            if(err){
                console.log(err);
            }
            else{
                if(found.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect('back');
                }
            }
        });
    }
    else{
        res.redirect('/login');
    }
};
```

#Semantic UI

Semantic allows developers to build beautiful websites fast, with concise HTML, intuitive javascript, and simplified debugging, helping make front-end development a delightful experience

Following is a snapshot of code which is already given on Semantic UI site to make a navbar

```angular2html
<div class="ui inverted menu">
        <a class="item" href="/">
            <i class="code icon"></i>
        </a>
        <a class="item">
            Blog
        </a>
        <div class="right menu">
            <div class="item">
                <div class="ui transparent icon input">
                    <input type="text" style="color: white" placeholder="Search...">
                    <i class="search link icon"></i>
                    <% if (!currentuser) { %>
                    <a class="item" href="/login">Login</a>
                    <a class="item" href="/signup">Sign up</a>
                    <% } else {%>
                    <a class="item" href="/logout">Log out </a>
                    <% } %>
                </div>
            </div>
        </div>
    </div>
```

