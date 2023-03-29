/**
 * @autor Roberto Morán
 * @versión 1.0
 * @date 31/10/2022
 * @descripción Juego para encontrar parejas de cartas entre dos jugadores
 */

//variables para el desorrolo del programa
let numParejas1 = 0;
let numParejas2 = 0;
let puntos = 0;
let tiradas1 = 0;
let tiradas2 = 0;
let contador1 = 0;
let contador2 = 0;
let contadorJugadas = 0;
let contadorCartas = 0;
let contadorRepetidas = 0;

let letra = "";
let palo = "";
let numero = 0;

let jugador = "";
let jugador1 = "";
let jugador2 = "";
let jugada1 = false;
let jugada2 = false;

let repetida = false;

let carta = "";
let cartaJugada1 = "";
let cartaJugada2 = "";

//borón que inicia el juego capturando el evento click
let btnJugar = document.getElementById("bJugar");

//array de cartas jugadas
let cartasJugadas = [];

//--------------------------------------------funcionies------------------------------------------------------------------------

/**
 * función que se iniciar con el evento click del ratón al pulsar sobre el botón
 */
function funcionJugar()
{
    //desabilitamos el botón
    btnJugar.disabled = true;
    
    //mientras el contadorJugadas sea menor de 10
    while (contadorJugadas < 10)
    {
        //si las variables string jugador1 y jugador2 no tienen datos
        if ((jugador1 == "") && (jugador2 == ""))
        {
            //llamamos a la función pedirNombre recibiendo array con dos valores
            var jugadores = pedirNombres();
                //pasamos los valores a variables
                jugador1 = jugadores[0];
                jugador2 = jugadores[1];  
                
            //imprimimos los nombres de los jugadores
            document.querySelector('#j1').innerText = jugador1;
            document.querySelector('#j2').innerText = jugador2;

            //imprimimos los contadores de tiradas que estan a cero
            document.querySelector('#mo1').innerText = tiradas1;
            document.querySelector('#mo2').innerText = tiradas2;
        }

        //si las variables booleanas jugada1 y jugada2:
        //estan los dos a false
        //o
        //jugada1 está a false y jugada2 está a true
        if (((jugada1 == false) && (jugada2 == true)) || ((jugada1 == false) && (jugada2 == false)))
        {
            //ponemos a true jugada1
            jugada1 = true;
            //ponemos a false jugada2
            jugada2 = false;
            //llamamos a la variable elige carta enviando el nombre del jugador1 por parámetro
            //y recimiendo la carta elegia por el jugador1
            cartaJugada1 = eligeCarta(jugador1);
            //creamos la variable textoCarta1 donde recibe el nombre de la carta elegida
            //llamamos a la función convertir la carta en texto y enviamos la carta elegida por parámetro
            let textoCarta1 = convertirCartaEnTexto(cartaJugada1);
            //aumentamos en 1 el contador del jugador 1
            contador1++;
            //Imprimimos los datos obtenidos en los label de la página web
            document.querySelector('#mo1').innerText = contador1;
            document.querySelector('#ca1').innerText = textoCarta1;
            
            //evaluamos la variable contador para que en función de su contenido imprima en uno u otro label de la web
            switch (contador1) {
                case 1:
                    document.querySelector('#j11').innerText = textoCarta1;
                    break;
                case 2:
                    document.querySelector('#j12').innerText = textoCarta1;
                    break;
                case 3:
                    document.querySelector('#j13').innerText = textoCarta1;
                    break;
                case 4:
                    document.querySelector('#j14').innerText = textoCarta1;
                    break;
                case 5:
                    document.querySelector('#j15').innerText = textoCarta1;
                    break;
            
                default:
                    break;
            }
        }
        //si el if no se cumple, pero se cumple:
        //que jugada2 esté a false y jugada1 a true
        else  if ((jugada2 == false) && (jugada1 == true))
        {
            //ponemos a false jugada1
            jugada1 = false;
            //ponemos a true jugada2
            jugada2 = true;
            //llamamos a lafunción elige carta enviando el nombre del jugador2 por parámetro
            //recibiremos la carta elegida por el jugador2
            cartaJugada2 = eligeCarta(jugador2);
            //creamos la variable textoCarta2 donde recibe el nombre de la carta elegida
            //llamamos a la función convertir la carta en texto y enviamos la carta elegida por parámetro
            let textoCarta2 = convertirCartaEnTexto(cartaJugada2);
            //aumentamos en uno el contador del jugador 2
            contador2++;
            //imprimimos los datos obtenidos en sus label correspondientes
            document.querySelector('#mo2').innerText = contador2;
            document.querySelector('#ca2').innerText = textoCarta2;

            //evaluamos la variable contador para que en función de su contenido imprima en uno u otro label de la web
            switch (contador2) {
                case 1:
                    document.querySelector('#j21').innerText = textoCarta2;
                    break;
                case 2:
                    document.querySelector('#j22').innerText = textoCarta2;
                    break;
                case 3:
                    document.querySelector('#j23').innerText = textoCarta2;
                    break;
                case 4:
                    document.querySelector('#j24').innerText = textoCarta2;
                    break;
                case 5:
                    document.querySelector('#j25').innerText = textoCarta2;
                    break;
            
                default:
                    break;
            }
        }
        //aumentamos en uno el contador de jugadas
        contadorJugadas++;

        //si tenemos datos en las variables cartajugada 1 y 2 
        if ((cartaJugada1 != "") && (cartaJugada2 != ""))
        {
            //llamamos a la función jugadaActual enviando las cartas de cada jugador por parámetro
            jugadaActual(cartaJugada1, cartaJugada2);
        }
    }
    //Una vez finalizado el juego, volvemos a habilitar el botón de inicio
    btnJugar.disabled = false;
}

