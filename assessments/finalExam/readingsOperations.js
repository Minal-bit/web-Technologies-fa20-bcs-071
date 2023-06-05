const readingModel = require("./models/readingModel");

const createnew = async (max, min, average) => {
  console.log("New reading entered");

  let product = new readingModel();
  product.max = max;
  product.min = min;
  product.average = average;
  await product.save();
  console.log("reading saved");
};
const getAllreadings = async () => {
  let readings = await readingModel.find();
  return readings;
};
const deletereadings = async (_id) => {
  let deletedReading = await readingModel.findByIdAndDelete(_id);
  return deletedReading;
};

module.exports.createnew = createnew;
module.exports.getAllreadings = getAllreadings;
module.exports.deletereadings = deletereadings;