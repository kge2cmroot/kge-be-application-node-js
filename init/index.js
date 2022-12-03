const { MongoClient } = require("mongodb");
const linksSource = require("./links.json")
const exerciseSource =require("./exercise.json")

const uri =
  "mongodb://localhost:27017?retryWrites=true&w=majority";

const client = new MongoClient(uri);


async function initLinks() {
    try {
      const database = client.db('kge2cm');
      const links = database.collection('links');

      await links.insertMany(linksSource)
  
    } finally {
      await client.close();
    }
  }

async function initExercises() {
    try {
      const database = client.db('kge2cm');
      const links = database.collection('exercises');

      await links.insertOne(exerciseSource)
  
    } finally {
      await client.close();
    }
}

initLinks()
initExercises()