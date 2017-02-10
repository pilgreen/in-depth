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
      link.onload = e => { resolve(e) };
      document.head.appendChild(link);
    });
  }

  /**
   * Loads a javascript fle
   * @param {string} url
   * @return {Promise} resolves onload event
   */

  static loadJS(url) {
    let purl = url.match(/^http(s):/) ? url : `${this.baseURL}/${url}.js`;
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.src = purl;
      script.onload = e => { resolve(e) };
      document.head.appendChild(script);
    });
  }

  /**
   * Creates an instance with default styles
   */

  static createInstance() {
    let config = {
      css: [`${this.baseURL}/in-depth.css`],
      modules: []
    };

    let modules = this.element.dataset.modules;
    if(modules) {
      try {
        config.modules = JSON.parse(modules);
      } catch(e) {
        config.modules.push(modules);
      }
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

      for(let i = 0, len = opt.css.length; i < len; i++) {
        this.loadCSS(opt.css[i]).then(e => {
          this.body.style.setProperty('opacity', 1);
        });
      }

      for(let i = 0, len = opt.modules.length; i < len; i++) {
        this.loadJS(opt.modules[i]);
      }
    } else {
      let e = new Event('app-detected');
      window.dispatchEvent(e);
    }
  }

  /**
   * Gets the baseURL set when the script loads
   * @return {String} the url
   */

  get baseURL() {
    return this.constructor.baseURL;
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

// Set the Base URL for linking assets
InDepth.element = document.currentScript;
InDepth.baseURL = InDepth.element.src.replace(/\/in-depth.js$/, '');

// Shortcut to auto-load
if(InDepth.element.hasAttribute('auto')) {
  InDepth.createInstance();
}
