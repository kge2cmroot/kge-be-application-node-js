const { MongoClient } = require("mongodb");

const uri =
    "mongodb://localhost:27017?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const searchExerciseById = (id,res) => {
    const database = client.db('kge2cm');
    const exercise = database.collection('exercises');

    
    exercise.findOne({_id: id})

        .then(r => {
            
            
                r.id = r._id
                delete r._id
            
            console.log(r)
            res.json(r)
            client.close().then(v=> console.log("Client Closed"))
        })
}


module.exports = {searchExerciseById}