const LETRAS = "abcdefghijklmnopqrstuvwxyz";
const axios = require('axios');
const fs = require('fs');
;
function writeJSONToFile(filename, data) {
  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFile(filename, jsonString, (err) => {
    if (err) {
      console.error('Error writing file', err);
    } else {
      console.log('Successfully wrote file');
    }
  });
}
var diccionario = {}
var tareas = 0;
for (let x = 0; x < LETRAS.length; x++) {
  for (let i = 0; i < LETRAS.length; i++) {
    tareas++;
    let reqURL = `https://www.palabrasque.com/buscador.php?i=${LETRAS[i]}&f=${LETRAS[x]}&tv=0&button=Buscar+palabras&ms=&mns=&m=%C3%B1&mn=&fs=0&fnl=0&fa=0&d=0`;
    axios.get(reqURL)
      .then(res => {
        let data = res.data.split("<td>")[1].split("</td>")[0].split(", ");
        for (let j = 0; j < data.length; j++) {
          let word = data[j].split("\">")[1].split("</a>")[0];
          if (word[0] == "<") continue;
          diccionario[word] = true;
          console.log(word);
          tareas--;
        }
      })
      .catch(err => {
        console.log('Error: ', err.message);
        tareas--;
      });
  }
}
setInterval(() => {
  writeJSONToFile("palabras.json", diccionario);
}, 5000)