const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Employees = mongoose.model(
  'employees',
  new Schema({
    id: ObjectId,
    fullName: 'string',
    email: 'string',
    jobTitle: 'string',
    department: 'string',
    hireDate: 'date',
    contactInfo: 'string',
  })
);

module.exports = Employees;
