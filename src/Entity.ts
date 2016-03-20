import {Vector2} from "./utils/Maths";
import Area from "./Area";
import * as AreaManager from "./AreaManager";

export default class Entity
{
    public position: Vector2;
    public rotation: Vector2;
    public scale: Vector2;
    public area: Area = null;
    public id: number = 0;

    constructor(position?: Vector2, rotation?: Vector2, scale?: Vector2)
    {
        this.position = (position || new Vector2(0, 0));
        this.rotation = (rotation || new Vector2(0, 0));
        this.scale = (scale || new Vector2(1, 1));
    }

    public changeArea(sector: Vector2)
    {
        if (this.area) this.area.removeEntity(this);
        this.area = (AreaManager.getByName(`Area ${sector.x}-${sector.y}`) || AreaManager.add(new Area(sector)));
        this.area.addEntity(this);
    }

    public onTick(){};
}
