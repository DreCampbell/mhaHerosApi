const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const PORT = 9000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'heros'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client =>{
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })


app.set('view engine', 'ejs')
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors());

// const heros = {
//     'deku':{
//         'heroName': 'Deku',
//         'quirk': "One for All",
//         'rank': 'UA Student'
//     },
//     'icy-hot':{
//         'heroName': 'Icy-Hot',
//         'quirk': 'Half-Cold Half-Hot',
//         'rank': 'UA Student'
//     },
//     'endeavor':{
//         'heroName': 'Endeavor',
//         'quirk': 'Hellflame',
//         'rank': 'No. 1'
//     },
//     'hawks':{
//         'heroName': 'Hawks',
//         'quirk': 'Fierce Wings',
//         'rank': 'No. 2'
//     },
//     'best jeanist':{
//         'heroName': 'Best Jeanist',
//         'quirk': 'Fiber Master',
//         'rank': 'No. 3'
//     },
//     'edgeshot':{
//         'heroName': 'Edgeshot',
//         'quirk': 'Foldabody',
//         'rank': 'No. 4'
//     },
//     'mirko':{
//         'heroName': 'Mirko',
//         'quirk': 'Rabbit',
//         'rank': 'No. 5'
//     },
//     'villain':{
//         'heroName': 'Unknown',
//         'quirk': 'Unknown',
//         'rank': 'Unknown'
//     }
// }

app.get('/', (req, res)=>{
    db.collection('heros').find().sort({likes: -1}).toArray()
    .then(data => {
        res.render('index.ejs', {info: data})
    })
    .catch(error => console.error(error))
})

// app.get('/api/:heroName', (req, res)=>{
//     const heroName = req.params.heroName.toLowerCase()
//     console.log(req.params.heroName)
//     if(heros[heroName]){
//         res.json(heros[heroName])
//     }else{
//         res.json(heros['villain'])
//     }
// })

app.post('/addHero', (req, res) => {
    db.collection('heros').insertOne({heroName: req.body.heroName, quirk: req.body.quirk, likes: 0})
    .then(result => {
        console.log('Hero Added!')
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (req, res) => {
    db.collection('heros').updateOne({heroName: req.body.heroNameS, quirk: req.body.quirkS,likes: req.body.likesS},{
        $set: {
            likes:req.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        res.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteHero', (req, res) => {
    db.collection('heros').deleteOne({heroName: req.body.heroNameS})
    .then(result => {
        console.log('Rapper Deleted')
        res.json('Rapper Deleted')
    })
    .catch(error => console.error(error))

})

// app.put('/addOneLike', (req, res) => {
//     db.collection('heros').updateOne({heroName: req.body.heroNameS, quirk: req.body.quirkS, likes: req.body.likesS}),{
//         $set: {
//             likes: req.body.likes + 1
//         }
//     },{
//         sort: {_id: -1},
//         upsert: true
//     }
//     .then(result => {
//         console.log('Added One Like')
//         res.json('Like Added')
//     })
//     .catch(error => console.error(error))
// })

// app.delete('/deleteHero', (req, res) => {
//     db.collection('heros').deleteOne({heroName: req.body.heroNameS})
//     .then(result => {
//         console.log('Hero Deleted')
//         res.json('Hero Deleted')
//     })
//     .catch(error => console.error(error))
// })

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on port ${PORT}! Plus Ultra!`)
})