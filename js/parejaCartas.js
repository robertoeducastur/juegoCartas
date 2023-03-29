  /**
 * @autor Roberto Morán
 * @versión 1.0
 * @date 05/11/2022
 * @descripción Juego Gráfico que consiste en obtener:
 *    parejas del mismo palo, suman 1 punto
 *    parejas del mismo número, suman 3 puntos
 *    parejas de reyes, suman 5 puntos
 *    parejas de ases, suman 10 puntos
 *    dobles parejas de reyes, suman 50 puntos
 *    dobles parejas de ases, suman 100 puntos
 */

//--------------------------------------------------------------------------------------------------------------------------------
//---------¡¡¡ OJO !!!--------------------------------¡¡¡ OJO !!!-------------------------------¡¡¡ OJO !!!-----------------------
//--------------------------------------------------------------------------------------------------------------------------------
//función que limpia el contenido de los datos almacenados en el fichero local con todos los record anteriores
//solo la usaremos en el caso de querer eliminar todos los datos
//limpiezaDatosPersistentes();
//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------

//Cartas de la baraja española:
//Palo deOros: Aso, 2o, 3o, 4o, 5o, 6o, 7o, So, Co, Ro
//Palo de copas: Asc, 2c, 3c, 4c, 5c, 6c, 7c, Sc, Cc, Rc
//Palo de Bastos: Asb, 2b, 3b, 4b, 5b, 6b, 7b, Sb, Cb, Rb
//Palo de Espadas: Ase, 2e, 3e, 4e, 5e, 6e, 7e, Se, Ce, Re

//variables utilizadas durante la ejecución del programa
let puntos = 0;
let tiradas = 0;
let contador1 = 0;
let contador2 = 0;
let contadorJugadas = 0;
let contadorCartas = 0;
let contadorRepetidas = 0;

let jugador = "";
let jugadorActual = "";
let jugadorFuturo = "";
let jugador1 = "";
let jugador2 = "";
let jugada1 = false;
let jugada2 = false;

let numParejas1 = 0;
let numParejas2 = 0;
let tiradas1 = 0;
let tiradas2 = 0;

let numParejas = 0;
let numParejasNum = 0;
let numParejasS = 0;
let numParejasC = 0;
let numParejasR = 0;
let numParejasAs = 0;

let repetida = false;
let letra = "";
let palo = "";
let numero = 0;
let carta = "";

let cartaJugada1 = "";
let cartaJugada2 = "";

//variable para la fecha
let hoy = new Date();

//array de cartas jugadas
let cartasJugadas = [];

//instanciación de controles del DOM
let tabla = document.getElementById('tablaCartas');
let btnJugar = document.getElementById("btnJugar");

//si la tabla está visible, hacerla invisible
if (tabla.style.display = 'block')
{
    tabla.style.display = 'none';
}

//hacer visible el butón btnJugar
btnJugar.disabled = false;

//array con las cartas de la baraja
var baraja = ["Aso", "2o", "3o","4o", "5o", "6o","7o", "So", "Co", "Ro",
            "Asc", "2c", "3c","4c", "5c", "6c","7c", "Sc", "Cc", "Rc",
            "Asb", "2b", "3b","4b", "5b", "6b","7b", "Sb", "Cb", "Rb",
            "Ase", "2e", "3e","4e", "5e", "6e","7e", "Se", "Ce", "Re"];

//array con los controles del DOM
var tdS = ["1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9",
        "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8", "2.9", 
        "3.0", "3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8", "3.9",
        "4.0", "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9"];

//llamamos a la función barajarCartas, enviamos el array de la baraja ordenado, y recibimos
// un nuevo array con las cartas desordenadas aleatoriamente
var barajaBarajada = barajarCartas(baraja); 


//------------------------------------funciones por evento-------------------------------------------------------------------------

/**
 * Función que inicia el juego al hacer click en el botón
 */
