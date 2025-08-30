import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { type Express } from "express";

const options = {
     definition: {
          openapi: "3.0.0",
          info: {
               title: "Currency API",
               version: "1.0.0",
               description: "API для работы с курсами валют и пользователями",
          },
     },
     apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
     app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
