const mongoose = require('mongoose');
// const sequencing = require("../config/sequencing");
const autoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    _id: Number,
    title: {type: String},
    createdby: {type: String},
    type: {type: String},
    severity: {type: String},
    product: {type: String},
    lifecycle: {type: String},
    screenshot:{ type:  String, default: "None" },
    screenshotType: {type : String, default: "None"},
    summary: {type: String},
    createdAt: { type: Date, default: Date.now }

}
,
{ _id: false }
);
PostSchema.plugin(autoIncrement);


 
module.exports = mongoose.model('Post', PostSchema);