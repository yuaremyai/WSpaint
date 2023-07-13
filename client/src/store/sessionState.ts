import { makeAutoObservable } from "mobx";

class SessionState {
    username: string = ''
    sessionID: string = ''
    socket!: WebSocket

    constructor() {
        makeAutoObservable(this)
    }

    setUsername(username: string) {
        this.username = username
    }

    setSessionID(id:string) {
        this.sessionID = id
    }

    setSocket(socket:WebSocket) {
        this.socket = socket
    }
}

export default new SessionState()