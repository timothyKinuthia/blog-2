import dotenv from 'dotenv';
dotenv.config();
import expess from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

//imports
import routes from "./routes"

//middlewares
const app = expess();
app.use(expess.json());
app.use(expess.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

//database
import './config/database';

//routes
app.use("/api", routes.authRouter);

//listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`app is up on port ${PORT}`)
});