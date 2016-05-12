require('seneca')()
  .client()
  .act('role:math,operation:subtract,left:5,right:12',console.log)
