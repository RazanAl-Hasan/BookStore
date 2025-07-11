const { required, types } = require('joi');
const Author = require('../models/authorModel');
const mongoose = require('mongoose');
const { trim } = require('validator');
const Joi = require('joi');
const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'Author',
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    price: {
      type: Number,
      required: true,
      minlength: 0,
    },
    cover: {
      type: String,
      required: true,
      enum: ['soft cover', ' hard cover'],
      default: 'soft cover',
    },
  },
  { timestamps: true, versionKey: false },
);

const Book = mongoose.model('Book', BookSchema);

function validationUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(200),
    author: Joi.string(),
    price: Joi.number().min(0),
    cover: Joi.string().valid('soft cover', ' hard cover'),
    description: Joi.string().trim().min(10),
  });
  return schema.validate(obj);
}

// Validation Create a Book
function validationCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    price: Joi.number().min(0),
    cover: Joi.string().required().valid('soft cover', ' hard cover'),
    description: Joi.string().trim().min(10).required(),
  });
  return schema.validate(obj);
}
module.exports = {
  Book,
  validationCreateBook,
  validationUpdateBook,
};
