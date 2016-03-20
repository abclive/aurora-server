import Area from "./Area";
import {Vector2} from "./utils/Maths";

let areaList: Area[] = [];
export const WELCOME_AREA = new Vector2(0, 0);

export function add(area: Area) : Area
{
    areaList.push(area);
    return area;
}

export function remove(area: Area)
{
    let index = areaList.indexOf(area);
    areaList.splice(index, 1);
}

export function getById(id: number) : Area
{
    return areaList[id];
}

export function getByName(name: string) : Area
{
    for (let area of areaList)
    {
        if (area.name === name)
            return area;
    }
    return null;
}

export function onTick()
{
    for (let area of areaList)
        area.onTick();
}
