import dotenv from 'dotenv';
import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import cors from "cors";


import routes from './routes.js';
import { mongooseConnect } from './database.js';
import { authMiddleware } from './middlewares/auth-middleware.js';

dotenv.config();
 
const app = express();
app.use(express.static('./src/public'));
app.use(express.urlencoded());

app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true
    }
}))



app.engine('hbs', handlebars.engine({
    extname: 'hbs',
     runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    // helpers: {},
}) );
app.set('view engine', 'hbs');
app.set('views', './src/views');


const dbName = process.env.DB_NAME;

mongooseConnect(dbName);
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(authMiddleware);
app.use(routes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});


app.listen(process.env.SERVER_PORT, () => console.log(`Server is listening on http://localhost:${process.env.SERVER_PORT}....`));
