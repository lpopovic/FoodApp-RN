class Template {
    constructor(object) {
        this.field = object.field || '';
        this.type = object.type || '';
        this.name = object.name || '';
        this.image = object.image || '';
    }
 

    static createArrayTemplate(objectArray) {

        const arrayTemplate = objectArray.map(item => {

            return new Template(item);

        })
        return arrayTemplate;

    }
}

export { Template };