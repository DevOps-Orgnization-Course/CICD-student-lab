class TasksStore {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  list() {
    return this.tasks;
  }

  get(id) {
    return this.tasks.find((t) => t.id === Number(id));
  }

  add(title) {
    const task = { id: this.nextId++, title, done: false };
    this.tasks.push(task);
    return task;
  }

  remove(id) {
    const index = this.tasks.findIndex((t) => t.id === Number(id));
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }
}

module.exports = { TasksStore };
