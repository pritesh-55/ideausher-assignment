const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Post & Tag API",
      version: "1.0.0",
      description: "API to manage posts and tags"
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/*.js"]
};

module.exports = swaggerJsDoc(options);
