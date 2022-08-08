const fs = require('fs');
const http = require('http')
const url = require('url')
const replaceTemplate = require('./modules/replaceTemplate');

///////////////////
//Files

//////////////////
//Server
// const server = http.createServer((req,res)=>{
//   console.log(req);
//   res.end("hello from the server")
// });

// server.listen(8000,'127.0.0.1', ()=>{
//   console.log("Listening to request on port 8000")
// })
// const server = http.createServer((req,res)=>{
//   const pathname = req.url;
//   if(pathname === '/' || pathname === "/overview"){
//   res.end("This is the overview");
//   }else if (pathname == "/products"){
//     res.end("This is products")
//   }else{
//     res.writeHead(404,{
//       'Content-type':'text/html',
//       'my-own-header':'hello world',
//     });
//     res.end("<h1>Page not found!</h1>")
//   }

// })
// server.listen(8000,"127.0.0.1",()=>{
//   console.log("Listening to request on port 8000");
// });

const data = fs.readFileSync(`${__dirname}/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-cart.html`,'utf-8');

const server = http.createServer((req,res)=>{
  const {query, pathname} = url.parse(req.url, true);
  if(pathname == "/" || pathname == "/overview"){
    const cardsHTML = dataObj.map(el=>replaceTemplate(tempCard,el)).join('');
    console.log(cardsHTML);
    const newTempOverview = tempOverview.replace("{% PRODUCT_CARDS %}", cardsHTML);
    res.end(newTempOverview)
  }
  else if(pathname == "/products"){
    const product = dataObj[query.id];
    res.writeHead(200,{'content-type':'text/html'});
    const output = replaceTemplate(tempProduct,product);
    res.end(output)
  }
  else if(pathname == "/api"){
    res.end(data)
  }
  else{
    res.writeHead(404,{'content-type':'text/html', 'my-own-header':'Hello world'})
    res.end("<h1>Page cannot be found.</h1>")
  }
})
server.listen(8000,"127.0.0.1",()=>{
  console.log("Listening for the request.");
})


