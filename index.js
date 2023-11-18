import { conection } from './database/conection.js'
import express, { json } from 'express'
import cors from 'cors'
import { articlesRouter } from './routes/articles.js'

conection()

const app = express()

app.use(json())
app.use(cors())

app.use('/articles', articlesRouter)

const PORT = 1234

app.listen(PORT, () => {
	console.log(`server listening on port http://localhost:${PORT}`)
})
