const path = require('path');

const notFound = (req, res) => res.sendfile(path.resolve(__dirname, '../../client/build/index.html'))

module.exports = notFound
