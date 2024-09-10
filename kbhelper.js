var diccionario;
console.log("loaded")
fetch("https://gabocota.net/files/diccionario.json").then((data) => {
    return data.json();
}).then((jsondata) => {
    diccionario = jsondata;
});
var palabra = "";
var ene = false;
document.addEventListener('keydown', function (event) {
    if (event.key == ";") {
        ene = true;
        palabra = `${palabra}ñ`;
        return;
    }
    if (event.code === 'Space') {
        if (ene && diccionario[palabra]) {
            let currentValue = event.target.value;
            const cursorPosition = event.target.selectionStart;
            const n = palabra.length;
            const startDeletePosition = cursorPosition - n;
            const actualStartPosition = Math.max(startDeletePosition, 0);
            const newValue = currentValue.slice(0, actualStartPosition) + currentValue.slice(cursorPosition);
            const modifiedValue = newValue.slice(0, actualStartPosition) + palabra + newValue.slice(actualStartPosition);
            event.target.value = modifiedValue;
            const newCursorPosition = actualStartPosition + n;
            event.target.setSelectionRange(newCursorPosition, newCursorPosition);
        }
        palabra = "";
        ene = false;
        return;
    }
    if (event.key == "Backspace") {
        palabra = palabra.slice(0, -1);
    }
    if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
        palabra = `${palabra}${event.key}`;
    }
});