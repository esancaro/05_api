const { restart } = require("nodemon");
const employees = require("../bin/employees.json");
const Validator = require('jsonschema').Validator;
const emp_v = require('../models/employees.validator')

module.exports.list = (req, res, next) => {
  if(Object.keys(req.query).length === 0){
    // Devolverá un array JSON con el contenido del fichero "employees.json"
    res.status(200).json(employees);
  } else if("page" in req.query) {
    // Devolverá del elemento (2 * (N - 1)) al (2 * (N - 1)) + 1.
    const pos = (2 * (req.query.page - 1))
    res.status(200).json(employees.slice(pos, pos + 2));
  // } else if("user" in req.query && req.query.user === true) {
  } else if("user" in req.query && req.query.user === "true") {
    // Devolverá listado de employees con privileges == "user"
    res.status(200).json(employees.filter(x => x.privileges === "user"));
  } else if("badges" in req.query) {
    // Devolverá listado de employees que incluya "black" en el atributo "badges"
    res.status(200).json(employees.filter(x => x?.badges?.indexOf(req.query.badges) > -1));
  }
}

module.exports.findPerName = (req, res, next) => {
  const found = employees.find(x => x.name === req.params.NAME);
  if(found){
    res.status(200).json(found);
  } else {
    res.status(400).json({"code": "bad_request"});
  }
}

module.exports.getOldest = (req, res, next) => {
  // https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
  // Devolverá el objeto individual correspondiente al empleado con más edad.
  const maxAge = Math.max(...employees.map(o => o.age))
  res.status(200).json(employees.find(x => x.age === maxAge));
}

module.exports.create = (req, res, next) => {
  const v = new Validator();
  v.addSchema(emp_v.pointArray, '/PointArray');
  v.addSchema(emp_v.phone, "/Phone");
  v.addSchema(emp_v.favorite, "/Favorite");
  const validation = v.validate(req.body, emp_v.employee)
  // res.json(validation.errors)
  if(validation.errors.length === 0){
    employees.push(req.body);
    res.status(201).json(req.body);
  } else {
    res.status(400).json({"code": "bad_request"})
  }
}
