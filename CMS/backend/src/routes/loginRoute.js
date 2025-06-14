import  {authlogin,registeruser}  from "../controllers/logincontroller.js";


import express from 'express';

const route=express.Router();

route.post('/auth',authlogin);
route.post('/',registeruser);

export default route;
