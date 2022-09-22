const fs = require('fs');
const user = JSON.parse(
  fs.readFileSync(`${__dirname}/../../../dev-data/data/users.json`)
);
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
exports.updateUser = (req, res) => {
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
