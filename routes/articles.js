import { Router } from 'express'
import { ArticleController } from '../controllers/articles.js'

export const articlesRouter = Router()

articlesRouter.get('/', ArticleController.getAll)
articlesRouter.post('/', ArticleController.create)
articlesRouter.get('/:id', ArticleController.getById)
articlesRouter.delete('/:id', ArticleController.delete)
articlesRouter.patch('/:id', ArticleController.update)