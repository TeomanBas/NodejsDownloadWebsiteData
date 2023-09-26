const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const { cursorTo } = require("readline");
const axios = require("axios");
const rp = require("request-promise");
const { arch } = require("os");
const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');



const PostsPath = "Posts\\";
const PostsRawLinksFile = "PostsLinks.txt";
const PostsInfoLinksFile = "PostsInfoLinks.txt";


const ContentPath = "Content\\";
const DownloadsLinksPath = "DownloadsLink\\";
const DownloadsLinks = "DownloadsLinkAll.txt";
const ContentDownloadsLinks = "DownloadsLinks.txt";


const mediafire = "mediafire\\";
const mediafireDownloaddir = "DownloadsFiles\\";
const ggl = "ggl\\";
const yandex = "yandex\\";

const ordersite = "ordersite\\";

var PostsInfoLinkRow = [];
var PostsRawLinkRow = [];

function write(text,path) { 
    fs.appendFile(path, text, function(error) { 
      if (error) { 
        console.error(error); 
      } else {
        //console.log(text + " => "+ path + " writed. "); 
        console.log(path + " writed. "); 
      }
    });
}

function linkwrite(row,path,filename){
  for (let i=0;i<row.length;i++){
    write(row[i]+"\n",path+filename);
  }
}

function direxists(path){
fs.access(path, function (err) {
  if (err) {
    if (err.code === 'ENOENT') {
      console.log(path+" Directory Creating...");
      createdir(path);
    }
    else {
      console.error(err);
    }
  }
  else {
    console.log(path+" Directory Control : OK");
  }
});
}

function createdir(path){
fs.mkdir(path, function (err) {
  if (err) {
    if(err.code === "EEXIST"){
      console.log(path + " => Directory Available")
    }
  }
  else {
    console.log(path + " => Directory Created."); 
  }
});
}

function PostPageDownloadLinksWrite(anchortag,path){
  let url="";
  //let mediafiresyc = 0;
  //let yadisyc = 0;
  //let megasyc = 0;
  //let gglsyc = 0;
  let syc = 0;
  for(i=0;i<anchortag.length;i++){
    url=anchortag[i]["attribs"]["href"];
    if(url==undefined){
      continue;
    }
    if(url.startsWith("http://www.mediafire.com")==true && syc==0){
      write(url+"\n",Donwloadslinkpath+DownloadsLinksfilename);
      //mediafiresyc=1; 
      syc =1;
    }
    if(url.startsWith("http://yadi.sk")==true && syc==0){
      write(url+"\n",Donwloadslinkpath+DownloadsLinksfilename);
      //yadisyc=1;
      syc =1; 
    }
    if(url.startsWith("https://mega.nz")==true && syc==0){
      write(url+"\n",Donwloadslinkpath+DownloadsLinksfilename);
      //megasyc=1;
      syc =1; 
    }
    if(url.startsWith("https://drive.google.com")==true && syc==0){
      write(url+"\n",Donwloadslinkpath+DownloadsLinksfilename);
      //gglsyc=1; 
      syc =1;
    }
    write(url+"\n",path+DownloadLinkfilename); 
    }
}

function ContentItemWrite(Content,ContentItemPath,Contentfilename){

  let ContentItemWriteControl = new Promise(function(resolve , reject){
    //direxists(ContentItemPath);
    createdir(ContentItemPath);
    resolve();
  });

  ContentItemWriteControl.then(function(){
    write(Content,ContentItemPath+Contentfilename);
    console.log("content write success");
  });
  
  //direxists(ContentItemPath);
  //write(Content,ContentItemPath+Contentfilename);
}

function CharSplit(text,...chars){
  if(text==undefined){
    console.log("/*/*/*/*/*/*/*/ CharSplit() :Text value not in undefined /*/*/*/*/*/*/*/");
    return "undefined";
  }
  let RText=text;
  let Swptext="";
  let Arrtext=Array();
  for(i=0;i<chars.length;i++){
    let Arrtext = RText.split(chars[i])
    for(let i=0;i<Arrtext.length;i++){
      if(i==Arrtext.length-1){
        Swptext+=Arrtext[i];
      }else{
        Swptext+=Arrtext[i]+"-";
      }
    }
    RText=Swptext;
    Swptext="";
  }
  return RText;
}


