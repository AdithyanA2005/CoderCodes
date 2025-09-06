import config from "@payload-config";
import { getPayload } from "payload";

declare global {
  var __payloadClient: Awaited<ReturnType<typeof getPayload>> | undefined;
}

export async function getPayloadClient() {
  if (global.__payloadClient) return global.__payloadClient;
  global.__payloadClient = await getPayload({ config });
  return global.__payloadClient;
}
