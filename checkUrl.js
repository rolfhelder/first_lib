import fetch from 'node-fetch';

function handleError(err) {
    throw err = new Error(err.message);
  }

// createurlArray with .map
function createUrlArray(linkArray) {
    const urlArray = [];

    linkArray
        .map(object => {
            urlArray.push(Object.values(object).join());
        })
    return urlArray;
}

async function checkStatusArray(urlArray) {
    try {
        const statusArray = await Promise
        .all(urlArray
            .map(async (url) => {
                const res = await fetch(url) 
                return `${res.status} - ${res.statusText}` 
        }))
        return statusArray;  

    } catch (error) {
        handleError(error);
    }  
}



async function checkUrl(linkArrays) {
    
    try {
        const checkedUrlArray = await Promise
            .all(linkArrays.map(async (linkArray) => {
                const urlArray = createUrlArray(linkArray);
                const statusArray = await checkStatusArray(urlArray);
                
                

                const result = linkArray
                    .map( (object,index) => ({
                        ...object, 
                        status: statusArray[index]
                    }))
                return result;
            }))
       return checkedUrlArray;

    } catch (error) {
        handleError(error);
    }    
}

export {checkUrl as default};




/*// createurlArray with for each
function createurlArray(linkArrays) {
    const urlArray = [];

    linkArrays.forEach(linkArray => {
        linkArray.forEach(object => {
            urlArray.push(Object.values(object).push());
        });
    });
    
    return urlArray;
}*/