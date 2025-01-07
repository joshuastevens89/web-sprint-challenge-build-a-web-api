const express = require('express');
const helmet = require('helmet')

const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

const server = express();


server.use(helmet())
server.use(express.json())

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

//sanity check
server.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World'})
})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message})
})

module.exports = server;