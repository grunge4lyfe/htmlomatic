# htmlomatic

A small command-line tool that allows templating in plain HTML files.

### Overview

Ever wished you could include one HTML file into another to build static websites more efficiently?
Then htmlomatic is what you're looking for!

### Getting Started

Templates are built by specifying a file search path and an output directory:
```
htmlomatic ./example/*.html ./output/
```
This will take all files with the `.html` extension in the `example` directory and process them as template files. The resulting files will be written to the `output` directory.

A simple example of what a template file looks like:
```html
<!DOCTYPE html>
<html>
<head>
    <!-- #include ../partials/head.html -->
    <title>Test</title>
</head>
<body>
    <header>
        <li>
            <a href="#">Button #1</a>
        </li>
    </header>
    <!-- #include ../partials/footer.html -->
</body>
</html>
```
The processor will collect all includes and replace them with the specified file's contents. For example, `partials/head.html` could look like this:
```html
<meta charset="utf-8">
<meta name="viewport" content="initial-width=device-width">
```

The final result would look something like this:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-width=device-width">
    <title>Test</title>
</head>
<body>
    <header>
        <li>
            <a href="#">Button #1</a>
        </li>
    </header>
    <footer>
        Copyright &copy; Example
    </footer>
</body>
</html>
```
