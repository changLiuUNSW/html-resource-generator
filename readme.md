[![NPM Version](http://img.shields.io/npm/v/html-resource-generator.svg?style=flat)](https://www.npmjs.org/package/html-resource-generator)

# html-resource-generator

A CLI tool that extract style and script resources from html


## Install

```
npm install -g html-resource-generator
```

## Usage

`hrg -h` shows the help:

```
  Usage
    $ hrg <input>
    Options
      --out, -o      Output file name. Default: manifest.json
      --prefix, -p   Add prefix to the path of external resources
      --help, -h     show help
      --version      show version
    Examples
      $ hrg index.html -o manifest.json
```

### Examples

Assume we have `index.html` like this:

```html
<!doctype html>
<html lang="en-AU">

<head>
    <link href="/client/dist/styles.d1f7c9f576103c62cb95.bundle.css" rel="stylesheet" />
</head>
<body>
    <script type="text/javascript">
        function inline() {
            console.log('inline');
        }
    </script>
    <script type="text/javascript" src="/client/dist/main.c2e1bcb424c7762ae48a.bundle.js"></script>
</body>
</html>
```

`hrg index.html -o manifest.json` gives following ```manifest.json```.

```json
{
  "styles": [
    { "inline": false, "value": "/client/dist/styles.d1f7c9f576103c62cb95.bundle.css" }
  ],
  "scripts": [
    {
      "inline": true,
      "value": "\n        function inline() {\n            console.log('inline');\n        }\n    "
    },
    { "inline": false, "value": "/client/dist/main.c2e1bcb424c7762ae48a.bundle.js" }
  ]
}
```

`hrg index.html -o manifest.json -p myapp` gives following ```manifest.json```.

```json
{
  "styles": [
    { "inline": false, "value": "myapp/client/dist/styles.d1f7c9f576103c62cb95.bundle.css" }
  ],
  "scripts": [
    {
      "inline": true,
      "value": "\n        function inline() {\n            console.log('inline');\n        }\n    "
    },
    { "inline": false, "value": "myapp/client/dist/main.c2e1bcb424c7762ae48a.bundle.js" }
  ]
}
```

## Latest Changes

- Check [CHANGELOG.md](/CHANGELOG.md)

## LICENSE

MIT
