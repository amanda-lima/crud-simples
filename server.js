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

