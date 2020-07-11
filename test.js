var jwt = require('jsonwebtoken');
var token = jwt.sign({ basith: 'basith' }, 'shhhhh');
console.log(token);
