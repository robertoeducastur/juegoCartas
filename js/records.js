/**
 * @autor Roberto Morán
 * @versión 1.0
 * @date 05/11/2022
 * @descripción Página para visionar las diez mayores puntuaciones obtenidas en el juego gráfico
 */

//llamamos a la función ordenar clasificación y recibimos un array ordenado como resultado
let miArrayOrdenado = ordenarClasificacion();
//recuperamos la información de los datos almacenados y le enviamos el array obtenido anteriores
recuperarDatosPersistentes(miArrayOrdenado);

/**
 * Función que imprime los datos almacenados en el fichero local
 * @param {*} array 
 * recibe el array con los datos por parámetro
 */
function recuperarDatosPersistentes(array)
{
    //creamos un array con el nombre de los controles donde se imprimirán los datos
    let linea = ["jugadores", "fecha", "puntos"];

    //bucle para el total de datos almacenados en el fichero local
    for (i = 0; i < localStorage.length; i++)
    {
        //bucle para el array de los controles
        for (j = 0; j < linea.length; j++)
        {
            //almacenamos en la variable auxiliar el nombre del control concatenado previamente al simbolo almoadilla 
            // y posterioremnte con el número del bucle de los datos para identificar al control
            let auxL = "#" + linea[j] + (i + 1);
            //imprimimos el dato del array en el control
            document.querySelector(auxL).innerText = array[i][j];
        }
    }
}

/**
 * Función que ordena el array de los datos por la puntuación de mayor a menor
 * @returns 
 */
function ordenarClasificacion()
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

    //creamos los arrays
    let items = [primero, segundo, tercero, cuarto, quinto, sexto, septimo, octavo, noveno, decimo];
    let itemsN = [primeroN, segundoN, terceroN, cuartoN, quintoN, sextoN, septimoN, octavoN, novenoN, decimoN];
    let claves = ["primero", "segundo", "tercero", "cuarto", "quinto", "sexto", "septimo", "octavo", "noveno", "decimo"];

    //creamos la variable auxiliar
    let aux = "";

    //bucle para los datos almacenados en el fichero local
    for (i = 0; i < localStorage.length; i++)
    {
        //almacenamos en el array la clave de cada dato guardado con el fichero local
        items[i] = localStorage.getItem(claves[i]);
        //eliminamos los espacios en blanco de la cadena obtenida en el paso anterior
        aux = items[i].replace(/\s+/g, '')
        //dividimos la cadena texto entre los caracteres "---" y los almacenamos en el array
        itemsN[i] = aux.split("---");
    }

    //usamos la función sort de ordenamiento sobre el array comparando los valores a y b
    itemsN.sort((a, b) => 
    {
        //si el valor "a" que lo referenciamos al valor 2 del array items es igual al valor 2 del array referenciado por "b"
        if(a[2] == b[2]) {
            //retornamos 0
            return 0; 
        }
        //si a es menor que b, retornamos 1
        if(a[2] < b[2]) {
            return 1;
        }
        //si a es mayor, retornamos -1
            return -1;
    });
    //retornamos el array ordenado
    return itemsN;
}