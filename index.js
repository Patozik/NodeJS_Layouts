const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');

const PORT = 3000;

const app = express();

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// set layout
app.use(ejsLayouts);
app.set('layout', 'layouts/main.ejs');

//public folder
app.use(express.static('public'));

const users = [
    { id: 1, name: 'Janek', email: 'janek@gmail.com'},
    { id: 2, name: 'Adam', email: 'adam@gmail.com'},
    { id: 3, name: 'Tomasz', email: 'tomasz@gmail.com'},
    { id: 4, name: 'Dawid', email: 'dawid@gmail.com'},
];

app.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'Strona głowna',
        url: req.url,
    });
});

app.get('/kontakt', (req, res) => {
    res.render('pages/contact', {
        url: req.url,
    });
});

app.get('/profile', (req, res) => {

    res.render('pages/users', { 
        users: users,
        title: 'Użytkownicy',
        url: req.url,
    });

});

app.get('/profile/:id/:mode?', (req, res) => {

    const { id, mode } = req.params;
    const user = users.find(x => x.id === parseInt(id));
    let html;
    
    if(!user) {
        
        html = 'Nie ma takiego usera';    
       
    } else {

        html = (`Dane uzytkownika: imie "${user.name}"`);
        
        if (mode && mode === 'szczegoly'){
            html +=` id "${user.id}", email "${user.email}"`;
        } else if (mode && mode != 'szczegoly') {
            html = `Brak podstrony /${mode}`;
        }

    }

    res.render('pages/user', { 
        html: html,
        title: user?.name ?? 'Brak uzytkownika',
        url: req.url,
    });
});

app.get('*', (req, res) => {
    res.render('errors/404', {
        title: '404',
        layout: 'layouts/minimalist'
    });
});

app.listen(PORT);