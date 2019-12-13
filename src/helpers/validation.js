const validate = (val, rules, connectedValue) => {
    let isValid = true;

    for (let rule in rules) {
        switch (rule) {
            case 'isEmail':
                isValid = isValid && emailValidator(val);
                break;
            case 'minLenght':
                isValid = isValid && minLenghtValidator(val, rules[rule]);
                break;
            case 'isUsername':
                isValid = isValid && minLenghtValidator(val, rules[rule]) && notEmptyValidator(val);
                break;
            case 'equalTo':
                isValid = isValid && equalToValidator(val, connectedValue[rule]);
                break;
            case "notEmpty":
                isValid = isValid && notEmptyValidator(val);
                break;
            case "isPhone":
                isValid = isValid && notEmptyValidator(val) && isNumber(val);
                break;
            default:
                isValid = true;
        }
    }

    return isValid;
}
const emailValidator = val => {
    let regix = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regix.test(String(val));
};

const minLenghtValidator = (val, minLenght) => {

    return (String(val).length >= Number(minLenght));
};

const equalToValidator = (val, checkValue) => {
    return val === checkValue;
};

const notEmptyValidator = val => {
    return val.trim() !== "";
};

const isNumber = val => {
    // var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;          bez plusa 10 karaktera
    // var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;          sa plusom 10 karaktera
    var phoneno10 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var phoneno9 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;          // sa 9 karaktera
    if (val.match(phoneno10) || val.match(phoneno9) ) {
        return true;
    }
    else {
        return false;
    }
};

export { validate };