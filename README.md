# React Document Timeline

[**Demo**](https://jsainsburyplc.github.io/react-timelines/)

## Install

```sh
# with npm
npm install react-document-timeline

# or with Yarn
yarn add react-document-timeline
```

## Use

```js
import TimelineComponent from 'react-document-timeline'

const MyWidget = () => <TimelineComponent {...props} />

export default MyWidget
```

## Styling

### Using Webpack

Using Webpack with CSS loader, add the following:

```js
import 'react-document-timeline/lib/style.css'
```

### Using Sass (SCSS)

Using Sass you can configure the timeline with variables:

```scss
$react-timelines-font-family: MaryAnn;
$react-timelines-sidebar-width: 320px;

@import '~/react-document-timeline/src/scss/style';
```

### Without build tools

Create a CSS file with the contents of `react-timelines/lib/style.css` and include it in `<head>`
