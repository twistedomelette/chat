
export default function notifyHandler(aWss: { clients: { send: (arg0: string) => void; }[]; }, msg: string) {
    aWss.clients.forEach((cli: { send: (arg0: string) => void; }) => {
        cli.send(msg)
    })
}