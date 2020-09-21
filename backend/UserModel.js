const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    admin: Boolean,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    currentBorrows: []
});

module.exports = mongoose.model("users", UserSchema);
