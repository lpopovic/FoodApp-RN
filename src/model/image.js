import { ROOT_URL_IMAGE } from '../service/api/url'

const IMAGE_KEY = {
    baseKey: '???',
    key11: '11',
    key11t: '11t',
    key169: '169',
    key169t: '169t',
}

class ImageAssets {
    constructor(object) {
        if (typeof object === 'object') {
            // this is a object
            this.link = object.link || '';
            this._id = object._id || '';
            this.setupImage11(this.link)
            this.setupImage11t(this.link)
            this.setupImage169(this.link)
            this.setupImage169t(this.link)
        }

    }

    setupImage11(link) {
        newLink = link.replace(IMAGE_KEY.baseKey, IMAGE_KEY.key11);
        this.image11 = `${ROOT_URL_IMAGE}${newLink}`
    }
    setupImage11t(link) {
        newLink = link.replace(IMAGE_KEY.baseKey, IMAGE_KEY.key11t);
        this.image11t = `${ROOT_URL_IMAGE}${newLink}`
    }
    setupImage169(link) {
        newLink = link.replace(IMAGE_KEY.baseKey, IMAGE_KEY.key169);
        this.image169 = `${ROOT_URL_IMAGE}${newLink}`
    }
    setupImage169t(link) {
        newLink = link.replace(IMAGE_KEY.baseKey, IMAGE_KEY.key169t);
        this.image169t = `${ROOT_URL_IMAGE}${newLink}`
    }
}

export { ImageAssets };