class InDepth {

  /**
   * Flag that shows we are in the app
   * @return {boolean}
   */
  
  static get app() {
    return window.location.href.match(/^file/) ? true : false;
  }

  /**
   * Loads a css file
   * @param {string} url
   * @return {Promise} resolves onload event
   */

  static loadCSS(url) { 
    return new Promise((resolve, reject) => {
      let link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = e => { resolve(e); };
      document.head.appendChild(link);
    });
  }

  /**
   * Loads a javascript fle
   * @param {string} url
   * @return {Promise} resolves onload event
   */

  static loadJS(url) {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = e => { resolve(e); };
      document.head.appendChild(script);
    });
  }

  /**
   * Creates an instance using currentScript
   * and appends it to the class Object.
   *
   * Note: This only works with the auto attribute
   * set on the script tag.
   */

  static createAutoInstance() {
    let _script = document.currentScript;
    let config = {
      css: _script.src.replace('js', 'css'),
      webcomponents: false
    }

    if(_script.hasAttribute('webcomponents')) {
      config.webcomponents = _script.src.replace('in-depth.js', 'webcomponents.js');
    }

    this.instance = new InDepth(config);
  }

  /**
   * Create an inDepth look
   * @param {object} opt - a configuration
   */

  constructor(opt) {
    if(typeof opt != 'object') {
      console.warn('InDepth: no configuration.');
      return false;
    }

    if(!this.constructor.app) {
      document.body.classList.add('in-depth');
      this.body.style.setProperty('opacity', 0);

      this.loadCSS(opt.css).then(e => {
        this.body.style.setProperty('opacity', 1);
      });

      if(opt.webcomponents) {
        this.loadJS(opt.webcomponents);
      }
    } else {
      let e = new Event('in-depth-app');
      window.dispatchEvent(e);
    }
  }

  /**
   * Gets the article body
   * @return {Node} the DOM node
   */

  get body() {
    return document.querySelector('[id*="content-body-"]');
  }

  /**
   * Passes through to static loadCSS()
   */

  loadCSS(url) {
    return this.constructor.loadCSS(url)
  }

  /**
   * Passes through to static loadJS()
   */

  loadJS(url) {
    return this.constructor.loadJS(url)
  }
}

// Shortcut to auto-load
if(document.currentScript.hasAttribute('auto')) {
  InDepth.createAutoInstance();
}
