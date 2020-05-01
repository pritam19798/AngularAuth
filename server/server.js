const express = require('express')
const bodyParser=require('body-parser')
const api=require('./routs/api')
const cors=require('cors')


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/api',api)

const port = 3000



app.get('/', (req, res) => res.send('Hello World!'))









app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))