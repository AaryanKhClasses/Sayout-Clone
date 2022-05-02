# Sayout - Clone
### Welcome to the full-on tutorial guide on how you can make an anonymous messaging service by yourself!

### We have successfully created an express server in the last page. Now, we will setup the page itself.

---

## Index.HTML:
### For this project, we will be using `index.html` as our main page.
### Open the `index.html` file (root -> src -> public -> index.html) and write the following code:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Some title here</title>
</head>
<body></body>
</html>
```
### This is the basic structure of the html document.

---

## Body
### Inside the `body` tag, we will start to write our code. You can write your own code according to you. But for the basics, we will write some necessary code:
```html
<body>
    <div class="center">
        <h1>💬 Sayout - Clone</h1>
        <p style="margin-top: 75px; font-size: 50px;">💬 Sayout - Clone</p>
        <p style="margin-top: -50px; font-size: 20px;">An Anonymous Messaging Service!</p>
    </div>
</body>
```
### This is some info related to the website (Sayout - Clone) and the purpose of the website.
### Notice how we have the `div` as `class="center"`? We would need to import some style for this.
### Inside the `style.css` file, write the following:
```css
.center {
    text-align: center;
}
.hidden {
    display: none;
}
```
### This would center the text inside the `div` tag.
### Don't forget to import the `style.css` file in the webpage:
```html
<head>
    <link rel="stylesheet" href="./style.css">
</head>
```
### In the next part of this file, we would do the `login / register` part.

---

## Read Next: [Login System](./05_login.md)

---