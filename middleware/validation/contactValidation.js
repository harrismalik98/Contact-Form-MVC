const { body } = require("express-validator");

const validateContactForm = [
    body('name').trim().isLength({min:3, max:20}).withMessage("Name must be within 3 to 20 characters!"),
    body("email").normalizeEmail().isEmail().withMessage("Please provide valid Email"),
    body("phoneno").isNumeric().withMessage("Phone must be numeric!"),

    // body('image').custom((value, { req }) => req.files && req.files.image && req.files.image.mimetype.match(/(jpg|jpeg|png)$/))
    // .withMessage('Invalid file type. Only JPEG, PNG, and JPG are allowed.'),

    // This is the validation logic inside the custom function. It checks that:
    // req.files exists (assuming you're using a file upload library like Multer)
    // req.files.image exists (assuming you've named the file input field in your HTML form image)
    // The mimetype of the uploaded file matches the regular expression /(jpg|jpeg|png)$/, which matches the JPEG, PNG, and JPG formats.

    body('image').custom((value, { req }) => {
        if (!req.file) {
          throw new Error('Image is required');
        }
        const allowedExtensions = ['.jpeg', '.jpg', '.png'];
        const fileExtension = req.file.originalname.slice(-4);
        if (!allowedExtensions.includes(fileExtension)) {
          throw new Error('Only jpeg, jpg and png files are allowed');
        }
        return true;
      }),

    body("msg").trim().isLength({min:5, max:10000}).withMessage("Message must be within 3 to 100000 characters long"),

    // Below Code is for PASSWORD & CONFIRM PASSWORD
    // check("password").trim().not().isEmpty().isLength({min:3, max:20}).withMessage("Password must be 8 to 20 characters long!"),
    // check("confirmPassword").trim().not().isEmpty().custom((value, {req}) => {
    //     if(value !== req.body.password){
    //         throw new Error("Both password must be same");
    //     }
    //     return true;
    // })
]

module.exports = { validateContactForm };