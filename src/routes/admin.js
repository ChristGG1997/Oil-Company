const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const objectAssign = require('object-assign');
const objectAssignDeep = require(`object-assign-deep`);
const { route } = require('./home');
const { Router } = require('express');


// Login

router.get('/signin', (req, res) => {
    res.render('auth/signin')
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/home/profile',
        failureRedirect: '/signin',
        failureFlash: true
    }) (req, res, next);
});


// Login ADMIN

router.get('/signinAdmin', (req, res) => {
    res.render('auth/signinAdmin')
});

router.post('/signinAdmin', (req, res, next) => {
    passport.authenticate('local.signinAdmin', {
        successRedirect: '/auth/profileAdmin',
        failureRedirect: '/signinAdmin',
        failureFlash: true
    })(req, res, next);
});

//profile admin

router.get('/auth/profileAdmin', (req, res) => {
    res.render('auth/profileAdmin')
});

//listar admin
router.get('/listDel', async (req, res) => {
    const EmpresasL = await pool.query('SELECT * FROM Empresas_Extranjeras');
    const VueloL = await pool.query('SELECT codigo_vuelo FROM Vuelo');
    const ArticuloL = await pool.query('SELECT * FROM Articulo');
    const PedidoL = await pool.query('SELECT * FROM Pedido');
    const ClientesL = await pool.query('SELECT * FROM Clientes');
    const Fecha = JSON.stringify(await pool.query('SELECT fecha_salida, fecha_llegada FROM Vuelo'));
    const FechaS = JSON.parse(Fecha);
    const Fecha1 = JSON.stringify(await pool.query('SELECT fecha_envio, fecha_recibido FROM Clientes'));
    const FechaC = JSON.parse(Fecha1);
    const JsonUnido = objectAssignDeep(EmpresasL, VueloL, ArticuloL, PedidoL, ClientesL, FechaS, FechaC);
    res.render('auth/listDel', { JsonUnido });
});

//Eliminar lista
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE Empresas_Extranjeras FROM Empresas_Extranjeras WHERE id = ?', [id]);
    await pool.query('DELETE Vuelo FROM Vuelo WHERE id = ?', [id]);
    await pool.query('DELETE Articulo FROM Articulo WHERE id = ?', [id]);
    await pool.query('DELETE Pedido FROM Pedido WHERE id = ?', [id]);
    await pool.query('DELETE Clientes FROM Clientes WHERE id = ?', [id]);
    res.redirect('/listDel');
});

// LISTAR USUARIOS
router.get('/listUsers', async (req, res) => {
    const listUsers = await pool.query('SELECT * FROM Users');
    res.render('auth/listUsers', { listUsers });
});

//Registro
router.get('/signup', (req, res) => {
    res.render('auth/signup')
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/auth/profileAdmin',
    failureRedirect: '/signup',
    failureFlash: true
}));

// Perfil
router.get('/home/profile', (req, res) => {
    res.render('home/profile');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
})

module.exports = router;