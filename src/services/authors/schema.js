const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const AuthorSchema = new Schema(
    {
       name: String, 
    }
)

AuthorSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Author", AuthorSchema)