/* eslint-disable valid-jsdoc */
const { createElement } = require( "./src/createElement" );

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
module.exports = ( eleventyConfig ) =>
{
	eleventyConfig.addPairedShortcode( "createElement", createElement );
};
