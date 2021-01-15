const express = require("express")
const articlesSchema = require("./schema")

const articlesRouter = express.Router()

articlesRouter.get("/", async (req, res, next) => {
    try {
        const articles = await articlesSchema.find()
        res.send(articles)
    } catch (error) {
        next(error)
    }
})

articlesRouter.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const article = await articlesSchema.findById(id)
        if (article) {
            res.send(article)
        }
        
    } catch (error) {
        next(error)
    }
})

articlesRouter.post("/", async (req, res, next) => {
    try {
        const newArticle = new articlesSchema(req.body)
        const { _id } = await newArticle.save()

        res.status(201).send(_id)
    } catch (error) {
        next(error)
    }
})

articlesRouter.put("/:id", async (req, res, next) => {
    try {
        const article = await articlesSchema.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true,
        }) 
        if (article) {
            res.send(article)
        } else {
            const error = new Error(`Article with that ID ${req.params.id} not found`)
            error.httpStatusCode = 404
            next (error)
        }
    } catch (error) {
        next(error)
    }
})

articlesRouter.delete("/:id", async (req, res, next) => {
    try {
        const article = await articlesSchema.findByIdAndDelete(req.params.id)
        if (article) {
            res.send("Successfully deleted")
        } else {
            const error = new Error(`Article with that ID ${req.params.id} not found`)
            error.httpStatusCode = 404
            next(error)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

articlesRouter.post("/:articleId/reviews", async (req, res, next) => {
    try {
        const updatedArticle = await articlesSchema.findByIdAndUpdate(req.params.articleId, {
            $push: { reviews: req.body },
            new: true,
            runValidators:true
        })
res.send(updatedArticle)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

articlesRouter.put("/:articleId/reviews/:reviewId", async (req, res, next) => {
    try {
        const updatedArticle = await articlesSchema.updateOne({_id:req.params.articleId, "reviews._id":req.params.reviewId  }, {
         $set:{"reviews.$":req.body}
        })
res.send(updatedArticle)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

articlesRouter.get("/:articleId/author", async (req, res, next) => {
    try {
        const id = req.params.author
        const author = await articlesSchema.findOne({id}).populate('author')
        if (author) {
            res.send(author)
        }
        
    } catch (error) {
        next(error)
    }
})

articlesRouter.post("/:articleId/author/authorId", async (req, res, next) => {
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

articlesRouter.put("/:articleId/author/:authorId", async (req, res, next) => {
    try {
        const updatedArticle = await articlesSchema.updateOne({_id:req.params.articleId, "author._id":req.params.authorId  }, {
         $set:{"author.$":req.body}
        })
res.send(updatedArticle)
    } catch (error) {
        console.log(error)
        next(error)
    }
})


module.exports = articlesRouter