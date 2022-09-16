const fs = require("fs");
// Synchronous Blocking way
// const textIn = fs.readFileSync("note.txt", "utf-8");
// const textOut = `This is what we know about the node.js: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync("output.txt", textOut);
// console.log("File written!");

// Non Blocking, asynchronous way
// fs.readFile("./txt/starts.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("Error");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       fs.writeFile(
//         `./txt/writtenFile.txt`,
//         `${data2}\n${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("Your file has been readen");
//         }
//       );
//     });
//   });
// });
// console.log("Will read file ");
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("Error cannot find start.txt");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    if (err) return console.log(`Cannot find ${data1}`);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      fs.writeFile("./txt/writtenOutput.txt", `${data2}\n\n${data3}`, (err) => {
        if (err) return console.log("Failed to copy the file.");
      });
    });
  });
});
console.log("Your file has been written");
