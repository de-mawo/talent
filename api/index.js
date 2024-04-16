
import express, { json, urlencoded } from "express";
import userRoutes from './routes/user.js'

const app = express();
const port = 4000;


// These are needed for POST and PUT requests,
app.use(json());  // to recognize the incoming Request Object as a JSON Object
app.use(urlencoded({extended: true})) //  to recognize the incoming Request Object as strings or arrays. 

//Test route
app.get("/", (req, res) => {
  res.json({"success": "Hi from My Server"}).status(200);
});


// Routes
app.use('/api/v1/user', userRoutes)









app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
