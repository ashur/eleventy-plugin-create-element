const classnames = require( "@aaashur/eleventy-plugin-classnames/src/classnames" );
const styles = require( "@aaashur/eleventy-plugin-styles/src/styles" );

/**
 * @see https://developer.mozilla.org/en-US/docs/Glossary/empty_element
 */
const emptyElements = [
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"keygen",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr",
];

module.exports.emptyElements = emptyElements;

/**
 * Create an HTML element
 *
 * @example
 * {% createElement "a", {
 *   class: "link",
 *   href: item.url
 * } %}
 *     {{ item.title }}
 * {% endcreateElement %}
 * // returns `<a class="link" href="https://example.com">Example</a>`
 *
 * @example
 * {% createElement "a" if false, {
 *   class: "link",
 *   href: item.url
 * } %}
 *     {{ item.title }}
 * {% endcreateElement %}
 * // returns `Example`
 *
 * @example
 * {% createElement "article", {
 *   class: "card",
 *   href: undefined
 * } %}{% endcreateElement %}
 * // returns `<article class="card"></article>`
 *
 * @example
 * {% createElement "div", {
 *   class: [
 *     "item",
 *     "item--truthy" if true,
 *     "item--falsy" if false,
 *   ],
 * } %}
 *     {{ item.title }}
 * {% endcreateElement %}
 * // returns `<div class="item item--truthy">Example</div>`
 *
 * @example
 * {% createElement "input", {
 *   type: "button"
 * }, true %}innerHTML will be ignored{% endcreateElement %}
 * // returns `<input type="button">`
 *
 * @param {string} innerHTML
 * @param {string} name - name of the HTML element
 * @param {Object} [attributes]
 * @return {string}
 */
module.exports.createElement = ( innerHTML, name, attributes = {} ) =>
{
	if( !name )
	{
		return innerHTML;
	}

	const attributesString = Object.entries( attributes )
		.map( ( [key, value] ) =>
		{
			if( key === "class" && Array.isArray( value ) )
			{
				return ` ${key}="${classnames.apply( null, value )}"`;
			}

			if( key === "style" && typeof value === "object" )
			{
				return ` ${key}="${styles( value )}"`;
			}

			if( value !== undefined && value !== null )
			{
				return ` ${key}="${value}"`;
			}
		} )
		.join( "" );

	const isEmpty = emptyElements.includes( name );

	const openingTag = `<${name}${attributesString}${ isEmpty ? "" : ">" }`;
	const tagContent = isEmpty ? "" : innerHTML || "";
	const closingTag = isEmpty ? ">" : `</${name}>`;

	return `${ openingTag }${ tagContent }${ closingTag }`;
};
