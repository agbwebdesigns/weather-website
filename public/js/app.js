const weatherForm= document.querySelector('form');  //this saves the form information from the HTML document
const search= document.querySelector('input');  //this saves the input info from the form element
const messageOne= document.querySelector('#par1');
const messageTwo= document.querySelector('#par2');

weatherForm.addEventListener('submit',(e) =>  {  //e is the event that is being passed in
    e.preventDefault();  //this prevents the form from refreshing the page
    const location= search.value;  //this saves the value of the input box for use
    console.log('testing submit button!');
    console.log(location);
    messageOne.textContent= 'Loading...';
    messageTwo.textContent= '';
    fetch('/weather?address='+location).then((response) =>  {  //get the data from the url, then use it with the response parameter
    console.log('this is the response before the parse... '+response);
    response.json().then((data) =>  {  //get the json data from the response, then render it to the browser
        console.log('this is the response after the parse... '+data.error);
        if (data.error)  {
            console.log('this is the last stop for the error'+data.error);
            messageOne.textContent= data.error;
        } else {
            console.log('or maybe this is?'+data);
            messageOne.textContent= data.location;
            messageTwo.textContent= data.forecast;
        }
    });
});
});