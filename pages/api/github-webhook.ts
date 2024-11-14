import dotenv from "dotenv";

dotenv.config();

import { WebHookEvent } from "./github/payload/events";
import { formatEvent } from "./github/format/eventFormatter";
import { sendTelegramMessage } from "./telegram/telegram";

import { Webhooks } from "@octokit/webhooks";

const webhookSecret = process.env.WEBHOOK_SECRET as string;

const webhooks = new Webhooks({
  secret: webhookSecret,
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  const headers = req.headers;
  const body = req.body;

  const signature = headers["x-hub-signature-256"];
  if (!(await webhooks.verify(JSON.stringify(body), signature))) {
    res.status(401).end("Unauthorized");
    return;
  }

  const eventType = headers["x-github-event"];
  const webhookEvent = new WebHookEvent(eventType, body);
  const message = formatEvent(webhookEvent);

  if (message !== undefined)
    await sendTelegramMessage(message);

  res.status(200).end();
}
