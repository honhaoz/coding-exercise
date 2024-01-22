const fs = require("fs");
function convertFileDataToJSONObject(data) {
  // stringify the data readed from the file
  let stringifiedData = data.toString();
  // This will convert the stringified data into an array of individual strings of number followed by a word
  const dataArray = stringifiedData.split("\r\n");
  let numberAndWord = {};
  let splitedNumberAndWord;
  let num;
  let word;
  dataArray.forEach((singleMessage) => {
    // Each message is converted into an array of number followed by a word
    splitedNumberAndWord = singleMessage.split(" ");
    // Acquire the number
    num = splitedNumberAndWord[0];
    // Acquire the word
    word = splitedNumberAndWord[1];
    // append this key-value pair of number and word into a JSON object and sort it by number in an ascending order
    numberAndWord[num] = word;
  });
  return numberAndWord;
}

function decode(filePath) {
  const data = fs.readFileSync(`${filePath}`);
  // convert the data read from the file into a JSON object which has number as the key and the followed word as the value
  messagesObject = convertFileDataToJSONObject(data);
  let interval = 1;
  let decodedMessage = "";
  let indicator = 1;
  let numsOfMessages = Object.keys(messagesObject).length;
  // Indicator that points to the right word will increase by a interval that increased by 1 with every loop
  while (indicator <= numsOfMessages) {
    // append the right word at the end of the decoded string with an empty space
    decodedMessage += messagesObject[indicator] + " ";
    interval++;
    indicator += interval;
  }
  // remove any spaces at the beginning and the end of the decoded message
  return decodedMessage.trim(" ");
}

