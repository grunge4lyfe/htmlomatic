# htmlomatic

A small command-line tool to use templating in plain HTML files.

### Overview

Have you ever wanted to include some HTML in multiple files without copy-pasting?
Then you've come to the right place!

### Getting Started

The global command-line tool can be installed using the following command:
```
npm install -g htmlomatic
```

Templates are built by specifying a file search path and an output directory:
```
htmlomatic ./example/*.html -o ./output/
```
This will take all files with the `.html` extension in the `example` directory and process them as template files. The resulting files will be written to the `output` directory.

A simple example of what a template file looks like:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
</head>
<body>
    <!-- #include ../partials/header.html -->
    <h1>Hello, world!</h1>
</body>
</html>
```
The processor will collect all includes and replace them with the specified file's contents. For example, `partials/header.html` could look like this:
```html
<header>
    <li>
        <a href="index.html">Home</a>
    </li>
    <li>
        <a href="blog.html">Blog</a>
    </li>
</header>
```

The final result would look something like this:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
</head>
<body>
    <header>
        <li>
            <a href="index.html">Home</a>
        </li>
        <li>
            <a href="blog.html">Blog</a>
        </li>
    </header>
    <h1>Hello, world!</h1>
</body>
</html>
```
Don't forget to have a look at the [example project](https://github.com/grunge4lyfe/htmlomatic/tree/trunk/example) for a real-world example on how to structure your project!

### Goals

- Create a simple command-line interface (CLI) to easily generate static HTML pages.
- Provide a small library to make it easy to use the parsing code in your own projects.
- Provide easy-to-understand examples and basic documentation on how to use the tool.

### Non-Goals

- Create an advanced templating language with features such as control keywords (`if`, `for`, `while`, etc.)
- Substitute existing templating languages as used in Express.js such as Pug and JSX.

### License

This project uses the [MIT License](https://github.com/grunge4lyfe/htmlomatic/blob/trunk/LICENSE) for all source code provided.