function funcionBotonJugar()
{
    //una vez hecho click en el botón, lo desabilitamos mientras dure la partida
    btnJugar.disabled = true;
    
    //si las variables que almacenan el nombre de los jugadores están vacías
    if ((jugador1 == "") && (jugador2 == ""))
    {
        //llamamos a la función pedirNombres que nos devuelve un array con dos valores
        var jugadores = pedirNombres();
            //en cada valor, tendremos el nombre de cada jugador
            jugador1 = jugadores[0];
            jugador2 = jugadores[1];

        //imprimimos la información de los contadores a cero en la web
        document.querySelector('#pParejasPalo').innerText = "Palos: " + numParejas;
        document.querySelector('#pParejasNumero').innerText = "Números: " + numParejasNum;
        document.querySelector('#pParejasSotas').innerText = "Sotas: " + numParejasS;
        document.querySelector('#pParejasCaballos').innerText = "Caballos: " + numParejasC;
        document.querySelector('#pParejasReyes').innerText = "Reyes: " + numParejasR;
        document.querySelector('#pParejasAses').innerText = "Ases: " + numParejasAs;
        document.querySelector('#pParejas4Reyes').innerText = "Dobles Reyes: " + numParejasR;
        document.querySelector('#pParejas4Ases').innerText = "Dobles Ases: " + numParejasAs;
        document.querySelector('#pPuntosTotal').innerText = puntos;
    }

    //si la tabla está oculta, no visible, se hará visible para el usuario
    if (tabla.style.display = 'none')
    {
        tabla.style.display = 'block';
    }  

    //le indicamos al primer jugador que tiene que elegir su carta
    document.querySelector('#labelJugadas').innerText = jugador1 + ", " + "\n" + "elige tu primera carta," + "\n" + "por favor";
}

/**
 * Función que recibe los click que se efectúen sobre las cartas
 * @param {*} elemento 
 * @param {*} posicion 
 * Recibe por parámetro el elemento desde el que se hace click y un código con su posición
 */
function eventoOnClick(elemento, posicion)
{
    //si hacemos menos de 10 tiradas
    if (tiradas < 10)
    {
        //aumentamos en uno el contador de tiradas
        tiradas++;
        //aumentamos en uno el contador de jugadas
        contadorJugadas++;

        //obtenemos el nombre de la carta seleccionando ésta según la posición del control pulsado
        //actuando sobre el array desordenado de las cartas
        var cartaElegida = barajaBarajada[posicion];
        //selecionamos ahora la imagen que se corresponde con la carta elegida
        var cartaImagen = "./img/" + barajaBarajada[posicion] + ".jpg";
        //hacemos visible la carta en el mismo lugar donde se ha hecho click mediante el parámetro del elemento recibido
        document.getElementById(elemento).src = cartaImagen;

        //identificamos el jugador actual llamando a su función
        jugadorActual = JugadorActual();
        //llamamos a la función jugada en curso y el enviamos el jugador actual y la carta elegida
        jugadaEnCurso(jugadorActual, cartaElegida);

        //identificamos al siguiente jugador por medio de la función jugador futuro enviando por parámetro
        //al jugador actual
        jugadorFuturo = JugadorFuturo(jugadorActual);
        //llamamos a la función elige carta y enviamos por parámetro al jugador que la tiene que elegir
        eligeCarta(jugadorFuturo);

        //si ya hemos realizado las 10 tiradas
        if (tiradas == 10)
        {
            //llamamos a la función finaliza juego
            //utilizamos éste método preventivamente para reforzar el funcionamiento del final
            finalizarJuego();
        }
    }
    //si se hace click después de la décima tirada se finalizará el juego
    else
    {
        finalizarJuego();
    }
    
}

//--------------------------------------------funciones por llamamiento--------------------------------------------------------

/**
 * Función que se utiliza para pedir los nombres de los jugadores
 * @returns 
 * retorna un array con el nombre de ambos jugadores
 * Se ha optado por no restringir la entrada de datos, aceptando cualquier carácter o ninguno
 */
