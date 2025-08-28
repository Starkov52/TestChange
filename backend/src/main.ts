import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routerForCurrencyAPI from "./routesAPI/currencyAPI.ts";
import routerForRates from "./routesAPI/ratesCurrencyAPI.ts";
import routerForPostUserAPI from "./routesAPI/postUserAPI.ts";
import RouterForGetUserAPI from "./routesAPI/getUserAPI.ts";
import { setupSwagger } from "./swagger.ts";
import { addCache } from "./middleware/addCache.ts";
export const url: string = `https://v6.exchangerate-api.com/v6/59bab997eecee590aa5aeac0/latest`;
export function startServer(type: "SERVER" | "TEST") {
     const app = express();
     const port: number = 3000;

     app.use(express.json());
     app.use(cors());
     app.use(cookieParser());
     app.use(addCache);

     app.use("/api/currency", routerForCurrencyAPI);
     setupSwagger(app);
     app.use("/api/rates", routerForRates);
     app.use("/api/user", routerForPostUserAPI);
     app.use("/api/user", RouterForGetUserAPI);

     if (type === "SERVER") {
          app.listen(port, "0.0.0.0", () => console.log("СЕРВ ЗАПУЩЕН"));
     } else {
          return app;
     }
}
