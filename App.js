const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const mongoose = require('mongoose'); //to connect to mongodb


//connect to mongodb and listen to requests
mongoose.connect("mongodb+srv://Deepak:deepak123@cluster0.qvpfm.mongodb.net/ResultManagement?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected"));

//register view engine
app.set('view engine', 'ejs');
//middleware and static files
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());

//express layouts
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

//teacher and student routes
const teachRoutes = require("./routes/teacherRoutes")
const studRoutes = require("./routes/studentRoutes")
app.use("/teacher", teachRoutes);
app.use("/student", studRoutes);

app.get('/', studRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