function pedirNombres()
{
    //Por medio del método window.prmpt pedimos los datos a los usuarios y los recogemos en las variables
    jugador1 = window.prompt("Ponga su nombre de usuario o pila, por favor");
    //para objeto de control, añadimos un punto tras el nombre del jugador y lo almacnamos con jugador 2
    jugador2 = jugador1 + ".";

    //se imprimen los nombres de los jugadores en la web
    document.querySelector('#pJugador1').innerText = jugador1;

    //se retornan los nombres en un array
    return [jugador1, jugador2];
}

/**
 * Función que controla la jugada en curso
 * @param {*} jugador 
 * @param {*} cartaElegida 
 * Recibe por parámetro el jugador que efectúa la jugada y la carta escogida por éste
 */
function jugadaEnCurso(jugador, cartaElegida)
{
    //si el jugador que juega es el jugador 1
    if (jugador == jugador1)
    {
        //ponemos la carta elegida en la variable de carta jugada del jugador 1
        cartaJugada1 = cartaElegida;
        //borramos el contenido de la carta elegida
        cartaElegida = "";
        //aumentamos en uno el contador del jugador 1
        contador1++;
    }
    //Si el jugador que juega es el jugador 2
    else
    {
        //ponemos la carta elegida en la variable de carta jugada del jugador 2
        cartaJugada2 = cartaElegida;
        //borramos el contenido de la carta elegida
        cartaElegida = "";
        //aumentamos en uno el contador del jugador 2
        contador2++;
    }

    //si el contenido de las variables de carta jugada de cada jugador no están vacías
    if ((cartaJugada1 != "") && (cartaJugada2 != ""))
    {
        //Descomponemos la carta elegida
        //Aquí descartamos el carácter de la derecha cogiendo el resto
        let numero1 = cartaJugada1.substr(0, cartaJugada1.length - 1);
        let numero2 = cartaJugada2.substr(0, cartaJugada2.length - 1);
        //aquí tomamos el carácter de la derecha descartando el resto
        let palo1 = cartaJugada1.substr(cartaJugada1.length - 1, 1);
        let palo2 = cartaJugada2.substr(cartaJugada2.length - 1, 1);

        //si el número elegido en la carta jugada del jugador 1 es igual a la del jugador 2
        //y además, la carta se llama S de Sota
        if ((numero1 == numero2) && (numero1 == "S"))
        {
            //aumentamos en uno el contador de pareja de sotas
            numParejasS++;

            //si ese contador está en dos
            if(numParejasS == 2)
            {
                //sumamos 25 puntos (5 de pareja de sotas y 20 de doble pareja de sotas)
                puntos = puntos + 25;
                //aumentamos en uno el contador de parejas de números, pues no dejan de ser 10s
                //aunque no aumentamos la puntuación por pareja de números
                numParejasNum++;
                //hacemos visible el contenido del contador de pareja de sotas en la web
                document.querySelector('#pParejas4Sotas').innerText = "Dobles Sotas: " + numParejasS;
            }
            //si el contador de parejas no está a dos
            else
            {
                //sumamos 5 a la variable puntos
                puntos = puntos + 5;
                //aumentamos en uno el contador de parejas de numeros
                numParejasNum++;
                //hacemos visible el contenido del contador de pareas de sotas
                document.querySelector('#pParejasSotas').innerText = "Sotas: " + numParejasS;
            }
            
            //Actualizamos la ifnformación mostrada sobre el contador de parejas de números
            document.querySelector('#pParejasNumero').innerText = "Numeros: " + numParejasNum;
            //Actualizamos la información mostrada sobre el número de puntos
            document.querySelector('#pPuntosTotal').innerText = puntos;
            //Mostramos un alert dond indicamos que se ha obtenido una pareja de reyes
            window.alert("¡¡¡ Olé, pareja de Sotas conseguida !!!");
        }
        //si el número elegido en la carta jugada del jugador 1 es igual a la del jugador 2
        //y además, la carta se llama C de Caballo
        else if ((numero1 == numero2) && (numero1 == "C"))
        {
            //aumentamos en uno el contador de pareja de caballos
            numParejasC++;

            //si ese contador está en dos
            if(numParejasC == 2)
            {
                //sumamos 20 puntos (5 de pareja de caballos y 20 de doble pareja de caballos)
                puntos = puntos + 25;
                //aumentamos en uno el contador de parejas de números, pues no dejan de ser 11s
                //aunque no aumentamos la puntuación por pareja de números
                numParejasNum++;
                //hacemos visible el contenido del contador de pareja de sotas en la web
                document.querySelector('#pParejas4Caballos').innerText = "Dobles Caballos: " + numParejasC;
            }
            //si el contador de parejas no está a dos
            else
            {
                //sumamos 5 a la variable puntos
                puntos = puntos + 5;
                //aumentamos en uno el contador de parejas de numeros
                numParejasNum++;
                //hacemos visible el contenido del contador de pareas de caballos
                document.querySelector('#pParejasCaballos').innerText = "Caballos: " + numParejasC;
            }
            
            //Actualizamos la ifnformación mostrada sobre el contador de parejas de números
            document.querySelector('#pParejasNumero').innerText = "Numeros: " + numParejasNum;
            //Actualizamos la información mostrada sobre el número de puntos
            document.querySelector('#pPuntosTotal').innerText = puntos;
            //Mostramos un alert dond indicamos que se ha obtenido una pareja de reyes
            window.alert("¡¡¡ Olé, pareja de Caballos conseguida !!!");
        }
        //si el número elegido en la carta jugada del jugador 1 es igual a la del jugador 2
        //y además, la carta se llama R de rey
        else if ((numero1 == numero2) && (numero1 == "R"))
        {
            //aumentamos en uno el contador de pareja de reyes
            numParejasR++;

            //si ese contador está en dos
            if(numParejasR == 2)
            {
                //sumamos 50 puntos (10 de pareja de reyes y 40 de doble pareja de reyes)
                puntos = puntos + 50;
                //aumentamos en uno el contador de parejas de números, pues no dejan de ser 12s
                //aunque no aumentamos la puntuación por pareja de números
                numParejasNum++;
                //hacemos visible el contenido del contador de pareja de reyes en la web
                document.querySelector('#pParejas4Reyes').innerText = "Dobles Reyes: " + numParejasR;
            }
            //si el contador de parejas no está a dos
            else
            {
                //sumamos 5 a la variable puntos
                puntos = puntos + 10;
                //aumentamos en uno el contador de parejas de numeros
                numParejasNum++;
                //hacemos visible el contenido del contador de pareas de reyes
                document.querySelector('#pParejasReyes').innerText = "Reyes: " + numParejasR;
            }
            
            //Actualizamos la ifnformación mostrada sobre el contador de parejas de números
            document.querySelector('#pParejasNumero').innerText = "Numeros: " + numParejasNum;
            //Actualizamos la información mostrada sobre el número de puntos
            document.querySelector('#pPuntosTotal').innerText = puntos;
            //Mostramos un alert dond indicamos que se ha obtenido una pareja de reyes
            window.alert("¡¡¡ Olé, pareja de Reyes conseguida !!!");
        }
        //si el número elegido en la carta jugada del jugador 1 es igual a la del jugador 2
        //y además, la carta se llama As de ases
        else if ((numero1 == numero2) && (numero1 == "As"))
        {
            //aumentamos en uno el contador de pareja de ases
            numParejasAs++;

            //si el contador está a dos
            if(numParejasAs == 2)
            {
                //sumamos 100 puntos a la cantidad de puntos, 25 por pareja de ases y 75 por doble parejas de ases
                puntos = puntos + 100;
                //aumentamos en uno el contador de parejas de números, pero no sumamos los 3 puntos de dicha pareja
                numParejasNum++;
                //mostramos el contenido del contador de pareja de ases
                document.querySelector('#pParejas4Ases').innerText = "Dobles Ases: " + numParejasAs;
            }
            //si el contador de parejas no está en 2
            else
            {
                //sumamos 50 puntos a los puntos totales por la pareja de ases
                puntos = puntos + 25;
                //Aumentamos en uno el contador de parejas de números, pues no deja de ser pareja de unos
                numParejasNum++;
                //Actualizamos la información mostrada con el contador de pareja de ases
                document.querySelector('#pParejasAses').innerText = "Ases: " + numParejasAs;
            }

            //mostramos la información contenida en el contador de parejas de números
            document.querySelector('#pParejasNumero').innerText = "Numeros: " + numParejasNum;
            //mostramos la actualziación del total de puntos
            document.querySelector('#pPuntosTotal').innerText = puntos;
            //Mostramos un alert dond indicamos que se ha obtenido una pareja de reyes
            window.alert("¡¡¡ Olé, pareja de Ases conseguida !!!");
        }
        //si el número elegido en la carta jugada del jugador 1 es igual a la del jugador 2
        //y además, ninguna de las dos es un As ni un Rey
        else if ((numero1 == numero2) && ((numero1 != "As") && (numero1 != "R")))
        {
            //sumamos a la variable puntos los 3 correspondientes a la puntuación de una pareja de números
            puntos = puntos + 3;
            //aumentamos en uno el contador de parejas de números
            numParejasNum++;

            //actualizamos la info de la web
            document.querySelector('#pParejasNumero').innerText = "Numeros: " + numParejasNum;
            document.querySelector('#pPuntosTotal').innerText = puntos;
            //felicitamos por medio de una alert de la pareja conseguida
            window.alert("¡¡¡ Olé, pareja de números conseguida !!!");
        }
        //Si solo hay coincidencia en el palo
        else if (palo1 == palo2)
        {
            //Aumentamos los puntos en uno
            puntos++;
            //aumentamos el contador de parejas en uno
            numParejas++;

            //actualizamos datos en la web
            document.querySelector('#pParejasPalo').innerText = "Palos: " + numParejas;
            document.querySelector('#pPuntosTotal').innerText = puntos;
            //informamos de la pareja conseguida mediante un alert
            window.alert("¡¡¡ Olé, pareja de palos conseguida !!!");
        }
        //ni no se cumple ninguna de las condiciones anteriores
        else
        {
            //les decimo al jugador que no hubo suerte
            window.alert("Ohhh, que pena, inténtalo de nuevo");
        }
        //borramos el contenido de las variables de las jugadas
        cartaJugada1 = "";
        cartaJugada2 = "";
    }
    //llamamos a la función jugador futuro, le enviamos por parámetro el jugador actual y recibimos el que será el próximo jugador
    jugadorFuturo = JugadorFuturo(jugadorActual);
    //le enviamos el jugador próximo a la función elige carta
    eligeCarta(jugadorFuturo);
}

