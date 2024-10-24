import app  from "./app.js";

let port  = process.env.PORT | 3000


app.listen(3000, ()=>{
    console.log(`server is running at http://localhost:${port}/`);
})