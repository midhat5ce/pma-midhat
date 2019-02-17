const express = require('express');
const router = express.Router();


// api/products/test
// public
router.get('/test',(req, res) =>res.json({msg: " Products works"}));

module.exports = router;