/**
 * Función que se encaga de informar al jugador cuando tiene que destapar una carta
 * @param {*} jugador 
 * Recibe el jugador por parámetro, aunque se haya quitado el jugador 2, lo usamos para el conteo de las tiradas
 */
function eligeCarta(jugador)
{
    //si llevamos el tope de tiradas, 10
    if (tiradas == 10)
    {
        //sacamos el texto de juego finalizado
        document.querySelector('#labelJugadas').innerText = "Juego Finalizado";
    }
    //si hay menos de 10 tiradas
    else
    {
        //si juega el jugador 1
        if (jugador != jugador1)
        {
            //vamos dando la información en pantalla
            document.querySelector('#labelJugadas').innerText = jugador + ", " + "\n" + "elige tu segunda carta de ésta mano," + "\n" + "por favor";
            document.querySelector('#pTiradas').innerText = jugador1 + ": " + contador1 + " de " + "5" + " || " + jugador1 + ": " + contador2 + " de " + "5";
        }
        //si juega el jugador2, que es el jugador1 con un punto tras el nombre del jugador1para efectos de diferenciación
        else
        {
            //vamos dando la información en pantalla
            document.querySelector('#labelJugadas').innerText = jugador + ", " + "\n" + "elige tu primera carta," + "\n" + "por favor";
            document.querySelector('#pTiradas').innerText = jugador1 + ": " + contador1 + " de " + "5" + " || " + jugador1 + ": " + contador2 + " de " + "5";
        }
    }   
}

