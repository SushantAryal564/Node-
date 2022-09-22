const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
// MiddleWare
app.use(morgan('dev'));

app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello form the middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// Route Handler
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`)
);
const user = JSON.parse(
  fs.readFileSync(`${__dirname}/../../dev-data/data/users.json`)
);
const getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    requested_At: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};
const createTour = (req, res) => {
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
};
const getTourparam = (req, res) => {
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
};
const updateTour = (req, res) => {
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
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
const updateUser = (req, res) => {
  const id = req.params.id * 1;
  if (id > user.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      user: '<updating user>',
    },
  });
};

// Routes
// // GET Request
// app.get('/api/v1/tours', getTour);
// // POST request
// app.post('/api/v1/tours', createTour);
// // URL parameter GET request
// app.get('/api/v1/tours/:id/:y?', getTourparam);
// // Patch
// app.patch('/api/v1/tours/:id', updateTour);
// // Delete request
// app.delete('/api/v1/tours/:id', deleteTour);
const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
tourRouter.route('/').get(getTour).post(createTour);
tourRouter.route('/:id').patch(updateTour).delete(deleteTour);
tourRouter.route('/:id:y?').get(getTourparam);
const userRouter = express.Router();
app.use('/api/v1/users', userRouter);
userRouter.route('/').get(getUser);
userRouter.route('/:id').patch(updateUser);

app.listen(3000, () => {
  console.log('You are currently listening to the port 3000');
});
