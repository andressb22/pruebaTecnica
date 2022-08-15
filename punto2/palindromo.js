let palindromos = []

function obtenerPalindromos(text){

    for(let i = 0 ; i < text.length; i ++){

        let letras = text.substring(i,i+3)
        let TextoReversa = letras.split('').reverse()
        let textoReversaF = TextoReversa.join("")

        if(text.indexOf(textoReversaF,i + 1) != -1){ // verificar si el texto al reves si existe

            let posiblesPalindromos = []

            // este for es para obtener cuantas vesces esta el texto al reves en el texto principal y hacer la verificacion 
            for(let t = i; t < text.length ; t ++){ 
                let indiceFinal = text.indexOf(textoReversaF,t +1) 
                
                if(indiceFinal != -1){
                    posiblesPalindromos.push(indiceFinal)
                    t = indiceFinal + 1
                }
                else{
                    break
                }
                
            }

            // forEach para  obtener los textos a traves de su indice enviar el texto y verificar si es palindromo
            posiblesPalindromos.forEach(index=>{  
                let pospalindormo = text.substring(i,index +3) 
                verificarTexto(pospalindormo)
            })
        }
    } 

    console.log(palindromos) 
}

function verificarTexto (text){
    let TextoReversa = text.split('').reverse()
    let textoReversaF = TextoReversa.join("")

    if(text === textoReversaF){
        palindromos.push(text)
    }
}


obtenerPalindromos(`anulalalunapaisajemontanaguaamoraromacomidaluzazulsillagatobotellacamarayosoypalindromocasaverdebanderaventanacangrejolarutanosaportootropasonaturaliniciaracaestoseralodoodolaresdonasbarcosmarcieloaviontierrapaisbicicletaestonoespalindromojugarseverlasalrevesusandounradarenelojorejero`)


