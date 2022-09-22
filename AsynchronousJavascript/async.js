const fs = require('fs');
// const { clearLine } = require('readline');
const superagent = require('superagent');
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body);
//       fs.writeFile('dog-image.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image saved to file');
//       });
//     });
// });

//////////////////////////////////////////////////
const readFileProm = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('Cannot find the file');
      resolve(data);
    });
  });
};
const writeFileProm = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('cannot write a file');
      resolve('Success');
    });
  });
};
// readFileProm(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then(res => {
//     console.log(res.body.message);
//     return writeFileProm('dog-image.txt', res.body.message)
//       .then(() => {
//         console.log('Random dog image saved to file');
//       })
//       .catch(err => {
//         console.log(err.message);
//       });
//   });

///////////////////////////////////////////////
// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//   if (err) return console.log(err.message);
//   console.log(`Breed: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//       console.log(res.body);
//       fs.writeFile('dog-img.txt', res.body.message, error => {
//         console.log('Random dog image saved to file!');
//       });
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
// });
////////////////////////////////////////////////
const getDogImage = async () => {
  try {
    const data = await readFileProm(`${__dirname}/dog.txt`);
    const res1pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1pro, res2pro, res3pro]);
    const img = all.map(el => el.body.message);
    console.log(img);
    await writeFileProm(`dog-imageasync.txt`, img.join('\n'));
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: READY';
};
// const x = getDogImage();
// console.log(x);
// getDogImage()
//   .then(x => {
//     console.log(x);
//   })
//   .catch(err => {
//     console.log(`Error 💥💥`);
//   });
// console.log(`3: Done getting dog pics`);
(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogImage();
    console.log(x);
    console.log('3: Done getting dog pics');
  } catch (err) {
    console.log('Error');
  }
})();
