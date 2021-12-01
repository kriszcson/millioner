const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(__dirname + '/dist/frontend'));

app.get('/', (req, res) => {
    const fullPath = path.join(__dirname + '/dist/frontend/index.html');
    res.sendFile(fullPath);
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("app is listening on port " + port);
});