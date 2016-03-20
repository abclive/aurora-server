// Typescript adaptation of rahatah Vector2 js class
export class Vector2
{
    public x: number;
    public y: number;

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    public add(x: any, y?: number)
    {
        if (typeof x == 'Vector2')
        {
            this.x += x.x;
            this.y += x.y;
        }
        else
        {
            this.x += x;
            this.y += y;
        }
    }

    public sub(x: any, y?: number)
    {
        if (typeof x == 'Vector2')
        {
            this.x -= x.x;
            this.y -= x.y;
        }
        else
        {
            this.x -= x;
            this.y -= y;
        }
    }

    public mul(x: any, y?: number)
    {
        if (typeof x == 'Vector2')
        {
            this.x *= x.x;
            this.y *= x.y;
        }
        else
        {
            this.x *= x;
            this.y *= y;
        }
    }

    public distance(x: any, y?: number)
    {
        return Math.sqrt(this.distanceSq(x, y));
    }

    public distanceSq(x: any, y?: number)
    {
        let dx, dy;
        if (typeof x == 'Vector2')
        {
            dx = x.x - this.x;
            dy = x.y - this.y;
        }
        else
        {
            dx = x - this.x;
            dy = y - this.y;
        }
        return dx * dx + dy * dy;
    }

    public rotate(rad: number)
    {
        let cos = Math.cos(rad);
        let sin = Math.sin(rad);
        this.x = this.x * cos - this.y * sin;
        this.y = this.x * sin - this.y * cos;
    }

    public rotateDeg(deg: number)
    {
        this.rotate(deg / 180 * Math.PI);
    }

    public length()
    {
        return Math.sqrt(this.lengthSq());
    }

    public lengthSq()
    {
        return this.x * this.x + this.y * this.y;
    }

    public clone()
    {
        return new Vector2(this.x, this.y);
    }
}
