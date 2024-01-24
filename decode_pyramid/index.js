/* The codes are written in JavaScript. The decode function first converts the read data into 
into a JSON object which has number as the key and the followed word as the value.
The two correct words next to each other in two pyramid line are separated by an 
interval that is the same as the level of pyramid counted from top to bottom. Therefore, 
to know which is the correct word, an indicator starts at index 1 and initial interval of 1 
are used so that the word followed by the number equalling to the indicator is the correct word. 
And every time a correct word is obtained and added to the decoded message, the interval is increased
by 1 and the indicator is increased by current interval number. This process repeats until
the indicator exceeds the number of words.
*/
const fs = require("fs");
function decode(filePath) {
  const data = fs.readFileSync(`${filePath}`);
  // convert the data read from the file into a JSON object which has number as the key and the followed word as the value
  messagesObject = convertFileDataToJSONObject(data);
  let interval = 1;
  let decodedMessage = "";
  let indicator = 1;
  let numsOfWords = Object.keys(messagesObject).length;
  // Indicator that points to the right word will increase by an interval that increases by 1 with every loop
  while (indicator <= numsOfWords) {
    // append the correct word at the end of the decoded string with a space
    decodedMessage += messagesObject[indicator] + " ";
    interval++;
    indicator += interval;
  }
  // remove any spaces at the beginning and the end of the decoded message
  return decodedMessage.trim(" ");
}

function convertFileDataToJSONObject(data) {
  // turn the data read from the file into string
  let stringifiedData = data.toString();
  // This will convert the stringified data into an array of individual strings of number followed by a word
  const dataArray = stringifiedData.split("\r\n");
  let numbersAndWords = {};
  let splitedNumbersAndWords;
  let num;
  let word;
  dataArray.forEach((singleMessage) => {
    // Each message is converted into an array of number followed by a word
    splitedNumbersAndWords = singleMessage.split(" ");
    // Acquire the number
    num = splitedNumbersAndWords[0];
    // Acquire the word
    word = splitedNumbersAndWords[1];
    // append this key-value pair of number and word into a JSON object and sort it by number in ascending order
    numbersAndWords[num] = word;
  });
  return numbersAndWords;
}

console.log(decode("coding_qual_input.txt"))
console.log(decode("simple_example.txt"))