(function(){ //FUNÇÃO ANONIMA PARA MANTER AS VARIAVES LOCAIS E GARANTIR QUE O JS SERÁ DISPARADO ASSIM QUE A PAGINA FOR CARREGADA
    var images = []; //array

    var flippedCards = []; //array

    for(var i = 0; i < 16; i++){ //estrutura de repetição
        var img = { //a cada execução do FOR o OBJETO img receberá um atributo src e id
            src: "img/"+ i +".png", //concatenando a origem da imagem que será utilizado no atributo src
            id: i % 8 //usando mod para obter o resto de i/8 e utilizar no atributo id
        };
        images.push(img); //para cada rodada do for o metodo .push irá inserir o resultado do objeto img no arrey images
    }
    //console.log(images); validação do arrey

    startGame();//CHAMA A FUNÇÃO, SE NÃO, NÃO SERÁ EXECUTADA

    function startGame(){
        flippedCards = []; //array começa zerado
        images = randomSort(images); //reorganiza o array images com a função randomSort e armazena no array images
                    //a função randomSort retorna o valor de newArray e armazena na variavel images
        var frontFaces = document.getElementsByClassName("front");

        for(var i = 0; i < 16; i++){ 
            //estrutura de repetição FOR para distribuir as cartas
             
            var card = document.querySelector("#card" + i);
            // variavel recebe referencia da div com id# card, o sinal + contatena com a variavel "i"

            card.style.left = (i === 0 || i === 8) ? 5 + "px" : i % 8 * 165 + 5 + "px";
            //mexe na margem esquerda do card, utililzando css
            //se a variavel i for igual a 0 ou i for igual a 8 então " operador ternario ?" recebe o valor de 5px
            // se não ":" o resto de divisão de i / 8 para ajustar a posição das cartas dentro do container


            card.style.top = i < 8 ? 5 + "px" : 250 + "px";
            //cartas de id de 0 ate 7 recebem 5px de distancia em relação ao top e qualquer outro valor maior que 7
            // recebe 250px de distancia do topo

            card.addEventListener("click",flipCard,false);

            frontFaces[i].style.background = "url('"+ images[i].src +"')"; //atribuind imagem para classe front
            frontFaces[i].setAttribute("id",images[i].id); //atribuindo um id para a classe front
            //console.log(frontFaces[i].id); validando se o id foi atribuido a classe font
        }
    }

    function randomSort(oldArray){//esta função esta recebendo um array por parametro e foi nomeado como oldArray, pois se refere ao array "images" ainda organizado
        //console.log(Math.floor(Math.random()*11)); //Math.floor arredonda para baixo um numero, Math.random retorna um numero aleatório
                                             //Match.random()*11 multiplicar por 11 vai retornar entre 0 e 10, *20 retorna entre 0 e 19       
        //var arrTeste = ["banana","morango","maça"];
        //console.log(arrTeste.indexOf("banana"));//.indexOf() retorna a posição (também conhecido com indice) que o elemento se encontra no array
        //console.log(arrTeste.length); length retorna o numero de elementos do array 

        var newArray = []; //este array receberá o o mesmo numero de indices do oldArray, porém, com a função Math.random() e será embaralhado a forma que novo array newArray será montado

        while(newArray.length !== oldArray.length){ //enquanto o nº de indices do newArray for diferente do nº de indices do oldArray
            var i = Math.floor(Math.random()*oldArray.length); //variavel i recebe 1 numero entre 0 e o numero de indices do array
            
            if(newArray.indexOf(oldArray[i]) < 0){ //o metodo indexOf retorna o indice onde o elemento se encontra, caso 
                                                   // o elemento não seja encontrada, o indexOf retorna -1
                newArray.push(oldArray[i]);//insere um determinado elemento no array
            }
        }

        return newArray;

    }

    function flipCard(){
        var faces = this.getElementsByClassName("face");
        //console.log(faces[1]); log pra verificar o retorno da variavel faces
        
        faces[0].classList.toggle("flipped")//fliped é o nome da classe que será inserida ou removida
        //toggle varre a lista de classa em busca de uma classe,
        //se não achar ele insere na lista e se ele achar ele remove  
        //console.log(faces[0].classList); possível validar se a ação de inserir ou remover uma classe esta funcionando
        
        faces[1].classList.toggle("flipped");


    }
}());