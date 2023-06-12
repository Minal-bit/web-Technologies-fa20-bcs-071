const readingModel = require("./models/readingModel");

const createnew = async (max, min, average) => {
  console.log("New reading entered");

  let product = new readingModel();
  product.max = max;
  product.min = min;
  product.average = average;
  await product.save();
  console.log("reading saved");
    res.redirect("/"); // Redirect instead of using window.location.href

};
const getAllreadings = async () => {
  let readings = await readingModel.find();
  return readings;
};
const deletereadings = async (id) => {
  await readingModel.findByIdAndDelete(id);
  console.log("deleted");

};

module.exports.createnew = createnew;
module.exports.getAllreadings = getAllreadings;
module.exports.deletereadings = deletereadings;