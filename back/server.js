const express=require('express');
const mongoose=require('mongoose');
const app = express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
require('dotenv').config();
const adminRouter=require('./routes/Admin');
const insertDefaultAdmin =require('./Middleware/AdminMiddleware/DefaultAdmin')
const port=process.env.PORT
const connection_db=process.env.MONGO_URL


//utils
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET", "POST","PUT","DELETE"],
    credentials:true
}));




//connection avec la base de donne
mongoose.connect(connection_db)
.then(()=>
console.log('Connected to MongoDB')
 ) 
.catch(()=>{
    console.log('Failed to connect to MongoDB')
})

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });


// middlewares
insertDefaultAdmin()


  
// la partie des routes
app.use('/admin',adminRouter);



//fonction de test
app.get('/', (req,res)=>{
    res.send("hello world !!!!");
}
)




//fonction de listener
app.listen(port,()=>{
    console.log(`listening on port http://localhost:${port}`);
})
