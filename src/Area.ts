import Entity from "./Entity";
import {io} from "./index";
import * as AreaManager from "./AreaManager";
import {Vector2} from "./utils/Maths";

export default class Area
{
    public name: string;
    public sector: Vector2;
    public entityList: Entity[];

    constructor(sector: Vector2)
    {
        this.sector = sector;
        this.name = `Area ${sector.x}-${sector.y}`;
        this.entityList = [];
    }

    public addEntity(entity: Entity)
    {
        entity.id = this.entityList.length;
        this.entityList.push(entity);
    }

    public removeEntity(entity: Entity)
    {
        let index = this.entityList.indexOf(entity);
        this.entityList.splice(index, 1);
        if (this.entityList.length <= 0)
            AreaManager.remove(this);
    }

    public onTick()
    {
        for (let entity of this.entityList)
            entity.onTick();
        this.update();
    }

    public update()
    {
        let jsonEntityList = [];
        for (let entity of this.entityList)
        {
            jsonEntityList.push({
                serverId: entity.id,
                position: entity.position,
                rotation: entity.rotation,
                scale: entity.scale
            });
        }
        io.to(this.name).emit('updateEntities', jsonEntityList);
    }
}
