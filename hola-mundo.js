let fs = require('fs');
let path = require('path');

let searchRecursive = (dir, pattern)=>{
  // This is where we store pattern matches of all files inside the directory
  let results = [];

  // Lee el contenido del directorio-carpeta
  fs.readdirSync(dir).forEach((dirInner)=> {
    // Obtiene el paquete absoluto
    dirInner = path.resolve(dir, dirInner);

    // Define si el archivo es carpeta o archivo
    let stat = fs.statSync(dirInner);

    // si el paquete es dentro de una carpeta, escanea y combina en results
    if (stat.isDirectory()) {
      results = results.concat(searchRecursive(dirInner, pattern));
    }

    // Si el archivo encuentra el patrón enviarlo dentro de results
    if (stat.isFile() && dirInner.endsWith(pattern)) {
      results.push(dirInner);
    }
  });

  return results;
};

let files = searchRecursive('./', '.md'); //Establecer la terminación a buscar

console.log(files);