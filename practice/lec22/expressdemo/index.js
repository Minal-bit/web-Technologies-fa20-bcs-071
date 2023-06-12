const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const product = ['laptop','lcd','mobile'];

app.get('/', (req, res) => {
    
    res.send('Hello World!');
});

app.get("/api/products/:index", function(req, res){
   if (!product[req.params.index])
         res.status(404).send("The product with the given ID was not found.");
   res.send(product[req.params.index]);
});

app.get("/api/products", function(req, res){
    res.send(product);
});

app.put("/api/products/:index",function(req,res){
    console.log(req.body);
    product[req.params.index] = req.body.name;
    res.send(product[req.params.index]);
})

app.delete("/api/products/:index", function (req, res) {
  console.log(req.body);
  product.splice(req.params.index,1)
  res.send(product);
});

app.post("/api/products", function (req, res) {
  console.log(req.body);
  product.push(req.body.name);
  res.send(product);
});

app.listen(port)
