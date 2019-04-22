const express = require('express');
const db = require('./data/db')

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Something happened.')
})

server.get('/hubs', (req, res) => {
    db.hubs
        .find()
        .then(hubs => {
            res.status(200).json(hubs)
        })
        .catch(err => {
            res.json({ error: err, message: 'Something went wrong' })
        })
})

server.post('/hubs', (req, res) => {
    const hubInfo = req.body
    db.hubs
        .add(hubInfo)
        .then(hub => {
            res.status(201).json(hub)
        })
        .catch(err => {
            res.json({ error: err, message: "You didn't do it right" })
        })
})

server.delete('/hubs/:id', (req, res) => {
    const hubId = req.params.id
    db.hubs
        .remove(hubId)
        .then(del => {
            res.status(204).end()
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: 'Error deleting the hub'
            })
        })
})

server.listen(5000, () => {
    console.log('\n*** API running on port 5000 ***\n')
})