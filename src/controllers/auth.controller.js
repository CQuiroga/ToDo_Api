const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
require('dotenv').config();

exports.registrar = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y password son requeridos' });
    }
    const existente = await Usuario.findOne({ where: { email } });
    if (existente) {
      return res.status(409).json({ mensaje: 'Email ya registrado' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await Usuario.create({ email, password: hash });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
    const valido = await bcrypt.compare(password, user.password);
    if (!valido) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', err });
  }
};
