const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const VOL = document.getElementById('vol');
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');
const botonCambiarColor = document.getElementById('cambiarColor');
const elementoDetalle = document.getElementById('detalle');
const elementoboton = document.getElementById('calcular');
const CONTENEDOR = document.getElementById('contenedor2')
const CAL = {
    hol: document.getElementById('hol'),
    menos30: document.getElementById('ten'),
    msc: document.getElementById('msc'),
    mas30: document.getElementById('mte')
}
CALCULAR.addEventListener('click', () => {
    const DATO = document.getElementById('peso').valueAsNumber
    //validamos que se cargue un dato:
    if (DATO > 0) {
        ERROR.style.display = 'none';
        let flujo = calcFlujo(DATO);
        VOL.style.display = 'block';
        FLU.style.display = 'block';
        MAN.style.display = 'block';

        if (DATO <= 30) {
            let mantenimiento = (flujo / 24) * 1.5;
            VOL.innerHTML = 'Volumen ' + flujo + ' cc';
            FLU.innerHTML = 'flujo ' + (flujo / 24).toFixed(0) + ' cc/hr';
            MAN.innerHTML = 'm+m/2 ' + mantenimiento + ' cc/hr';
            CONTENEDOR.style.display = 'block'
            CAL.menos30.style.display = 'block'
            CAL.hol.style.display = 'block'
            CAL.mas30.style.display = 'none'
            CAL.msc.style.display = 'none'
        } else {
            VOL.style.display = 'none';
            let SC = (flujo * 1500).toFixed(0);
            FLU.innerHTML = 'SC*1500 ' + SC + ' cc';
            SC = (flujo * 2000).toFixed(0);
            MAN.innerHTML = 'SC*2000 ' + SC + ' cc';
            CONTENEDOR.style.display = 'block'
            CAL.mas30.style.display = 'block'
            CAL.msc.style.display = 'block'
            CAL.menos30.style.display = 'none'
            CAL.hol.style.display = 'none'
        }
    } else {
        ERROR.style.display = 'block';
        VOL.style.display = 'none';
        FLU.style.display = 'none';
        MAN.style.display = 'none';
    }

});
//calcula el flujo
function calcFlujo(peso) {
    let flujo = 0;
    const calculos = {
        segmento20a30: () => 1500 + ((peso - 20) * 20),
        mayor10: () => 1000 + ((peso - 10) * 50),
        menorIgual10: () => peso * 100,
        mayor30: () => (((peso * 4) + 7) / (peso + 90)).toFixed(2)
    };
    flujo = (peso > 20 && peso <= 30) ? calculos.segmento20a30() :
        (peso > 10 && peso <= 20) ? calculos.mayor10() : (peso <= 10) ? calculos.menorIgual10() :
            calculos.mayor30()

    return flujo;
}


//Cambio de color la interfaz
botonCambiarColor.addEventListener('click', () => {
   
    const colorAleatorio = getRandomColor();
    elementoDetalle.style.backgroundColor = colorAleatorio;
    elementoboton.style.backgroundColor = colorAleatorio;
    VOL.style.color = colorAleatorio;
    FLU.style.color = colorAleatorio;
    MAN.style.color = colorAleatorio;

});

function getRandomColor() {
    const r = Math.floor(Math.random() * 128);
    const g = Math.floor(Math.random() * 128);
    const b = Math.floor(Math.random() * 128);

    const colorHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    return colorHex;
}