'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tarea extends Model {}
  Tarea.init({
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Tarea',
    tableName: 'Tareas',
    timestamps: true
  });
  return Tarea;
};
