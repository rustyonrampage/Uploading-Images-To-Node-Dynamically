const express = require('express')
const bodyParser = require('body-parser')
const multer  = require('multer')
const sharp = require('sharp')
const uuid = require('uuid/v4')

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multer single file parser
const upload = multer({limits:{fileSize:4000000}}).single('avatar')
// Multer multiple files parser
const uploads = multer({limits:{fileSize:20000000}}).array('photos', 12)

app.use(express.static('./public')) // allows images to be served to user from this directory
app.use(express.static('./uploads/'))

app.get('/', (req, res)=>{
    res.sendFile("index.html")
})

app.post('/upload', (req, res)=>{
    upload(req, res, async function(err){
     // check for error
     if( err|| req.file === undefined){
         console.log(err)
         res.send("error occured")
     }else{
        // everything worked fine
        console.log(req.body)
        console.log(req.file)
        let fileName = uuid() +".jpeg"
        var image = await sharp(req.file.buffer)
        //.resize({ width: 400, height:400 }) Resize if you want
        .jpeg({
            quality: 40,
        }).toFile('./uploads/'+fileName)
        .catch( err => { console.log('error: ', err) })
        console.log('image done')

        res.send(req.body)
     }
    })
})

app.post('/uploads', (req, res)=>{
    uploads(req, res, async function(err){
     // check for error
     if( err|| req.files === undefined){
         console.log(err)
         res.send("error occured")
     }else{
        // everything worked fine
        console.log(req.body)
        console.log(req.files)
        res.send('SUCCESS')
     }
    })
})

const port = process.env.PORT || 5000
app.listen(port, 
    ()=>console.log(`Server running on port ${port}`))