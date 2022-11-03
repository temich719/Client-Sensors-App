export class SensorDTO {
    name: string;
    model: string;
    type: string;
    rangeFrom: string;
    rangeTo: string;
    unit: string;
    location: string;
    description: string;

    constructor(name: string, model: string, type: string, rangeFrom: string, rangeTo: string, unit: string, location: string, description: string) {
        this.name = name;
        this.model = model;
        this.type = type;
        this.rangeFrom = rangeFrom;
        this.rangeTo = rangeTo;
        this.unit = unit;
        this.location = location;
        this.description = description;
    }
}