const server = require('./api/server');
const PORT = process.env.PORT || 9000;

server.use('*', (req, res) => {
    res.send(`<h1> Hello </h1>`)
})
server.listen(PORT, () => {
    console.log('server is running on port: 9000')
})