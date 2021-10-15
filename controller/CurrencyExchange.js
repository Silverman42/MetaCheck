const validator = require('validatorjs');
const fetch = require('node-fetch');
module.exports = (req, res) => {
    let validation = new validator(req.query, {
        base: 'required|string',
        currency: 'required|string'
    });
    if (validation.fails() === true) {
        res.status(403).json(validation.errors.all());
    }
    const base = req.query.base.toUpperCase()
    const currency = req.query.currency.toUpperCase()

    fetch(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`)
    .then((response) => response.json())
    .then((response)=>{
        const exchangeResponse = response || {};
        if(exchangeResponse.hasOwnProperty('error')){
            return res.status(404).json(response)
        }
        res.json({
            results:response
        })
    })
    .catch(()=>{
        res.status(505).json({
            error: 'The exchange rate service can not be accessed currently. Please try again later'
        })
    })
}