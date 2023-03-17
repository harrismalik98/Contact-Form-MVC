const path = require("path");
const multer = require("multer");
const fs = require("fs");
const Client = require("../models/contactModel");

const {validationResult} = require("express-validator");
const { validateContactForm } = require("../middleware/validation/contactValidation");



// ============================ For Storing Image File on Server ============================ //

// The diskStorage function of multer package allows to configure the destination
// and filename of the uploaded files.

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
    });


// The "upload" constant is created by calling the multer function and passing in an object with a storage 
// property that refers to the storage configuration object that specifies where uploaded files should be 
// stored on the server's file system and how they should be named.
    
const upload = multer({ storage: storage });


// ============================ GET Form ============================ //
const get_form = async(req, res) => {
    try{
        await res.sendFile(path.join(__dirname, '..', 'index.html'));
    }
    catch(err){
        console.log(err);
    }
};

// ============================ Create New User ============================ //
const post_form = async(req, res) => {

    try{
        // upload.single('image') is used to specify that only a single file with the field name "image" should be 
        // expected in the form submission. The uploaded file can then be accessed via req.file.
        await new Promise((resolve, reject) => {
            upload.single("image")(req, res, (err) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                resolve();
              }
            });
          }); 

        // Below one is for Express Vlaidator validation rules.
        // Promise.all() is used to handle an array of Promises
        // The run() method returns a Promise that resolves with the validation result. 
        // If any of the validation rules fail, the Promise returned by run() will be rejected with a validation error.
        await Promise.all(validateContactForm.map((rule) => rule.run(req)));
        
        // Below one is for Express Vlaidator result that if error comes then response is json with errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const name = req.body.name;
        const email = req.body.email;
        const phoneno = req.body.phoneno;

        // console.log(req.file);

        // The fs.readFileSync() method is used to read the contents of the file at the given path synchronously
        // so it will not goto next line untill it completely read all of the content.Then convert it into Base64 String.
        const buffer = fs.readFileSync(req.file.path);
        const image = buffer.toString("base64");

        const filetype = req.file.filetype;
        const msg = req.body.msg;

        const client = new Client({
            name: name,
            email: email,
            phoneno: phoneno,
            image:image,
            filetype:filetype,
            msg: msg,
        });

        await client.save();
        res.sendFile(path.join(__dirname, "..","public/html/success.html"));
    }
    catch(err){
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

        // If we use different layout in our project than layout.ejs then we have to give a layout name like below.
        await res.render("update",{layout:"./layouts/updatelayout", id:id, name:name, email:email, phoneno:phoneno, msg:msg});
    }
    catch(err){
        console.log(err);
    }
};

//======= Submit Update Form =======//
const update_user =  async(req, res) => {
    try{
        await new Promise((resolve, reject) => {
            upload.single("image")(req, res, (err) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                resolve();
              }
            });
          });

        const id = req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const phoneno = req.body.phoneno;

        // console.log(req.file);

        const buffer = fs.readFileSync(req.file.path);
        const image = buffer.toString("base64");

        const filetype = req.file.filetype;

        const msg = req.body.msg;

        await Client.findByIdAndUpdate(id, {name:name, email:email, phoneno:phoneno, image:image, filetype:filetype , msg:msg});
        res.redirect("/show");
    }
    catch(err){
        console.log(err);
    }
    
};

module.exports = { get_form, post_form, show_users, show_user_by_id, delete_user, update_form, update_user};
