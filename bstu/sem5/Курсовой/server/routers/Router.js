const Router = require('express')
const router = new Router()
const controller = require('../controllers/Controller')

router.get('/company/all', controller.getAllCompanies)
router.get('/company/:id', controller.getCompany)
router.post('/company/create', controller.createCompany)
router.put('/company/update', controller.updateCompany)
router.delete('/company/delete/:id', controller.deleteCompany)

router.get('/client/all', controller.getAllClients)
router.get('/client/:id', controller.getClient)
router.post('/client/create', controller.createClient)
router.put('/client/update', controller.updateClient)
router.delete('/client/delete/:id', controller.deleteClient)

router.get('/director/all', controller.getAllDirectors)
router.get('/director/:id', controller.getDirector)
router.post('/director/create', controller.createDirector)
router.put('/director/update', controller.updateDirector)
router.delete('/director/delete/:id', controller.deleteDirector)

router.get('/planner/all', controller.getAllPlanners)
router.get('/planner/:id', controller.getPlanner)
router.post('/planner/create', controller.createPlanner)
router.put('/planner/update', controller.updatePlanner)
router.delete('/planner/delete/:id', controller.deletePlanner)

router.get('/designer/all', controller.getAllDesigners)
router.get('/designer/:id', controller.getDesigner)
router.post('/designer/create', controller.createDesigner)
router.put('/designer/update', controller.updateDesigner)
router.delete('/designer/delete/:id', controller.deleteDesigner)

module.exports = router