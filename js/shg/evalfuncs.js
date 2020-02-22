/**
 * evalfuncs.js
 *
 * Evaluation Functions for Simple HTML Generator lang
 */

function shg_evalDiv(line, params) {
  return "<div "+SimpleHTMLGenerator.encode(params)+">" + line + "</div>";
}

function shg_evalParagraph(line, params) {
  return "<p"+SimpleHTMLGenerator.encode(params)+">" + line + "</p>";
}

// add evaluation functions

SimpleHTMLGenerator.add("div", shg_evalDiv);
SimpleHTMLGenerator.add("para", shg_evalParagraph);
/*

// sample run
SimpleHTMLGenerator.push("div", {
  color: "black"
});
SimpleHTMLGenerator.push("para", {});
SimpleHTMLGenerator.parse("Hello World");
SimpleHTMLGenerator.pop();
SimpleHTMLGenerator.pop();
var html = SimpleHTMLGenerator.getData();
*/

SimpleHTMLGenerator.translate(document.getElementById("shg-src").innerHTML);
var html = SimpleHTMLGenerator.getData();
document.getElementById("shg-dst").innerHTML = html;
