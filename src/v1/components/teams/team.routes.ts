import { Router } from "express"
import { TeamController } from "./team.controller"

const router = Router()
const controller = new TeamController()

router.post('/teams', controller.Create.bind(controller))
router.get('/teams', controller.GetAll.bind(controller))
router.get('/teams/by-name/', controller.GetByName.bind(controller))
router.get('/teams/:teamId/players', controller.GetTeamPlayers.bind(controller))
router.get('/teams/:teamId', controller.GetById.bind(controller))
router.put('/teams/:teamId', controller.Update.bind(controller))
router.delete('/teams/:teamId', controller.Delete.bind(controller))

export default router