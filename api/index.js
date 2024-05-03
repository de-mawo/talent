'use strict'

import express, { json, urlencoded } from "express";
import session from "express-session";
import userRoutes from './routes/user.js'
import categories from './routes/category.js'
import authRoutes from './routes/auth.js'
import redisStore from './utils/redis.js'
import passport from "./utils/passport.js";
import { __prod__ } from "./utils/constants.js";


const app = express();
const port = 4000;


// These are needed for POST and PUT requests,
app.use(json());  // to recognize the incoming Request Object as a JSON Object
app.use(urlencoded({extended: true})) //  to recognize the incoming Request Object as strings or arrays. 

//Test route
app.get("/", (req, res) => {
  res.json({"success": "Hi from My Server"}).status(200);
});

// Initialize session storage.
app.use(
  session({
    name: "talent_sess",
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: process.env.SESSION_SECRET ,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, //30 Days
      httpOnly: true,
      sameSite: "lax", //csrf
      secure: __prod__,
    },
  })
);

app.use(passport.initialize());  // init passport on every route call.
app.use(passport.session())  // allow passport to use "express-session".

// Routes
app.use('/auth',authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/category', categories)



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
