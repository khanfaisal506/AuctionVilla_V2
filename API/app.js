import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

const app = express();

//to link routers
import UserRouter from './routes/user.router.js';
import CategoryRouter from './routes/category.router.js'
import SubCategoryRouter from './routes/subcategory.router.js'
import AddProductRouter from './routes/product.router.js'
import BidRouter from './routes/bid.router.js'


//configuration to fetch req body content : body parser middleware
//used to fetch req data from methods like : POST , PUT , PATCH , DELETE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// to extract binary content 
app.use(fileUpload());

//to allow cross origin request
app.use(cors())

//route level middleware to load routes
app.use("/user",UserRouter);
app.use("/category",CategoryRouter);
app.use("/subcategory",SubCategoryRouter);
app.use("/product", AddProductRouter);
app.use("/bid",BidRouter)


const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0');
console.log(`server invoked at port ${PORT}`);
