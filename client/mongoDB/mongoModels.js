const mongoose = require("mongoose");
const {mongoMessageSchema, mongoTicketSchema} = require("./mongooseSchemas");

const Ticket = mongoose.model('Ticket', mongoTicketSchema);


module.exports.Ticket = Ticket;
module.exports.Message = Message;
