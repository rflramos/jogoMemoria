(function(){ //FUNÇÃO ANONIMA PARA MANTER AS VARIAVES LOCAIS E GARANTIR QUE O JS SERÁ DISPARADO ASSIM QUE A PAGINA FOR CARREGADA
    var matches = 0;
    
    var images = []; //array

    var flippedCards = []; //array

    var modalGameOver = document.querySelector("#modalGameOver");

    var imgMatchSign = document.querySelector("#imgMatchSign");

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
        matches = 0;

        flippedCards = []; //array começa zerado
        images = randomSort(images); //reorganiza o array images com a função randomSort e armazena no array images
                    //a função randomSort retorna o valor de newArray e armazena na variavel images
        var frontFaces = document.getElementsByClassName("front");
        var backFaces = document.getElementsByClassName("back");



        for(var i = 0; i < 16; i++){ //estrutura de repetição FOR para distribuir as cartas
            
            frontFaces[i].classList.remove("flipped","match");
            backFaces[i].classList.remove("flipped","match");
            
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

        modalGameOver.style.zIndex = -2;
        modalGameOver.removeEventListener("click",startGame,false);
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
        if(flippedCards.length < 2){
            var faces = this.getElementsByClassName("face");
            //console.log(faces[1]); log pra verificar o retorno da variavel faces

            if(faces[0].classList.length > 2){ //se a carta ja foi clicada, foi inserido a classe "flipped"
                            //este teste lógico valida se a terceira classe existe, se sim, ele retorna e aborta a continuação desta função
                return;
            }
        
            faces[0].classList.toggle("flipped")//fliped é o nome da classe que será inserida ou removida
            //toggle varre a lista de classe em busca de uma classe,
            //se não achar ele insere na lista e se ele achar ele remove  
            //console.log(faces[0].classList); possível validar se a ação de inserir ou remover uma classe esta funcionando
        
            faces[1].classList.toggle("flipped");


            flippedCards.push(this);

            if(flippedCards.length ===2){
                if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){

                    flippedCards[0].childNodes[1].classList.toggle("match");
                    flippedCards[0].childNodes[3].classList.toggle("match");
                    flippedCards[1].childNodes[1].classList.toggle("match");
                    flippedCards[1].childNodes[3].classList.toggle("match");

                    matchCardSign();

                    matches++;

                    flippedCards = [];

                    if(matches === 8){
                        gameOver();
                    }
                }
            }    

        }else {
            //console.log(flippedCards);//com f12 é possível visualizar parametros dentro do array
            //estes parametros trouxeram base para utilizar o parametro "childNodes[indice]".

            flippedCards[0].childNodes[1].classList.toggle("flipped");//busca o indice [1] e [3] do array e com o metodo .toggle remove o parametro de classe "flipped "
            flippedCards[0].childNodes[3].classList.toggle("flipped");//co isto faz com que a carta seja desvirada.
            flippedCards[1].childNodes[1].classList.toggle("flipped");
            flippedCards[1].childNodes[3].classList.toggle("flipped");

            flippedCards = [];
        }

       
    }

    /* teste
    window.setTimeout(function(){
        gameOver();

    },1000);
    */

    function gameOver(){//altera o style do html e joga o modal para frente (modal eh uma camada transparente e pode ser movimentada para frente ou para trás, no caso ele retorna a imagem do gameover)
        modalGameOver.style.zIndex = 10;
        modalGameOver.addEventListener("click",startGame,false);

    }

    function matchCardSign(){
        imgMatchSign.style.zIndex = 1;
        imgMatchSign.style.top = 150 + "px";
        imgMatchSign.style.opacity = 0;
        setTimeout(function(){

            imgMatchSign.style.zIndex = -1;
            imgMatchSign.style.top = 250 + "px";
            imgMatchSign.style.opacity = 1;

        },1500)


    }

}());