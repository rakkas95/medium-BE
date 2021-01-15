const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const AuthorSchema = require("../authors/schema")


const articlesSchema = new Schema(
    {
    headLine: String,
    content: String,
    category: {
      img: String,
      name: String,
    },
    author:[{type: mongoose.Schema.Types.ObjectId, ref: 'Author'}], //in compass id saved as a string
    reviews:[{user:String, text:String}],
    cover: String,
  },
  {
    timestamps: true,
    }
)

articlesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Articles", articlesSchema)
  