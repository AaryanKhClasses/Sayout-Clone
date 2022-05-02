const message = document.querySelector<HTMLTextAreaElement>('#message')
const uname = document.querySelector<HTMLParagraphElement>('#uname')
const send = document.querySelector<HTMLButtonElement>('#send')
const title = document.querySelector<HTMLTitleElement>('title')

fetch(`/${window.location.href.replace('http://localhost:3000/', '')}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        username: window.location.href.replace('http://localhost:3000/', '')
    })
})
.then(res => res.json())
.then(data => {
    if(uname) uname.innerText = data.username
    if(title) title.innerText = `${data.username} - Sayout`
})

send?.addEventListener('click', () => {
    if(message?.value === '' || message?.value === undefined || message?.value === null) return alert('Please enter a message to send.')
    fetch(`/${window.location.href.replace('http://localhost:3000/', '')}/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: uname?.innerText,
            message: message?.value
        })
    })
    .then(res => res.json())
    if(message) message.value = ''
    alert('Successfully sent message!')
})