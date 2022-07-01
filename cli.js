import chalk from 'chalk';
import fs from 'fs';
import getUrlLinksFromFolder from './index.js';
import checkUrl from './checkUrl.js';

const cliArguments = process.argv;
const cliFilePathArgument = process.argv[2];
const option = process.argv[3];

//option --check == -c
async function renderCliAnswer(folderPath, option) {
    const objAnswer = await getUrlLinksFromFolder(folderPath)

    if (option === "--check" | option === "-c"){
        console.log(chalk.yellow("Link's validated\n"), await checkUrl(objAnswer));
    } else{
   console.log(chalk.yellow("Link's list\n"),objAnswer);
    }
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

renderCliAnswer(cliFilePathArgument,option)

//writeLinksInJsonFile(cliFilePathArgument);