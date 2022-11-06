// https://www.npmjs.com/package/jsonschema

module.exports.pointArray = {
  "id": "/PointArray",
  "type": "array",
  "items": {
      "properties": {
          "points": { "type": "number" },
          "bonus": { "type": "number" }
      },
      "required": ["points", "bonus"]
  }
}

module.exports.phone = {
  "id": "/Phone",
  "type": "object",
  "properties": {
    "personal": {"type": "string"},
    "work": {"type": "string"},
    "ext": {"type": "string"}
  },
  "required": ["personal"]
}

module.exports.favorite = {
  "id": "/Favorite",
  "type": "object",
  "properties": {
    "artist": {"type": "string"},
    "food": {"type": "string"}
  },
  "required": ["artist", "food"]
};

// Employee
module.exports.employee = {
  "id": "/Employee",
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "age": {"type": "number"},
    "phone": {"$ref": "/Phone"},
    "privileges": {"type": "string"},
    "favorites": {"$ref": "/Favorite"},
    "finished": {"type": "array", "items": {"type": "number"}},
    "badges": {"type": "array", "items": {"type": "string"}},
    "points": {"$ref": "/PointArray"}
  },
  "required": ["name", "age", "phone", "privileges"]
};
