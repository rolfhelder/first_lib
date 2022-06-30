import chalk from 'chalk';
import fs from 'fs';
import getUrlLinksFromFolder from './index.js';

const cliArguments = process.argv;
const cliFilePathArgument = process.argv[2];

async function renderCliAnswer(folderPath) {
    const objAnswer = await getUrlLinksFromFolder(folderPath)
    console.log(chalk.yellow("Link's list\n"),objAnswer);
}

async function writeLinksInJsonFile(filePath) {
    const linkListObj = await getUrlLinksFromFile(filePath)
    
    fs.writeFile("link_list.json", JSON.stringify(linkListObj, null, 4), function(err) {
        if(err) {
            console.log("Error saving data to json file: " + err);
            return;
        }
        console.log("link_list.json created");
    }); 
}

renderCliAnswer(cliFilePathArgument);

//writeLinksInJsonFile(cliFilePathArgument);