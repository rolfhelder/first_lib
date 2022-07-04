import {getLinks, getUrlLinksFromFolder} from "../index";
import fs from 'fs';

const encoding = 'utf-8'
const url = './test/test_files/url.md'
const no_url = './test/test_files/no_url.md'
const no_https = './test/test_files/no-https.md'
const no_key = './test/test_files/no-key.md'

const urlArray = [
    {
      FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
    }
]

const no_keyArray = [
    {
     "": "https://developer.mozilla.org/pt-BR/docs/Web/API/FileList",
    },
]

const folderArray = [
    "No links found on archive",
    [
        {
       "": "https://developer.mozilla.org/pt-BR/docs/Web/API/FileList",
        },
    ],
   "No links found on archive",
    [
        {
        "FileList": "https://developer.mozilla.org/pt-BR/docs/Web/API/FileList",
        },
    ],
  ]


describe('\ngetLinks::', () => { 
    it('isFunction?', () => {
        expect(typeof getLinks).toBe('function');
      });    
    
    it('Returns url array', async () => {
        const mdText = await fs.promises.readFile(url,encoding )
        
        const result =  getLinks(mdText);
        
        expect(result).toEqual(urlArray);
    })

    it('Returns no_url array', async () => {
        const mdText = await fs.promises.readFile(no_url,encoding )
        
        const result =  getLinks(mdText);
        
        expect(result).toBe('No links found on archive');
    })

    it('Returns no_https array', async () => {
        const mdText = await fs.promises.readFile(no_https,encoding )
        
        const result =  getLinks(mdText);
        
        expect(result).toBe('No links found on archive');
    })

    it('Returns no_key array', async () => {
        const mdText = await fs.promises.readFile(no_key,encoding )
        
        const result =  getLinks(mdText);
        console.log(result);
        expect(result).toEqual(no_keyArray);
    })
})

describe('\ngetUrlLinksFromFolder::', () => { 
    it('isFunction?', () => {
        expect(typeof getUrlLinksFromFolder).toBe('function');
      });    
    
    it('Returns result array', async () => {
        const result = await getUrlLinksFromFolder('./test/test_files');
        
        expect(result).toEqual(folderArray);
    })
    
    it('promise error - wrong path error', async () => {
        await expect(getUrlLinksFromFolder('./test/test_files/url.md')).rejects.toThrow("ENOTDIR")
      })

    it('resolves promise', async () => {
        await expect(getUrlLinksFromFolder('./test/test_files')).resolves.toEqual(folderArray)
      })
})

