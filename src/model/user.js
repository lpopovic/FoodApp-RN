    class User {
        constructor(object) {
            this._id = object._id;
            this.username = object.username;
            this.image = object.image || "";
            this.email = object.email;
        }
     
    
        static createArrayTemplate(objectArray) {
    
            const arrayTemplate = objectArray.map(item => {
    
                return new User(item);
    
            })
            return arrayTemplate;
    
        }
    }
    
    export { User };