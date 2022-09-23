const fs = require('fs');

const tour = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, value) => {
  console.log(`Tour id is: ${value}`);
  if (req.params.id * 1 > tour.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    res.status(400).json({
      status: 'Fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
  const requiredId = +req.params.id;
  console.log(requiredId);
  const requiredtour = tour.find((tou) => tou.id == requiredId);
  res.status(200).json({
    status: 'success',
    data: {
      requiredtour,
    },
  });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours: '<Updated tour here>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
