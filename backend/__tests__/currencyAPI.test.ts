import { describe, expect, test } from "@jest/globals";
import { startServer } from "../src/main.ts";
import request from "supertest";
import { currencies } from "../src/constans";

describe("server", () => {
     const app = startServer("TEST");

     const userData = {
          base_currency: "EUR",
          favorites: ["EUR", "GBP"],
          created_at: new Date().toISOString().slice(0, 10),
          updated_at: new Date().toISOString().slice(0, 10),
     };

     let cookieID: string = "";

     function checkTargets(targets: { target: string; rate: string }[]) {
          expect(Array.isArray(targets)).toBeTruthy();
          const currenciesAPI = targets.map((item) => item.target);
          currenciesAPI.forEach((item) => expect(currencies.includes(item)).toBeTruthy());
     }

     test("/api/currency", async () => {
          const response = await request(app!).get("/api/currency");
          expect(response.status).toEqual(200);
          expect(response.body).toEqual(currencies);
     });

     test("/api/rates/{baseCurrency}", async () => {
          const response = await request(app!).get("/api/rates/{baseCurrency}");
          expect(response.status).toEqual(200);
          expect(response.body.base).toEqual("USD");
          checkTargets(response.body.targets);
     });

     test("/api/rates/EUR", async () => {
          const response = await request(app!).get("/api/rates/EUR");
          expect(response.status).toEqual(200);
          expect(response.body.base).toEqual("EUR");
          checkTargets(response.body.targets);
     });

     test("/api/user (POST and PUT)", async () => {
          const response = await request(app!).post("/api/user").send(userData).set("Accept", "application/json");

          const cookie = response.headers["set-cookie"];
          cookieID = cookie?.[0]?.slice(0, 44) ?? "";

          expect(response.status).toEqual(200);
          expect(Array.isArray(response.body.favorites)).toBe(true);
          expect(response.body.favorites).toEqual(userData.favorites);
          expect(response.body.base_currency).toBe(userData.base_currency);
          expect(response.body.created_at).toBe(userData.created_at);
          expect(response.body.updated_at).toBe(userData.updated_at);
          console.log("КУКA: ", cookieID, "Исходная кука: ", cookie);
     });

     test("/api/rates/{baseCurrency} with cookieData", async () => {
          const response = await request(app!).get("/api/rates/{baseCurrency}").set("Cookie", cookieID);

          expect(response.status).toEqual(200);
          expect(response.body.base).toEqual(userData.base_currency);
          checkTargets(response.body.targets);
     });

     test("/api/user (GET)", async () => {
          const response = await request(app!).get("/api/user").set("Cookie", cookieID);

          expect(response.status).toEqual(200);
          expect(response.body.favorites).toEqual(userData.favorites);
          expect(response.body.base_currency).toBe(userData.base_currency);
          expect(response.body.created_at).toBe(userData.created_at);
          expect(response.body.updated_at).toBe(userData.updated_at);
     });
     test("/api/currency проверка на кеш", async () => {
          const firstResponse = await request(app!).get("/api/currency");
          expect(firstResponse.status).toEqual(200);
          expect(firstResponse.body).toEqual(currencies);
          const secondResponse = await request(app!).get("/api/currency");
          expect(secondResponse.status).toEqual(200);
          expect(secondResponse.body).toEqual(firstResponse.body);
     });

     test("/api/rates/EUR проверка на кеш", async () => {
          const firstResponse = await request(app!).get("/api/rates/EUR");
          expect(firstResponse.status).toEqual(200);
          expect(firstResponse.body.base).toEqual("EUR");
          const secondResponse = await request(app!).get("/api/rates/EUR");
          expect(secondResponse.status).toEqual(200);
          expect(secondResponse.body).toEqual(firstResponse.body);
     });

     test("test", async () => {
          const response = await request(app!).get("/api/currency");
          expect(response.status).toBeGreaterThanOrEqual(200);
          expect(response.status).toBeLessThan(600);
     });
});
