//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const empty = require(__dirname + "/empty.js");

const messages = [
	{
		text: "Hi there!",
		user: "Amando",
		added: new Date(),
	},
	{
		text: "Hello World!",
		user: "Charles",
		added: new Date(),
	},
];

const app = express();

app.set("view engine", "ejs");

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(express.static("public"));

app.get("/", function (req, res) {
	res.render("home", {
		messages: messages,
	});
});

app.get("/compose", function (req, res) {
	res.render("compose");
});

app.post("/compose", function (req, res) {
	const message = {
		user: req.body.user,
		text: req.body.text,
		added: new Date(),
	};
	messages.push(message);
	res.redirect("/");
});

app.post("/", function (req, res) {
	const message = {
		user: req.body.user,
		text: req.body.text,
		added: new Date(),
	};
	messages.push(message);
	res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
	console.log("Server started on port 3000");
});
