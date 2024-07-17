// Function to tokenize a substring based on the breakers
function tokenizeSubstring(substring, breakers) {
  const tokens = [];
  let currentPos = 0;

  while (currentPos < substring.length) {
    let nearestMatch = null;
    let nearestMatchIndex = -1;
    let nearestBreaker = null;
    let nearestMatchLength = 0;

    for (const breaker of breakers) {
      const match = substring.slice(currentPos).match(breaker.value);
      if (
        match &&
        (nearestMatchIndex === -1 || match.index < nearestMatchIndex)
      ) {
        nearestMatch = match[0];
        nearestMatchIndex = match.index;
        nearestBreaker = breaker;
        nearestMatchLength = match[0].length;
      }
    }

    // EARLY EXIT CONDITION: there were no (more) breakers found;
    // Save the (reminder of) the substring as a token, and exit.
    if (nearestMatchIndex === -1) {
      const remainder = substring.slice(currentPos);
      tokens.push({
        str: remainder,
        delim: "",
        size: remainder.length,
      });
      break;
    }

    // CORNER CASE: Breaker found before actual content, at the very beginning of the
    // string.
    // We are only interested in such breakers is they have `shouldConsume` set to
    // `false`, since this means we need to preserve the  respective char(s).
    // This creates is a special a token with an empty `str`, a non-empty `delim`,
    // and a practical size equivalent to `delim.length`.
    if (
      nearestMatchIndex == 0 &&
      nearestBreaker &&
      nearestBreaker.shouldConsume === false
    ) {
      tokens.push({
        str: "",
        delim: nearestMatch,
        size: nearestMatchLength,
      });
    }

    // TYPICAL OPERATION: breaker found somewhere within the content.
    if (nearestMatchIndex > 0 && nearestBreaker) {
      const tokenStr = substring.slice(
        currentPos,
        currentPos + nearestMatchIndex
      );
      tokens.push({
        str: tokenStr,
        delim: nearestBreaker.shouldConsume === false ? nearestMatch : "",
        size:
          nearestBreaker.shouldConsume === false
            ? tokenStr.length + nearestMatchLength
            : tokenStr.length + 1,
      });
    }
    currentPos += nearestMatchIndex + nearestMatchLength;
  }

  return tokens;
}

export default function wrapText(
  text,
  colsNum = 80,
  gutters = null,
  breakers = null
) {
  if (!breakers) {
    breakers = [{ value: /\s+/, shouldConsume: true }];
  }
  // Step 1: Split text into substrings based on newline sequences
  const substrings = text.split(/\r\n|\n|\r/);

  // Step 2: Tokenize each substring
  const tokenizeFn = function ($substring) {
    return tokenizeSubstring($substring, breakers);
  };
  const tokenizedSubstrings = substrings.map(tokenizeFn, breakers);

  // Step 3: Compute capacity of each line based on gutters
  function getLineCapacity(lineIndex) {
    if (!gutters) return colsNum;
    const gutter = gutters[lineIndex] || gutters[gutters.length - 1];
    return colsNum - gutter.length;
  }

  // Step 4: Build virtual lines by fitting tokens within the available capacity
  const lines = [];
  tokenizedSubstrings.forEach((tokens, substringIndex) => {
    let currentLine = "";
    let currentLineLength = 0;
    let currentGutter = gutters
      ? gutters[lines.length] || gutters[gutters.length - 1]
      : "";

    tokens.forEach((token) => {
      const tokenSize = token.size;
      const lineCapacity = getLineCapacity(lines.length);

      if (currentLineLength + tokenSize <= lineCapacity) {
        currentLine += token.str + (token.delim || " ");
        currentLineLength += tokenSize;
      } else if (
        currentLineLength + tokenSize === lineCapacity + 1 &&
        token.delim === ""
      ) {
        currentLine += token.str;
        currentLineLength += tokenSize - 1; // No space added
      } else {
        lines.push(currentGutter + currentLine.trim());
        currentLine = token.str + (token.delim || " ");
        currentLineLength = tokenSize;
        currentGutter = gutters
          ? gutters[lines.length] || gutters[gutters.length - 1]
          : "";
      }
    });

    if (currentLine) {
      lines.push(currentGutter + currentLine.trim());
    }
  });

  return lines;
}