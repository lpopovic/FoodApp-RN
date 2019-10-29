class City {
    constructor(object) {
        this._id = object._id || '';
        this.name = object.name || '';
    }
    static createArrayCity(objectArray) {

        const arrayCity = objectArray.map(item => {

            return new City(item);

        })
        return arrayCity;

    }
}

export { City };