
class GetSet {
    a: WebSocket | null = null;
    listeners: Record<number, (str: string) => void> = {};

    get = () => {
        return this.a;
    };

    set = (newA: () => WebSocket) => {
        if (this.a === null) {
            console.log("Creating new websocket");

            const ws = newA();

            ws.onmessage = evt => {
                const msg = JSON.parse(evt.data)

                console.log(msg)
            }

            this.a = ws;
        }
    };

    registerHandler = (id: number, cv: (str: string) => void) => {
        this.listeners[id] = cv;
    };

    send = (data: string) => {
        if (this.a !== null) {
            this.a.send(data);
        }
    };
}

export default new GetSet();