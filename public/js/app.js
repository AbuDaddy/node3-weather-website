console.log('Client side javascript loaded.')

const weatherForm = document.querySelector('form')
const search = document.querySelector('.search')
const messageOne = document.querySelector('.message-one')
const messageTwo = document.querySelector('.message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        return response.json()
    }).then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.forecast
            messageTwo.textContent = data.location
        }
    }).catch((error) => {
        messageOne.textContent = error
    })
})