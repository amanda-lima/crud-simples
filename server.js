const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


let db = new sqlite3.Database('./db/articles.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    db.run(`
    CREATE TABLE IF NOT EXISTS articles(
                id      INTEGER not null constraint articles_pk primary key autoincrement,
                title   TEXT,
                content TEXT
    );
    create unique index articles_id_uindex
        on articles (id);
    `);
    console.log('Conected to the SQlite database.');
});

app.listen(3000, function () {
    console.log('server is running, port 3000')
});

app.post('/api/articles', function (req, res) {
    db.serialize(() => {
        db.run('INSERT INTO articles (title, content) VALUES (?, ?)', [req.body.title, req.body.content], function (err) {
            if (err) {
                res.status(400).json({"error": err.message})
            }
            res.json({
                "status": true
            });
        });
    });
});

