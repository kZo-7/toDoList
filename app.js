const express = require("express");
const bodyParser = require("body-parser");
let ejs = require("ejs");

const app = express();

const tasks = ["Say good morning to yourself 🎈"];
const workTasks = [];

app.use(bodyParser.urlencoded(
    {
        extended: true
    }
));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let currentDay = today.toLocaleDateString("en-us", options);
       
    //render the file "list.ejs" which is in Folder "views" and pass the data of var "day" into var "cDate"
    res.render("list", {
        listTitle: currentDay,
        newListTasks: tasks
    });
});

app.post("/", function(req, res) {
    let task = req.body.newTask;
    let listType = req.body.list;

    if (listType === "Work List") {
        workTasks.push(task);
        res.redirect("/work");
    } else {
        tasks.push(task);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        newListTasks: workTasks
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server started on port 3000.");
});