const request= require('request');

const geocode= (address, callback) =>  {
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidXJpbHVzIiwiYSI6ImNra2VyNjVhdTAwaDQyb281dHFyZXViNzgifQ.j5y6XsbsgrbIst10XbanWA&limit=1';
    
    request({url, json:true}, (error, response) =>  {
        const {body}= response;  //creating a body variable from response.body
        const {features}= body;  //creating a features variable from body.features
        //const {center,place_name}= features;
        console.log(features);
        if (error)  {
            callback('Unable to connect to location services!');
        } else if (response.body.features.length===0)  {
            console.log('this should be the error message');
            callback('Unable to find location!');
        } else {
            callback(undefined,{
                long: features[0].center[0],
                lat: features[0].center[1],
                location: features[0].place_name
            });
        }
    })
}

module.exports= geocode;