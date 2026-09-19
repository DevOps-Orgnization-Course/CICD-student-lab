const { validateTask } = require("../src/validate");

describe("validateTask (unit)", () => {
  test("accepts a valid title", () => {
    expect(validateTask({ title: "Buy milk" }).valid).toBe(true);
  });

  test("rejects a missing title", () => {
    const result = validateTask({});
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test("rejects an empty / whitespace title", () => {
    expect(validateTask({ title: "   " }).valid).toBe(false);
  });

  test("rejects a non-string title", () => {
    expect(validateTask({ title: 42 }).valid).toBe(false);
  });
});
