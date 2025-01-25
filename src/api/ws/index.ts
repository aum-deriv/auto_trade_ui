import { WSClient } from "./WSClient";
export { WSClient } from "./WSClient";
export { WSProvider, useWS } from "./WSProvider";

/**
 * Helper function to get the WebSocket client instance
 * @returns The singleton instance of WSClient
 */
export function getWSClient(): WSClient {
    return WSClient.getInstance();
}
