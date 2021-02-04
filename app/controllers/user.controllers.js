const User = require('../models/user.model');
const { SECRET_KEY } = require('../config/config')

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacío"
    });
  }

  const user = new User({
    usuario: req.body.usuario,
    clave: require('crypto').createHmac('sha256', SECRET_KEY).update(req.body.clave).digest('hex'),
    rol: req.body.rol
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message
      });
    else res.send(data);
  });
};

exports.finOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Usuario no encontrado con id ${req.params.userId}`
        });
      }
      else {
        res.status(500).send({
          message: `Error al requerir el usuario con id ${req.params.userId}`
        });
      }
    }
    else res.send(data);
  });
};

exports.finValidate = (req, res) => {
  User.findByUserPass(req.params.userName, req.params.userPass, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Usuario no encontrado ${req.params.userName}`
        });
      }
      else {
        res.status(500).send({
          message: `Error al requerir el usuario ${req.params.userName}`
        });
      }
    }
    else res.send(data);
  });
};

exports.finAll = (req, res) => {
  User.getAll((err, data) => {
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

  req.body.clave = require('crypto').createHmac('sha256', SECRET_KEY).update(req.body.clave).digest('hex');
  
  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Usuario no encontrado con id ${req.params.userId}`
        });
      }
      else {
        res.status(500).send({
          message: `Error al requerir la usuario con id ${req.params.userId}`
        });
      }
    }
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Usuario no encontrado con id ${req.params.userId}`
        });
      }
      else {
        res.status(500).send({
          message: `Error al requerir el usuario con id ${req.params.userId}`
        });
      }
    }
    else res.send({ message: `Usuario eliminado` });
  });
};

exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error al requerir los usuarios`
      });
    }
    else res.send({ message: `Todos los usuarios eliinados` });
  });
};
