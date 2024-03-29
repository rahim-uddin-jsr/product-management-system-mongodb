const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;

const cors = require('cors')

app.use(cors());
app.use(express.json())


// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://crud_user_1:YpR2pm5yjSj2ReXW@cluster0.mzolur4.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
    try {
        const database = client.db("E_com_Products_DB");
        const productsCollection = database.collection("products");
        // create a document to insert
        app.post('/product/add', async (req, res) => {
            const doc = req.body;
            const result = await productsCollection.insertOne(doc);
            res.json(result.insertedId)
            // console.log(`A document was inserted with the _id: ${result.insertedId}`);
        })
        // GET API
        app.get('/products', async (req, res) => {

            const cursor = productsCollection.find({});
            const products = await cursor.toArray()
            res.send(products);
            // app.send(cursor)
        })
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const product = await productsCollection.findOne(query)
            res.send(product)
        })
        //DELETE API
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await productsCollection.deleteOne(query);
            res.json(result.deletedCount);
        })

        // Update API 
        app.put('/products/update/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            // this option instructs the method to create a document if no documents match the filter
            const options = { upsert: true };
            // create a document that sets the plot of the movie
            const updateDoc = {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                    quantity: req.body.quantity,
                }
            };
            const result = await productsCollection.updateOne(filter, updateDoc, options);
            res.json(result.matchedCount)
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('hello from node')
    console.log('running');
})

app.listen(port, () => {
    console.log('listening port', port);
})