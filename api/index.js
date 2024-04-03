
import express, { json } from "express";
import {getUsers, createUser, getUserById, updateUser, deleteUser } from "./userQueries.js";
import {getMenus} from "./menuQueries.js"

const app = express();
const port = 3000;

app.use(json());

app.get("/", (req, res) => {
  res.json({"success": "Hi from My Server"}).status(200);
});
app.get("/users", getUsers);
app.get('/users/:id', getUserById)
app.post('/users', createUser)
app.patch('/users/:id', updateUser)
app.delete('/users/:id', deleteUser)
app.get("/menus", getMenus);



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
