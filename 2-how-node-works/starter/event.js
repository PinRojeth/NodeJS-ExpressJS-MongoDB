const EventEmitter = require("events");

class Sale extends EventEmitter {
    constructor() {
        super();
    }
}

const myEmitter = new Sale();
myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});
myEmitter.on("newSale", () => {
  console.log("Customer name : Rozet");
});

myEmitter.on('newSale', stock => {
    console.log(`There are now ${stock} items left in stock`)
})

myEmitter.emit("newSale", 9);


///////////////////////////////////

const http = require('http')

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('Request received')
    console.log(req.url);
    res.end('Request received');
})
server.on('request', (req, res) => {
    console.log('Another Request');
})
server.on('close', () => {
    console.log('Server closed');
})

server.listen(8000, () => {
    console.log("Server is running on Port 8000");
})