module.exports = function math(options){


this.add('role:math,operation:subtract',function subtract(msg,respond){

  respond(null,{answer:msg.left - msg.right});;
});

function init(msg,respond)
{
  respond("Initializing");
}


}
