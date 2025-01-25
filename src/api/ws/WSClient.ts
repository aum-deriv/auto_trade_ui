/**
 * Types for WebSocket message handling
 */
interface WSMessage<T = unknown> {
    type: string;
    subscribe_id?: string;
    payload: T;
}

interface WSSubscription<T = unknown> {
    id: string;
    type: string;
    callback: (data: T) => void;
}

type MessageHandler<T = unknown> = (data: T) => void;

/**
 * WebSocket client singleton for handling streaming messages
 * with subscription management.
 */
export class WSClient {
    private static instance: WSClient;
    private ws: WebSocket | null = null;
    private subscriptions = new Map<string, WSSubscription<unknown>>();
    private messageHandlers = new Map<string, Set<MessageHandler<unknown>>>();
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000; // Start with 1 second
    private url: string = "";

    private constructor() {
        // Private constructor to enforce singleton pattern
    }

    /**
     * Get the singleton instance of WSClient
     */
    public static getInstance(): WSClient {
        if (!WSClient.instance) {
            WSClient.instance = new WSClient();
        }
        return WSClient.instance;
    }

    /**
     * Connect to the WebSocket server
     * @param url WebSocket server URL
     */
    public connect(url: string): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            console.warn("WebSocket is already connected");
            return;
        }

        this.url = url;
        this.ws = new WebSocket(url);
        this.setupEventHandlers();
    }

    /**
     * Subscribe to a specific message type
     * @param type Message type to subscribe to
     * @param callback Callback function to handle messages
     * @returns Subscription ID for unsubscribing
     */
    public subscribe<T>(type: string, callback: MessageHandler<T>): string {
        const subscriptionId = `${type}-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;

        this.subscriptions.set(subscriptionId, {
            id: subscriptionId,
            type,
            callback: callback as MessageHandler<unknown>,
        });

        if (!this.messageHandlers.has(type)) {
            this.messageHandlers.set(type, new Set());
        }
        this.messageHandlers
            .get(type)
            ?.add(callback as MessageHandler<unknown>);

        // Send subscription message to server
        this.sendMessage<{ type: string }>({
            type: "subscribe",
            subscribe_id: subscriptionId,
            payload: { type },
        });

        return subscriptionId;
    }

    /**
     * Unsubscribe from a subscription
     * @param subscriptionId ID of the subscription to remove
     */
    public unsubscribe(subscriptionId: string): void {
        const subscription = this.subscriptions.get(subscriptionId);
        if (!subscription) return;

        const { type, callback } = subscription;
        this.messageHandlers.get(type)?.delete(callback);
        this.subscriptions.delete(subscriptionId);

        // Send unsubscribe message to server
        this.sendMessage<{ type: string }>({
            type: "unsubscribe",
            subscribe_id: subscriptionId,
            payload: { type },
        });
    }

    /**
     * Close the WebSocket connection
     */
    public disconnect(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.resetState();
    }

    private setupEventHandlers(): void {
        if (!this.ws) return;

        this.ws.onopen = () => {
            console.log("WebSocket connected");
            this.reconnectAttempts = 0;
            this.reconnectDelay = 1000;

            // Resubscribe to all active subscriptions
            this.subscriptions.forEach((subscription) => {
                this.sendMessage<{ type: string }>({
                    type: "subscribe",
                    subscribe_id: subscription.id,
                    payload: { type: subscription.type },
                });
            });
        };

        this.ws.onmessage = (event: MessageEvent) => {
            try {
                const message: WSMessage<unknown> = JSON.parse(event.data);
                const handlers = this.messageHandlers.get(message.type);

                if (handlers) {
                    handlers.forEach((handler) => {
                        try {
                            handler(message.payload);
                        } catch (err) {
                            console.error("Error in message handler:", err);
                        }
                    });
                }
            } catch (err) {
                console.error("Error parsing WebSocket message:", err);
            }
        };

        this.ws.onclose = () => {
            console.log("WebSocket disconnected");
            this.handleReconnect();
        };

        this.ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }

    private handleReconnect(): void {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error("Max reconnection attempts reached");
            this.resetState();
            return;
        }

        this.reconnectAttempts++;
        const delay = Math.min(
            this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1),
            30000
        );

        console.log(
            `Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`
        );
        setTimeout(() => {
            if (this.url) {
                this.connect(this.url);
            }
        }, delay);
    }

    private sendMessage<T>(message: WSMessage<T>): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        } else {
            console.warn("WebSocket is not connected");
        }
    }

    private resetState(): void {
        this.ws = null;
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;
    }
}
