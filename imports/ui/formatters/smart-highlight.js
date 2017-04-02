import { Template } from 'meteor/templating';

Template.registerHelper('formatText', (context, search) => {
  let formattedText = `${context}`;

  if (typeof search !== 'string') {
    return '';
  }

  // Get the coordinate pairs of the string that need styling applied
  const pairs = [];
  const searchTokens = search.split(' ');
  for (let t = 0; t < searchTokens.length; t += 1) {
    if (searchTokens[t]) {
      const regex = new RegExp(searchTokens[t], 'gi');
      let result = regex.exec(formattedText);
      while (result !== null) {
        pairs.push([result.index, result.index + searchTokens[t].length]);
        result = regex.exec(formattedText);
      }
    }
  }

  // No pairs, no formatting
  if (pairs.length === 0) {
    return formattedText;
  }

  // Need to reduce the pairs, because they might overlap and lead us to insert bad HTML
  let count = 0;
  let found = false;
  const reduced = [];
  for (let c = 0; c < formattedText.length; c += 1) {
    found = false;
    for (let p = 0; p < pairs.length; p += 1) {
      if (c >= pairs[p][0] && c < pairs[p][1]) {
        found = true;
      }
    }

    if (found) {
      count += 1;
    } else {
      if (count > 0) {
        reduced.push([c - count, c]);
      }
      count = 0;
    }
  }

  // For the case when the end of the string is matched
  if (found) {
    reduced.push([formattedText.length - count, formattedText.length]);
  }

  // Insert the styling
  let offset = 0;
  const openB = '<b>';
  const closeB = '</b>';
  for (let p = 0; p < reduced.length; p += 1) {
    reduced[p][0] += offset;
    reduced[p][1] += offset;
    formattedText =
      formattedText.slice(0, reduced[p][0]) +
      openB +
      formattedText.slice(reduced[p][0], reduced[p][1]) +
      closeB +
      formattedText.slice(reduced[p][1]);

    // Offset calculated because the string gets longer after each tag
    offset += openB.length + closeB.length;
  }
  return formattedText;
});

export function smartHighlight(context, search) {
  let formattedText = `${context}`;

  if (typeof search !== 'string') {
    return '';
  }

  // Get the coordinate pairs of the string that need styling applied
  const pairs = [];
  const searchTokens = search.split(' ');
  for (let t = 0; t < searchTokens.length; t += 1) {
    if (searchTokens[t]) {
      const regex = new RegExp(searchTokens[t], 'gi');
      let result = regex.exec(formattedText);
      while (result !== null) {
        pairs.push([result.index, result.index + searchTokens[t].length]);
        result = regex.exec(formattedText);
      }
    }
  }

  // No pairs, no formatting
  if (pairs.length === 0) {
    return formattedText;
  }

  // Need to reduce the pairs, because they might overlap and lead us to insert bad HTML
  let count = 0;
  let found = false;
  const reduced = [];
  for (let c = 0; c < formattedText.length; c += 1) {
    found = false;
    for (let p = 0; p < pairs.length; p += 1) {
      if (c >= pairs[p][0] && c < pairs[p][1]) {
        found = true;
      }
    }

    if (found) {
      count += 1;
    } else {
      if (count > 0) {
        reduced.push([c - count, c]);
      }
      count = 0;
    }
  }

  // For the case when the end of the string is matched
  if (found) {
    reduced.push([formattedText.length - count, formattedText.length]);
  }

  // Insert the styling
  let offset = 0;
  const openB = '<b>';
  const closeB = '</b>';
  for (let p = 0; p < reduced.length; p += 1) {
    reduced[p][0] += offset;
    reduced[p][1] += offset;
    formattedText =
      formattedText.slice(0, reduced[p][0]) +
      openB +
      formattedText.slice(reduced[p][0], reduced[p][1]) +
      closeB +
      formattedText.slice(reduced[p][1]);

    // Offset calculated because the string gets longer after each tag
    offset += openB.length + closeB.length;
  }
  return formattedText;
}
