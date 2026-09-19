const request = require("supertest");
const { createApp } = require("../src/app");

describe("tasks-api endpoints (API)", () => {
  let app;
  beforeEach(() => {
    app = createApp();
  });

  test("GET /health -> 200 { status: ok }", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  test("GET /api/tasks -> 200 empty array", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("POST /api/tasks -> 201 creates a task", async () => {
    const res = await request(app).post("/api/tasks").send({ title: "Write tests" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, title: "Write tests", done: false });
  });

  test("POST /api/tasks with no title -> 400 with errors", async () => {
    const res = await request(app).post("/api/tasks").send({});
    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  test("GET /api/tasks/:id -> 200 then 404", async () => {
    await request(app).post("/api/tasks").send({ title: "A" });
    const found = await request(app).get("/api/tasks/1");
    expect(found.status).toBe(200);
    const missing = await request(app).get("/api/tasks/999");
    expect(missing.status).toBe(404);
  });

  test("DELETE /api/tasks/:id -> 204 then 404", async () => {
    await request(app).post("/api/tasks").send({ title: "A" });
    const del = await request(app).delete("/api/tasks/1");
    expect(del.status).toBe(204);
    const again = await request(app).delete("/api/tasks/1");
    expect(again.status).toBe(404);
  });
});
