
//faire une demande de schéma 
// type d'une ligne d'une API de mangodb sur chatgpt(plus facile).
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: String,
  date: { type: Date, default: Date.now },
  reviewerName: String,
  reviewerEmail: String
});

const dimensionsSchema = new mongoose.Schema({
  width: Number,
  height: Number,
  depth: Number
});

const metaSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  barcode: String,
  qrCode: String
});

const productSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String },
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  tags: [String],
  brand: String,
  sku: String,
  weight: Number,
  dimensions: dimensionsSchema,
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: String,
  reviews: [reviewSchema],
  returnPolicy: String,
  minimumOrderQuantity: Number,
  meta: metaSchema,
  images: [String],
  thumbnail: String
}, {
  timestamps: true // ajoute automatiquement createdAt et updatedAt
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;