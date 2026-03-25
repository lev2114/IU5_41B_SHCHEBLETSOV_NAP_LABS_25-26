const fileService = require('./fileService')

let dataFilePath

const init = (filePath) => {
    dataFilePath = filePath
}

const findAll = (title) => {
    const data = fileService.readData(dataFilePath)

    if (title) {
        return data.filter(item =>
            item.title.toLowerCase().includes(title.toLowerCase())
        )
    }

    return data
}

const findOne = (id) => {
    const data = fileService.readData(dataFilePath)
    return data.find(item => item.id === id)
}

const create = (card) => {
    const data = fileService.readData(dataFilePath)

    const newId = data.length
        ? Math.max(...data.map(x => x.id)) + 1
        : 1

    const newCard = { id: newId, ...card }

    data.push(newCard)

    fileService.writeData(dataFilePath, data)

    return newCard
}

const update = (id, card) => {
    const data = fileService.readData(dataFilePath)

    const index = data.findIndex(x => x.id === id)

    if (index === -1) return null

    data[index] = { ...data[index], ...card }

    fileService.writeData(dataFilePath, data)

    return data[index]
}

const remove = (id) => {
    const data = fileService.readData(dataFilePath)

    const filtered = data.filter(x => x.id !== id)

    if (filtered.length === data.length) return false

    fileService.writeData(dataFilePath, filtered)

    return true
}

module.exports = { init, findAll, findOne, create, update, remove }
