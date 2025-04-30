exports.createPostBodySchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 1,
      maxLength: 200,
    },
    desc: {
      type: "string",
      minLength: 1,
      maxLength: 2000,
    },
    tags: {
      oneOf: [
        {
          type: "array",
          items: { type: "string", minLength: 1 },
          maxItems: 5,
        },
        {
          type: "string",
          minLength: 1,
        },
      ],
    },
  },
  additionalProperties: false,
};
  
exports.getPostsQuerySchema = {
  type: "object",
  properties: {
    sort: {
      type: "string",
      enum: ["asc", "desc"]
    },
    page: {
      type: "string",
      pattern: "^[0-9]+$"
    },
    limit: {
      type: "string",
      pattern: "^[0-9]+$"
    },
    keyword: {
      type: "string",
      minLength: 1
    },
    tag: {
      type: "string",
      minLength: 1
    }
  },
  additionalProperties: false
};
