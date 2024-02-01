const express=require('express');
const app = express();
const cors=require('cors');
require('dotenv').config();
const port=process.env.PORT
app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.send("this is an update to this backen file!!!!");
}
)

app.listen(port,()=>{
    console.log(`listening on port http://localhost:${port}`);
})
