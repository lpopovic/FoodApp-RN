class City {
    constructor(object) {
        this._id = object._id || '';
        this.name = object.name || '';
        this.setupCoordinate(object.location);



    }

    setupCoordinate = (location) => {
        if (location) {
            if (location.coordinates.length == 2) {
                this.coordinate = {
                    latitude: location.coordinates[1],
                    longitude: location.coordinates[0],
                }
            } else {
                this.coordinate = {
                    latitude: null,
                    longitude: null,
                }
            }

        } else {
            this.coordinate = {
                latitude: null,
                longitude: null,
            }
        }
    }
    static createArrayCity(objectArray) {

        const arrayCity = objectArray.map(item => {

            return new City(item);

        })
        return arrayCity;

    }
}

export { City };