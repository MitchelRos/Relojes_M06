var initTime = new Date().getTime();
var timeMs;
var timeTimer;
var sumTimer = 0;
// windows.setInterval("funcion()", milisec)
// Lo anterior y lo siguiente, esta poniendo un intervalo (setInterval) mintras la ventana este abierta (window.)
// tambien se puede guardar en una variable, esto trae un aventaja que sera el clearInterval
// esto se aplica a la funcion ("clock()") en un intervalo de tiempo(, milisegundos).
// Esto hara que la funcion se refresque automaticamente ella sola cada 1000 ms.
let hora = setInterval("Clock()", 1000);
let cronometro;
var temporizador;

let diezsegundos = initTime + (10000);
// no se que es, pero hace una funcion similar que he utilizado en buscaminas llamada pad(num, n)
// el proposito es formatear el numero y pasarlo a 2 digitos. añadiendo u 0 a la izquierda si es 1 num.
// Number.prototype.pad = function (n) {
//     for (var r = this.toString(); r.length < n; r = 0 + r);
//     return r;
// };
//esta es una mejora
function pad(n, length) {
    // Esta funcion le añadira numeros (0) a lo que le entres
    let len = length - ('' + n).length;
    return (len > 0 ? new Array(++len).join('0') : '') + n;
}

function initClock() {
    Clock();
    hora;
}

function Clock() {
    //podria utilizar esta varible inicial para iniciarla en otro sitio par asumar y restar.
    // tambiuen puedo utilizar esta variable en una funcion que le sume tiempo y le reste y que se inicie en otro.
    var now = new Date();
    var sec = now.getSeconds(),
        min = now.getMinutes(),
        hou = now.getHours();
    var tags = ["date-h", "date-m", "date-s"],
        corr = [pad(hou, 2), pad(min, 2), pad(sec, 2)];
    for (var i = 0; i < tags.length; i++) {
        document.getElementById(tags[i]).innerText = corr[i];
    }
    if (now.getTime() >= diezsegundos) {
        // console.log("pasaron 10 sec");
    }
}
// END CLOCK SCRIPT basado en el codigo:
// https://stackoverflow.com/questions/47700976/how-to-make-a-millisecond-chronometer-in-javascript
function StatusChrono() {
    let Satatus = document.getElementById("StatusChrono").innerText;
    switch (Satatus) {
        case 'Start':
            // Start Activo
            timeMs = new Date().getTime();
            cronometro = setInterval(Chronometer, 1000, timeMs);
            cronometro;
            document.getElementById("StatusChrono").innerText = 'Stop';
            break;
        case 'Stop':
            // Start Inactivo
            clearInterval(cronometro);
            document.getElementById("StatusChrono").innerText = 'Start';
            break;
        default:
            break;
    }
}

function reset(Watch) {
    switch (Watch) {
        case 'Chrono':
            clearInterval(cronometro);
            timeMs = new Date().getTime();
            document.getElementById("StatusChrono").innerText = 'Start';
            break;
        case 'Timer':
            clearInterval(temporizador);
            sumTimer=0;
            timeTimer = new Date().getTime();
            document.getElementById("StatusTimer").innerText = 'Start';
            break;
        default:
            break;
    }
}

function Chronometer(timeMs) {
    // preguntar que diferencia hay entre: utilizar y no utilizar el .getTime() al restar.
    var now = new Date().getTime();
    var sec = (((now - timeMs) % 60000) / 1000).toFixed(0),
        min = Math.floor((now - timeMs) / 60000),
        hou = parseInt((now - timeMs) / 3600000);
    var tags = ["crono-h", "crono-m", "crono-s"],
        corr = [pad(hou, 2), pad(min, 2), pad(sec, 2)];
    for (var i = 0; i < tags.length; i++) {
        document.getElementById(tags[i]).innerText = corr[i];
    }
}

function Timelap() {
    let padre = document.getElementById("lista-time-lap");
    let hijo = document.createElement("li");
    let content = document.getElementById("cronoTime").innerHTML;
    hijo.innerHTML = content;
    padre.insertBefore(hijo, padre.firstChild);
}

