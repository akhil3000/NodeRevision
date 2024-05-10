const express=require("express");
const router=express.Router();


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
router.get("/",(req,res)=>{
    res.send(books);//Printing and retrieving array
})

router.get("/",(req,res)=>{
    const id=req.params.id;
    res.send(books[id-1]);//printing array and retrieving array with id
})

router.post("/",(req,res)=>{
    const book=req.body;//storing request body
    books.push(book);//Pushing request body into array
    res.send(book);//Printing and retrieving array
})

router.delete("/:id",(req,res)=>{
    const id=req.params.id;
    const book=books[id-1];//storing index
    books.splice(id-1,1);//reducing index
    res.send(book);
})

module.exports=router;
