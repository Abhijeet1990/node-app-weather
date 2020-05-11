// client side java script that is going to run in the broswer
console.log('Client side code')

// fetch api of browser
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent='Loading location..'
messageTwo.textContent='Loading forcast..'

//event listener
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault() // prevents the refresh of browser
    const location = search.value // input value in the html page
    fetch('http://127.0.0.1:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent= data.error
            messageTwo.textContent='As no location, there is no forecast'
        }else{
            messageOne.textContent=data.loc
            messageTwo.textContent=JSON.stringify(data.forecast)
        }
    })
})
})