class InDepth {

  /**
   * Flag that shows we are in the app
   * @return {boolean}
   */
  
  static get app() {
    return window.location.href.match(/^file/) ? true : false;
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
      script.async = false;
      script.onload = e => { resolve(e) };
      document.head.appendChild(script);
    });
  }

  /**
   * Instantiates the class and fires an event if in the app. 
   */

  constructor() {
    if(this.constructor.app) {
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
   * Passes through to static loadJS()
   */

  loadModule(url) {
    let purl = url.match(/^http(s):/) ? url : `${this.baseURL}/components/${url}.js`;
    return this.constructor.loadJS(purl)
  }
}

// Set the Base URL for linking assets
InDepth.element = document.currentScript;
InDepth.baseURL = InDepth.element.src.replace(/\/in-depth.js$/, '');

// Shortcut to auto-load
if(InDepth.element.hasAttribute('auto')) {
  InDepth.instance = new InDepth();
}
