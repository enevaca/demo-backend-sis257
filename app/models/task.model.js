const sql = require('./db');

class Task {
  constructor(task) {
    this.nombre = task.nombre;
    this.descripcion = task.descripcion;
  }

  static create = (newTask, result) => {
    sql.query("INSERT INTO tareas SET ?", newTask, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("Tarea creada", { id: res.insertId });
      result(null, { id: res.insertId, ...newTask });
    })
  }

  static findById = (taskId, result) => {
    sql.query(`SELECT * FROM tareas WHERE id = ${taskId}`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("tarea encontrada", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  }

  static getAll = result => {
    sql.query(`SELECT * FROM tareas`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("lista de tareas");
      result(null, res);
    });
  }

  static updateById = (id, task, result) => {
    sql.query("UPDATE tareas SET nombre = ?, descripcion = ? WHERE id = ?",
      [task.nombre, task.descripcion, id], (err, res) => {
        if (err) {
          console.log("error", err);
          result(err, null);
          return;
        }

        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("tarea actualizada", { id: id, ...task });
        result(null, { id: id, ...task });
      });
  }

  static remove = (id, result) => {
    sql.query("DELETE FROM tareas WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("tarea eliminada con id: ", id);
      result(null, res);
    });
  }

  static removeAll = result => {
    sql.query("DELETE FROM tareas", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log(`${res.affectedRows} tareas eliminadas`);
      result(null, res);
    });
  }
}

module.exports = Task;
