const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Post & Tag API",
      version: "1.0.0",
      description: "API to manage posts and tags"
    },
    servers: [
      {
        url: "https://ideausher-assignment-production.up.railway.app",
        description: "Render Deployment",
      },
    ]
  },
  apis: ["./routes/*.js"]
};

module.exports = swaggerJsDoc(options);
