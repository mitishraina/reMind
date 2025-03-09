const express =  require ('express');
const dotenv =  require ('dotenv');
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');

dotenv.config()

const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url);

const dbName = 'reMind';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect()

// all passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// save password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success : true, result: findResult})
})

// delete password
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success : true, result: findResult})
})

app.listen(port, () => {
    console.log(`example app listening on http://localhost:${port}`)
})