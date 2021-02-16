const path= require('path');  //adds path node module
const express= require('express');  //this is the web server that serves up the different parts of the site
const { rawListeners } = require('process');  //adds process node module
const hbs= require('hbs');  //adds hbs node module
const request= require('request');  //adds request node module
const geocode= require('./utils/geocode');
const forecast= require('./utils/forecast');

//console.log(__dirname);  //   <-----the directory path where the folder containing the file for this code resides
//console.log(path.join(__dirname,'../public'));  //   <-----the directory path where the file for this code resides including the filename

const app= express();
const port= process.env.PORT || 3000;

const viewsPath= path.join(__dirname,'../templates/views');  //this points to the folder where the handlebars templates are kept
const partialsPath= path.join(__dirname,'../templates/partials');  //      "           "           partials

app.set('view engine','hbs');  //this sets up the handlebars engine for use with express
app.set('views',viewsPath);
app.use(express.static(path.join(__dirname,'../public') ));  //folder where static files are served to express
hbs.registerPartials(partialsPath);

app.get('/help',(req,res) =>  {
    res.render('help',{
        title:'Help page',
        message: 'This is the help page!',
        name: 'Adam Bennett'
    });
});

app.get('/about',(req,res) =>  {
    res.render('about',{
        title:'About page',
        name: 'Adam Bennett'
    });
});

app.get('',(req,res) =>  {
    res.render('index',{
        title:'Weather App',
        name:'Adam Bennett'
    });  //this renders an hbs template
});

app.get('/weather',(req,res) =>  {  //request and response
    if (!req.query.address)  {  //if there is no search term entered, this error will appear
        return res.send({  //send has to send back an Object
            error: 'You must provide a location to search!'
        });
    }

    geocode(req.query.address,(error,data) =>  {
        if (error)  {
            console.log('Error from app/src... ',error);
            return res.send({error});
        }
        console.log('Data',data);
        const {lat,long,location}= data;
        forecast(lat,long,(error,data) =>  {
            if (error)  {
                return res.send({error});
            }
            console.log('Error', error);
            console.log('Data', data);
            const {description,temperature,feelslike}= data;
            console.log("The sky is "+description+" in "+location+".  It is currently "+temperature+" degrees outside, it feels like "+feelslike+" degrees outside.");
            res.send({
                forecast: 'The sky is '+description+' in '+location+'.  It is currently '+temperature+' degrees outside, it feels like '+feelslike+' degrees outside.',
                location: location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req,res) =>  {
    if (!req.query.search)  {  //if there is no search term entered, this error will appear
        return res.send({
            error: 'You must provide a search term!'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*',(req,res) =>  {
    res.render('404',{
        title: '404 help error page',
        message: 'Help article not found!',
        name: 'Adam Bennett'
    });
});

app.get('*',(req,res) =>  {
    res.render('404',{
        title: '404 error page',
        message: 'Page not found!',
        name: 'Adam Bennett'
    });  
});

app.listen(port, () =>  {  //first is the port, second is the callback function when success happens
console.log('Server is running on port '+port+'!');
});

//app.com
//app.com/help
//app.com/about