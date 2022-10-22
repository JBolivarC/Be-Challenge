import { Router } from "express"
import { CoachController } from "./coach.controller"

const router = Router()
const controller = new CoachController()

// CRUD functionality
router.post('/coaches', controller.Create.bind(controller))
router.get('/coaches', controller.GetAll.bind(controller))
router.get('/coaches/:coachId', controller.GetById.bind(controller))
router.put('/coaches/:coachId', controller.Update.bind(controller))
router.delete('/coaches/:coachId', controller.Delete.bind(controller))

export default router