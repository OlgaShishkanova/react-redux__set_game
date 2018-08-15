const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || '8080';

const routePath = path.join(__dirname + '..', '..');

app.use(express.static(routePath + '/public'));
app.use(express.static(routePath + '/dist'));

app.get('/api/getdata', (req, res) => {
    let params = req.query.mode;
    if(params==='classic'){
        let colors = ['#AD590B', '#432F75', '#66A200'];
        res.send(generateCards('colors',colors))
    }
    if(params==='nice'){
        let images = ['dog', 'cat', 'fox'];
        res.send(generateCards('images',images))
    }
});

app.get('/*', (req, res, next) => {
    res.sendFile(routePath + '/dist/' + 'index.html');
});

app.listen(port, () => console.log("Listening on port 8080!"));

generateCards = (name,data) => {

    let numbers = [1, 2, 3];
    let forms = ['rectangle', 'circle', 'rhombus'];
    let fullness = ['empty', 'full', 'partly'];
    let cards = [];
    let id = 1;


    data.forEach((item) => {
        numbers.forEach((number) => {
            forms.forEach((form) => {
                fullness.forEach((fullness) => {
                    cards = [...cards, {[name]: item, id: id, number: number, form: form, fullness: fullness}];
                    id++;
                });
            });
        });
    });


    return cards
};
