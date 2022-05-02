# Sayout - Clone
### Welcome to the full-on tutorial guide on how you can make an anonymous messaging service by yourself!

### Till now, we have initiated the project and created the directory structure. We have also initiated typescript.

---

## Express Server:
### For this project, we will be using `ExpressJS` as our server. For this, we will go to our `server.ts` file (Root -> src -> server.ts) and write the code to create the server.
```ts
import express, { Application, Request, Response } from 'express'
import path from 'path'

const app: Application = express()
app.use(express.json())
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../src/public/index.html'))
})

app.listen(3000, () => console.log('Application running on http://localhost:3000'))
```

### First we have imported out `express` and `path` libraries. Then we have created the "Application" app for our server and we are using the `express.json()` middleware to parse the incoming requests.
### The "/" route (main page) is rendered using the `res.sendFile()` method. Here, we are giving the path to the `index.html` file.
### **(NOTE: The path is `../src/public/index.html` and not `./public/index.html`. This is because the main file is localted in `./dist/src/main.js` and not `./src/main.ts`.)**
### Lastly, we are running the server on port 3000, logging doing so.

---

## Statics:
### Statics are the files that are served by the server (Example, your CSS & JS files).
### To serve static files, we will use the `app.use(express.static())` method. In the `express.static()` method, we are passing the path to the folder that contains the static files.
```ts
app.use(express.static(path.join(__dirname, '../src/public/')))
app.use(express.static(path.join(__dirname, './public')))
```
### The first static is for the "CSS" file (`style.css`) located in the `src/public` folder and the second is for the "JS" file (`index.js`) located in the `dist/src/public` folder.

---

## Running the server:
### Firstly, open the `package.json` file in the root directory and replace the `main` and `scripts` tags with:
```json
{
    "main": "./dist/server.js",
    "scripts": {
        "start": "node .",
        "dev": "nodemon ."
    }
}
```
### Now run the following command to run the server:
```sh
$ npm start
```
### You can also run the server in development mode by `npm run dev`.
### Now, open any web browser on your device and visit http://localhost:3000/. You will see a blank page (index.html) here!
### **If you are not seeing a blank page and seeing some error instead, make sure you have followed all steps above.**

---

## Read Next: [Index.HTML](./04_index_html.md)

---