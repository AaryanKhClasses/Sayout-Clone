# Sayout - Clone
### Welcome to the full-on tutorial guide on how you can make an anonymous messaging service by yourself!

### In the last part, we completed the login & registration systems. Now, we are actually going to create the "profiles" messages sending system.

---

## Viewing Profiles
### To view the profiles of the users, we would need to make a separate page / route for every user. But luckily, `express` provides us the feature of **`Dynamic Routing`**. To create a dynamic route, write the code in our `server.ts` file:
```ts
// Dynamic Route to the user's profile 
app.get(`/:username`, async(req: Request, res: Response) => {
    // Get the username from the URL
    const username = req.params.username
    
    // Get the user from the username above
    const user = await model.findOne({ username: username })

    // If the user doesn't exist, return the "404" error file
    if(!user) return res.sendFile(path.join(__dirname, '../src/public/404_profile.html'))
    // Else, show the user's profile
    res.sendFile(path.join(__dirname, '../src/public/profile.html'))
})
```
### Now, we need to create two files, namely `404_profile.html` and `profile.html` in the `src/public` folder.

---

## 404_Profile.HTML
### Whenever a user tries to view a profile that doesn't exist, we would need to show the 404 error page.
### As you saw earlier, we wrote the `if(!user) return res.sendFile(path.join(__dirname, '../src/public/404_profile.html'))` line in the `server.js` file. So, we need to make a "404_profile.html" file.
### Create the file in the `src/public` folder saying there is an invalid profile.

---

## Viewing Profiles
### If the profile URL is valid, then we need to show the user profile to the user. We will create a dynamic `profile.html` file for this!
### In `src/public` folder, create the file and write the following in the `<body>` tag:
```html
<h1 id="uname">Profile</h1>
<textarea id="message" maxlength="300" style="width: 250px; height: 300px; padding: 8px; font-size: 18.89px;"></textarea><br>
<button id="send" style="margin-top: 10px;">▶️ Send</button>
```

### As you can see, we created a heading with the id `uname`, a textarea (text box) with the id `message`, and a button with the id `send`.
### To add functionality to this, we would need to create a new file called `profile.ts` in the `src/public` folder.

---

## Profile.TS
### In the `profile.ts` file, write the following:
```ts
// Get the username, message box and send button from the document
const message = document.querySelector<HTMLTextAreaElement>('#message')
const uname = document.querySelector<HTMLParagraphElement>('#uname')
const send = document.querySelector<HTMLButtonElement>('#send')

// Fetch the dynamic user profile endpoint with the POST Method
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
    // Now set the `uname` text to the user profile's name
    if(uname) uname.innerText = data.username
})

// Whenever the `send` button is clicked
send?.addEventListener('click', () => {
    // If the message box is empty, give an error
    if(message?.value === '' || message?.value === undefined || message?.value === null) return alert('Please enter a message to send.')

    // Else, fetch the dynamic user `/send` endpoint with the POST Method
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
    // After sending the message, set the message box text as empty, and tell the user that the message is sent!
    if(message) message.value = ''
    alert('Successfully sent message!')
})
```

---

## Dynamic Profile '/send' endpoint
### As you saw earlier, we used a `/send` endpoint to send the message. We will create that now. In the `server.ts` file, add the following:
```ts
// The Dynamic User `/send` endpoint
app.post('/:username/send', async (req: Request, res: Response) => {
    // Get the username and message from the request
    const username = req.body.username
    const message = req.body.message

    // Send the message to the database
    await model.findOneAndUpdate({ username: username }, { $push: { msgs: message } }, { upsert: true })
})
```

---

### We have now created the entire message sending system. That is the end of the project. You can go through everything by clicking [here](./08_end.md)

---