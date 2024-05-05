const express=require('express');
const app=express();
const PORT=8080;

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
      language:"World Wide"

}
]

app.use(express.json());

const logger=(req,res,next)=>{
   console.log(` Middleware Recieved ${req.method} on ${req.url}`)
   next();
};
const secondLogger=(req,res,next)=>{
    console.log(`Second Middleware Recieved ${req.method} on ${req.url}`)
    next();
 };


app.use(logger);
app.use(secondLogger);

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.get("/api/books",(req,res)=>{
    res.send(books);//Printing and retrieving array
})

app.get("/api/books/:id",(req,res)=>{
    const id=req.params.id;
    res.send(books[id-1]);//printing array and retrieving array with id
})

app.post("/api/books",(req,res)=>{
    const book=req.body;//storing request body
    books.push(book);//Pushing request body into array
    res.send(book);//Printing and retrieving array
})

app.delete("/api/books/:id",(req,res)=>{
    const id=req.params.id;
    const book=books[id-1];//storing index
    books.splice(id-1,1);//reducing index
    res.send(book);
})

app.listen(PORT,()=>{
    console.log("Server is listening to the port"+ PORT);
})

