const express = require("express");
const asyncHandler=require("express-async-handler");
const router = express.Router(); 
const Joi = require("joi"); 
const Author = require("../models/authorModel");

/**
 * @desc Get all 
 * @route /api/authors
 * @method GET
 * @access public
 */