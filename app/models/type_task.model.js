const sql = require('./db');

class TypeTask {
  constructor(type_task) {
    this.descripcion = type_task.descripcion;
  }

  static create = (newTypeTask, result) => {
    sql.query("INSERT INTO tipo_tareas SET ?", newTypeTask, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("Tipo Tarea creada", { id: res.insertId });
      result(null, { id: res.insertId, ...newTypeTask });
    })
  }

  static findById = (taskId, result) => {
    sql.query(`SELECT * FROM tipo_tareas WHERE id = ${taskId}`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("tipo tarea encontrada", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  }

  static getAll = result => {
    sql.query(`SELECT * FROM tipo_tareas`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("lista de tipo_tareas");
      result(null, res);
    });
  }

  static updateById = (id, type_task, result) => {
    sql.query("UPDATE tipo_tareas SET descripcion = ? WHERE id = ?",
      [type_task.descripcion, id], (err, res) => {
        if (err) {
          console.log("error", err);
          result(err, null);
          return;
        }

        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("tarea actualizada", { id: id, ...type_task });
        result(null, { id: id, ...type_task });
      });
  }

  static remove = (id, result) => {
    sql.query("DELETE FROM tipo_tareas WHERE id = ?", id, (err, res) => {
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
    sql.query("DELETE FROM tipo_tareas", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log(`${res.affectedRows} tipo_tareas eliminadas`);
      result(null, res);
    });
  }
}

module.exports = TypeTask;
