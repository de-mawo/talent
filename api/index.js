const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/user", (req, res) => {
  const user = [
    {
      id: "1",
      name: "Prince",
      email: "info@bath.co.za",
    },
    {
      id: "1",
      name: "Prince",
      email: "info@bath.co.za",
    },
    {
      id: "1",
      name: "Prince",
      email: "info@bath.co.za",
    },
    {
      id: "1",
      name: "Prince",
      email: "info@bath.co.za",
    },
  ];
  res.json(user).status(200);
});

app.post('/users', (req, res) => {
  const data = req.body;
  console.log(data);
  res.json("success").status(200)

})

app.delete("/users/:id")



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
