const express = require('express')
const app = express()
const port = 3080
const clientDir = __dirname + "\\images\\"; 
app.use(express.static(clientDir));
app.use(express.json());
app.use(express.urlencoded());


app.get('/', (req, res) => res.render('./../frontend/app/app.component.html'))
app.listen(port, () => console.log(`Example app listening on port 3000!`))