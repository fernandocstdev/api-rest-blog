import { validateArticle, validatePartialArticle } from "../schemas/articles.js"
import ArticleModel from '../models/Article.js'

export class ArticleController {
	static async getAll(req, res) {
		// const data = await ArticleModel.find({}).sort({ date: -1 }).limit(1) -> obtiene el ultimo 
		const { sort } = req.query
		const { search } = req.query

		if (sort === 'desc') {
			const dataSortDesc = await ArticleModel.find({}).sort({ date: -1 })
			return res.status(200).json(dataSortDesc)
		}

		if (search) {
			console.log(search)
			const searchValue = search.toLowerCase()
			const dataResult = await ArticleModel.find({})

			const dataSearch = dataResult.filter(({ title }) => title.includes(searchValue))

			return res.status(200).json(dataSearch)
		}

		const data = await ArticleModel.find({}).sort({ date: 1 })
		return res.status(200).json(data)
	}

	static async getById(req, res) {
		const { id } = req.params
		const data = await ArticleModel.findById(id).exec()

		if (!data) return res.status(401).json({ message: 'No such article' })

		return res.status(200).json(data)

	}

	static async create(req, res) {
		const result = validateArticle(req.body)

		if (!result.success) {
			return res.status(400).json({ error: JSON.parse(result.error.message) })
		}

		const data = {
			id: crypto.randomUUID(),
			...result.data,
			date: new Date()
		}

		const newArticle = await new ArticleModel(data)

		newArticle.save()
		return res.status(200).json(newArticle)
	}

	static async delete(req, res) {
		try {
			const { id } = req.params
			const articleFind = await ArticleModel.findById(id)
			await articleFind.deleteOne()

			return res.status(200).json({ message: 'Article deleted successfully' })
		} catch (e) {
			console.error(e)
			return res.status(400).json({ message: 'Error' })
		}
	}

	static async update(req, res) {
		const result = validatePartialArticle(req.body)

		if (!result.success) {
			return res.status(400).json({ error: JSON.parse(result.error.message) })
		}

		const { id } = req.params
		const article = await ArticleModel.findById(id)
		await article.updateOne(result.data)

		return res.status(200).json(article)
	}

}