function ContentItemWrite(Content,ContentItemPath,Contentfilename){

  let ContentItemWriteControl = new Promise(function(resolve , reject){
    //direxists(ContentItemPath);
    createdir(ContentItemPath);
    resolve();
  });

  ContentItemWriteControl.then(function(){
    write(Content,ContentItemPath+Contentfilename);
    console.log("content yazma işlemi başarılı");
  });
  
  //direxists(ContentItemPath);
  //write(Content,ContentItemPath+Contentfilename);
}

function CharSplit(text,...chars){
  let RText =text;
  let Swptext="";
  for(i=0;i<chars.length;i++){
    let Arrtext = RText.split(chars[i])
    for(let i=0;i<Arrtext.length;i++){
      if(i==Arrtext.length-1){
        Swptext+=Arrtext[i];
      }else{
        Swptext+=Arrtext[i]+"-";
      }
    }
    RText=Swptext;
    Swptext="";
  }
  return RText;
}


function PostPageDownloadLinksWrite(anchortag,path){
  let url="";
  //let mediafiresyc = 0;
  //let yadisyc = 0;
  //let megasyc = 0;
  //let gglsyc = 0;
  let syc = 0;
  for(i=0;i<anchortag.length;i++){
    url=anchortag[i]["attribs"]["href"];
    if(url==undefined){
      continue;
    }
    if(url.startsWith("http://www.mediafire.com")==true && syc==0){
      write(url+"\n",DownloadsLinksPath+DownloadsLinks);
      //mediafiresyc=1; 
      syc =1;
    }
    if(url.startsWith("http://yadi.sk")==true && syc==0){
      write(url+"\n",DownloadsLinksPath+DownloadsLinks);
      //yadisyc=1;
      syc =1; 
    }
    if(url.startsWith("https://mega.nz")==true && syc==0){
      write(url+"\n",DownloadsLinksPath+DownloadsLinks);
      //megasyc=1;
      syc =1; 
    }
    if(url.startsWith("https://drive.google.com")==true && syc==0){
      write(url+"\n",DownloadsLinksPath+DownloadsLinks);
      //gglsyc=1; 
      syc =1;
    }
    write(url+"\n",path+ContentDownloadsLinks); 
    }
}
 


direxists(PostsPath);
direxists(ContentPath);
direxists(DownloadsLinksPath);
direxists(DownloadsLinksPath+mediafire);
direxists(DownloadsLinksPath+mediafire+mediafireDownloaddir);
direxists(DownloadsLinksPath+ggl);
direxists(DownloadsLinksPath+yandex);

direxists(DownloadsLinksPath+ordersite);








//////// POSTS /////////////////////////////////////////////////////////////////////////////
/*
//var urls = ["https://www.examplesite.com/"];

function requestPromise(url) {
  return new Promise(function(resolve, reject) {
    request(url, function(error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
}

urls.forEach(async function(url){

  

requestPromise(url)
.then(function(body) {
  let $ = cheerio.load(body);
  let divs = $(".jump-link a");
  for (let i=0;i<1000;i++) { 
    if(divs[i]==undefined || divs[i]==null){
      break;
    }
    
    PostsInfoLinkRow.push(i + " => " + divs[i]["attribs"]["title"] + " => " + divs[i]["attribs"]["href"]);
    PostsRawLinkRow.push(divs[i]["attribs"]["href"]);
    //console.log(i + " => " + divs[i]["attribs"]["title"] + " => " + divs[i]["attribs"]["href"]);
  }
})
.catch(function(hata) {
  console.error(hata);
}).finally(function(){
  linkwrite(PostsInfoLinkRow,PostsPath,PostsInfoLinksFile);
  linkwrite(PostsRawLinkRow,PostsPath,PostsRawLinksFile);
});

});*/


////////////////////////////////////////////////////////////////////////////////////////////




