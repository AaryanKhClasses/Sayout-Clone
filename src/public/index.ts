if(!localStorage.getItem('username')) localStorage.setItem('username', '')
if(!localStorage.getItem('password')) localStorage.setItem('password', '')

const not_login = document.querySelector<HTMLDivElement>('#not-login')
const login = document.querySelector<HTMLDivElement>('#login')
const messages = document.querySelector<HTMLDivElement>('#messages')

login?.classList.add('hidden')
messages?.classList.add('hidden')

if(localStorage.getItem('username') !== '' && localStorage.getItem('password') !== '') {
    not_login?.classList.add('hidden')
    login?.classList.remove('hidden')
    messages?.classList.remove('hidden')
}

const login_form = document.querySelector<HTMLFormElement>('#login-form')
login_form?.addEventListener('submit', (e) => {
    const username = login_form.querySelector<HTMLInputElement>('#login_username')
    const password = login_form.querySelector<HTMLInputElement>('#login_password')
    if((username?.value === '' || username?.value === null || username?.value === undefined) ||
    (password?.value === '' || password?.value === null || password?.value === undefined)) {
        login_form.reset()
        return alert('Please fill in the required credentials to log in.') 
    }

    e.preventDefault()
    fetch('/login', ({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    }))
    .then(res => res.json())
    .then(data => {
        if(data.error === 'inv_cred') return alert('Invalid Credentials. Please try again!')
        localStorage.setItem('username', username.value)
        localStorage.setItem('password', password.value)
        alert('User logged in successfully!')
        not_login?.classList.add('hidden')
        login?.classList.remove('hidden')
        messages?.classList.remove('hidden')

        if(login) login.innerHTML = `
            <h1>Welcome, ${localStorage.getItem('username')}!</h1>
        `
    })
})

const register_form = document.querySelector<HTMLFormElement>('#register-form')
register_form?.classList.add('hidden')
register_form?.addEventListener('submit', (e) => {
    const username = register_form.querySelector<HTMLInputElement>('#register_username')
    const password = register_form.querySelector<HTMLInputElement>('#register_password')
    const conf_password = register_form.querySelector<HTMLInputElement>('#register_conf_password')
    if((username?.value === '' || username?.value === null || username?.value === undefined) ||
    (password?.value === '' || password?.value === null || password?.value === undefined) ||
    (conf_password?.value === '' || conf_password?.value === null || conf_password?.value === undefined)) {
        register_form.reset()
        return alert('Please fill in the required credentials to register.') 
    }

    if(password.value !== conf_password.value) {
        register_form.reset()
        return alert('Passwords do not match. Please try again!')
    }

    e.preventDefault()
    fetch('/register', ({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    }))
    .then(res => res.json())
    .then(data => {
        if(data.error === 'user_exists') return alert('User already exists. Please try again!')
        localStorage.setItem('username', username.value)
        localStorage.setItem('password', password.value)
        alert('User registered successfully!')
        window.location.reload()
    })
})

const goto_register = document.querySelector<HTMLButtonElement>('#goto_register_btn')
goto_register?.addEventListener('click', () => {
    register_form?.classList.remove('hidden')
    login_form?.classList.add('hidden')
    goto_register?.classList.add('hidden')
    goto_login?.classList.remove('hidden')
})

const goto_login = document.querySelector<HTMLButtonElement>('#goto_login_btn')
goto_login?.addEventListener('click', () => {
    register_form?.classList.add('hidden')
    login_form?.classList.remove('hidden')
    goto_login?.classList.add('hidden')
    goto_register?.classList.remove('hidden')
})

goto_login?.classList.add('hidden')

fetch('/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
    })
})
.then(res => res.json())
.then(data => {
    if(login) login.innerHTML = `
        <h1>Welcome, ${localStorage.getItem('username')}!</h1>
    `
    if(data.msgs.length === 0) {
        const nomsg = messages?.appendChild(document.createElement('p'))
        if(nomsg) nomsg.innerHTML = 'No one has sent you any messages yet!<br><a id="share_link" style="color: #4169e1; cursor: pointer;">Share this link with your friends to have some.</a>'
    }

    data.msgs.forEach((msg: String) => {
        const msg_li = messages?.appendChild(document.createElement('li'))
        if(msg_li) msg_li.innerHTML = `${msg}`
    })
})

const share_link = document.querySelector<HTMLAnchorElement>('#share_link')
if(share_link) share_link.addEventListener("click", () => {
    console.log('clicked')
    navigator.clipboard.writeText(`https://localhost:3000/${localStorage.getItem('username')}`)
})