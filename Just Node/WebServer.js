const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");
// const slugify = require("slugify");
///////////////////
//Files

//////////////////
//Server
// const server = http.createServer((req, res) => {
//   console.log(req);
//   res.end("hello from the server");
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to request on port 8000");
// });

//////////////////////////////////////////////

// const data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
// const dataObj = JSON.parse(data);
// const server = http.createServer((req, res) => {
//   const url = req.url;
//   console.log(url);
//   if (url === "/" || url == "/overview") {
//     res.end("Welcome to overview");
//   } else if (url === "/products") {
//     res.end("Welcome to products");
//   } else if (url == "/api") {
//     // fs.readFile(`${__dirname}/data.json`, "utf-8", (err, data) => {
//     //   const productData = JSON.parse(data);
//     //   res.writeHead(200, { "content-type": "application/json" });
//     //   res.end(data);
//     // });
//     res.end(data);
//   } else {
//     res.writeHead(404, {
//       "content-type": "text/html",
//       "my-own-header": "hello world",
//     });
//     res.end("Page Not Found");
//   }
// });
// server.listen(8000, "127.0.0.1", () => {
//   console.log("You are currently listening to port 8000");
// });

const data = fs.readFileSync(`${__dirname}/data.json`);
const dataObject = JSON.parse(data);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-cart.html`,
  "utf-8"
);

// const replaceTemplate = (temp, product) => {
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id);
//   if (!product.organic)
//     output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
//   return output;
// };
const slug = dataObject.map((el) => slugify(el.productName, { lower: true }));
console.log(slug);
const server = http.createServer((req, res) => {
  // const pathName = req.url;
  // console.log(url.parse(req.url, true));
  const { query, pathname: pathName } = url.parse(req.url, true);
  // console.log(query, pathName);
  // Overview Page
  if (pathName == "/" || pathName == "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const cardHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace(`{% PRODUCT_CARDS %}`, cardHtml);
    res.end(output);
  }

  // Product Page
  else if (pathName == "/products") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const product = dataObject[query.id];
    console.log(product);
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }

  // API Page
  else if (pathName == "/api") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "Hello world",
    });
    res.end("Page cannot be found.");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("You are currently listening to port 8000");
});
