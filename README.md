
# Be Challengue


## Environment Variables

To run this project, you will need to rename the .env.example file to .env and add the following environment variables to your .env file

`API_PORT` : 3000 by default

`API_ENV` : local by default

`FOOTBALL_API_TOKEN` : your API token provided by https://www.football-data.org/
## Intallation

To install required dependencies and run this project, just run the next command:

```bash
  npm install && npm run dev
```


## API Reference

#### Get players from league

Get all players from the given league and filters by team if provided.

```http
  GET /api/v1/players/from-league
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `leagueCode` | `string` | **Required**. |
| `teamName` | `string` | **Optional**. |

#### Get players from team

Get players from given team id.

```http
  GET /api/v1/teams/${id}/players
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `${id}` | `string` | **Required** Team's id. |

#### Get team by name

Get team by given name.

```http
  GET /api/v1/teams/by-name
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Team's name. |
| `players`      | `string` | **Optional**. Wether it should resolve players or not (S/N). |

#### Import league

Imports a laegue (teams, players, coaches) by given league code to a local database.

```http
  GET /api/v1/import-league/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `${id}` | `string` | **Required**. |

#### Import all leagues

Imports all leagues (teams, players, coaches) to a local database.

```http
  GET /api/v1/import-all-leagues
```