//////// POSTS PAGES /////////////////////////////////////////////////////////////////////////////
/*

var PostPage = new Promise(function(resolve,reject){
  let url="https://www.examplesite.com";
  request(url, function(error, response, body) { 
    if (error) {
      console.error(error); 
    }else {
      resolve(body);
    }
  })
});

function PostPageFonksiyon(url){
  let PostPage = new Promise(function(resolve,reject){
    request(url, function(error, response, body) { 
      if (error) {
        console.error(error); 
      }else {
        resolve(body);
      }
    })
  });
  return PostPage;
}

PostPageFonksiyon(url).then(function(body){
  let $ = cheerio.load(body);
  $("#w2bSocialPlaercehold").remove();
  $(".w2bSocialFloat#w2bSocialFloat").remove();
  $(".post-share-buttons").remove();
  $("#doulike-outer").remove();
  $(".g-plusone").remove();
  $(".DiggThisButton.DiggCompact").remove();
  $(".post-share-buttons").remove();
  $(".twitter-share-button").remove();
  $("script").remove();
  $("style").remove();
  $("iframe").remove();
  $(".separator").remove();
    
  return $;
}).then(function($){
  Title= CharSplit($(".post-title.single-title.entry-title a").attr("title")," ",":","/","\\",".","|","<",">","?","*","'",'"',"`","´",",","~","¨","!","^","$","%","(",")","=");
  return {$ : $, ContentTitle: Title};
}).then(function(Content){
  let Contentfilename = Content.ContentTitle+".html";
  let ContentItemPath = ContentPath+Content.ContentTitle+"\\";
  let content = Content.$("div.single-entry-summary");
  let anchortag = content.find("a");
  return {content:content,ContentItemPath:ContentItemPath,Contentfilename:Contentfilename,anchortag:anchortag}; 
}).then(function(Content){
  ContentItemWrite(Content.content.html(),Content.ContentItemPath,Content.Contentfilename);
  PostPageDownloadLinksWrite(Content.anchortag,Content.ContentItemPath);
});




*/

//////////////////////////////////////////////////////////////////////////////////////////////////


//////// POSTS DOWNLOAD LINKS AND CONTENTS /////////////////////////////////////////////////////////////////////////////
/*
let url="https://www.examplesite.com";
function PostPageFonksiyon(url){
  let PostPage = new Promise(function(resolve,reject){
    request(url, function(error, response, body) { 
      if (error) {
        console.error(error); 
      }else {
        resolve(body);
      }
    })
  });
  return PostPage;
}

var ReadFileProcess = new Promise(function(resolve,reject){
  var PostPageUrl = [];
  fs.readFile(PostsPath+PostsRawLinksFile, function (error, data) {
    if (error) {
      console.error('Dosya okuma hatası:', error);
    } else {
      let metin = data.toString();
      let PostPageUrl = metin.split('\n');
      
      //for (let i = 0; i < dizi.length-1; i++) {
      //  let link =PostPageUrl[i]
      //  console.log(i +" => "+ [i])
      //}
        resolve(PostPageUrl);
    }
  })
});

ReadFileProcess.then(function(PostPageUrl){
  for(let i=550;i<PostPageUrl.length;i++){
    PostPageFonksiyon(PostPageUrl[i]).then(function(body){
      let $ = cheerio.load(body);
      $("#w2bSocialPlaercehold").remove();
      $(".w2bSocialFloat#w2bSocialFloat").remove();
      $(".post-share-buttons").remove();
      $("#doulike-outer").remove();
      $(".g-plusone").remove();
      $(".DiggThisButton.DiggCompact").remove();
      $(".post-share-buttons").remove();
      $(".twitter-share-button").remove();
      $("script").remove();
      $("style").remove();
      $("iframe").remove();
      $(".separator").remove();
        
      return $;
    }).then(function($){
      Title= CharSplit($(".post-title.single-title.entry-title a").attr("title")," ",":","/","\\",".","|","<",">","?","*","'",'"',"`","´",",","~","¨","!","^","$","%","(",")","=");
      return {$ : $, ContentTitle: Title};
    }).then(function(Content){
      let Contentfilename = Content.ContentTitle+".html";
      let ContentItemPath = ContentPath+Content.ContentTitle+"\\";
      let content = Content.$("div.single-entry-summary");
      let anchortag = content.find("a");
      return {content:content,ContentItemPath:ContentItemPath,Contentfilename:Contentfilename,anchortag:anchortag}; 
    }).then(function(Content){
      ContentItemWrite(Content.content.html(),Content.ContentItemPath,Content.Contentfilename);
      PostPageDownloadLinksWrite(Content.anchortag,Content.ContentItemPath);
    });
  }
});
*/
//////////////////////////////////////////////////////////////////////////////////////////////////


