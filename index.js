const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const scrapper = require('./controller/ScrapeController');

app.get('/fetch',scrapper)
app.get('*',(req,res)=>{
    res.status(404).json({
        error : `You entered an invalid route. Please, enter this route -> '/api/rates', to use the exchange rate API service `
    })
})
app.listen(port,()=>{
    console.log(`This app is successfully running on port ${port}`)
})