const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');


app.use(cors());

app.get('/', (req, res) => {
    res.json({foo: 'bar'});
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

