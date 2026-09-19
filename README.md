# tasks-api (student version)

A small REST API. **The app and its tests are complete and pass locally.**
Your job in this lab is to **write the CI and CD pipelines** in `.github/workflows/`.

## Endpoints
- `GET /health` -> `{ "status": "ok" }`
- `GET /api/tasks` -> list all tasks
- `GET /api/tasks/:id` -> one task (404 if missing)
- `POST /api/tasks` `{ "title": "..." }` -> 201 created (400 if title missing)
- `DELETE /api/tasks/:id` -> 204 (404 if missing)

## Run and test locally first
```bash
npm install
npm run test:unit
npm run test:api
npm run test:coverage
```
All tests should pass. Now make GitHub run them for you.

## Your task
See **STUDENT-README.md** for the full step-by-step lab (implement `ci.yml`, then `cd.yml`).
