const fs = require('fs');
const { text } = require('stream/consumers');


// Blocking, synchronous Way
// const readFile = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// console.log(readFile)
// const textOut = `This is what we know about the avocado : ${readFile}. \nCreated on ${Date.now()}`
// fs.writeFileSync('./starter/txt/input.txt', textOut)
// console.log("File Writen");

// Non-Blocking, Asynchronous Way
fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log('Error!');

    
    fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`./starter/txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile(`./starter/txt/final.txt`, `${data2}\n${data3}`,'utf-8', (err) => {
                console.log("Your file has been written");
            })
        })
    })
})
console.log(`File had been readed`);
