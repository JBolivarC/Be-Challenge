import { Router } from "express"
import { PlayerController } from "./player.controller"

const router = Router()
const controller = new PlayerController()

router.post('/players', controller.Create.bind(controller))
router.get('/players', controller.GetAll.bind(controller))
router.get('/players/from-league', controller.GetPlayersByLeague.bind(controller))
router.get('/players/:playerId', controller.GetById.bind(controller))
router.put('/players/:playerId', controller.Update.bind(controller))
router.delete('/players/:playerId', controller.Delete.bind(controller))

export default router