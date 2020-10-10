const express = require("express");
const router = express.Router();

const { getUserById , updateUser } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.put("/update/:userId", isSignedIn, isAuthenticated, updateUser);

module.exports = router;
