// on inclut express
const express = require('express')
const mongoose = require('mongoose')
const cors = require ('cors');
//notre application est une express
const app = express();
app.use(cors())
let productsRouter=require('./routes/products.js');
//créer l'injection de la base de donnée
// dans le frontEnd en important mangoose
let db=mongoose.connection;

app.use(express.json());

app.use((req,res,next) =>{
    req.db=db;
    next();
});
app.use('/products',productsRouter);

/*on définit le contenu qui va s'afficher lorsque 
l'on va arriver sur l'url par défaut*/
//ici un "Hello World !"
app.get('/', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end('<p>Voici un paragraphe <strong>HTML</strong> !</p>');
});


//on lance notre serveur

const start = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/products")
        app.listen(8000, () => {
            console.log('Example app listening on port 8000 !')
        });
    } catch (e) {
        console.log(e.message);

    }
}
start()
