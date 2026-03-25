const service = require('../services/artworksService')

const getAll = (req, res) => {
    const { title } = req.query
    res.json(service.findAll(title))
}

const getOne = (req, res) => {
    const id = parseInt(req.params.id)

    const card = service.findOne(id)

    if (!card)
        return res.status(404).json({ error: "Not found" })

    res.json(card)
}

const create = (req, res) => {
    const { src, title, text } = req.body

    if (!src || !title || !text)
        return res.status(400).json({ error: "Missing fields" })

    const card = service.create({ src, title, text })

    res.status(201).json(card)
}

const update = (req, res) => {
    const id = parseInt(req.params.id)

    const card = service.update(id, req.body)

    if (!card)
        return res.status(404).json({ error: "Not found" })

    res.json(card)
}

const remove = (req, res) => {
    const id = parseInt(req.params.id)

    const ok = service.remove(id)

    if (!ok)
        return res.status(404).json({ error: "Not found" })

    res.status(204).send()
}

module.exports = { getAll, getOne, create, update, remove }
