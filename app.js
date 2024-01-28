const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { connection } = require('./utils/db')
const app = express()
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(expressLayouts)


connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
});


app.get('/', (req, res) => {
    
    connection.query('SELECT * FROM project', (error, results, fields) => {
        if (error) throw error;
        var project = Object.values(JSON.parse(JSON.stringify(results)));
       
        res.render('home', { 
            layout : 'header',
            project
         });
      });
     
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        layout : 'header'
    })
})

app.get('/insert', (req, res) => {
    res.render('insert', {
        layout : 'header'
    })
})

app.post('/insert', (req, res) => {
    var query = connection.query('INSERT INTO project SET ?', req.body, (error, results, fields) => {
        if (error) throw error;
      });
      query.sql;
      res.redirect('/insert')
    
})

app.listen(port, ()=> {
    console.log(`Mongo Contact App`)
})

