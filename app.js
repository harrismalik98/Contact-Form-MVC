const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public")); //Taking it to public folder.so we can use our CSS.


app.use(express.urlencoded({ extended: true })); // For getting requset data or req.body
app.use(express.json()); // Converting data into JSON format.

const contactRoute = require("./routes/contactRoutes");
app.use("/", contactRoute);


app.listen("3000", () => {
    console.log("Server running at port 3000");
});