import express, { Application, Request, Response } from 'express'
import { filterImageFromURL } from './util/util'

(async () => {
    const app: Application = express()
    const port = process.env.PORT || 8082

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.get('/', (req: Request, res: Response) => {
        res.send(`Try GET /filteredimage?image={{}}`)
    })

    app.get('/filteredimage', async (req: Request, res: Response) => {
        let { image_url } = req.query as any

        if (!image_url) {
            return res.status(400)
                .send(`Invalid URL or no image URL provided`)
        }

        filterImageFromURL(image_url).then(filteredpath => {
            res.status(200)
                .sendFile(filteredpath)
        })
    })

    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`)
    })
})()