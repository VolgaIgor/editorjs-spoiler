# Spoiler Block Tool for Editor.js
Ability to add a spoiler block with a title.

### Preview
![Preview image](https://raw.githubusercontent.com/VolgaIgor/editorjs-spoiler/refs/heads/main/asset/screenshot.png)

## Installation
### Install via NPM
Get the package

```shell
$ npm i editorjs-spoiler
```

Include module at your application

```javascript
import Spoiler from 'editorjs-spoiler';
```

### Load from CDN

You can load a specific version of the package from jsDelivr CDN.

Require this script on a page with Editor.js.

```html
<script src="https://cdn.jsdelivr.net/npm/editorjs-spoiler"></script>
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/editorjs-spoiler.bundle.js` file to your page.

## Usage
```javascript
const editor = EditorJS({
  // ...
  tools: {
    // ...
    spoiler: {
      class: Spoiler,
      config: {
        editorLibrary: EditorJS,
        editorTools: {
          header: {
            class: Header,
            inlineToolbar: false,
            config: {
              placeholder: 'Header'
            }
          },
          checklist: Checklist,
          delimiter: Delimiter,
          // ...
        }
      }
    },
  }
  // ...
});
```

### Config Params

| Field | Type     | Description        |
| ----- | -------- | ------------------ |
| editorLibrary | `object`   | EditorJS library |
| editorTools   | `object[]` | Configuration of editor blocks to be available in spoiler |
| editorTunes   | `object[]` | Configuration of editor block tunes to be available in spoiler |

## Output data

This Tool returns `data` with following format

| Field          | Type       | Description                      |
| -------------- | ---------  | -------------------------------- |
| caprion        | `string`   | Spoiler caption                  |
| content        | `object`   | Saved EditorJS data in spoiler   |