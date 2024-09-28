const catchAsync = require('../utils/catchAsync');
const Employees = require('./../database/employee');

exports.empList = catchAsync(async (req, res, next) => {
  const empList = await Employees.find();

  res.status(200).send(empList);
});

exports.addEmp = catchAsync(async (req, res, next) => {
  //console.log('addEmp controller: ' + req.body.fullName);

  const employee = new Employees({
    fullName: req.body.fullName,
    email: req.body.email,
    jobTitle: req.body.jobTitle,
    department: req.body.department,
    hireDate: req.body.hireDate,
    contactInfo: req.body.contactInfo,
  });

  const newEmployee = await employee.save();
  res.status(200).send({ message: `${newEmployee.fullName} created` });
});

exports.emp = catchAsync(async (req, res, next) => {
  console.log('emp controller: ' + req.params.id);

  const employee = await Employees.findById(req.params.id);

  if (!employee)
    return next(new AppError('No Employee found with that ID', 404));

  res.status(200).send(employee);
});

exports.updateEmp = catchAsync(async (req, res, next) => {
  console.log('updateEmp controller: ' + req.params.id);

  const employee = {
    fullName: req.body.fullName,
    email: req.body.email,
    jobTitle: req.body.jobTitle,
    department: req.body.department,
    hireDate: req.body.hireDate,
    contactInfo: req.body.contactInfo,
  };

  Employees.findByIdAndUpdate(req.params.id, employee)
    .then(dbres =>
      res.status(200).send({ message: `${dbres.fullName} updated` })
    )
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

exports.deleteEmp = catchAsync(async (req, res, next) => {
  console.log('deleteEmp controller: ' + req.params.id);

  const dbres = await Employees.findByIdAndDelete(req.params.id);

  if (!dbres) {
    return next(new AppError('ID not found', 401));
  }
  res.status(200).send({ message: `${req.params.id}: deleted` });
});
