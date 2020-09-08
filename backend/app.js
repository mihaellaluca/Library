const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

const port = 3000;

var UserModel = require("./UserModel");
var BookModel = require("./BookModel");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/books", async (req, res) => {
    var allBooks = await BookModel.find();
    console.log("allBooks,", JSON.stringify(allBooks));
    try {
        if (allBooks) {
            console.log("All users:", allBooks);
            res.set("Content-Type", "application/json")
                .status(200)
                .send({ data: allBooks });
        } else {
            res.status(404).send("No user found");
        }
    } catch (err) {
        console.log("eroarea", err);
        res.status(500).send("Internal error");
    }
    res.end();
});

app.post("/addBook", async (req, res) => {
    res.set("Content-Type", "application/json");
    console.log(req.body);
    let body = req.body;
    try {
        let book = {
            title: body.title,
            author: body.author,
            description: body.description,
            sellPrice: body.sellPrice,
            stock: Number(body.stock),
        };
        BookModel.collection.insertOne(book, (err, docs) => {
            if (err) {
                console.log(err);
                res.status(400).send({ message: err });
                res.end();
            } else {
                console.log("book inserted");
                res.status(200).send({ message: "Book inserted succesfully!" });
                res.end();
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
        res.end();
    }
});

app.put("/updateBook", (req, res) => {
    res.set("Content-Type", "application/json");
    console.log("updated", req.body);
    try {
        let bookId = req.body.id;
        if (req.body.operation === "dec") {
            console.log("Decrementing stock of book..");
            BookModel.updateOne(
                { _id: bookId },
                { $inc: { stock: Number(-1) } },
                (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send({ message: err });
                        res.end();
                    } else {
                        console.log("Stock updated. One book borrowed.");
                        res.status(200).send({ message: "Stock updated!" });
                        res.end();
                    }
                }
            );
        } else if (req.body.operation === "inc") {
            console.log("Incrementing stock of book..");
            BookModel.updateOne(
                { _id: bookId },
                { $inc: { stock: Number(1) } },
                (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send({ message: err });
                        res.end();
                    } else {
                        console.log("Stock updated. One book returned.");
                        res.status(200).send({ message: "Stock updated!" });
                        res.end();
                    }
                }
            );
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal error" });
        res.end();
    }
});

app.delete("/deleteBook/:id", async (req, res) => {
    try {
        BookModel.deleteOne({ _id: req.params.id }, (err, docs) => {
            if (err) {
                console.log(err);
                res.status(404).send({ message: err });
                res.end();
            } else {
                console.log("Book deleted!");
                res.status(200).send({ message: err });
                res.end();
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
        res.end();
    }
});

// USERS:

app.get("/users", async (req, res) => {
    var allUsers = await UserModel.find();
    console.log("allUsers,", JSON.stringify(allUsers));
    try {
        if (allUsers) {
            console.log("All users:", allUsers);
            res.status(200).send({ data: allUsers });
        } else {
            res.status(404).send("No user found");
        }
    } catch (err) {
        console.log("eroarea", err);
        res.status(500).send("Internal error");
    }
    res.end();
});

app.post("/login", async (req, res) => {
    console.log("LOGIN");
    try {
        let request = {
            email: req.body.email,
            password: req.body.password,
        };
        let user = await UserModel.findOne({ email: request.email });
        if (user) {
            if (request.password === user.password) {
                console.log("Login succesful!");
                const token = jwt.sign({ id: user._id }, "secret", {
                    expiresIn: "2h",
                });
                let resp = {
                    statusCode: 200,
                    data: user,
                    token: token,
                };
                res.send(resp);
            } else {
                let resp = {
                    statusCode: 404,
                    data: { msg: "Wrong password." },
                };
                res.send(resp);
            }
        } else {
            let resp = {
                statusCode: 404,
                data: { msg: "No user with this email found." },
            };
            res.send(resp);
        }
    } catch (err) {
        console.log(err);
        let resp = { statusCode: 500, data: { msg: err } };
        res.send(resp);
    }
    res.end();
});

app.post(`/register`, async (req, res) => {
    console.log(req.body);
    try {
        var newUser = {
            admin: false,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            currentBorrows: [],
        };
        let existingEmail = await UserModel.find({ email: newUser.email });
        if (existingEmail) {
            UserModel.collection.insertOne(newUser, (err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({ message: "Bad request!" });
                    res.end();
                } else {
                    console.log("Account created");
                    res.status(200).send({ message: "Account created!" });
                    res.end();
                }
            });
        } else {
            res.status(400).send({ message: "Email already existing." });
            res.end();
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
        res.end();
    }
});

app.put("/currentBorrows", async (req, res) => {
    console.log("modifying current borrows..");
    res.set("Content-Type", "application/json");
    console.log("body", req.body);

    try {
        let user = await UserModel.findById(req.body._id);
        if (req.body.operation === "add") {
            console.log("adding book to borrows..");

            user.currentBorrows.push(req.body.book);
            UserModel.updateOne(
                { _id: user._id },
                { $set: { currentBorrows: user.currentBorrows } },
                (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send({ message: err });
                        res.end();
                    } else {
                        console.log("List updated!");
                        res.status(200).send({
                            message: "List updated!",
                        });
                        res.end();
                    }
                }
            );
        } else if (req.body.operation === "remove") {
            console.log("removing book from borrows..");
            // user.currentBorrows.remove(JSON.stringify(req.body.book));
            UserModel.updateOne(
                { _id: req.body._id },
                { $pullAll: { currentBorrows: [req.body.book] } },
                (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send({ message: err });
                        res.end();
                    } else {
                        console.log("List updated!");
                        res.status(200).send({
                            message: "List updated!",
                        });
                        res.end();
                    }
                }
            );
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal error" });
        res.end();
    }
});

app.get("/getCurrentBorrows/:id", async (req, res) => {
    var userBorrows = await UserModel.findById(req.params.id);
    try {
        if (userBorrows) {
            console.log("userBorrows", userBorrows);
            res.status(200).send({ data: userBorrows });
        } else {
            res.status(404).send("User has no books borrowed");
        }
    } catch (err) {
        console.log("eroarea", err);
        res.status(500).send("Internal error");
    }
    res.end();
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

mongoose.connect(
    "mongodb+srv://Animals:animals@cluster-fwa4q.mongodb.net/Library?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (!err) console.log("Succesfully connected to database.");
        else console.log("Error connecting to database");
    }
);

module.exports = app;

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}
