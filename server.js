const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 9000

app.use(express.static("public"));
app.use(cors());

const heros = {
    'deku':{
        'heroName': 'Deku',
        'quirk': "One for All",
        'rank': 'UA Student'
    },
    'icy-hot':{
        'heroName': 'Icy-Hot',
        'quirk': 'Half-Cold Half-Hot',
        'rank': 'UA Student'
    },
    'endeavor':{
        'heroName': 'Endeavor',
        'quirk': 'Hellflame',
        'rank': 'No. 1'
    },
    'hawks':{
        'heroName': 'Hawks',
        'quirk': 'Fierce Wings',
        'rank': 'No. 2'
    },
    'best jeanist':{
        'heroName': 'Best Jeanist',
        'quirk': 'Fiber Master',
        'rank': 'No. 3'
    },
    'edgeshot':{
        'heroName': 'Edgeshot',
        'quirk': 'Foldabody',
        'rank': 'No. 4'
    },
    'mirko':{
        'heroName': 'Mirko',
        'quirk': 'Rabbit',
        'rank': 'No. 5'
    },
    'villain':{
        'heroName': 'Unknown',
        'quirk': 'Unknown',
        'rank': 'Unknown'
    }
}

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:heroName', (req, res)=>{
    const heroName = req.params.heroName.toLowerCase()
    console.log(req.params.heroName)
    if(heros[heroName]){
        res.json(heros[heroName])
    }else{
        res.json(heros['villain'])
    }
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on port ${PORT}! Plus Ultra!`)
})