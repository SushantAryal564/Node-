// const EventEmitter = require("events")
// const http = require("http")
// class sales extends EventEmitter{
//   constructor(){
//     super();
//   }
// }
// const myEmitter = new sales();

// myEmitter.on("newSale",()=>{
//   console.log("There was a new sale");
// })
// myEmitter.on("newSale",()=>{
//   console.log("customer: Sushant Aryal");
// })
// myEmitter.on("newSale", (stock) => {
//   console.log(`There are now ${stock} items left in stock.`);
// });
// myEmitter.emit("newSale",9);

//////////////////////////////////////////////

// const server = http.createServer();
// server.on('request',(req,res)=>{
//   console.log("Request, recevied")
//   console.log(req.url);
//   res.end("Request received")
// })
// server.on("request", (req, res) => {
//   console.log("Anoter request. 💥💥");
// })
// server.on('close',()=>{
//   console.log('server closed');
// })
// server.listen(8000,"127.0.0.1",()=>{
//   console.log("Waiting for request....");
// })


