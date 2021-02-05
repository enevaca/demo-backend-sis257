const express = require('express');
const jwt = require('jsonwebtoken');
const { withJWTAuthMiddleware } = require('express-kun');
const { SECRET_TOKEN } = require('../config/config');

const router = express.Router();
const protectedRouter = withJWTAuthMiddleware(router, SECRET_TOKEN);

const users = require('../controllers/user.controllers');

// router.get('/', (req, res) => {
//     res.send('API Tasks ok')
// });

// const authenticationToken = ((req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(401).send({ message: 'Token no proveída' });
//     }
//     jwt.verify(token, SECRET_TOKEN, (err, authData) => {
//         if (err) {
//             return res.status(403).send({ message: 'Token inválido' });
//         }
//         req.authData = authData;
//         next();
//     });
// });

protectedRouter.post('/', users.create);

protectedRouter.get('/', users.finAll);

protectedRouter.get('/:userId', users.finOne);

protectedRouter.get('/:userName/:userPass', users.finValidate);

protectedRouter.put('/:userId', users.update);

protectedRouter.delete('/:userId', users.delete);

protectedRouter.delete('/', users.deleteAll);

router.post('/generateAccessToken', (req, res) => {
  if (req.body.usuario === "noel" && req.body.contrasena === "hola1234") {
    const payload = {
      username: req.body.usuario,
      chekc: true
    };
    const token = jwt.sign(payload, SECRET_TOKEN, {
      expiresIn: '15d' // 5 minutos
    });
    res.send({
      message: 'Autenticación correcta',
      token: token
    });
  }
  else {
    res.status(401).send({ message: 'Usuario o contraseña incorrectos' });
  }
});

module.exports = router;
