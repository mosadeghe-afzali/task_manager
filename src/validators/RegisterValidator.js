import { body } from 'express-validator';

const Registervalidator = () {
    body('name')
        .isString()
}

module.exports = {
    Registervalidator
}