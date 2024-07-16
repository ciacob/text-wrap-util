# text-wrap-util

`text-wrap-util` is a flexible and versatile JavaScript utility for text wrapping. It prioritizes existing line breaks within the text, supports custom break points, with the option of removing them or not from the text, and permits adding custom gutters or line prefixes.

## Features

- **Preserves Intrinsic Newlines**: Maintains existing newline sequences in the text.
- **Custom Break Points**: Supports user-defined break points using strings or regular expressions.
- **Custom Gutters**: Allows adding custom prefixes to each line.
- **Flexible Configuration**: Easily configurable for different text wrapping needs.

## Installation

To use this utility, clone the repository and install the dependencies:

```bash
git clone https://github.com/ciacob/text-wrap-util.git
cd text-wrap-util
npm install
```

## Usage
Import the wrapText function and use it as needed:

```javascript
import wrapText from './index.js';

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.";
const colsNum = 40;
const result = wrapText(text, colsNum);

console.log(result);
```

## Function Signature
```javascript
wrapText(text, colsNum = 80, gutters = null, breakers = null)
```

## Parameters
`text`: An arbitrary UTF-8 string in any language. This string may contain newline sequences such as `\n`, `\r\n`, `\r`.

`colsNum`: (Optional) An integer that specifies the number of characters to be fitted on each line of text. Defaults to `80`.

`gutters`: (Optional) An array of strings to prepend to each line of text based on availability rules.

`breakers`: (Optional) An array of objects, each having two keys: `value` (a string or regex) and `shouldConsume` (a boolean). Defaults to `[{ value: /\s+/, shouldConsume: true }]`.

## Return Value
Returns an array of strings, each representing a line of text.

## Examples
### Default Settings
```javascript
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.";
const colsNum = 40;

const result = wrapText(text, colsNum);
console.log(result);
// Output:
// [
//   "Lorem ipsum dolor sit amet, consectetur",
//   "adipiscing elit. Integer nec odio.",
//   "Praesent libero. Sed cursus ante",
//   "dapibus diam."
// ]
```

### Custom Gutters
```javascript
const gutters = ["Line 1: ", "Line 2: ", "Line 3: "];

const result = wrapText(text, colsNum, gutters);
console.log(result);
// Output:
// [
//   "Line 1: Lorem ipsum dolor sit amet,",
//   "Line 2: consectetur adipiscing elit.",
//   "Line 3: Integer nec odio.",
//   "Line 3: Praesent libero. Sed cursus",
//   "Line 3: ante dapibus diam."
// ]
```
### Custom Breakers
```javascript
const breakers = [{ value: /[,\.]/, shouldConsume: false }];

const result = wrapText(text, colsNum, null, breakers);
console.log(result);
// Output:
// [
//   "Lorem ipsum dolor sit amet,",
//   " consectetur adipiscing elit.",
//   " Integer nec odio.",
//   " Praesent libero.",
//   " Sed cursus ante dapibus diam."
// ]
```
### Custom Breakers with Consumption
```javascript
const breakers = [{ value: /[,\.]/, shouldConsume: true }];

const result = wrapText(text, colsNum, null, breakers);
console.log(result);
// Output:
// [
//   "Lorem ipsum dolor sit amet",
//   " consectetur adipiscing elit",
//   " Integer nec odio",
//   " Praesent libero",
//   " Sed cursus ante dapibus diam"
// ]
```

### Intrinsic Newline Sequences
```javascript
const textWithNewlines = "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nInteger nec odio. Praesent libero.\nSed cursus ante dapibus diam.";

const result = wrapText(textWithNewlines, colsNum);
console.log(result);
// Output:
// [
//   "Lorem ipsum dolor sit amet,",
//   "consectetur adipiscing elit.",
//   "Integer nec odio. Praesent libero.",
//   "Sed cursus ante dapibus diam."
// ]
```

## Tests
This project uses Mocha and Chai for testing. To run the tests, make sure you have these installed globally first:
```bash
npm install -g mocha chai
``` 

Then, to actually run the tests, do:
```bash
npm test
```

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that all tests pass (add more as needed) and that your code adheres to the project's coding standards.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
