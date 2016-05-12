var seneca = require('seneca')()
seneca.use('entity')

var product = seneca.make('product')
product.name = 'Lenovo'
product.price = '33293'

product.save$(console.log);
