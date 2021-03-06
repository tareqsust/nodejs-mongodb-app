require.paths.unshift(__dirname); //make local paths accecible
//  require('filename')  // include file - filename is without '.js' extention!!!

var sys = require('sys');   // allaws to write to application streams (write to log)
var http = require('http'); // allaws to create http server
var mongo = require('mongodb');  //load double teplate module
var app = require('serving').app;

db = new mongo.Db(app.database.name, new mongo.Server(app.database.host, app.database.port, {}), {});
db.addListener("error", function(error) { sys.puts("Error connecting to mongo -- perhaps it isn't running?"); });

db.open(function(p_db)
{
  //var app = new App();
  app.init(db, 
  function()
  {
   var server_handler_function=app.dynamicallyCreateServerHandlerFunction();
   http.createServer(server_handler_function).listen(app.server.port);
   sys.puts((new Date).toTimeString()+' Server running at http://127.0.0.1:'+app.server.port+'/');
  });
});

// exit if any js file or template file is changed.
// this script encapsualated in a batch while(true); so it runs again after exit.
var autoexit_watch=require('deps/nodejs-autorestart/autoexit').watch;
autoexit_watch(__dirname,".js");
autoexit_watch(__dirname+"/templates",".html");