/**
 * Función que averigua el turno que le corresonde al jugador para la primera o la segunda mano de cada tirada
 * @returns 
 */
function JugadorActual()
{
    //creamos la variable
    let jugadorActual = "";

    //si los contadores de ambas manos estan a cero y la jugada 1 a false
    if (((contador1 == 0) && (contador2 == 0)) && (jugada1 == false))
    {
        //damos el valor a las variables
        jugada1 = true;
        jugada2 = false;
        jugadorActual = jugador1;  
    }
    //si el contador 1 es igual al contador 2 y jugada 1 está en false
    else if ((contador1 == contador2) && (jugada1 == false))
    {
        //damos el valor a las variables
        jugada1 = true;
        jugada2 = false;
        jugadorActual = jugador1; 
    }
    //si el contador 1 es distinto al contador 2 y jugada 1 está a true y jugada 2 a false
    else if ((contador1 != contador2) && ((jugada1) && (jugada2 == false)))
    {
        //damos el valor a las variables
        jugada1 = false;
        jugada2 = true;
        jugadorActual = jugador2;  
    }   
    //retornamos el jugador actual
    return jugadorActual;
}

/**
 * Función que averigua quien será el siguiente jugador
 * @param {*} jugador 
 * @returns 
 * Recibe por parámetro el jugador actual
 */
