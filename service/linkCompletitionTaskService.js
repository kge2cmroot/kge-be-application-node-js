const axios = require("axios")
const wiki = require('wikijs').default;
const {LinkPredictionTaskServiceBaseURL} = require("../config.json")

// const LinkPredictionTaskServiceBaseURL = "http://cf9d-34-125-144-113.ngrok.io"

const linkCompletitionTask = (head, relation, tail, res) => {

    axios.post(`${LinkPredictionTaskServiceBaseURL}/predictions`, {
        head, relation, tail
    })
        .then(v => {
            const result = v.data 
            if (result.relation) {
                res.json(
                    {
                        passed: true,
                        head,
                        relation,
                        tail

                    }
                )

            } else {
                wiki()
                    .page(result.head)
                    .then(headPage => {

                        wiki()
                            .page(result.tail)
                            .then(tailPage => {
                                res.json({ ...result, wikiPageHead: headPage.fullurl, wikiPageTail: tailPage.fullurl })
                            })

                    })
            }

        })



    
    }


    // return evaluate ? {
    //     passed: true,
    //     head,
    //     relation,
    //     tail

    // } : {
    //     passed: false,
    //     head,
    //     relation,
    //     tail
    // }


const mock = [
    {
        head: "solar system",
        tail: "earth",
        relation: "includes"
    },
    {
        head: "solar system",
        tail: "mars",
        relation: "includes"
    },
    {
        head: "solar system",
        tail: "planets",
        relation: "includes"
    },
    {
        head: "planets",
        tail: "mars",
        relation: "includes"
    },
    {
        head: "Concept 1",
        tail: "Concept 2",
        relation: "contains"
    }, { "head": "solar system", "tail": "mercury", "relation": "includes" },
    { "head": "solar system", "tail": "venus", "relation": "includes" },
    { "head": "solar system", "tail": "earth", "relation": "includes" },
    { "head": "solar system", "tail": "mars", "relation": "includes" },
    { "head": "solar system", "tail": "jupiter", "relation": "includes" },
    { "head": "solar system", "tail": "saturn", "relation": "includes" },
    { "head": "solar system", "tail": "uranus", "relation": "includes" },
    { "head": "solar system", "tail": "neptune", "relation": "includes" },
    { "head": "planets", "tail": "mercury", "relation": "includes" }, { "head": "planets", "tail": "venus", "relation": "includes" }, { "head": "planets", "tail": "earth", "relation": "includes" }, { "head": "planets", "tail": "mars", "relation": "includes" }, { "head": "planets", "tail": "jupiter", "relation": "includes" }, { "head": "planets", "tail": "saturn", "relation": "includes" }, { "head": "planets", "tail": "uranus", "relation": "includes" }, { "head": "planets", "tail": "neptune", "relation": "includes" }
]
module.exports = { linkCompletitionTask }