import JSZip from "jszip";
import saveAs from "file-saver";



export default function (ctx, inject, store) {
    console.log('ctx: ', ctx);

    const compress = {
        generateZipFile(project, onComplete) {
      
          const jszip = new JSZip();
      
          const items = [];
      
          const promises = []
      
          const previewRoot = ctx.$config.previewURL;
      
          project.subProjects.forEach(project => {
            jszip.folder(project.name);
            project.items.forEach(item => {
              let fileName = item.originalName;
              let fileUrl = `${previewRoot}${item.stems[0].key}.mp3`;
              const prom = this.downloadUrlAsPromise(fileUrl)
              //items.push(item)
              jszip.file(
                `${project.name}/${fileName}`, //in my case, this produces something like 'my image.jpg'
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
