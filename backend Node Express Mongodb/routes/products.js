const express=require('express')
let router=express.Router()

const  Product  = require( '../models/product.js');
//mettre un "/" à la fin de l'url seul, pemret d'afficher 
// la totalité des éléments de l'api sur la page internet
router.get('/',async (req,res)=>{
    let allProducts = await Product.find();
    return res.json(allProducts);
})
//permet d'ajouter un éléments à une API
router.post('/add',async (req,res) => {
    const newProduct=new Product ({...req.body});
    await newProduct.save();
    return res.json ({message: 'Produit ajouté'});
})
//permet de modifié un élément d'une API
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
     const updateProduct= await Product.updateOne({_id:id},req.body);
        return res.json ({message: 'Produit modifié'});
    })
    //permet de supprimé un élément d'une API
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Product.deleteOne({_id:id});
    return res.json({message: 'Produit supprimé'});
})
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.json(product);
})


module.exports = router;