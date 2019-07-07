const taskTemplate = {
  id: {
    presence: true,
    length: { minimum: 6, maximum: 10, message: "must be 6-10 characters"},
    format: { pattern: "^[a-z0-9_]+" }
  },
  description: { presence: true, type: 'string' },
  type: { presence: true, type: 'string', inclusion: {
    within: {"Small": "s", "Medium": "m", "Large": "l"},
    message: "type can be one of: http|script|emulator|file"
  } },

  responseTo: 'personal notify2room4currentUser notify4all'
};

module.exports = {
  taskTemplate
};
