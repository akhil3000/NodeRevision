require("dotenv").config();
const express=require('express');
const app=express();
const PORT=process.env.PORT;
const bookRouter=require("./routes/book");
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
app.use("/api/books",bookRouter);
app.get("/",(req,res)=>{
    res.send("Hello World");
})


app.listen(PORT,()=>{
    console.log("Server is listening to the port"+ PORT);
})

