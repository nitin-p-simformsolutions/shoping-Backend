const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin, isSignedIn } = require("../controllers/auth");
const { getToken, processPayment} = require("../controllers/payment");

router.get('/payment/gettoken/:userId', isSignedIn, isAuthenticated, getToken);
router.post('/payment/braintree/:userId', isSignedIn, isAuthenticated, processPayment);

module.exports = router;