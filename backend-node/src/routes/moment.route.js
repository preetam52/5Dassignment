const express = require('express');
const { createMoment, updateMoment, deleteMoment, getMoments } = require('../controller/moment.controller');
const { getMomentValidation, createMomentValidation, updateMomentValidation, deleteMomentValidation } = require('../services/moment.validation.service');
const router = express.Router();

router.get('/getMoments', getMomentValidation, getMoments)
router.post('/createMoment', createMomentValidation, createMoment);
router.put('/updateMoment', updateMomentValidation, updateMoment);
router.delete('/deleteMoment', deleteMomentValidation, deleteMoment);

module.exports = router;