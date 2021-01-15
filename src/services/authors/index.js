const express = require("express")
const ArticleSchema = require("../articles/schema")

const authorRouter = express.Router()

authorRouter.post("/:articleId/author", async (req, res, next) => {
    try {
        const updatedAuthor = await ArticleSchema.findOne(req.params.articleId, {
            $push: { author: req.body },
            new: true,
            runValidators: true
        })
        res.send(updatedAuthor)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

articlesRouter.get("/:authorId", async (req, res, next) => {
    try {
        const id = req.params.authorId
        const author = await articlesSchema.findOne()
        if (article) {
            res.send(article)
        }
        
    } catch (error) {
        next(error)
    }
})