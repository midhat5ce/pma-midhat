const express = require('express');
const router = express.Router();

// api/posts/test
// public

router.get('/test',(req, res) =>res.json({msg: " Users works"}));

module.exports = router;