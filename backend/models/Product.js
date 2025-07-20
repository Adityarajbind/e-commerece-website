import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  image: String,
  price: Number,
  originalPrice: Number,
  discount: Number,
  rating: Number,
  description: String,
  colors: [String],
  thumbnails: [String],
});

const Product = mongoose.model('Product', productSchema);
export default Product;
