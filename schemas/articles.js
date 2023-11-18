import z from 'zod'

const articleSchema = z.object({
	title: z.string({
		invalid_type_error: 'Title must be a string',
		required_error: 'Title is required'
	}),
	content: z.string({
		invalid_type_error: 'Content must be a string',
		required_error: 'Content is required'
	})
})

export function validateArticle(input) {
	return articleSchema.safeParse(input)
}

export function validatePartialArticle(input) {
	return articleSchema.partial().safeParse(input)
}