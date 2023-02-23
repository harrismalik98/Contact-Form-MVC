const path = require("path");
const Client = require("../models/contactModel");


// ============================ GET Form ============================ //
const get_form = (req, res) => {
    // res.sendFile(__dirname + '/../index.html');
    res.sendFile(path.join(__dirname, '..', 'index.html'));
};

// ============================ Create New User ============================ //
const post_form = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phoneno = req.body.phoneno;
    const msg = req.body.msg;

    const client = new Client({
        name: name,
        email: email,
        phoneno: phoneno,
        msg: msg,
    });

    client.save(function (err) {
        if (err) {
            // res.sendFile(__dirname + "/../public/html/failure.html");
            res.sendFile(path.join(__dirname, "..","public/html/failure.html"));
        }
        else {
            res.sendFile(path.join(__dirname, "..","public/html/success.html"));
            // res.sendFile(__dirname + "/../public/html/success.html");
        }
    });
};


//========================= Show ALL Users ===================//
const show_users = (req, res) => {
    Client.find((error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.render('index', { data: data });
        }
    });
};

//========================= Show user by ID ===================//

const show_user_by_id = (req, res) => {
    const id = req.params.id;

    Client.findById(id, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            res.render("findById", {data: data});
        }
    });
};


//========================= Delete User ===================//

const delete_user = (req, res) => {
    const id = req.body.id;

    Client.findByIdAndRemove(id, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/show");
        }
    });
};

//========================= Update User ===================//

//======= Open Update Form =======//
const update_form =  (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const phoneno = req.body.phoneno;
    const msg = req.body.msg;

    res.render("update",{id:id, name:name, email:email, phoneno:phoneno, msg:msg});

};

//======= Submit Update Form =======//
const update_user =  (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const phoneno = req.body.phoneno;
    const msg = req.body.msg;

    Client.findByIdAndUpdate(id, {name:name, email:email, phoneno:phoneno, msg:msg}, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/show")
        }
    });
};

module.exports = {get_form, post_form, show_users, show_user_by_id, delete_user, update_form, update_user};
