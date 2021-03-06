console.log('[Lucas Ellery] Flappy Bird');

let frames = 0;
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

function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

    atualiza() {
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2;
      const movimentacao = chao.x - movimentoDoChao;

      // console.log('[chao]' + chao.x);
      // console.log('[repete em]' + repeteEm);
      // console.log('[movimentação]' + movimentacao);

      chao.x = movimentacao % repeteEm;
    },

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
    },

  };
  return chao;
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
      if (fazColisao(flappyBird, globais.chao)) {
        som_HIT.play();
        setTimeout(() => {
          mudaParaTela(Telas.INICIO);
        }, 500);

        return;
      }

      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },

    movimentos: [
      { spriteX: 0, spriteY: 0 }, // asa para cima
      { spriteX: 0, spriteY: 26 }, // asa no meio
      { spriteX: 0, spriteY: 52 }, // asa para baixo
    ],

    frameAtual: 0,
    atualizaOframeAtual() {
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if (passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao;

      }

      // console.log(`[base do incremento] ${baseDoIncremento}`);
      // console.log(`[incremento] ${incremento}`);
      // console.log(`[base repetição] ${baseRepeticao}`);
    },

    desenha() {
      flappyBird.atualizaOframeAtual();
      const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

      contexto.drawImage(
        sprites,
        spriteX, spriteY, // sprite x e sprite y
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

function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,

    chao: {
      spriteX: 0,
      spriteY: 169,
    },

    ceu: {
      spriteX: 52,
      spriteY: 169,
    },

    espaco: 80,

    desenha() {
      canos.pares.forEach(function (par) {
        console.log('desenhados');
        const yRandom = par.y;
        const espacamentoEntreCanos = 90;

        const canoCeuX = par.x;
        const canoCeuY = yRandom;

        // [Cano do céu]
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura, canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura,
        );

        // [Cano do chao]
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
        contexto.drawImage(
          sprites,
          canos.chao.spriteX, canos.chao.spriteY,
          canos.largura, canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura,
        );

        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY
        }
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }
      })
    },

    temColisaoComOFlappyBird(par) {
      const cabecaDoFlappy = globais.flappyBird.y;
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

      if (globais.flappyBird.x >= par.x) {
        console.log('Bird invadiu a área dos canos');
        if (cabecaDoFlappy <= par.canoCeu.y) {
          console.log('atingiu o cano do ceu');
          return true;
        }

        if (peDoFlappy >= par.canoChao.y) {
          console.log('atingiu o cano do chao');
          return true;
        }
      }
      return false;
    },

    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if (passou100Frames) {
        console.log('Passou 100 frames');
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }

      canos.pares.forEach(function (par) {
        par.x = par.x - 2;

        if (canos.temColisaoComOFlappyBird(par)) {
          console.log('Você perdeu pois colidiu!');
          mudaParaTela(Telas.INICIO);
        }

        if (par.x + canos.larguras <= 0) {
          canos.pares.shift();
        }
      });

    }
  }
  return canos;
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
      globais.chao = criaChao();
      globais.canos = criaCanos();
      if (criaCanos) {
        console.log('canos criados');
      }
    },
    desenha() {
      planoDeFundo.desenha();
      globais.flappyBird.desenha();

      globais.chao.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      // globais.chao.atualiza();
      mudaParaTela(Telas.JOGO);
    },

    atualiza() {
      globais.chao.atualiza();
    }
  }
};

Telas.JOGO = {
  desenha() {
    planoDeFundo.desenha();
    globais.canos.desenha();
    if (globais.canos.desenha()) {
      console.log('canos desenhados');
    }
    globais.chao.desenha();
    globais.flappyBird.desenha();
  },

  click() {
    globais.flappyBird.pula();
  },

  atualiza() {
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.flappyBird.atualiza();
  }
}

function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1;
  requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
  if (telaAtiva.click) {
    telaAtiva.click();
  }

});

mudaParaTela(Telas.INICIO);
loop();