function JugadorFuturo(jugador)
{
    //creamos la variable
    let jugadorFuturo = "";

    //si el jugador actual es el jugador 1
    if (jugador == jugador1)
    {
        //damos jugador 2 al jugador futuro. Recordamos que jugador 2 es jugador 1 con un punto
        jugadorFuturo = jugador2;  
    }
    //si el jugador actual es el jugador 2
    else if (jugador = jugador2)
    {
        //damos jugador 1 al jugador futuro
        jugadorFuturo = jugador1;  
    }   
    //retornamos el jugador futuro
    return jugadorFuturo;
}

/**
 * Función que ordenará las cartas de forma aleatoria
 * @param {*} baraja 
 * @returns 
 * Recibe por parámetro la baraja ordenada
 * retorna la baraja desordenada de forma aleatoria
 */
function barajarCartas(baraja)
{   
    //método reserva que nos ayuda a ver el orden normal de la baraja
    /*var barajaOrden = "";
    for (a = 0; a < baraja.length; a++){
        var aux = baraja[a];
        barajaOrden = barajaOrden + ", " + aux;
    }
    window.alert(barajaOrden);*/

    //método que nos desordena la baraja
    for (let i = baraja.length - 1; i > 0; i--) 
    {
        const j = Math.floor(Math.random() * (i + 1));
        [baraja[i], baraja[j]] = [baraja[j], baraja[i]];
    }

    //método reserva que nos ayuda a ver el resultado de desordenar la baraja
    /*var barajaDesorden = "";
    for (b = 0; b < baraja.length; b++){
        var auxD = baraja[b];
        barajaDesorden = barajaDesorden + ", " + auxD;
    }
    window.alert(barajaDesorden);*/

    //retorna el array desordenado
    return baraja;
}

/**
 * Función que informa de los datos obtenidos una vez finalizada la partida actual
 * @param {*} fin 
 */
