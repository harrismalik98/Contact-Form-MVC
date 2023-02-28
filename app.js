const express = require("express");
const expressLayouts = require("express-ejs-layouts"); // For EJS Custom Layouts.
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public")); //Taking it to public folder.so we can use our CSS.

app.use(expressLayouts); // Middleware to search for layout file in views folder.
app.set("layout", "./layouts/layout"); // Changing Default layout.ejs file location from views folder to layouts folder.


app.use(express.urlencoded({ extended: true })); // For getting requset data or req.body
app.use(express.json()); // Converting data into JSON format.

const contactRoute = require("./routes/contactRoutes");
app.use("/", contactRoute);


app.listen("3000", () => {
    console.log("Server running at port 3000");
});