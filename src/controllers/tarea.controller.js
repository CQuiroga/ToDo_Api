const { Tarea } = require('../models');

exports.listar = async (req, res) => {
  try {
    const tareas = await Tarea.findAll({ order: [['id', 'ASC']] });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar tareas', error });
  }
};

exports.obtener = async (req, res) => {
  try {
    const id = req.params.id;
    const tarea = await Tarea.findByPk(id);
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener tarea', error });
  }
};

exports.crear = async (req, res) => {
  try {
    const { titulo } = req.body;
    if (!titulo) return res.status(400).json({ mensaje: 'El título es obligatorio' });
    const nueva = await Tarea.create({ titulo });
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear tarea', error });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const [filasActualizadas, [tareaActualizada]] = await Tarea.update(
      req.body,
      {
        where: { id },
        returning: true
      }
    );
    if (filasActualizadas === 0) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json(tareaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar tarea', error });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const filasBorradas = await Tarea.destroy({ where: { id } });
    if (filasBorradas === 0) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar tarea', error });
  }
};
