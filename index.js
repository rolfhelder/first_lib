import { match } from 'assert';
import chalk from 'chalk';
import fs from 'fs';
console.log(chalk.blue('Begin!'));

/*// getLinks with text.match = returns an array with the complete string
function getLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^\)]*)\)/gm;
  const links = text.match(regex);
  console.log(chalk.blue(links));
}
*/


// getLinks with regex.exec
function getLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^\)]*)\)/gm;
  const resultArray = [];
  let temp

  while ((temp = regex.exec(text)) !== null) {
    
    resultArray.push({ [temp[1]]: temp[2]})
  }

  return resultArray;
}

function processError(err) {
  throw err = new Error(chalk.redBright(err.code,'!!!file path error!!!'));
}

//getFile async/await 
async function getFile(filePath) {
  const encoding = 'utf-8';
  
  try {
  const data = await fs.promises.readFile(filePath, encoding)
  console.log(getLinks(data));  
    
  } catch(err){
    processError(err);
  } finally{
    console.log('\nProgram finalized');
  }
}
/*//getFile async promises.readfile
function getFile(filePath) {
  const encoding = 'utf-8';
  
  fs.promises
    .readFile(filePath, encoding)
    .then(data => console.log(chalk.green(data)))
    .catch((err) => processError(err))
  }
*/

/*//getFile synchronous version
function getFile(filePath) {
  const encoding = 'utf-8';
  // readFile(file, [encoding], [callback]);
  fs.readFile(filePath, encoding , (err,data) => {

    if(err){
      processError(err);
    }

    console.log(chalk.green(data));
  })
}
*/

getFile('./files/text1.md');