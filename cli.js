#!/usr/bin/env node

import {getUrlLinksFromFolder} from './index.js';
import checkUrl from './checkUrl.js';

const cliArguments = process.argv;
const cliFilePathArgument = process.argv[2];
const option = process.argv[3];

console.log("Markdown URL Checker Running!");

//option --check == -c
async function getUrl(folderPath, option = "") {
    const objAnswer = await getUrlLinksFromFolder(folderPath)

    if (option === "--check" | option === "-c"){
        console.log("Link's validated\n", await checkUrl(objAnswer));
    } else{
   console.log("Link's list\n",objAnswer);
    }
}

// async function writeLinksInJsonFile(filePath) {
//     const linkListObj = await getUrlLinksFromFile(filePath)
    
//     fs.writeFile("link_list.json", JSON.stringify(linkListObj, null, 4), function(err) {
//         if(err) {
//             console.log("Error saving data to json file: " + err);
//             return;
//         }
//         console.log("link_list.json created");
//     }); 
// }

getUrl(cliFilePathArgument,option)

export {getUrl as default}

//writeLinksInJsonFile(cliFilePathArgument);