const express = require("express");
const router = express.Router();

const controller = require("../controllers/contactController");

//========================= Open Form for Users ===================//
router.get('/', controller.get_form);

//========================= Create New Users ===================//
router.post("/", controller.post_form);

//========================= Open Form for Users ===================//
router.get('/show', controller.show_users);

//========================= Show User by ID ===================//
router.get("/show/:id", controller.show_user_by_id);

//========================= Delete User ===================//
router.post('/delete', controller.delete_user);


//======================================== Update User ========================================//
//========================= Open Update Form ===================//
router.post("/update", controller.update_form);

//========================= Update User Form ===================//
router.post('/updated', controller.update_user);

module.exports = router;