import { Router } from "express"
import { CompetitionController } from "./competition.controller"

const router = Router()
const controller = new CompetitionController()

router.post('/competitions', controller.Create.bind(controller))
router.get('/competitions', controller.GetAll.bind(controller))
router.get('/competitions/:competitionId', controller.GetById.bind(controller))
router.put('/competitions/:competitionId', controller.Update.bind(controller))
router.delete('/competitions/:competitionId', controller.Delete.bind(controller))

export default router