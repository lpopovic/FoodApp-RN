

import { ImageAssets } from './index'

class Category {
    constructor(object) {

        this._id = object._id || '';
        this.isCuisine = object.isCuisine || false;
        this.name = object.name || '';
        this.image = new ImageAssets(object.image || {});


    }

    static createArrayCategory(objectArray) {

        const arrayTemplate = objectArray.map(item => {
            if (item) {
                // if (typeof item !== 'string') {
                    return new Category(item);
                // } else {
                //     return new Category({});
                // }
            } else {
                return new Category({});
            }


        })
        return arrayTemplate;

    }
}
export { Category };