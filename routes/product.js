const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  getAllProducts,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//create route
router.post(
  "/create",
  createProduct
);

// read routes
router.get("/product/:productId", getProduct);
router.get("/getPhoto/:productId", photo);

//update route
router.put(
  "/product/:productId",
  isSignedIn,
  isAuthenticated,
  updateProduct
);

router.get("/getall", getAllProducts);

module.exports = router;
