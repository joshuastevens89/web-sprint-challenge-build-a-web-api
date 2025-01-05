// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model');

const Projects = require('../projects/projects-model');

const router = express.Router();

const validateActionId = async (req, res, next) => {
    try {
        const action = await Actions.get(req.params.id);
        if (!action) {
            return res.status(404).json({ message: 'Action not found'});
        }
        req.action = action;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = router;