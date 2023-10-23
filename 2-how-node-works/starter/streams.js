const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1 (It work well for something small)
  fs.readFile("test-file.txt", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.end(data);
  });

  // Solution 2 : Streams
//   const readable = fs.createReadStream("twweqweest-file.txt");
//   readable.on("data", (chunk) => {
//     res.write(chunk);
//   });

//   readable.on("end", () => {
//     res.end();
//   });

//   readable.on("error", (err) => {
//     console.log(err);
//     res.statusCode = 500;
//     res.end("File not Found!");
//   });

  //Solution 3 
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writeableDestination)
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
