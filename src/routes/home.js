const express = require('express');
const router = express.Router();
const objectAssign = require('object-assign');
const objectAssignDeep = require(`object-assign-deep`);
const extender = require(`object-extender`);

const pool = require('../database');


router.get('/', (req, res) => {
    res.render('home/home');
});

// form1 for Empresa Extranjera y vuelo

router.get('/add1', (req, res) => {
    res.render('home/add1');
});

router.post('/add1', async (req, res) => {
    const { codigo_empresa, nombre_empresa, codigo_vuelo, fecha_salida, fecha_llegada } = req.body;
    const Empresas_Extranjeras  = {
        codigo_empresa,
        nombre_empresa
    }
    const Vuelo = {
        codigo_vuelo,
        fecha_salida,
        fecha_llegada
    };
    await pool.query('INSERT INTO Vuelo SET ?', [Vuelo]);
    await pool.query('INSERT INTO Empresas_Extranjeras SET ?', [Empresas_Extranjeras]);
    req.flash('success', 'SE A GUARDADO CORRECTAMENTE');
    res.redirect('add2');
})

// form2 for articulo y pedidos

router.get('/add2', (req, res) => {
    res.render('home/add2');
});

router.post('/add2', async (req, res) => {
    const { codigo_pedido, codigo_articulo, nombre_articulo, cantidad_articulo, peso } = req.body;
    const Articulo = {
        codigo_articulo,
        nombre_articulo,
        peso
    };
    const Pedido = {
        codigo_pedido,
        cantidad_articulo
    }
    await pool.query('INSERT INTO Articulo SET ?', [Articulo]);
    await pool.query('INSERT INTO Pedido SET ?', [Pedido]);
    req.flash('success', 'SE A GUARDADO CORRECTAMENTE');
    res.redirect('profile');
})

// form3 clientes

router.get('/add3', (req, res) => {
    res.render('home/add3');
});

router.post('/add3',async  (req, res) => {
    const { codigo_empresa_cliente, nombre_empresa_cliente, fecha_envio, fecha_recibido, tipo_envio } = req.body;
    const Clientes = {
        codigo_empresa_cliente,
        nombre_empresa_cliente,
        fecha_envio,
        fecha_recibido,
        tipo_envio
    }
    await pool.query('INSERT INTO Clientes SET ?', [Clientes]);
    req.flash('success', 'SE A GUARDADO CORRECTAMENTE');
    res.redirect('profile');
})


// HOME
router.get('/home', (req, res) => {
    res.render('home/home')
});

router.get('/profile', (req, res) => {
    res.render('home/profile')
});


// MOSTRAR compras

router.get('/listCompra', async (req, res) => {
    const EmpresasL = await pool.query('SELECT * FROM Empresas_Extranjeras');
    const VueloL = await pool.query('SELECT codigo_vuelo FROM Vuelo');
    const ArticuloL = await pool.query('SELECT * FROM Articulo');
    const PedidoL = await pool.query('SELECT * FROM Pedido');
    const Fecha = JSON.stringify(await pool.query('SELECT fecha_salida, fecha_llegada FROM Vuelo'));
    const FechaS = JSON.parse(Fecha);
    const JsonUnido = extender.mergeInto(EmpresasL, VueloL, ArticuloL, PedidoL, FechaS);
    res.render('home/listCompra', { JsonUnido });
});


// MOSTRAR VENTAS
router.get('/listVentas', async (req, res) => {
    const ClientesL = await pool.query('SELECT * FROM Clientes');
    res.render('home/listVentas', { ClientesL });
});


// EDICION EMPRESA EXTANJERA

router.get('/edit/empresa/:id', async (req, res) => {
    const { id } = req.params;
    const link1 = await pool.query('SELECT * FROM Empresas_Extranjeras WHERE id = ?', [id]);
    res.render('home/edit1', {link1: link1[0]});
});

router.post('/edit/empresa/:id', async (req, res) => {
    const { id } = req.params;
    const { codigo_empresa, nombre_empresa } = req.body;
    const newEmpresa = {
        codigo_empresa,
        nombre_empresa
    };
    await pool.query('UPDATE Empresas_Extranjeras set ?', [newEmpresa]);
    req.flash('success', 'SE A ACTUALIZADO CORRECTAMENTE');
    res.redirect('/home/listCompra');
});

// EDICION VUELO

router.get('/edit/vuelo/:id', async (req, res) => {
    const { id } = req.params;
    const link2 = await pool.query('SELECT * FROM Vuelo WHERE id = ?', [id]);
    res.render('home/edit2', { link2: link2[0]});
});

router.post('/edit/vuelo/:id', async (req, res) => {
    const { id } = req.params;
    const { codigo_vuelo, fecha_salida, fecha_llegada } = req.body;
    const newVuelo = {
        codigo_vuelo,
        fecha_salida,
        fecha_llegada
    };
    await pool.query('UPDATE Vuelo set ?', [newVuelo]);
    req.flash('success', 'SE A ACTUALIZADO CORRECTAMENTE');
    res.redirect('/home/listCompra');
});


// EDICION ARTICULO

router.get('/edit/articulo/:id', async (req, res) => {
    const { id } = req.params;
    const link3 = await pool.query('SELECT * FROM Articulo WHERE id = ?', [id]);
    res.render('home/edit3', { link3: link3[0] });
});
router.post('/edit/articulo/:id', async (req, res) => {
    const { id } = req.params;
    const { codigo_articulo, nombre_articulo, peso } = req.body;
    const newArticulo = {
        codigo_articulo,
        nombre_articulo,
        peso
    };
    await pool.query('UPDATE Articulo set ?', [newArticulo]);
    req.flash('success', 'SE A ACTUALIZADO CORRECTAMENTE');
    res.redirect('/home/listCompra');
});

// EDICION Pedido

router.get('/edit/pedido/:id', async (req, res) => {
    const { id } = req.params;
    const link4 = await pool.query('SELECT * FROM Pedido WHERE id = ?', [id]);
    res.render('home/edit4', { link4: link4[0] });
});
router.post('/edit/pedido/:id', async (req, res) => {
    const { id } = req.params;
    const { codigo_pedido, cantidad_articulo } = req.body;
    const newPedido = {
        codigo_pedido,
        cantidad_articulo
    };
    await pool.query('UPDATE Pedido set ?', [newPedido]);
    req.flash('success', 'SE A ACTUALIZADO CORRECTAMENTE');
    res.redirect('/home/listCompra');
});

// EDICION Clientes

router.get('/edit/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const link5 = await pool.query('SELECT * FROM Clientes WHERE id = ?', [id]);
    res.render('home/edit5', { link5: link5[0] });
});
router.post('/edit/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { codigo_empresa_cliente, nombre_empresa_cliente, fecha_envio, fecha_recibido, tipo_envio  } = req.body;
    const newClientes = {
        codigo_empresa_cliente,
        nombre_empresa_cliente,
        fecha_envio,
        fecha_recibido,
        tipo_envio
    };
    await pool.query('UPDATE Clientes set ?', [newClientes]);
    req.flash('success', 'SE A ACTUALIZADO CORRECTAMENTE');
    res.redirect('/home/listVentas');
});



module.exports = router;