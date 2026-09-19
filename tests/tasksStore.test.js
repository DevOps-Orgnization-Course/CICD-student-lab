const { TasksStore } = require("../src/tasksStore");

describe("TasksStore (unit)", () => {
  let store;
  beforeEach(() => {
    store = new TasksStore();
  });

  test("starts empty", () => {
    expect(store.list()).toEqual([]);
  });

  test("adds tasks with incrementing ids and done=false", () => {
    const a = store.add("first");
    const b = store.add("second");
    expect(a.id).toBe(1);
    expect(b.id).toBe(2);
    expect(a.done).toBe(false);
    expect(store.list()).toHaveLength(2);
  });

  test("gets a task by id, or undefined", () => {
    const a = store.add("x");
    expect(store.get(a.id)).toEqual(a);
    expect(store.get(999)).toBeUndefined();
  });

  test("removes a task, returning true then false", () => {
    const a = store.add("x");
    expect(store.remove(a.id)).toBe(true);
    expect(store.list()).toHaveLength(0);
    expect(store.remove(a.id)).toBe(false);
  });
});