//FUNCIÓN OBLIGATORIA QUE PIDE LOS NOMBRES DE LOS JUGADORES
function pedirNombres()
{
    //por medio de una ventana emergente, solicita los nombres de los dos jugadores
    jugador1 = window.prompt("Juador 1, ponga su nombre de usuario");
    jugador2 = window.prompt("Juador 2, ponga su nombre de usuario");

    //retorna los nombres en un array de dos valores
    return [jugador1, jugador2];
}

//FUNCIÓN OBLIGATORIA EN LA QUE CADA JUGADOR ELEGIRÁ UNA CARTA
//Recibe el nombre del jugador por parámetro
function eligeCarta(jugador)
{
    //si el jugador que tiene que elegirla carta es el jugador 1
    if (jugador == jugador1)
    {
        //aumentamos en uno el contador de cartas
        contadorCartas++;
    }
    //si es el jugador 2 el que tiene que elegir la carta
    else if (jugador == jugador2)
    {
        //aumentamos en uno el contador de cartas
        contadorCartas++;
    }

    //ejecuta
    do
    {
        //si la variable booleana repetida está a true
        if (repetida)
        {
            //avisa al jugador de que la carta que eligió no está disponible y le pide que elija otra
            window.alert("Esa misma carta ya ha sido elejida y no está disponible.\nElija otra diferente por favor")
        }

        //ejecuta
        do
        {
            //pedimos al jugadoren turno que elija un palo de la baraja
            palo = window.prompt(jugador + ", elije un palo de la Baraja española \n 'o' para Oros \n 'c' para copas \n 'e' para espadas \n 'b' para bastos");
            //llamamos a la función convertir en minúsculay enviamos la letra del palo por parámetro
            //recimos la letra en minúscula
            letra = convertirMinuscula(palo);
        }
        //mientras la letra no se una o, una c, una e o una b
        while ((letra != 'o') && (letra != 'c') && (letra != 'e') && (letra != 'b'));

        //ejecuta
        do
        {
            //método try cach para capturar posibles errores de no introducir números
            try
            {
                //pide un número al jugador en turno y lo convierte a número
                numero = Number(window.prompt(jugador + ", porfa, elige ahora la carta \n '1' para As \n '2' para dos \n '3' para tres \n '4' para cuatro \n '5' para cinco \n '6' para seis \n '7' para siete \n '10' para Sota \n '11' para Caballo \n '12' para Rey"));
            }
            catch (e)
            {
                //si se roduce una excepción envía el mensaje de alerta
                window.alert("Tiene que teclear valor número entre 1 y 12 exceptuando el 8 y el 9");
            }
        }
        //mientras el número que introduzca el jugador no esté entre 1 y 12 excetuando el 8 y el 9
        while ((numero != 1) && (numero != 2) && (numero != 3) && (numero != 4) && (numero != 5) && (numero != 6) && (numero != 7) && (numero != 10) && (numero != 11) && (numero != 12));

        //llamamos a la función comprobar carta repedida eviando la letra y número por parámetro
        //recibe true o false de si está o no repetida
        repetida = comprobarCartaRepetida(letra, numero);
        
    }
    //mienras la variable booleana esté a true
    while (repetida);

    //retornamos la carta elegida por el jugador que se recibe al llamar a la función formatear carta
    //a la que enviamos la letra y el número por parámetro
    return carta = formatearCarta(letra, numero);
}

