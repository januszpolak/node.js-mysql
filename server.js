const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');


let app = express();
//app.use(bodyParser.json());

let mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'janusz',
    multipleStatements: true
})

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Connected');
    } else {
        console.log('Connetion failed');
    }
})

app.get('/', (req, resp) => {
    mysqlConnection.query('SELECT * FROM spotkanie', (err, rows, fields) => {
        if (err) {
            console.log('error in querry');
        } else {
            console.log('succesful');
            console.log(rows);
            resp.send('Na spotkaniu będą obecni: ' + rows[0].imie + ', ' + rows[1].imie + ', ' + rows[2].imie + ', ' + rows[3].imie + '\n' + 'Kolejno przyniosą: ' + rows[0].jedzenie + ', ' + rows[1].jedzenie + ', ' + rows[2].jedzenie + ', ' + rows[3].jedzenie);
            resp.end();
        }
    })
})

app.listen(3000);