function finalizarJuego()
{
    //creamos un alert con el resultado de la puntuación obtenida
    window.alert("                       Juego finalizado.\n" +
            "                       " + jugador1 + ":\n" +
            "Has obtenido una puntuación de " + puntos + " puntos por:\n" +
            "                     " + numParejas + " parejas de Palos\n" +
            "                     " + numParejasNum + " parejas de Números\n" +
            "                     " + numParejasS + " parejas de Sotas\n" +
            "                     " + numParejasC + " parejas de Caballos\n" +
            "                     " + numParejasR + " parejas de Reyes\n" +
            "                     " + numParejasAs + " parejas de Ases");

    //llamamos a la función obtener datos de fecha y hora y recibimos el resultado en forma de texto formateado
    let fechaHora = obtenerDatosFechaHora();
    //llamamos a la función obtener string a guardar, enviamos por parámetro el string anterior, el jugador y los puntos
    //recibmos el resultado como texto formateado
    let valor = obtenerStringAGuardar(fechaHora, jugador1, puntos);
    //llamamos a la función guardar datos persistentes a la que enviamos los string anteriores concatenados por parámetro
    guardarDatosPersistentes(valor);

    //ponemos a cero contadores y variables
    numParejas = 0;
    puntos = 0;
    tiradas = 0;
    contador1 = 0;
    contador2 = 0;
    contadorJugadas = 0;

    jugador = "";
    jugador1 = "";
    jugador2 = "";
    jugada1 = false;
    jugada2 = false;

    cartaJugada1 = "";
    cartaJugada2 = "";
    
    //ponemos el texto juego finalizado en el control indicado
    document.querySelector('#labelJugadas').innerText = "Juego Finalizado";
}

/**
 * Función que obtiene los daots de la fecha y la hora actuales
 * @returns 
 */
function obtenerDatosFechaHora()
{
    //creamos variable date
    let fecha = new Date();
    //creamos variable string mifecha sin contenido
    let miFecha = "";

    //vamos obteniendo el año, el mes, el día, la hora, los minutos y los segundos de la variable fecha
    let ano = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDay() - 1;
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();

    //si el mes solo tiene una cifra
    if (mes.toString().length == 1)
    {
        //agregamos un cero para visibilidad
        mes = "0" + mes;
    }
    //si el día solo tiene una cifra
    if (dia.toString().length == 1)
    {
        //agregamos un cero para visibilidad
        dia = "0" + dia;
    }
    //si la hora solo tiene una cifra
    if (hora.toString().length == 1)
    {
        //agregamos un cero para visibilidad
        hora = "0" + hora;
    }
    //si los minutos solo tienen una cifra
    if (minutos.toString().length == 1)
    {
        //agregamos un cero para visibilidad
        minutos = "0" + minutos;
    }
    //si los segundos solo tienen una cifra
    if (segundos.toString().length == 1)
    {
        //agregamos un cero para visibilidad
        segundos = "0" + segundos;
    }
    //concatenamos el resultado en la variable string mifechay la retornamos
    return miFecha = hora + ":" + minutos + ":" + segundos + " - " + dia + "/" + mes + "/" + ano;
}

/**
 * Función que formatea el texto con los datos que serán guardados posteriormente
 * @param {*} f 
 * @param {*} j1 
 * @param {*} p 
 * @returns 
 * Recibe la fecha, el jugador y los puntos por parámetro, retorna el texto con los datos concatenados
 */
function obtenerStringAGuardar(f, j1, p)
{
    //creamos la variable string
    let valor = "";

    //si la variable puntos solo tiene una cifra
    if (p.toString().length == 1)
    {
        //agregamos dos ceros para visibilidad
        p = "00" + p;
    }
    //si la variables p solo tiene dos cifras
    else if (p.toString().length == 2)
    {
        //agregamos un cero para visibilidad
        p = "0" + p;
    }
    //concatenamos los resultados en la variable valor
    return valor = j1 + " --- " + f + " --- " + p;
}

/**
 * Función que se encarga de almacenar los datos de forma persistente
 * @param {*} valor 
 * Recibe el texto formateado con los datos por parámetro
 */
