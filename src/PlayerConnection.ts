import {io} from "./index";
import Player from "./Player";
import * as PlayerManager from "./PlayerManager";

export default class PlayerConnection
{
    public player: Player;
    public room: string = "";

    constructor(private socket: SocketIO.Socket)
    {
        console.log(`Client connected with ID ${this.socket.id}`);
        this.socket.on("disconnect", this.onDisconnect);
        this.socket.on("login", this.onLogin);
        this.socket.on("playerUpdate", this.onPlayerUpdate);
    }

    public changeRoom(roomName: string)
    {
        if (this.room.length > 0)
            this.socket.leave(this.room);
        this.socket.join(roomName);
        this.room = roomName;
    }

    private onDisconnect = () => {
        this.player.area.removeEntity(this.player);
        this.socket.leave(this.room);
        console.log(`Client ID ${this.socket.id} disconnected`);
        let player = PlayerManager.removeByConnection(this);
        if (player)
            console.log(`Player ${player.getName()} disconnected`);
    };

    private onLogin = (loginDetails) => {
        this.player = new Player(this, loginDetails.login);
        PlayerManager.add(this.player);
        this.socket.emit('logged', {playerId: this.player.id, sector: this.player.area.sector});
    };

    private onPlayerUpdate = (playerDetails) => {
        this.player.position = playerDetails.position;
        this.player.rotation = playerDetails.rotation;
        this.player.scale = playerDetails.scale;
    };
}
