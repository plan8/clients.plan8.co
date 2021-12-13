import JSZip, { file } from "jszip";
import saveAs from "file-saver";

function string_to_slug (str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}



export default function (ctx, inject, store) {
    

    const compress = {
        generateZipFile(project, onComplete) {
      
          const jszip = new JSZip();
      
          const items = [];
      
          const promises = []

          const rootProject = project;
      
          const previewRoot = ctx.$config.previewURL;
          console.log('project: ', project);
      
          project.subProjects.forEach(project => {
            jszip.folder(project.name);
            project.items.forEach(item => {
              let fileName = item.originalName;
              
              let fileUrl = `${previewRoot}${item.stems[0].key}.mp3`;
              const prom = this.downloadUrlAsPromise(fileUrl)
              //items.push(item)
              let nameInZip
             
              console.log('fileName: ', fileName);

              console.log('rootProject.settings.publicNames: ', rootProject.settings.publicNames);
              if (rootProject.settings.publicNames === 1 || rootProject.settings.publicNames === 4) {
                
                let newFileName = fileName.replace(/\.[^/.]+$/, "");
                console.log('newFileName: ', newFileName);

                nameInZip = `${project.name}/${string_to_slug(newFileName)}.mp3`;
              } else {
                nameInZip = `${project.name}/${string_to_slug(fileName)}.mp3`;
                
              }
              console.log('nameInZip: ', nameInZip);

              jszip.file(
                nameInZip, //in my case, this produces something like 'my image.jpg'
                prom
                //this.downloadUrlAsPromise(fileUrl) //generates the file we need to download
      
      
              );
              promises.push(prom)
      
            });
      
          });
      
      
      
      
          Promise.all(promises).then(() => {
            jszip.generateAsync({ type: "blob" }).then(function (content) {
              saveAs(content, `${project.name}.zip`);
            });
            onComplete && onComplete()
          })
        },
      
        downloadUrlAsPromise(url) {
          return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            xhr.onreadystatechange = function (evt) {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  resolve(xhr.response);
                } else {
                  reject(new Error("Error for " + url + ": " + xhr.status));
                }
              }
            };
            xhr.send();
          });
        }
      }
      inject('compress', compress)


      ctx.$compress = compress
}
