/* global describe, it */
const { assert } = require( "chai" );
const { createElement, emptyElements } = require( "../src/createElement" );

describe( "createElement", () =>
{
	describe( "#innerHTML", () =>
	{
		it( "should return an HTML element using the innerHTML provided", () =>
		{
			assert.equal(
				createElement(
					"<h1>Hello, world</h1>",
					"article",
					{
						class: "post post--new",
						"data-example": "Lorem ipsum",
					},
				),
				"<article class=\"post post--new\" data-example=\"Lorem ipsum\"><h1>Hello, world</h1></article>",
			);
		} );

		it( "should ignore innerHTML when rendering empty elements", () =>
		{
			assert.equal(
				createElement(
					"<p>Hello, world</p>",
					"img",
					{
						src: "https://example.com/example.jpg",
					},
				),
				"<img src=\"https://example.com/example.jpg\">",
			);
		} );
	} );

	describe( "#name", () =>
	{
		it( "should return an HTML element using the name provided", () =>
		{
			assert.equal( createElement( undefined, "a" ), "<a></a>" );
		} );

		it( "should return only innerHTML if name is falsy", () =>
		{
			assert.equal(
				createElement(
					"hello, world",
					undefined,
					{
						width: 500,
					},
					true,
				),
				"hello, world",
			);
		} );

		it( "should return self-closing tag if name is an empty element", () =>
		{
			emptyElements.forEach( ( name ) =>
			{
				assert.equal(
					createElement( undefined, name ),
					`<${name}>`,
				);
			} );
		} );
	} );

	describe( "#attributes", () =>
	{
		it( "should return an HTML element using the attributes provided", () =>
		{
			assert.equal(
				createElement(
					undefined,
					"article",
					{
						class: "post post--new",
						"data-example": "Lorem ipsum",
					},
				),
				"<article class=\"post post--new\" data-example=\"Lorem ipsum\"></article>",
			);
		} );

		it( "should omit attributes whose values are undefined or null", () =>
		{
			assert.equal(
				createElement(
					undefined,
					"article",
					{
						class: "card",
						href: undefined,
						"data-example": null,
						"aria-hidden": false,
					},
				),
				"<article class=\"card\" aria-hidden=\"false\"></article>",
			);
		} );

		it( "should use `classnames` if `class` attribute value is an array", () =>
		{
			assert.equal(
				createElement(
					undefined,
					"div",
					{
						class: [
							"block",
							undefined,
							"block__element",
							false,
							"block__element--modifier",
						],
					},
				),
				"<div class=\"block block__element block__element--modifier\"></div>",
			);
		} );

		it( "should use `styles` if `style` attribute value is an Object", () =>
		{
			assert.equal(
				createElement(
					undefined,
					"div",
					{
						style: {
							"--custom-property": "10px",
							"--false-property": false,
							"--null-property": null,
							"--undefined-property": undefined,
							"background-color": "red",
						},
					},
				),
				"<div style=\"--custom-property: 10px; background-color: red\"></div>",
			);
		} );
	} );
} );
