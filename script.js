const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');
const botonCambiarColor = document.getElementById('cambiarColor');
const elementoDetalle = document.getElementById('detalle');
const elementoboton = document.getElementById('calcular');
CALCULAR.addEventListener('click', () => {
    const DATO = document.getElementById('peso').value
    //validamos que se cargue un dato:
    if (DATO > 0) {
        ERROR.style.display = 'none';
        let flujo = calcFlujo(DATO);
        FLU.style.display = 'block';
        MAN.style.display = 'block';
        
        if (DATO <= 30) {
            let mantenimiento = flujo * 1.5;
            FLU.innerHTML = flujo + ' cc/hr';
            MAN.innerHTML = 'm+m/2 ' + mantenimiento + ' cc/hr';
        } else {
            let SC = flujo * 1500;
            FLU.innerHTML = 'SC*1500 ' + SC + ' cc';
            SC = flujo * 2000;
            MAN.innerHTML = 'SC*2000 ' + SC + ' cc';
        }
    } else {
        ERROR.style.display = 'block';
        FLU.style.display = 'none';
        MAN.style.display = 'none';
    }
    
});
//calcula el flujo
function calcFlujo(peso) {
    let flujo = 0;
    let uSegmento = 0;
    let pSegmento = 0;
    const calculos = {
        segmento20a30: () => {
            uSegmento = peso - 20;
            pSegmento = peso - (uSegmento + 10);
            flujo = (pSegmento*100) + (pSegmento*50) + (uSegmento*20);
            flujo/=24;
            return  Math.round(flujo);
        },
        mayor10: () => {
            uSegmento = peso-10;
            pSegmento = peso - uSegmento;
            flujo = Math.round(((pSegmento*100 )+(uSegmento*50) )/24);
            return  flujo;
        },
        menorIgual10: () => {
            flujo =  Math.round((peso * 100) / 24)
            return  flujo;
        },
        mayor30: () => {
            pSegmento = (peso * 4) + 7;
            uSegmento = parseInt(peso)+90;
            pSegmento/= uSegmento;
            flujo = pSegmento.toFixed(2);
            return flujo;
        }
    };

    if (peso > 20 && peso <= 30) {
        flujo = calculos.segmento20a30();
    } else if (peso > 10 && peso <=20) {
        flujo = calculos.mayor10();
    } else if (peso <= 10) {
        flujo = calculos.menorIgual10();
    } else if (peso > 30) {
        flujo = calculos.mayor30();
    }

    return flujo;
}



/*botonCambiarColor.addEventListener('click', () => {
    // Genera un color aleatorio en formato hexadecimal
    const colorAleatorio = getRandomColor();

   
    elementoDetalle.style.backgroundColor = colorAleatorio;
    elementoboton.style.backgroundColor = colorAleatorio;
    
});

function getRandomColor() {
    // Genera componentes RGB aleatorios en el rango de colores oscuros
    const r = Math.floor(Math.random() * 128);
    const g = Math.floor(Math.random() * 128); 
    const b = Math.floor(Math.random() * 128); 

    // Convierte los componentes RGB en una cadena hexadecimal
    const colorHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    return colorHex;
}*/