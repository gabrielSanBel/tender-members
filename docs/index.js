const express = require('express');
const app = express();
const path = require('path');



// app.get('/', (req,res) => {
//     res.send('Hello World!');
// });

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
    });
    

app.use(express.static('public'));


const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log('server started on port ' + PORT));

