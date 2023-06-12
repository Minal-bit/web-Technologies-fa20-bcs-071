const productModel = require("./models/productModel");

const createproduct= async (max, min ,average) => {
  console.log("Create Product");
  let product= new productModel();
  product.max = max;
  product.min = min;
  product.average=average;
  await product.save();
  return product;
 };
module.exports.createproduct = createproduct;
const updateproduct= async (_id, max, min , average) => {
  let product= await productModel.findById(_id);
  product.max = max;
  product.min = min;
  product.average = average;
  await product.save();
  return product;
};
const getAllproducts = async () => {
  let products = await productModel.find();
  return products;
};
const deleteproduct= async (_id) => {
  let product= await productModel.findByIdAndDelete(_id);
  return product;
};

module.exports.getAllproducts = getAllproducts;
module.exports.deleteproduct= deleteproduct;
module.exports.updateproduct= updateproduct;
