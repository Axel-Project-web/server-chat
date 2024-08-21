//ajv
const Ajv = require('ajv');
const ajv = new Ajv();

//schema
const schema = require('../schema/register.schema.json');

//validator
const validate = ajv.compile( schema );

function checkRegisterData(request, response, next) {
    const { body } = request;
    if (!validate( body )) {
        return response.status(400).json({
            error: 'Invalid body request.'
        })
    }
    next();
}

module.exports = { checkRegisterData }