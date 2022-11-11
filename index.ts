import express from 'express'
import {router} from "./src/router/router";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

const app = express()
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use('', router)
const PORT = 3000
app.listen(PORT, () => {
    console.log('server is running')
})