//////// DONWLOAD LINKS COMB OUT /////////////////////////////////////////////////////////////////////////////
/*
var ReadFileProcess = new Promise(function(resolve,reject){
  var DonwloadLinksFileRows = [];
  fs.readFile(DownloadsLinksPath+DownloadsLinks, function (error, data) {
    if (error) {
      console.error('Dosya okuma hatası:', error);
    } else {
      let text = data.toString();
      let Links = text.split('\n');
      
      //for (let i = 0; i < dizi.length-1; i++) {
      //  let link =PostPageUrl[i]
      //  console.log(i +" => "+ [i])
      //}
        resolve(Links);
    }
  })
});



ReadFileProcess.then(function(Links){
  for(i=0;i<Links.length-1;i++){
    //console.log(i+1+" => "+links[i]);
    //Links.push(links[i]);
    //console.log(Links[i]);
    if(Links[i].includes("mediafire")){
      write(Links[i]+"\n",DownloadsLinksPath+mediafire+"mediafirelinks.txt");
      continue;

    }
    if(Links[i].includes("yadi.sk")){
      write(Links[i]+"\n",DownloadsLinksPath+yandex+"yandexlinks.txt");
      continue;
      
    }
    if(Links[i].includes("drive.google")){
      write(Links[i]+"\n",DownloadsLinksPath+ggl+"googlelinks.txt");
      continue;

    }
    console.log("links comb out");
  }
})
*/


////////////////////////////////////////////////////////////////////////////////

////////////////////////////DOWNLOAD FİLE LİNKS////////////////////////////////////////////////////
/*
function PostPageFonksiyon(url,limit){
  if(limit==50){
    console.log("bad link -*-*-*-*-*-*-*-*-*--*-*-**-*-*-**-*-*-*--**-**-*-*"+ url);
    return Promise.reject(url);
  }else{
    return rp(url)
    .then((body) => {
      return Promise.resolve(body);
    })
    .catch((error) => {
      console.log("istek yeniden deneniyor");
      limit++;
      return PostPageFonksiyon(error.options.uri,limit);
    });
  }
}





var ReadFileProcess = new Promise(function(resolve,reject){
  fs.readFile(DownloadsLinksPath+mediafire+"mediafirelinks.txt", function (error, data) {
    if (error) {
      console.error('Dosya okuma hatası:', error);
    } else {
      let text = data.toString();
      let Links = text.split('\n');
        resolve(Links);
    }
  })
});


ReadFileProcess.then(function(Links){
  console.log(Links.length);
  for(let i=500;i<531;i++){
    PostPageFonksiyon(Links[i],0).then(function(body){
      let $ = cheerio.load(body);
      let link = $("a#downloadButton.input.popsok").attr("href");
      write(link+"\n",DownloadsLinksPath+mediafire+"downloadlinks.txt");
      //return div;
  }).catch(function(url){
    write(url+"\n",DownloadsLinksPath+mediafire+"errorlinks.txt");

  });

}
});

*/
////////////////////////////////////////////////////////////////////////////////








//////////////////////////////////// DOWNLOAD //////////////////////////////////////////////////////////

/*

  //const links = ["http://download.downloadsite.com/abc.rar"];
  const downloadFile = async (url) => {
    try {
      const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
      });
      const fileName = url.split("/").pop();
      const filePath = DownloadsLinksPath+mediafire+"DownloadsFiles\\"+fileName;
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
      writer.on("finish", () => {
        console.log(fileName + " başarıyla indirildi.");
      });
      writer.on("error", (error) => {
        console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  };
  //links.forEach((link) => {
  //  downloadFile(link);
  //});



function PostPageFonksiyon(url,limit){
  if(limit==50){
    console.log("kırık link -*-*-*-*-*-*-*-*-*--*-*-**-*-*-**-*-*-*--**-**-*-*"+ url);
    return Promise.reject(url);
  }else{
    return rp(url)
    .then((body) => {
      return Promise.resolve(body);
    })
    .catch((error) => {
      console.log("istek yeniden deneniyor");
      limit++;
      return PostPageFonksiyon(error.options.uri,limit);
    });
  }
}





var ReadFileProcess = new Promise(function(resolve,reject){
  fs.readFile(DownloadsLinksPath+mediafire+"errorlnk.txt", function (error, data) {
    if (error) {
      console.error('Dosya okuma hatası:', error);
    } else {
      let text = data.toString();
      let Links = text.split('\n');
        resolve(Links);
    }
  })
});


ReadFileProcess.then(function(Links){
  console.log(Links.length);
  for(let i=0;i<Links.length;i++){
    PostPageFonksiyon(Links[i],0).then(function(body){
      let $ = cheerio.load(body);
      let link = $("a#downloadButton.input.popsok").attr("href");
      write(link+"\n",DownloadsLinksPath+mediafire+"Downloaded.txt");
      downloadFile(link);
      //return div;
  }).catch(function(url){
    write(url+"\n",DownloadsLinksPath+mediafire+"Downloadederror.txt");

  });

}
});

*/


