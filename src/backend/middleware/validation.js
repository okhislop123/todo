const checkRequireId = Model => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await Model.findById(id);
      if (result) {
        next();
      }
    } catch (err) {
      res.status(404).send({
        message: 'ID not found',
      });
    }
  };
};
const checkRequireName = (req, res, next) => {
  try {
    const { name } = req.body;
    if (name.length >= 5 && name.length <= 30) {
      next();
    } else {
      res.status(404).send({
        message: 'Name length from 5 to 30 characters',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err,
    });
  }
};
const checkExitsName = Model => {
  return async (req, res, next) => {
    try {
      const { name } = req.body;
      const result = await Model.findOne({ name });
      if (!result) {
        next();
      }else{
        res.status(404).send({
          message: 'Todo name already exists',
        });
      }
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  };
};
module.exports = {
  checkRequireId,
  checkRequireName,
  checkExitsName,
};
