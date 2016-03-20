import Player from "./Player";
import PlayerConnection from "./PlayerConnection";

export let playerList: Player[] = [];

export function add(player: Player) : void
{
    playerList.push(player);
}

export function getById(id: number) : Player
{
    return playerList[id];
}

export function getByName(name: string) : Player
{
    for (let player of playerList)
    {
        if (player.getName() === name)
            return player;
    }
}

export function removeByConnection(connection: PlayerConnection) : any
{
    for (let player of playerList)
    {
        if (player.connection === connection)
        {
            let index = playerList.indexOf(player);
            playerList.splice(index, 1);
            return player;
        }
    }
    return false;
}
