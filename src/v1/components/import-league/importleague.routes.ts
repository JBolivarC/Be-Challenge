import { Router } from "express"
import { ImportLeagueController } from "./importleague.controller"

const router = Router()
const controller = new ImportLeagueController()

router.post('/import-league/:leagueCode', controller.ImportLeague.bind(controller))
router.post('/import-all-leagues', controller.ImportAllLeagues.bind(controller))

export default router