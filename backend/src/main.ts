import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routerForCurrencyAPI from "./routes/currency.ts";
import routerForRates from "./routes/ratesCurrency.ts";
import routerForPostUserAPI from "./routes/postUser.ts";
import RouterForGetUserAPI from "./routes/getUser.ts";
import { setupSwagger } from "./swagger.ts";
import { addCache } from "./middleware/addCache.ts";
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
