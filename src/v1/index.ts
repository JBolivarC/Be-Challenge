import "reflect-metadata"
import database from "./config/database"
import express from "express"
import { ErrorHandler } from "./errors/ErrorHandler"
import { config } from "./config/environments"
import PlayerRoutes from "./components/players/player.routes"
import TeamRoutes from "./components/teams/team.routes"
import CompetitionRoutes from "./components/competitions/competition.routes"
import CoachRoutes from "./components/coaches/coach.routes"
import ImportLeagueRoutes from "./components/import-league/importleague.routes"

const app = express()
const apiPort = config.port
const apiPrefix = "/api/v1"

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(apiPrefix, PlayerRoutes)
app.use(apiPrefix, TeamRoutes)
app.use(apiPrefix, CompetitionRoutes)
app.use(apiPrefix, CoachRoutes)
app.use(apiPrefix, ImportLeagueRoutes)
app.use(ErrorHandler)

database.initialize()
  .then(() => console.log('Database connected!'))
  .catch(console.error)

app.listen(apiPort, () =>{
  console.log(`Server running in port ${apiPort}`);
})