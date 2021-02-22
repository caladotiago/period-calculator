const path = require('path');
const express = require('express');
const router = require('./config/routes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.use(router);

app.listen(3333);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});
