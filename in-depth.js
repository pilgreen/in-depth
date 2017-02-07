/**
 * Appends basic styles to broken page
 * MI should incorporate these into the style sheets
 */

function loadBasicStyleFixes() {
  var sheet = document.styleSheets[0];
  sheet.insertRule('[id^="content-body"] { width: 760px; max-width: 100%; margin: 0 auto; }')
  sheet.insertRule('figure, blockquote { margin: 2rem 0 !important; }');
  sheet.insertRule('figure img { max-width: 100%; }');
  sheet.insertRule('blockquote { font-size: 2em; }');
}

/**
 * Run a feature detection for ES6 class
 * and apply the basic styles if it fails
 */

try {
  'use-strict';
  class ES6ClassFeatureTest {};
} catch(e) {
  loadBasicStyleFixes();
}

/**
 * The InDepth class needs to be in the global scope in order
 * to use it in external widgets. If the ES6 feature detection fails, 
 * I'm letting the whole thing blow here up on purpose.
 */

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
      css: _script.src.replace('in-depth.js', 'in-depth.css')
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
    } else {
      loadBasicStyleFixes();
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
