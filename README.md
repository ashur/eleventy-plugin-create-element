# eleventy-plugin-create-element

An [Eleventy](https://11ty.dev/) paired shortcode for building HTML elements, with support for dynamic tag names and attributes.

> Inspired by `React.createElement()`

## Setup

Run the following command at the root of your Eleventy project

```shell
npm install @aaashur/eleventy-plugin-create-element
```

then include it in your `.eleventy.js` config file:

```javascript
const createElement = require("@aaashur/eleventy-plugin-create-element");

module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(createElement);
};
```

## Usage

```njk
{% createElement <name>, [<attributes>] %}
    <innerHTML>
{% endcreateElement %}
```

Attributes with `null` or `undefined` values are omitted:

```njk
{% createElement "article", {
    class: "card",
    href: undefined,
    "data-example": null,
    "aria-hidden": false
} %}
    <p>Hello, world.</p>
{% endcreateElement %}
```

```html
<article class="card" aria-hidden="false">
    <p>Hello, world.</p>
</article>
```

---

If `attributes` contains a `class` property whose value is an array, [`classnames`](https://www.npmjs.com/package/@aaashur/eleventy-plugin-classnames) will be used automatically to return a space-delimited string containing only truthy, non-duplicate values:

```njk
{% createElement "div", {
    class: [
        "block",
        "block__element",
        "block__element--modifier" if false,
        "block"
    ]
} %}
    <p>Hello, world.</p>
{% endcreateElement %}
```

```html
<div class="block block__element">
    <p>Hello, world.</p>
</div>
```

---

If `attributes` contains a `style` property whose value is an object, [`styles`](https://www.npmjs.com/package/@aaashur/eleventy-plugin-styles) will be used automatically to return a semicolon-delimited string containing only truthy values:

```njk
{% createElement "div", {
    style: {
        "--custom-property": "10px",
        "--false-property": false,
        "--null-property": null,
        "--undefined-property": undefined,
        "background-color": "red"
    }
} %}
    <p>Hello, world.</p>
{% endcreateElement %}
```

```html
<div style="--custom-property: 10px; background-color: red"></div>
    <p>Hello, world.</p>
</div>
```

---

[Empty elements](https://developer.mozilla.org/en-US/docs/Glossary/empty_element) will build self-closing tags automatically:

```njk
{% createElement "input", { type: "button" } %}
    <p>innerHTML is ignored when building empty elements</p>
{% endcreateElement %}
```

```html
<input type="button">
```

---

If `name` is undefined, `createElement` will return `innerHTML` only:

```njk
{% createElement "a" if link, { href: link } -%}
    <p>Hello, world</p>
{%- endcreateElement %}
```

```html
<p>Hello, world</p>
```
