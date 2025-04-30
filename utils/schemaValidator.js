const _ = require("lodash");
const jsonschema = require("jsonschema");
const { Validator } = jsonschema;
const validator = new Validator();

const schemaValidator = (schemas) => (req, res, next) => {
  let errorMessage;

  _.forEach(schemas, (schema, key) => {
    const result = validator.validate(req[key], schema);
    if (!result.valid) {
      const error = result.errors[0];
      errorMessage = `${error.stack} in request.${key}`;
      return false; // Stop further validation checks
    }
  });

  if (errorMessage) {
    return res.status(400).json({ error: errorMessage });
  }

  next();
};

module.exports = schemaValidator;
