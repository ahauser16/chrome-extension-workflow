# Title

This sample demonstrates how to run scripts on every page and how to use icons.

## Overview

### Extension Analysis: Reading Time Calculation for Articles
This script is designed to calculate the reading time for an article on a webpage and display it. Below is a detailed line-by-line analysis:

### `content.js` Breakdown
### 1. Selecting the Article Element: 
```
javascript
const article = document.querySelector("article");
```
This line uses `document.querySelector` to select the first `<article>` element from the DOM (Document Object Model). The ***article*** variable will hold a reference to this element.

---
### 2. Null Check: 
```
if (article) {
```
This "if statement" checks if the ***article*** variable is not `null`. `document.querySelector` returns `null` if no element matches the selector. This check ensures that the following code only runs if an `<article>` element is found on the page.

---
### 3. Extracting Text Content: 
```
  const wordMatchRegExp = /[^\s]+/g;
```
This line gets all the text content from the `<article>` element, including text from its child elements.

---
### 4. Regular Expression for Word Matching:
```
  const words = text.matchAll(wordMatchRegExp);
```
This regular expression `(/[^\s]+/g)` matches sequences of characters that are not whitespace. The `g` flag means it will match all occurrences in the text. This is used to count words in the variable named `article`.

---
### 5. Finding All Words: 
```
  const words = text.matchAll(wordMatchRegExp);
```
`text.matchAll(wordMatchRegExp)` uses the regular expression to find all word-like sequences in the text. It returns an iterator of all matches.

---
### 6. Counting Words: 
```
  const wordCount = [...words].length;
```
This line converts the iterator words into an array using the spread syntax `(...)` and then gets the length of this array. The length represents the total number of words in the article.

---
### 7. Calculating Reading Time: 
```
  const readingTime = Math.round(wordCount / 200);
```
This line calculates the reading time by dividing the wordCount by 200 (assuming an average reading speed of 200 words per minute) and rounding the result to the nearest whole number.

---
### 8. Creating a Paragraph Element: 
```
  const badge = document.createElement("p");
```
This line creates a new `<p>` element, which will be used to display the reading time, and is assigned to a variable called `badge`.

---
### 9. Styling the Badge: 
```
  badge.classList.add("color-secondary-text", "type--caption");
```
This line adds CSS classes to the `badge` variable for styling. These classes are assumed to be defined elsewhere, likely in the site's CSS.

---
### 10. Setting Badge Content: 
```
  badge.textContent = `⏱️ ${readingTime} min read`;
```
This line sets the text content of the `badge` variable to display the reading time, prefixed with a clock emoji.

---
### 11. Selecting the Heading: 
```
  const heading = article.querySelector("h1");
```
This line attempts to find the first `<h1>` element within the `article` element, which is typically the main heading of the article.

---
### 12. Selecting the Date Element: 
```
  const date = article.querySelector("time")?.parentNode;
```
This line tries to find a `<time>` element (representing the publication date) within the `article` and gets its parent node. The `?.` is optional chaining, which prevents an error if no `<time>` element is found.

---
### 13. Inserting the Badge: 
```
(date ?? heading).insertAdjacentElement("afterend", badge);
```
This line inserts the `badge` variable into the DOM. 
- `date` is expected to reference the parent node of an HTML `<time>` element if such an element is found within the article. If no `<time>` element is found, `date` will be `undefined` due to the use of optional chaining `(?.parentNode)`.
- `heading` is expected to reference an HTML `<h1>` element found within the `article`.

It uses the nullish coalescing operator `(??)` to choose between the `date` and `heading` variables. If `date` is **not** `null` or `undefined`, it inserts the `badge` after the `date` element's parent. If date is null or undefined, it inserts the badge after the heading element.

### 14. Summary:

In summary, this script calculates the reading time for an article and displays it in a styled paragraph element, inserted after either the publication date or the main heading of the article.

---

## Implementation Notes

#### We recommend using PNG files, but other file formats are allowed, except for SVG files.  See the table below for icon usage based on icon size.

| Icon size | Icon use                                              |
| --------- | ----------------------------------------------------- |
| 16x16     | Favicon on the extension's pages and context menu.    |
| 32x32     | Windows computers often require this size.            |
| 48x48     | Displays on the Extensions page.                      |
| 128x128   | Displays on installation and in the Chrome Web Store. |


## Running this extension

1. Clone this repository.
2. Load this directory in Chrome as an [unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).
3. _Add the rest of the instructions here_
