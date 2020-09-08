const mongoose = require("mongoose");

let BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    sellPrice: String,
    stock: Number
});

module.exports = mongoose.model("books", BookSchema);

