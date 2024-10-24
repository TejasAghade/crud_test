import express from 'express';
import cors from 'cors';


const app = express();

app.use(cors({
    origin: "*", // allowed every origin
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended : true}));

// importing routes
import studentRoute from './src/routes/student.route.js';

// using students route
app.use("/student", studentRoute);


export default app;