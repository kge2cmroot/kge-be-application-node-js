const { MongoClient } = require("mongodb");

const uri =
    "mongodb://localhost:27017?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const getLinks = (res) => {
    const database = client.db('kge2cm');
    const links = database.collection('links');

    links.find().toArray()

        .then(r => {
            const formatted = r.map(v=> {return { value: v.value, type: v.type, direction: v.direction} })
            res.json({links: formatted})
            client.close().then(v=> console.log("Client Closed"))
        })
}



module.exports = { getLinks }