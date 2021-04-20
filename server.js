const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.listen(3000, function(){
    console.log('server is running, port 3000')
});

app.get('/',(req,res) => {
    res.send('test')
})

let db = new sqlite3.Database('./db/articles.db', (err) => {
    if (err) {
        return
        console.error(err.message);
    }
    db.run (`
        CREATE TABLE IF NOT EXISTS articles(
            id  INTEGER not null constraint articles_pk primary key autoincrement,
            title TEXT,
            content TEXT
        );
        create unique index articles_id_uindex
            on articles (id);
    `)
    console.log('Conected to the SQlite database.');
});