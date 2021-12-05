const express = require('express');
const { createMoment, updateMoment, deleteMoment, getMoments } = require('../controller/moment.controller');
const { getMomentValidation, createMomentValidation, updateMomentValidation, deleteMomentValidation } = require('../services/moment.validation.service');
const router = express.Router();
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `./public/`);
    },
    
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now().toString() + path.extname(file.originalname) );
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 4 * 1024 * 1024 }
})

router.get('/getMoments', getMomentValidation, getMoments)
router.post('/createMoment', upload.single('image'), createMoment);
router.put('/updateMoment', updateMomentValidation, updateMoment);
router.post('/deleteMoment', deleteMomentValidation, deleteMoment);

module.exports = router;