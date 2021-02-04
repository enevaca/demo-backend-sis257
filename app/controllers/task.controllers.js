const Task = require('../models/task.model');

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacío"
    });
  }

  const task = new Task({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion
  });

  Task.create(task, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message
      });
    else res.send(data);
  });
};

exports.finOne = (req, res) => {
  Task.findById(req.params.taskId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Tarea no encontrada con id ${req.params.taskId}`
        });
      }
      else {
        res.status(500).send({
          message: `Error al requerir la tarea con id ${req.params.taskId}`
        });
      }
    }
    else res.send(data);
  });
};

exports.finAll = (req, res) => {
  Task.getAll((err, data) => {
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

  Task.updateById(req.params.taskId, new Task(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Tarea no encontrada con id ${req.params.taskId}`
        });
      }
      else {
        res.status(500).send({
          message: `Error al requerir la tarea con id ${req.params.taskId}`
        });
      }
    }
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  Task.remove(req.params.taskId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Tarea no encontrada con id ${req.params.taskId}`
        });
      }
      else {
        res.status(500).send({
          message: `Error al requerir la tarea con id ${req.params.taskId}`
        });
      }
    }
    else res.send({ message: `Tarea eliminada` });
  });
};

exports.deleteAll = (req, res) => {
  Task.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error al requerir las tareas`
      });
    }
    else res.send({ message: `Todas las tareas eliinadas` });
  });
};
