console.log('[Lucas Ellery] Flappy Bird');

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d'); // define jogo com 2D

// Background
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {

    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0, 0, canvas.width, canvas.height);

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY, // sprite x e sprite y
      planoDeFundo.largura, planoDeFundo.altura, // tamanho do recorte na sprite
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY, // sprite x e sprite y
      planoDeFundo.largura, planoDeFundo.altura, // tamanho do recorte na sprite
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura
    );
  }
};

const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  desenha() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY, // sprite x e sprite y
      chao.largura, chao.altura, // tamanho do recorte na sprite
      chao.x, chao.y,
      chao.largura, chao.altura
    );

    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY, // sprite x e sprite y
      chao.largura, chao.altura, // tamanho do recorte na sprite
      (chao.x + chao.largura), chao.y,
      chao.largura, chao.altura
    );
  }
};

function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if (flappyBirdY >= chaoY) {
    return true;
  }
  return false;
}

function criaFlappyBird() {
  const flappyBird = { // estrutura que representa o passaro
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    pulo: 4.6,
    pula() {
      flappyBird.velocidade = - flappyBird.pulo;
    },
    atualiza() {
      if (fazColisao(flappyBird, chao)) {
        console.log('Colidiu!');
        som_HIT.play();

        setTimeout(() => {
          mudaParaTela(Telas.INICIO);
        }, 500);

        return;
      }

      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    desenha() {
      contexto.drawImage(
        sprites,
        flappyBird.spriteX, flappyBird.spriteY, // sprite x e sprite y
        flappyBird.largura, flappyBird.altura, // tamanho do recorte na sprite
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura
      );
    }
  }
  return flappyBird;

}


const mensagemGetReady = { // estrutura que representa o passaro
  spriteX: 134,
  spriteY: 0,
  largura: 174,
  altura: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.spriteX, mensagemGetReady.spriteY, // sprite x e sprite y
      mensagemGetReady.largura, mensagemGetReady.altura, // tamanho do recorte na sprite
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.largura, mensagemGetReady.altura
    );
  }
}

/**
 *  Telas
 */

const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
    },
    desenha() {
      planoDeFundo.desenha();
      chao.desenha();
      globais.flappyBird.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      mudaParaTela(Telas.JOGO);
    },

    atualiza() {

    }
  }
};

Telas.JOGO = {
  desenha() {
    planoDeFundo.desenha();
    chao.desenha();
    globais.flappyBird.desenha();
  },
  click() {
    globais.flappyBird.pula();
  },

  atualiza() {
    globais.flappyBird.atualiza();
  }
}

function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();

  requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
  if (telaAtiva.click) {
    telaAtiva.click();
  }

});

mudaParaTela(Telas.INICIO);
loop();