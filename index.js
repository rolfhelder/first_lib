import { match } from 'assert';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.log(chalk.blue('Begin!'));

// getLinks with regex.exec
function getLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^\)]*)\)/gm;
  const resultArray = [];
  let temp

  while ((temp = regex.exec(text)) !== null) {
    
    resultArray.push({ [temp[1]]: temp[2]})
  }

  return resultArray.length === 0 ? 'No links found on archive' : resultArray;
}

function handleError(err) {
  throw err = new Error(chalk.redBright(err.code,'!!!file path error!!!'));
}

async function getUrlLinksFromFolder(folderPath) {
  const encoding = 'utf-8';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const absolutePath = path.join(__dirname,folderPath)
  const linkArray = []
  try {
  const folder = await fs.promises.readdir(absolutePath,{encoding})
  for (const file of folder) {
    const filePath = path.join(absolutePath,file)
    const data = await fs.promises.readFile(filePath, encoding) 
    
    linkArray.push(getLinks(data))
  }
  
  return linkArray;
  } catch(err){
    handleError(err);
  } 
} 

export {getUrlLinksFromFolder as default}

// Example functions with diferent forms than the final code



/*//getUrlLinksFromFolder with Promise.all
async function getUrlLinksFromFolder(folderPath) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const absolutePath = path.join(__dirname, folderPath);
  const encoding = 'utf-8';
  try {
    const folder = await fs.promises.readdir (absolutePath, { encoding });
    const result = await Promise.all(folder.map(async (file) => {
      const filePath = `${absolutePath}/${file}`;
      const data = await fs.promises.readFile(filePath, encoding);
      return getLinks(data);
    }));
    return result;
  } catch (err) {
    return handleError(err);
  }
 }
 */

/*// getLinks with text.match = returns an array with the complete string
function getLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^\)]*)\)/gm;
  const links = text.match(regex);
  console.log(chalk.blue(links));
}
*/

/*//getUrlLinksFromFile async/await 
async function getUrlLinksFromFile(filePath) {
  const encoding = 'utf-8';
  
  try {
  const data = await fs.promises.readFile(filePath, encoding) 
  const linkArray = getLinks(data) 
  //console.log(linkArray);
  return linkArray;
  } catch(err){
    handleError(err);
  } 
} 
*/

/*//getUrlLinksFromFile async promises.readfile
function getUrlLinksFromFile(filePath) {
  const encoding = 'utf-8';
  
  fs.promises
    .readFile(filePath, encoding)
    .then(data => console.log(chalk.green(data)))
    .catch((err) => handleError(err))
  }
*/

/*//getUrlLinksFromFile synchronous version
function getUrlLinksFromFile(filePath) {
  const encoding = 'utf-8';
  // readFile(file, [encoding], [callback]);
  fs.readFile(filePath, encoding , (err,data) => {

    if(err){
      handleError(err);
    }

    console.log(chalk.green(data));
  })
}
*/