/////////////////////////////////////////////////////////////////////////////////////////////////////////////



//----------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------
/*
const plink = "https://www.examplesite.com/abc/";
const tlink = "/index.html";
*/
/*

function SiteRequest(url){
  var preqpromise = new Promise(function(resolve,reject){
    request(url,function(error,response,body){
      if(error){
        console.log(error.code);
      }else{
        resolve(body);
      }
    })
  });
  return preqpromise;
}

SiteRequest(plink+1+tlink).then(function(body){
  let $ = cheerio.load(body);
  anchor = $("a");
  let downlinkpage= [];
 for(let i=0;i<anchor.length;i++){
  if(anchor[i]["attribs"]["href"].startsWith("../../../../../../../../../../index.php/download_file/")){
    let swp = anchor[i]["attribs"]["href"].split("../../../../../../../../../../");
    downlinkpage.push("https://www.examplessite.com/abc/"+swp[1])
  }
 }
 return downlinkpage;
 //console.log(downlinkpage);


}).then(async function(links){
//../../../../../index.php/download_start/index.html
let downlink=[];
let syc=0;
for(let i=0;i<links.length;i++){
  let swp= await SiteRequest(links[i]).then(function(body){
    let $ = cheerio.load(body);
    anchor = $("a");
  
  for(let i=0;i<anchor.length;i++){

    if(anchor[i]["attribs"]["href"].startsWith("../../../../../index.php/download_start/") && syc == 0){
      let swp = anchor[i]["attribs"]["href"].split("../../../../../");
      downlink.push("https://www.examplessite.com/"+swp[1]);
      syc++; 
    }
  }
  syc=0;

  
  });
}
return downlink;
}).then(function(downlink){
  linkwrite(downlink,DownloadsLinksPath+ordersite,"ordersitelinks.txt")
});

*/
/*

for(i=1;i<2;i++){
  SiteRequest(plink+1+tlink).then(function(body){
    let $ = cheerio.load(body);
    anchor = $("a");
  
    
    let downlinkpage= [];
    console.log(anchor[0]["attribs"]["href"])
   for(let i=0;i<anchor.length;i++){
    if(anchor[i]["attribs"]["href"].startsWith("../../../../../../../../../../index.php/download_file/")){
      let swp = anchor[i]["attribs"]["href"].split("../../../../../../../../../../");
      downlinkpage.push("https://www.examplesite.com/"+swp[1])
    }
   }
   return downlinkpage;
   //console.log(downlinkpage);
  
  
  }).then(async function(links){
  //../../../../../index.php/download_start/index.html
  let downlink=[];
  let syc=0;
  for(let i=0;i<links.length;i++){
    let swp= await SiteRequest(links[i]).then(function(body){
      let $ = cheerio.load(body);
      anchor = $("a");
    for(let i=0;i<anchor.length;i++){
  
      if(anchor[i]["attribs"]["href"].startsWith("../../../../../index.phpdownload_start/") && syc == 0){
        let swp = anchor[i]["attribs"]["href"].split("../../../../../");
        downlink.push("https://www.examplesite.com/"+swp[1]);
        syc++; 
      }
    }
    syc=0;
  
    
    });
  }
  return downlink;
  }).then(function(downlink){
    linkwrite(downlink,DownloadsLinksPath+ordersite,"ordersitelinks.txt")
  });
}*/
//////////////////////////////////////links comb out//////////////////////////////////////////



