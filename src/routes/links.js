const express = require('express');
const router = express.Router();

const pool = require('../database');

const { isLoggedIn } = require('../lib/auth');

//registrar usuario
router.get('/add', (req, res) => {
    res.render('links/add');
})

router.post('/add', async (req, res) => {
    const { username, password, fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    await pool.query('INSERT INTO users SER ?', [newUser]);
    res.send('received');
});

//consultar usuarios
router.get('/', isLoggedIn, async(req, res) => {
    const links = await pool.query('SELECT * FROM users');
    res.render('links/list', {links});
});

//para borrar usuarios 
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE  FROM users WHERE id = ?', [id]);
    req.flash('success', 'Usuario borrado satisfactoriamente!');
    res.redirect('/links')
});

//para editar usuarios
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM users WHERE id =?', [id]);
    res.render('links/edit', {links: links[0]});
});

router.post('/edit/:id', isLoggedIn, async (re, res) => {
    const { id } = req.params;
    const { username, password, fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    await pool.query('UPDATE users SET ? WHERE id = ?', [newUser, id]);
    req.flash('success', 'Usuario Editado satisfactoriamente!');
    res.redirect('/links');
});

module.exports = router;