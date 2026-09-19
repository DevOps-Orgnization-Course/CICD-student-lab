function validateTask(body) {
  const errors = [];
  if (!body || typeof body.title !== "string" || body.title.trim() === "") {
    errors.push("title is required and must be a non-empty string");
  }
  return { valid: errors.length === 0, errors };
}

module.exports = { validateTask };
