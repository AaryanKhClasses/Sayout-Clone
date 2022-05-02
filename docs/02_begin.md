# Sayout - Clone
### Welcome to the full-on tutorial guide on how you can make an anonymous messaging service by yourself!

### Earlier, we initiated the project and downloaded dependencies. Now lets begin to code!

---

## Initiating Typescript:
### Run the following command in your terminal to initiate typescript:
```sh
$ tsc --init
```
### **(NOTE: If the above command doesn't work, run the `npm i typescript -g` command and try again.)**

### After running the above command, you will see a file named `tsconfig.json` in your project folder. Open the file and put the following in the file (replacing all the existing text):
```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}

```

### This will set some rules for typescript to compile the code.
### Remember that typescript doesn't work on browsers, so we will need to compile the code to javascript so browsers can run it.
### To do so, create a folder named `dist` in the root directory.
### Now, run the following command in your terminal to auto-compile your code:
```sh
$ tsc -w
```

---

## Directory Structure
### Now, we will create a directory structure for our project.
### Create a folder named `src` in the root directory. Now create a folder named `public` in the `src` folder.
### Create an `index.html`, `style.css`, and `index.ts` files in the `public` folder.
### Also create two files, namely, `server.ts` and `model.ts` in the `src` folder.

---

## Read Next: [Setting up the server](./03_server.md)

---