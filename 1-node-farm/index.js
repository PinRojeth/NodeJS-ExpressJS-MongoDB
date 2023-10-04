// const fs = require('fs');
// const { text } = require('stream/consumers');

/////////////////////////////////
/////// File

// Blocking, synchronous Way
// const readFile = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// console.log(readFile)
// const textOut = `This is what we know about the avocado : ${readFile}. \nCreated on ${Date.now()}`
// fs.writeFileSync('./starter/txt/input.txt', textOut)
// console.log("File Writen");

// Non-Blocking, Asynchronous Way
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('Error!');

//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./starter/txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile(`./starter/txt/final.txt`, `${data2}\n${data3}`,'utf-8', (err) => {
//                 console.log("Your file has been written");
//             })
//         })
//     })
// })
// console.log(`File had been readed`);

/////////////////////////////////
/////// SERVER
const { error } = require("console");
const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require('./Module')

const data = fs.readFileSync(`./starter/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const templateOverview = fs.readFileSync(
  "./starter/templates/template-overview.html",
  "utf-8"
);
const templateProduct = fs.readFileSync(
  "./starter/templates/template-product.html",
  "utf-8"
);
const templateCard = fs.readFileSync(
  "./starter/templates/template-card.html",
  "utf-8"
);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cards = dataObj.map((el) => replaceTemplate(templateCard, el));
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cards);
    res.end(output);

    // Product Page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });

    const product = dataObj[query.id]
    const output = replaceTemplate(templateProduct, product);
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello-World",
    });
    res.end("<h1>This page doesn't exist</h1>");
  }
});

const PORT = 8000;
server.listen(PORT || process.env.PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
