import PlayerConnection from "./PlayerConnection";
import Entity from "./Entity";
import * as AreaManager from "./AreaManager";
import {Vector2} from "./utils/Maths";

export default class Player extends Entity
{
    private life: number = 100;
    private name: string = "Player";
    public connection: PlayerConnection = null;

    constructor(connection: PlayerConnection, name: string)
    {
        super();
        this.connection = connection;
        this.name = name;
        console.log(`Player ${this.name} connected`);
        this.changeArea(AreaManager.WELCOME_AREA);
    }

    public changeArea(sector: Vector2)
    {
        super.changeArea(sector);
        this.connection.changeRoom(this.area.name);
        console.log(`Player joined area ${this.area.name}`);
    }

    public getLife() { return this.life; }
    public setLife(amount) { this.life = amount; }
    public getName() { return this.name; }
}