function guardarDatosPersistentes(valor)
{
    //creamos variable con el número de claves y valores almacenadas
    let longitud = localStorage.length;
    //creams una variable string vacía
    let clave = "";

    //en función del valor de la variable longitud daremos un valor a la variable clave y almacenaremos los datos
    switch (longitud) {
        case 0:
            clave = "primero";
            localStorage.setItem(clave, valor)
            break;
        case 1:
            clave = "segundo";
            localStorage.setItem(clave, valor)
            break;
        case 2:
            clave = "tercero";
            localStorage.setItem(clave, valor)
            break;
        case 3:
            clave = "cuarto";
            localStorage.setItem(clave, valor)
            break;
        case 4:
            clave = "quinto";
            localStorage.setItem(clave, valor)
            break;
        case 5:
            clave = "sexto";
            localStorage.setItem(clave, valor)
            break;
        case 6:
            clave = "septimo";
            localStorage.setItem(clave, valor)
            break;
        case 7:
            clave = "octavo";
            localStorage.setItem(clave, valor)
            break;
        case 8:
            clave = "noveno";
            localStorage.setItem(clave, valor)
            break;
        case 9:
            clave = "decimo";
            localStorage.setItem(clave, valor)
            break;
        default:
            sustituyeRecordMasBajo(valor)
            break;
    }
}

/**
 * Función que se encarga de localizar y sustituir el valor mas bajo almacenado
 * @param {*} nuevoRecord 
 * Recibe los datos en una línea de texto formateado
 */
function sustituyeRecordMasBajo(nuevoRecord)
{
    //creamos las variables
    const n = 3;
    let primero = "";
    let segundo = "";
    let tercero = "";
    let cuarto = "";
    let quinto = "";
    let sexto = "";
    let septimo = "";
    let octavo = "";
    let noveno = "";
    let decimo = "";

    let primeroN = "";
    let segundoN = "";
    let terceroN = "";
    let cuartoN = "";
    let quintoN = "";
    let sextoN = "";
    let septimoN = "";
    let octavoN = "";
    let novenoN = "";
    let decimoN = "";

    //creamos los array
    let items = [primero, segundo, tercero, cuarto, quinto, sexto, septimo, octavo, noveno, decimo];
    let itemsN = [primeroN, segundoN, terceroN, cuartoN, quintoN, sextoN, septimoN, octavoN, novenoN, decimoN];
    let claves = ["primero", "segundo", "tercero", "cuarto", "quinto", "septimo", "octavo", "noveno", "decimo"];

    //creamos las variables auxiliares
    let aux = "";
    let auxII = "";

    //bucle para el número de valores almacenados
    for (i = 0; i < localStorage.length - 1; i++)
    {
        //almacenamos en el array la clave de cada dato guardado con el fichero local
        items[i] = localStorage.getItem(claves[i]);
        //eliminamos los espacios en blanco de la cadena obtenida en el paso anterior
        aux = items[i].replace(/\s+/g, '')
        //dividimos la cadena texto entre los caracteres "---" y los almacenamos en el array
        itemsN[i] = aux.split("---");
    }

    //creamos variable a cero y variable manor con el valor del array en la posición cero y posición 2 interna
    //quese corresonde con el valor de los puntos
    let control = 0;
    let menor = Number(itemsN[0][2]);

    //creamos bucle para los datos almacenados en el fichero local
    for (j = 0; j < localStorage.length - 1; j++)
    {
        //si el valor de la variable menor, es mayor al de la iteración del array en la posición 2 correspondiente a los puntos
        if (menor > Number(itemsN[j][2]))
        {
            //el valor analizado del array para a ser el valor de la variable menor
            menor = Number(itemsN[j][2]);
            //almacenamos ese valor en la variable
            control = j;
        }
    } 
    //una vez finalizado el bucle y localizado el valor más bajo, lo buscamos en el array de claves
    auxII = claves[control];
    //usamos esa clave para sustituir su contenido por el nuevo
    localStorage.setItem(auxII, nuevoRecord);
}

/**
 * Función que limpia el contenido del fichero local de datos almacenados de forma persistente
 */
function limpiezaDatosPersistentes() 
{
    storage.clear();
}