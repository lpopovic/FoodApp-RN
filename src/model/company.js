class CompanyRequest {
    constructor(object) {
        this.status = object.status
        this.text = object.text || 'Nije dostupan tekst'
        this._id = object._id
        this.company = object.company


    }

    static createArrayCompanyRequest(objectArray) {

        const arrayTemplate = objectArray.map(item => {

            return new CompanyRequest(item);

        })
        return arrayTemplate;

    }
    static getElementFromArrayCompanyRequest(objectArray) {

        const arrayTemplate = objectArray.find(item => item.status === null)

        return arrayTemplate || null
    }
}

export { CompanyRequest };