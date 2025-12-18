import express from'express';
import { bookcollection } from '../models/Bookmodel.js';

const router=express.Router();


//route for new book
router.post('/',async (req,res)=>{
    try{
      if(!req.body.title || !req.body.author ||!req.body.publishyear){
        return res.status(400).send({message:'send all the required field'});
      }
      const newook={
        title:req.body.title,
        author:req.body.author,
        publishyear:req.body.publishyear,
      }
      const book=await bookcollection.create(newook);
      return res.status(201).send(book);
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});
//route to get all books details
router.get('/',async (req,res)=>{
    try{
      const books=await bookcollection.find({});

      return res.status(201).json({
        count:books.length,
        data: books
      });
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});
//route to get one particular book detail
router.get('/:id',async (req,res)=>{
    try{
        const {id}=req.params;
      const books=await bookcollection.findById(id);

      return res.status(201).json(books);
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});
//route to update a book
router.put('/:id',async (req,res)=>{
    try{
      if(!req.body.title || !req.body.author ||!req.body.publishyear){
        return res.status(400).send({message:'send all the required field'});
      }
       const {id}=req.params;
       const result=await bookcollection.findByIdAndUpdate(id,req.body);
       if(!result){
        return res.status(400).send({message:'Book not found'});
       }
       return res.status(200).send({message:"book is successfully updated"})
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});
//route for delete a item
router.delete('/:id',async (req,res)=>{
    try{
        const {id}=req.params;
      const result=await bookcollection.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message:'book not found'});
        }
      return res.status(200).json({message:'book deleted successfully'});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});
export default router;