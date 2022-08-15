const mongoose = require("mongoose");

const mongoTicketSchema = new mongoose.Schema({
    title: String,
    severity: String,
    createdby: String,
    priority: Number,
    type: String,
    product: String,
    screenshot:{ type:  String, default: "None" },
    screenshotType: {type : String, default: "None"},
    summary: String,
    createdAt: { type: Date, default: Date.now },
    createdBy: String,
    updatedAt: { type: Date, default: Date.now },
    updatedBy: String,
    status: String
});



module.exports.mongoTicketSchema = mongoTicketSchema;
