class Runner {
  constructor() {
    this.canvas = document.querySelector('#canvas');
    this.loadingWrap = document.querySelector('.loading');
    this.pokeBall = document.querySelector('.poke-ball-wrap');
    this.pokemons = document.querySelectorAll('.pokemon-item');
    this.word = [0, 0, 0, 0, 0, 0, 0];
    this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  }

  go() {
    const canvas = this.canvas;
    const loadingWrap = this.loadingWrap;
    const pokeBall = this.pokeBall;
    const pokemons = this.pokemons;
    const word = this.word;
    const update = this._updateLoading.bind(this);
    const removeChild = this._removeChild.bind(this);


    new TimelineMax()
      .to(word, 1, { onUpdate: update, "0": 26 * 3 + 11  }, 0) // 这里 * 3 是为了加快 _updateLoading 触发的频率
      .to(word, 2, { onUpdate: update, "1": 26 * 3 + 14 }, 0)
      .to(word, 3, { onUpdate: update, "2": 26 * 3 + 0  }, 0)
      .to(word, 4, { onUpdate: update, "3": 26 * 3 + 3 }, 0)
      .to(word, 5, { onUpdate: update, "4": 26 * 3 + 8 }, 0)
      .to(word, 6, { onUpdate: update, "5": 26 * 3 + 13 }, 0)
      .to(word, 7, { onUpdate: update, "6": 26 * 3 + 6 }, 0)
      .to(loadingWrap, 1, { opacity: 0, onComplete: () => removeChild(loadingWrap) })
      .to(canvas, 1, { opacity: 1, display: 'block' })
      .to(pokeBall, 0, { display: 'block' })
      .from(pokeBall, 1, { ease: Bounce.easeOut, y: -1500 })
      .from(pokeBall, 5, { ease: Elastic.easeOut.config(2, 0.2), transformOrigin: '50% 100%', rotation: -30}, '-=1')
      .to(pokeBall, .25, { ease: Circ.easeOut, transformOrigin: '50% 100%', scale: 0, onComplete: () => removeChild(pokeBall) })
      .staggerTo(pokemons, 1, {
        opacity: 1,
        display: 'flex',
        cycle: {
          y: ['-225%', '-75%', '75%', '225%'],
        },
        padding: '10px 0'
      }, 1, "+=1")
      .to('.title', .5, { width: '40%' })

  }

  _updateLoading() {
    const letters = this.letters;
    const word = this.word;
    const loadingWrap = this.loadingWrap;

    let text = '';
    for (let i = 0; i < word.length; i++) {
      text +=  letters[Math.round(word[i]) % 26];
    }
    loadingWrap.innerHTML = text;
  }

  _removeChild(dom) {
    document.body.removeChild(dom)
  }
}

export default Runner;