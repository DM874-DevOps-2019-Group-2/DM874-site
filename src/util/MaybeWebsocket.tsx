
class GetSet {
    a: WebSocket | null = null;
    listeners: Map<number, (str: string) => void> = new Map();

    get = () => {
        return this.a;
    };

    set = (newA: () => WebSocket) => {
        if (this.a === null) {
            console.log("Creating new websocket");

            const ws = newA();

            ws.onmessage = evt => {
                this.listeners.forEach((cb) => cb(evt.data))
            };

            this.a = ws;
        }
    };

    registerHandler = (id: number, cv: (str: string) => void) => {
        this.listeners.set(id, cv);
    };

    send = (data: string) => {
        if (this.a !== null) {
            this.a.send(data);
        }
    };
}

export default new GetSet();