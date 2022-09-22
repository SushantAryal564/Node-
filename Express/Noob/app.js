const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Hello from the server',
//     app: 'Natours',
//   });
// });
// app.post('/', (req, res) => {
//   res.send('You can post here ......');
// });

// app.listen(3000, () => {
//   console.log('App running in the port 3000');
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
// GET Request
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});
// POST request
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  // res.send('Done');
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile('newTour.json', JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
});
// URL parameter GET request
app.get('/api/v1/tours/:id/:y?', (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});
// Patch
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here..>',
    },
  });
});
// Delete request
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
app.listen(3000, () => {
  console.log('You are currently listening to the port 3000');
});
