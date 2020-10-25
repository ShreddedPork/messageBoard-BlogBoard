//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const empty = require(__dirname + "/empty.js");
const mongoose = require('mongoose')

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

mongoose.connect("mongodb+srv://admin-ryan:Darkstar1!@cluster0.2lbxu.mongodb.net/messageBoardDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const messageSchema = {
	text: String,
	user: String,
	added: Date
};

const Message = mongoose.model("Message", messageSchema);

app.get("/", function (req, res) {
	Message.find({}, function (err, messages) {
		res.render("home", {
		messages: messages
		});
  });
});

app.get("/compose", function (req, res) {
	res.render("compose");
});

app.post("/compose", function (req, res) {
	const message = new Message ({
		user: req.body.user,
		text: req.body.text,
		added: new Date(),
	});
	message.save();
	res.redirect("/");
});

app.post("/", function (req, res) {
	const message = new Message ({
		user: req.body.user,
		text: req.body.text,
		added: new Date(),
	});
	message.save();
	res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
	console.log("Server started on port 3000");
});
