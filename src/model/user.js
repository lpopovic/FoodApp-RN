class User {
    constructor(object) {
        this._id = object._id || 'Unknown id';
        this.username = object.username || 'Unknown username';
        this.name = object.name || 'Unknown name';
        this.lastName = object.lastName || 'Unknown last name';
        this.image = object.image;
        this.email = object.email || 'Unknown email';
        this.company = object.company;
        this.catheringOptions = object.catheringOptions;
        this.catheringIsAvailable = object.catheringIsAvailable
        this.address = object.address || []
        this.phoneNumber = object.phoneNumber || ''
    }

    static createArrayTemplate(objectArray) {

        const arrayTemplate = objectArray.map(item => {

            return new User(item);

        })
        return arrayTemplate;

    }
}

export { User };