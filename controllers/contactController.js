const path = require("path");
const Client = require("../models/contactModel");


// ============================ GET Form ============================ //
const get_form = async(req, res) => {
    try{
        // res.sendFile(__dirname + '/../index.html');
        await res.sendFile(path.join(__dirname, '..', 'index.html'));
    }
    catch(err){
        console.log(err);
    }
};

// ============================ Create New User ============================ //
const post_form = async(req, res) => {

    try{
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

        await client.save();
        res.sendFile(path.join(__dirname, "..","public/html/success.html"));
        // res.sendFile(__dirname + "/../public/html/success.html");
    }
    catch(err){
        // res.sendFile(__dirname + "/../public/html/failure.html");
        res.sendFile(path.join(__dirname, "..","public/html/failure.html"));
        console.log(err);
    }
    
};


//========================= Show ALL Users ===================//
const show_users = async(req, res) => {
    try{
        const data = await Client.find();
        res.render('index', { data: data });
    }
    catch(err){
        console.log(err);
    }  
};

//========================= Show user by ID ===================//

const show_user_by_id = async(req, res) => {
    try{
        const id = req.params.id;

        const data = await Client.findById(id)
        res.render("findById", {data: data});
    }
    catch(err){
        console.log(err);
    }
};


//========================= Delete User ===================//

const delete_user = async(req, res) => {
    try{
        const id = req.body.id;

        await Client.findByIdAndRemove(id);
        res.redirect("/show");
    }
    catch(err){
        console.log(err);
    }
};

//========================= Update User ===================//

//======= Open Update Form =======//
const update_form =  async(req, res) => {
    try{
        const id = req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const phoneno = req.body.phoneno;
        const msg = req.body.msg;

        await res.render("update",{id:id, name:name, email:email, phoneno:phoneno, msg:msg});
    }
    catch(err){
        console.log(err);
    }
};

//======= Submit Update Form =======//
const update_user =  async(req, res) => {
    try{
        const id = req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const phoneno = req.body.phoneno;
        const msg = req.body.msg;

        await Client.findByIdAndUpdate(id, {name:name, email:email, phoneno:phoneno, msg:msg});
        res.redirect("/show");
    }
    catch(err){
        console.log(err);
    }
    
};

module.exports = {get_form, post_form, show_users, show_user_by_id, delete_user, update_form, update_user};