/**
 * Función que comprueba si las cartas elegidas por los jugadores y recibidas por parámetro son iguales
 * @param {*} jugada1 
 * @param {*} jugada2 
 */
function jugadaActual(jugada1, jugada2)
{
    //llamamos a la función descomponer Jugada que nos devuelve el número de la carta obviando el palo
    //le enviamos la carta de cada jugador en las dos llamadas que hacemos
    let c1 = descomponerJugada(jugada1);
    let c2 = descomponerJugada(jugada2);

    //si el contenido de la parte numérica de la carta es igual
    if (c1 == c2)
    {
        //llamamos a la función imprimir resultado pareja y enviamos una de las cartas por parámetro
        imprimirResultadoPareja(c1);
        //aumentamos en uno el contador de puntos
        puntos++;
        //si los contadores de cada jugador están en 5
        if ((contador1 == 5) && (contador2 == 5))
        {
            //llamamos a la función formato salida resulado y enviamos los puntos por parámetro
            formatoSalidaResultado(puntos)
        }
        //si no están a 5
        else
        {
            //imprimimos en el label correspondiente la puntuación parcial
            document.getElementById('punG').innerHTML = "Resltado parcial: " + puntos;
        }
    }
    //si no es igual
    else
    {
        //le damos el resultado negativo a los jugadores
        window.alert("Lo siento, no habido suerte")
    }
    //borramos el contenido de las variables carta jugada 1 y 2
    cartaJugada1 = "";
    cartaJugada2 = "";
}

//función que muestra los datos de la carta elegida en cada jugada
//enviamos el nombre del jugador y la carta elegida por éste por parámetro
function mostrarDatos(jugador, carta)
{
    //si el jugador que ha elegido es el 1
    if (jugador == "jugador1")
    {
        //imprime su carta en el label correspondiente
        document.getElementById('ca1').innerHTML = carta;
    }
    //si es el 2
    else if (jugador == "jugador2")
    {
        //imprime su carta en el label correspondiente
        document.getElementById('ca2').innerHTML = carta;
    }
}

/**
 * Función que cambia el nombre de la carta por el INDICADO en el enunciado del ejercicio
 * @param {*} palo 
 * @param {*} numero 
 * @returns retorna el nombre correcto de la carta
 * recibe el palo y el número de la carta por parámetro
 */
function formatearCarta(palo, numero)
{
    //creamos variable auxiliar para apoyo
    let aux = "";

    //si la carta elegia es un 1, lo pasamos a denominar As
    if (numero == 1)
    {
        aux = "As"
    }
    //si la carta elegia es un 10, la pasamos a denominar S
    else if (numero == 10)
    {
        aux = "S";
    }//si la carta elegia es un 11, la pasamos a denominar C
    else if (numero == 11)
    {
        aux = "C";
    }
    //si la carta elegia es un 12, la pasamos a denominar R
    else if (numero == 12)
    {
        aux = "R";
    }
    //si no se cumple ninguna de la condiciones anteriores convertimos el número es un string
    else
    {
        aux = numero.toString();
    }

    //retornamos la variables carta formada por la unión de los string aux y palo
    return carta = aux + palo;
}

