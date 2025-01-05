// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

const validateProjectId = async (req, res, next) => {
    try {
        const project = await Projects.get(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found'});
        }
        req.project = project;
        next();
    } catch (err) {
        next (err);
    }
};

const validateProjectBody = (req, res, next) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: 'Missing required fields'});
    }
    next();
};

router.get('/', async (req, res, next) => {
    try{
        const projects = await Projects.get();
        res.json(projects);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project);
});

router.post('/', validateProjectBody, async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body);
        res.status(201).json(newProject);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', validateProjectId, validateProjectBody, async (req, res, next) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.body);
        res.json(updatedProject);

    } catch (err) {
        next(err);
    }
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id);
        res.json(actions);
    } catch (err) {
        next(err);
    }
});

module.exports = router;