const handleValidationError = (err, res) => {
    let errors = err.errors.map((el) => el.message);
    if (errors.length > 1) {
      const manyErrors = errors.join("; ");
      res.status(400).send({ messages: manyErrors });
    } else {
      res.status(400).send({ messages: errors });
    }
  };

  const typeError = (err, req, res, next) => {   //all parameters are necessary, even if not used
    if (
      err.name === "SequelizeValidationError" ||   //from validation
      err.name === "SequelizeUniqueConstraintError"  //because not unique
    ) {
      handleValidationError(err, res);
    } else {
      res.status(500).send({ msg: "A problem occurred",err });
    }
  };
  
  module.exports = { typeError };
  