import { Schema, model } from 'mongoose'

const ArticleSchema = Schema({
	title: {
		type: String,
		require: true
	},
	content: {
		type: String,
		require: true
	},
	date: {
		type: Date,
		default: Date.now()
	},
	image: {
		type: String,
		require: true
	}
})

const ArticleModel = model('Article', ArticleSchema, 'articles')

export default ArticleModel