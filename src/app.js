// express for web services or webserver
const express = require('express')
const path = require('path')
const hbs = require('hbs')

//response coming from the Utils
const output = require('./Utils/geocode.js')
const output1 = require('./Utils/forecast.js')

const app = express()

// Define paths for Express config
// providing the default path to the public directory
const publicDirectoryPath = path.join(__dirname,'../public')
// views path
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// dynamic pages using handle bars : hbs,with the customized folder name
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static path
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Abhijeet Sahu'
    }) // no need of .hbs extension
})

app.get('',(req,res)=>{
    res.send('Hello express')
})

// Two new routes added for the web server
/* app.get('/help',(req,res)=>{
    res.send({
        name:'Abhijeet',
        age:30
    })
}) */

app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Abhijeet',
        age:30
    })
})

/* app.get('/about',(req,res)=>{
    res.send('About page')
}) */

app.get('/about',(req,res)=>{
    res.render('about')
})

// Use the Utils geocode and forecast to send the response
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return  res.send({
           error:'No address given to find weather for'
       })
   }
   output.geocode(req.query.address, (errorMessage, {latitude, longitude,location}={}) => {
    if (errorMessage) {
        return res.send({
            error:errorMessage
        })
    }
    output1.forecast(latitude, longitude, (forecastError, forecastData) => {
        if (forecastError) {
            return console.log(forecastError)
        }
        res.send({
            loc: location,
            forecast: forecastData
        })
    })
})
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
         return  res.send({
            error:'You must provide a search'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Help',
        errormessage:'help page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errormessage:'page not found'
    })
})
// app.com
// app.com/help
// app.com/about

// server is listening on 3000 port
app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})