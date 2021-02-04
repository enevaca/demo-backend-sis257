const sql = require('./db');

class User {
  constructor(user) {
    this.usuario = user.usuario;
    this.clave = user.clave;
    this.rol = user.rol;
  }

  static create = (newUser, result) => {
    sql.query("INSERT INTO usuarios SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("Usuario creado", { id: res.insertId });
      result(null, { id: res.insertId, ...newUser });
    })
  }

  static findById = (userId, result) => {
    sql.query(`SELECT * FROM usuarios WHERE id = ${userId}`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("usuario encontrado", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  }

  static findByUserPass = (usuario, clave, result) => {
    sql.query(`SELECT * FROM usuarios WHERE usuario = '${usuario}' AND clave = '${clave}'`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("usuario encontrado", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  }

  static getAll = result => {
    sql.query(`SELECT * FROM usuarios`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("lista de usuarios");
      result(null, res);
    });
  }

  static updateById = (id, user, result) => {
    sql.query("UPDATE usuarios SET usuario = ?, clave = ?, rol = ? WHERE id = ?",
      [user.usuario, user.clave, user.rol, id], (err, res) => {
        if (err) {
          console.log("error", err);
          result(err, null);
          return;
        }

        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("usuario actualizado", { id: id, ...user });
        result(null, { id: id, ...user });
      });
  }

  static remove = (id, result) => {
    sql.query("DELETE FROM usuarios WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("usuario eliminado con id: ", id);
      result(null, res);
    });
  }

  static removeAll = result => {
    sql.query("DELETE FROM usuarios", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log(`${res.affectedRows} usuarios eliminados`);
      result(null, res);
    });
  }
}

module.exports = User;
