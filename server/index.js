const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/api/getdata', (req, res) => res.send('Hello Andrey-Puka!'));

app.listen(8080, () => console.log("Listening on port 8080!"));

generateCards = () =>{
    console.log('fgerger')
};
