const request= require('request');
;
const forecast= (lat,long,callback) =>  {
    const url= 'http://api.weatherstack.com/current?access_key=710b54d28aba5c8bab46ad2fb167e415&query='+lat+','+long+'&units=f'

    request({url,json:true},(error,response)=>  {
        const {body}= response;
        const {current}= body;
        console.log('this is the current information! '+current);
        const {weather_descriptions,wind_speed,wind_dir,temperature,feelslike}= current;
        console.log('this is the weather description!  '+weather_descriptions);
        if (error)  {  //error checking for if the user can connect at all
            callback('There was an error connecting!');
        } else if (response.body.error)  {  //error checking for location information
            callback('Unable to find location!');
        } else {  //if there are no problems
            callback(undefined,{
                description: weather_descriptions[0],
                windSpeed: wind_speed,
                windDir: wind_dir,
                temperature: temperature,
                feelslike: feelslike
            });
            const current= response.body.current;
        }
    });
}

module.exports= forecast;