/**
 * Función que evalúa si la letra del palo es minúscula y si no lo es, la convierte a minúscula
 * @param {*} palo 
 * @returns retorna la letra minúscula del palo
 */
function convertirMinuscula(palo)
{
    //si la letra es mayúscula
    if (!palo.toUpperCase)
    {
        //devuelve la misma letra mayúscula
        return letra = palo.toLowerCase();
    }
    //si la letra no está en mayúscula
    else
    {
        //retorna la letra una vez formateada en mayúscula
        return letra = palo;
    } 
}

/**
 * función que toma la parte numérica de la carta elegida
 * @param {*} c 
 * @returns retorna el número de la carta elegida
 */
function descomponerJugada(c)
{
    return carta = c.substr(0, c.length - 1);
}

/**
 * función que toma la parte de la letra del palo de la carta elegida
 * @param {*} c 
 * @returns retorna la letra de la carta elegida
 */
function descomponerJugadaPalo(p)
{
    return palo = p.substr(p.length - 1, 1);
}

/**
 * Función que felicita a los jugadores si han conseguido pareja y les dice la pareja conseguida
 * @param {*} c 
 * recibe el número de la carta por parámetro
 */
function imprimirResultadoPareja(c)
{
    //En función del número de la carta recibida por parámetro informa a los jugadores de la pareja conseguida
    switch (c) {
        case "As":
            window.alert("Enhorabuena, habéis obtenido una pareja de Ases");
            break;
        case "2":
            window.alert("Enhorabuena, habéis obtenido una pareja de Doses");
            break;
        case "3":
            window.alert("Enhorabuena, habéis obtenido una pareja de Treses");
            break;
        case "4":
            window.alert("Enhorabuena, habéis obtenido una pareja de Cuatros");
            break;
        case "5":
            window.alert("Enhorabuena, habéis obtenido una pareja de Cincos");
            break;
        case "6":
            window.alert("Enhorabuena, habéis obtenido una pareja de Seises");
            break;
        case "7":
            window.alert("Enhorabuena, habéis obtenido una pareja de Sietes");
            break;
        case "S":
            window.alert("Enhorabuena, habéis obtenido una pareja de Sotas");
            break;
        case "C":
            window.alert("Enhorabuena, habéis obtenido una pareja de Caballos");
            break;
        case "R":
            window.alert("Enhorabuena, habéis obtenido una pareja de Reyes");
            break;
    
        default:
            break;
    }
}

/**
 * Función que convierte en texto amigable la parte numérica y la parte del palo de la carta elegida
 * @param {*} cartaOrigen 
 * @returns retorna el texto correspondiente
 * recibe por parámetro la carta elegida
 */
function convertirCartaEnTexto(cartaOrigen)
{
    //llamamos a la función descomponer jugada para obtener el número de la carta
    let carta = descomponerJugada(cartaOrigen);
    //llamamos a la función descomponer jugada Palo para obtener el palo de la carta
    let paloCarta = descomponerJugadaPalo(cartaOrigen);
    //creamos dos variabls auxiliares
    let auxC = "";
    let auxP = "";

    //en función del contenido numérico en string de la variable carta damos valor string a la varialbe auxiliar
    switch (carta) {
        case "As":
            auxC = "As de ";
            break;
        case "2":
            auxC = "2 de ";
            break;
        case "3":
            auxC = "3 de ";
            break;
        case "4":
            auxC = "4 de ";
            break;
        case "5":
            auxC = "5 de ";
            break;
        case "6":
            auxC = "6 de ";
            break;
        case "7":
            auxC = "7 de ";
            break;
        case "8":
            auxC = "8 de ";
            break;
        case "S":
            auxC = "Sota de ";
            break;
        case "C":
            auxC = "Caballo de ";
            break;
        case "R":
            auxC = "Rey de ";
            break;
    
        default:
            break;
    }

    //si el palo de la carta recibido es igual a o
    if (paloCarta == "o")
    {
        //damos nombre al palo oros
        auxP = "Oros";
    }
    //si el palo de la carta recibido es igual a c
    else if (paloCarta == "c")
    {
        //damos nombre al palo copas
        auxP = "Copas";
    }
    //si el palo de la carta recibido es igual a e
    else if (paloCarta == "e")
    {
        //damos nombre al palo espadas
        auxP = "Espadas";
    }
    //si el palo de la carta recibido es igual a b
    else if (paloCarta == "b")
    {
        //damos nombre al palo bastos
        auxP = "Bastos";
    }

    //retornamos la unión de las variables auxiliares con el texto formateado
    return auxC + auxP;
}

