
const products = require('./product')
const category = require('./category')
const account = require('./account')
const cart = require('./cart')
const order = require('./order')
const rated = require('./rated')

function route(app) {
    app.use('/api/products', products)
    app.use('/api/category', category)
    app.use('/api/account', account)
    app.use('/api/cart', cart)
    app.use('/api/order', order)
    app.use('/api/rated', rated)
}

module.exports = route