function CalcTimer(time, calc) {
    if (!(sumTimer >= 356400000 || ((sumTimer <= 0) && (calc == 'resta')))) {
        if (calc == 'suma') {
            sumTimer = sumTimer + (time)
        } else if (calc == 'resta') {
            sumTimer = sumTimer - (time)
        }
        document.getElementById("temporizador").style.backgroundColor = "tomato";
        var sec = (((sumTimer) % 60000) / 1000),
            hou = parseInt((sumTimer) / 3600000),
            min = Math.floor(((hou * 3600000) - sumTimer) / -60000);

        var tags = ["temp-h", "temp-m", "temp-s"],
            corr = [pad(hou, 2), pad(min, 2), pad(sec, 2)];
        for (var i = 0; i < tags.length; i++) {
            document.getElementById(tags[i]).innerText = corr[i];
        }
    } else {
        console.log("No se puede ponder (num) negativos")
        document.getElementById("temporizador").style.backgroundColor = "red";
        sumTimer = 0;
    }

}

function realTimer(){
    let Satatus = document.getElementById("StatusTimer").innerText;
    if (Satatus == 'Stop') {
        sumTimer = sumTimer - (1000)
    }
}

function StatusTimer() {
    let Satatus = document.getElementById("StatusTimer").innerText;
    switch (Satatus) {
        case 'Start':
            // Start Activo
            timeTimer = new Date().getTime() + (sumTimer);
            temporizador = setInterval(Timer, 1000, timeTimer);
            temporizador;
            document.getElementById("StatusTimer").innerText = 'Stop';
            break;
        case 'Stop':
            // Start Inactivo
            clearInterval(temporizador);
            document.getElementById("StatusTimer").innerText = 'Start';
            break;
        default:
            break;
    }
}

function Timer(timeTimer) {
    // preguntar que diferencia hay entre: utilizar y no utilizar el .getTime() al restar.
    if (timeTimer != undefined) {
        var now = new Date().getTime();
        var sec = (((timeTimer - now) % 60000) / 1000).toFixed(0),
            min = Math.floor((timeTimer - now) / 60000),
            hou = parseInt((timeTimer - now) / 3600000);

        realTimer()
        console.log(sumTimer)
        var tags = ["temp-h", "temp-m", "temp-s"],
            corr = [pad(hou, 2), pad(min, 2), pad(sec, 2)];
        for (var i = 0; i < tags.length; i++) {
            document.getElementById(tags[i]).innerText = corr[i];
        }
        if (sec <= 0 && min <= 0 && hou <= 0) {
            console.log("TIEMPO")
            clearInterval(temporizador);
            StatusTimer();
            var tags = ["temp-h", "temp-m", "temp-s"],
                corr = ["-T", "IM", "E-"];
            for (var i = 0; i < tags.length; i++) {
                document.getElementById(tags[i]).innerText = corr[i];
            }
            return;
        }
    } else {
        var tags = ["temp-h", "temp-m", "temp-s"],
            corr = ["ST", "AR", "RT"];
        for (var i = 0; i < tags.length; i++) {
            document.getElementById(tags[i]).innerText = corr[i];
        }

    }
}
// registro para despues lo que tienes que hacer
// es que el usuario sume en milisec y tu haces la magia para que se vea en minutos horas y sec,
// segidamente lo que haces es que de lo del crono lo restas a los milis que ha metido el usuario.
// Heu de fer la interfície també
// Pel botó de pausa teniu 2 opcions:
// Fer que pausi la hora que està mostrant però que continui endavant.
// Fer que el primer cop que premis pausi i el segon torni a arrencar.

// para continuar el crono tendras que consegir el numero de la tempo2 (date tiimerTime) y sacar los milisec restantes y pasarlos a la varible que lo guarda
function veWatch() {
    let CheckboxStatus = document.getElementById("cb3-8");
    if (CheckboxStatus.checked) {
        document.getElementById("cronometro").style.display="none";
        document.getElementById("temporizador").style.display="block";
        return true;
    } else { 
        document.getElementById("cronometro").style.display="block";
        document.getElementById("temporizador").style.display="none";
        
        return false;
      }
}