/**
 * Función que obtiene el resultado según el enunciado del ejercicio
 * @param {*} puntosTotal 
 * recibe por parámetro la suma de los puntos obtenidos
 */
function formatoSalidaResultado(puntosTotal)
{
    /*De 0 a 3→ El resultado final es de X sobre 10, necesitáis mejorar…
    De 4 a 6→ El resultado final es de X sobre 10, vais por buen camino…
    De 7 a 9→ El resultado final es de X sobre 10, estáis en la misma sintonía…
    Un 10→ El resultado final es de X sobre 10, lo bordáis*/

    //creamos la variable que prorratea el resutado en función de los puntos para sacar el equivalente a 10
    let puntosRefinitivos = ((puntosTotal * 10) / 5);
    //ponemos el contador de cartas a 0
    contadorCartas = 0;

    //si el prorrateo de la puntuación es igual o mayor a cero y menor o igual a tres
    if ((puntosRefinitivos >= 0) && (puntosRefinitivos <= 3)) 
    {
        document.getElementById('punG').innerHTML = "Enhorabuena " + jugador1 + " y " + jugador2 + ": El resultado final es de " + puntosRefinitivos + " sobre 10";   
    }
    //si el prorrateo de la puntuación es igual o mayor a cuatro y menor o igual a seis
    else if ((puntosRefinitivos >= 4) && (puntosRefinitivos <= 6))
    {
        document.getElementById('punG').innerHTML = "Enhorabuena " + jugador1 + " y " + jugador2 + ": El resultado final es de " + puntosRefinitivos + " sobre 10";
    }        
    //si el prorrateo de la puntuación es igual o mayor a siete y menor o igual a nueve
    else if ((puntosRefinitivos >= 7) && (puntosRefinitivos <= 9))
    {
            document.getElementById('punG').innerHTML = "Enhorabuena " + jugador1 + " y " + jugador2 + ": El resultado final es de " + puntosRefinitivos + " sobre 10";
    }
    //si el prorrateo de la puntuación es igual a diez
    else if(puntosRefinitivos == 10)
    {
        document.getElementById('punG').innerHTML = "Enhorabuena " + jugador1 + " y " + jugador2 + ": El resultado final es de " + puntosRefinitivos + " sobre 10";
    }

    //pone a 0 los contadores de cada jugador
    contador1 = 0;
    contador2 = 0;
}

/**
 * Función que comprueba si una carta elegida ya había sido elegida anteriormente
 * @param {*} palo 
 * @param {*} numero 
 * @returns retorna verdadero o falso según haya sido elegida o no
 * recibe por parámetro el palo y el número de la carta elegida
 */
function comprobarCartaRepetida(palo, numero)
{
    //creamos una variable string con la unión del número y el palo elegidos
    let cartaActual = numero + palo;
    //creamos y ponemos la variable a falso
    let rep = false

    //creamos un bucle que recorre el array de cartas jugadas
    for (i = 0; i < cartasJugadas.length + 1; i++)
    {
        //si en alguna iteración del bucle, el valor del contenido del array coincide con la carta elegida
        if (cartasJugadas[i] == cartaActual)
        {
            //pone la variable a true
            rep = true;
        }
    }   

    //si la variable está a false, o sea, si no hay coincidencia
    if (!rep)
    {
        //suma uno al contador de cartas repetidas
        contadorRepetidas++;
        //agrega la carta elegida que no se repite al arrya de cartas jugadas
        cartasJugadas[contadorRepetidas - 1] = cartaActual; 
    }

    //retorna verdadero o falso dependiendo de si hay o no coincidencia
    return rep;
}