/**
 * InDepth helper class
 */

var InDepth = {

  /**
   * Constants
   */

  element: document.currentScript,

  /**
   * Flag that shows we are in the app
   * @return {boolean}
   */
  
  get app() {
    return window.location.href.match(/^file/) ? true : false;
  },

  /**
   * Gets the baseURL set when the script loads
   * @return {String} the url
   */

  get baseUrl() {
    return this.element.src.replace(/\/in-depth.js$/, '');
  },

  /**
   * Gets the article body
   * @return {Node} the DOM node
   */

  get body() {
    return document.querySelector('[id*="content-body-"]');
  }
}
