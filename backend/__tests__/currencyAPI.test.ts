import { describe, expect, test } from "@jest/globals";
import { startServer } from "../src/main.ts";
import request from "supertest";
import { currencies } from "../src/constans";
describe("server", () => {
     const app = startServer("TEST");
     const userData = {
          base_currency: "EUR",
          favorites: ["EUR", "GBP"],
          created_at: new Date().toISOString().slice(0, 10).toString(),
          updated_at: new Date().toISOString().slice(0, 10).toString(),
     };

     let cookieID: string = "";
     test("/api/currency", async () => {
          const response = await request(app!).get("/api/currency");
          expect(response.status).toEqual(200);
          expect(response.body).toEqual(currencies);
     });
     test("/api/rates/{baseCurrency}", async () => {
          const response = await request(app!).get("/api/rates/{baseCurrency}");
          expect(response.status).toEqual(200);
          expect(response.body.base).toEqual("USD");
          expect(Array.isArray(response.body.targets)).toBeTruthy();
          const currenciesAPI = response.body.targets.map((item: { target: string; rate: string }) => item.target);
          currenciesAPI.forEach((item: string) => {
               expect(currencies.includes(item)).toBeTruthy();
          });
     });
     test("/api/rates/EUR", async () => {
          const response = await request(app!).get("/api/rates/EuR");
          expect(response.status).toEqual(200);
          expect(response.body.base).toEqual("EUR");
          expect(Array.isArray(response.body.targets)).toBeTruthy();
          const currenciesAPI = response.body.targets.map((item: { target: string; rate: string }) => item.target);
          currenciesAPI.forEach((item: string) => {
               expect(currencies.includes(item)).toBeTruthy();
          });
     });
     test("/api/user (POST and PUT)", async () => {
          const response = await request(app!).post("/api/user").send(userData).set("Accept", "application/json");
          const cookie = response.headers["set-cookie"];

          cookieID = cookie?.[0]!.slice(0, 44)!;
          expect(response.status).toEqual(200);
          expect(Array.isArray(response.body.favorites)).toBe(true);
          expect(response.body.favorites).toEqual(["EUR", "GBP"]);
          expect(response.body.base_currency).toBe("EUR");
          expect(response.body.created_at).toBe(userData.created_at);
          expect(response.body.updated_at).toBe(userData.updated_at);
          console.log("КУКA: ", cookieID, "Исходная кука: ", cookie);
     });

     test("/api/rates/{baseCurrency}", async () => {
          const response = await request(app!).get("/api/rates/{baseCurrency}").set("Cookie", cookieID);

          expect(response.status).toEqual(200);
          expect(response.body.base).toEqual(userData.base_currency);
          expect(Array.isArray(response.body.targets)).toBeTruthy();
          const currenciesAPI = response.body.targets.map((item: { target: string; rate: string }) => item.target);
          currenciesAPI.forEach((item: string) => {
               expect(currencies.includes(item)).toBeTruthy();
          });
     });
     test("/api/user (GET)", async () => {
          const response = await request(app!).get("/api/user").set("Cookie", cookieID);
          expect(response.status).toEqual(200);
          expect(response.body.favorites).toEqual(["EUR", "GBP"]);
          expect(response.body.base_currency).toBe("EUR");
          expect(response.body.created_at).toBe(userData.created_at);
          expect(response.body.updated_at).toBe(userData.updated_at);
     });
     test("test Errors", async () => {
          const response = await request(app!).get("/api/currency");
          expect(response.status).toBeLessThan(400);
          expect(response.status).toBeLessThan(600);
     });
});
