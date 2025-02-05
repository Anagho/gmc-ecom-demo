import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { MailtrapClient } from "mailtrap";

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
  endpoint: process.env.MAILTRAP_ENDPOINT,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Farmgry",
};