/*
var ReadFileProcess = new Promise(function(resolve,reject){
  fs.readFile(DownloadsLinksPath+ordersite+"err.txt", function (error, data) {
    if (error) {
      console.error('Dosya okuma hatası:', error);
    } else {
      let text = data.toString();
      let Links = text.split('\n');
        resolve(Links);
    }
  })
});

ReadFileProcess.then(function(repeatedlinks){
  console.log(repeatedlinks.length);
  clearlinks = [...new Set (repeatedlinks)];
  console.log(clearlinks);
  console.log(clearlinks.length);
  linkwrite(clearlinks,DownloadsLinksPath+ordersite,"err-clear.txt");
});
*/
///////////////////////////////////////////////download///////////////////////////////////////////
/*
var ReadFileProcess = new Promise(function(resolve,reject){
  fs.readFile(DownloadsLinksPath+ordersite+"errx-clear.txt", function (error, data) {
    if (error) {
      console.error('Dosya okuma hatası:', error);
    } else {
      let text = data.toString();
      let Links = text.split('\n');
        resolve(Links);
    }
  })
});*/
/*
const slnlinks = [
  'https://www.examplessite.com/abc/1/index.html',
  'https://www.examplessite.com/abc/1/index.html',
  'https://www.examplessite.com/abc/2/index.html',
  'https://www.examplessite.com/abc/3/index.html',
];*/
/*
ReadFileProcess.then(function(slnlinks){
  (async () => {
    const browser = await new Builder().forBrowser('chrome').build();
    for (let link of slnlinks) {
      try {
        await browser.executeScript(`window.open('${link}', '_blank');`);
        const tabs = await browser.getAllWindowHandles();
        const lastTab = tabs[tabs.length - 1];
        await browser.switchTo().window(lastTab);
        await browser.get(link);
        //await browser.close();
        await browser.switchTo().window(tabs[0]);
      } catch (err) {
        console.error(err);
      }
    }
    //await browser.quit();
  })();
});
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*

var ReadFileProcess = new Promise(function(resolve,reject){
  fs.readFile(DownloadsLinksPath+ordersite+"errx.txt", function (error, data) {
    if (error) {
      console.error('Dosya okuma hatası:', error);
    } else {
      let text = data.toString();
      let Links = text.split('\n');
        resolve(Links);
    }
  })
});

ReadFileProcess.then(function(repeatedlinks){
  console.log(repeatedlinks.length);
  clearlinks = [...new Set (repeatedlinks)];
  console.log(clearlinks);
  console.log(clearlinks.length);
  linkwrite(clearlinks,DownloadsLinksPath+ordersite,"errx-clear.txt");
});
*/
//////////////////////////////////////////////demos links////////////////////////////////////////////////////////


/*
function PostPageFonksiyon(url){
  let PostPage = new Promise(function(resolve,reject){
    request(url, function(error, response, body) { 
      if (error) {
        console.error(error); 
      }else {
        resolve(body);
      }
    })
  });
  return PostPage;
}

for(i=1;i<33;i++){
  //let url1="https://www.examplessite.com/abc/";
  //let url2="/index.html";
  let url1="https://www.examplessite.com/abc/";
  let url2="/index.html";
  
  let downurl1 ="https://www.examplessite.com/abc/";
  let downurl2 ="/1/index.html";
  PostPageFonksiyon(url1+i+url2).then(function(body){
    let $ = cheerio.load(body);
    let links=$("a.button");
    //console.log(links[0]["attribs"]["href"]);
    console.log(links.length);
    for(i = 0; i<links.length;i++){
      if(links[i]["attribs"]["href"].startsWith("../../../../../../../../index.phpdownload_file/")){
        console.log(links[i]["attribs"]["href"]);
        let dm = links[i]["attribs"]["href"].split("/");
        console.log(downurl1+dm[12]+downurl2);
        write(downurl1+dm[12]+downurl2+"\n",DownloadsLinksPath+ordersite+"xcont.txt")
      }
    }
  
  
  
  })
}
*/
///////////////////////////////////////////////download demos///////////////////////////////////////////

var ReadFileProcess = new Promise(function(resolve,reject){
  fs.readFile(DownloadsLinksPath+ordersite+"err-d.txt", function (error, data) {
    if (error) {
      console.error('Dosya okuma hatası:', error);
    } else {
      let text = data.toString();
      let Links = text.split('\n');
        resolve(Links);
    }
  })
});
/*
slnlinks=["https://www.examplessite.com/abc/",
"https://www.examplessite.com/abc/",
"https://www.examplessite.com/abc/",
]
linkwrite(slnlinks,DownloadsLinksPath+ordersite,"links.txt");
*/

ReadFileProcess.then(function(slnlinks){
  (async () => {
    const browser = await new Builder().forBrowser('chrome').build();
    for (let link of slnlinks) {
      try {
        await browser.executeScript(`window.open('${link}', '_blank');`);
        const tabs = await browser.getAllWindowHandles();
        const lastTab = tabs[tabs.length - 1];
        await browser.switchTo().window(lastTab);
        await browser.get(link);
        //await browser.close();
        await browser.switchTo().window(tabs[0]);
      } catch (err) {
        console.error(err);
        write(link+"\n",DownloadsLinksPath+ordersite+"err.txt")
      }
    }
    //await browser.quit();
  })();
});

