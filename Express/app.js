const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) Middelware

app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware.👋🏼');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// 2)
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tour.length,
    data: {
      tour,
    },
  });
};

const getTour = (req, res) => {
  const requiredId = +req.params.id;
  console.log(requiredId);
  const requiredtour = tour.find((tou) => tou.id == requiredId);
  if (!requiredtour) {
    res.status(404).json({
      status: 'Fail',
      data: {
        message: 'Invalid Id',
      },
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      requiredtour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tour[tour.length - 1].id + 1;
  const newtour = Object.assign({ id: newId }, req.body);
  tour.push(newtour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tour),
    'utf-8',
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          addedData: newtour,
        },
      });
    }
  );
};
const updateTour = (req, res) => {
  if (req.params.id * 1 > tour.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tours: '<Updated tour here>',
    },
  });
};

const deleteTour = (req, res) => {
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
};
const tour = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).get(updateTour).get(deleteTour);

app.listen(3000, () => {
  console.log('Listening to the port 3000');
});
