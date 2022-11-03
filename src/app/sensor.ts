export class Sensor {
    id: number;
    name: string;
    model: string;
    type: string;
    range: string;
    unit: string;
    location: string;
    description: string;

    constructor(id: number, name: string, model: string, type: string, range: string, unit: string, location: string, description: string) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.type = type;
        this.range = range;
        this.unit = unit;
        this.location = location;
        this.description = description;
    }

}