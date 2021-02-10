const TypeTask = require('../models/type_task.model');

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacío"
    });
  }

  const typeTask = new TypeTask({
    descripcion: req.body.descripcion
  });

  TypeTask.create(typeTask, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message
      });
    else res.send(data);
  });
};

exports.finOne = (req, res) => {
  TypeTask.findById(req.params.typeTaskId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Tarea no encontrada con id ${req.params.typeTaskId}`
        });
      }
      else {
        res.status(500).send({
          message: `Error al requerir la tarea con id ${req.params.typeTaskId}`
        });
      }
    }
    else res.send(data);
  });
};

exports.finAll = (req, res) => {
  TypeTask.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message
      });
    }
    else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El conteido no debe ser vacío"
    });
  }

  TypeTask.updateById(req.params.typeTaskId, new TypeTask(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Tarea no encontrada con id ${req.params.typeTaskId}`
        });
      }
      else {
        res.status(500).send({
          message: `Error al requerir la tarea con id ${req.params.typeTaskId}`
        });
      }
    }
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  TypeTask.remove(req.params.typeTaskId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Tarea no encontrada con id ${req.params.typeTaskId}`
        });
      }
      else {
        res.status(500).send({
          message: `Error al requerir la tarea con id ${req.params.typeTaskId}`
        });
      }
    }
    else res.send({ message: `Tarea eliminada` });
  });
};

exports.deleteAll = (req, res) => {
  TypeTask.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error al requerir las tareas`
      });
    }
    else res.send({ message: `Todas las tareas eliinadas` });
  });
};
