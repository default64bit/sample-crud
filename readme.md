# How to run
`npm i` then `npm run start`
it should start on port *3005*

#### Routes
---
| Path | Method | Params | Body |
| ---- | ------ | ------ | ---- |
| **/user/:id** | GET | id | --- |
| **/user** | POST | --- | {name, age, department} |
| **/user/:id** | PUT | id | {name?, age?, department?} |
| **/user/:id** | DELETE | id | --- |