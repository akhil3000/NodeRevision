const express=require("express");
const router=express.Router();
require("dotenv").config();
const Book=require("../models/book");
const jwt=require("jsonwebtoken");
/*
const books=[{
    id:1,
    title:"IronMan",
    author:"StanLee",
    year:2008,
    pages:320,
    publisher:"Marvel Comics",
    language:"WorldWide",
},
{
      id:2,
      title:"Thor",
      author:"From Holy Epics",
      year:2011,
      pages:400,
      publisher:"Marvel Comics",
      language:"WorldWide"

}
]
*/
const jwtVerify=(req,res,next)=>{
    console.log(req.headers);
    next();
}

router.use(jwtVerify);

router.get("/",async(req,res)=>{
    const books=await Book.find();
    res.send(books);//Printing and retrieving array
})

router.get("/:id",async(req,res)=>{
    const {name:taskID}=req.params;
    const id=req.body;
    const book=await Book.findOne({name:taskID},id,{
        new:true,
            runValidators:true,
    });
    res.send(book);//printing array and retrieving array with id
})

router.post("/",async(req,res)=>{
    console.log("Inside Book.create function");
    const book=req.body;//storing request body
    const dbBook=await Book.create(book);
    //Pushing request body into array
    res.send(dbBook);//Printing and retrieving array
})

router.delete("/:id",async(req,res)=>{
    const {name:taskID}=req.params;
    const record=req.body;
    const dbBook=await Book.deleteOne({name:taskID},record,
        {
            new:true,
            runValidators:true,
     }
    );//reducing index
    res.send(dbBook);
})

router.put("/:id",async(req,res)=>{
const {id:taskID}=req.params;
const book=req.body;
const dbBook=await Book.findOneAndUpdate({_id:taskID},book,{
       new:true,
       runValidators:true,
})
 res.send(dbBook);
})



module.exports=router;
