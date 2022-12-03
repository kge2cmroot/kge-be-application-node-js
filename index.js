const express = require('express');
const { searchExerciseById } = require('./service/searchExerciseByIdService');
const { getLinks } = require('./service/getLinksService');
const { linkCompletitionTask } = require('./service/linkCompletitionTaskService');


const port = 3000;

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.get('/contentmapexercises/:id', (req, res) => {
    const id = req.params.id

    searchExerciseById(id, res)
});

app.get('/links', (req, res) => {


    getLinks(res)

});

app.post('/evaluate', (req, res) => {


    linkCompletitionTask(req.body.head, req.body.relation, req.body.tail, res)


    

});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
