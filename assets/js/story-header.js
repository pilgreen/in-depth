class StoryHeader extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * Flag that shows we are in the app
   * @return {boolean}
   */

  get app() {
    return window.location.href.match(/^file/) ? true : false;
  }

  /**
   * Returns the template
   */

  get template() {
    let t = document.createElement('template');
    t.innerHTML = `
      <style>
        .social-media a {
          display: inline-block;
          margin-right: 6px;
        }
      </style>

      <slot></slot>
      <div class="social-media">
        <a data-site="facebook" href="${this.facebook.url}"><img src="${this.facebook.icon}"></a>
        <a data-site="twitter" href="${this.twitter.url}"><img src="${this.twitter.icon}"></a>
      </div>
    `;

    return t;
  }

  /**
   * Social Media setup
   */

  get facebook() {
    return {
      icon: 'http://media.kansascity.com/livegraphics/social/facebook.png',
      url: `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
    }
  }

  get twitter() {
    return {
      icon: 'http://media.kansascity.com/livegraphics/social/twitter.png',
      url: `https://twitter.com/share?url=${encodeURIComponent(window.location.href)}`
    }
  }

  /**
   * Fires when added to DOM
   */

  connectedCallback() {
    if(this.app) {
      this.style.display = 'none';
    } else {
      let sr = this.attachShadow({ mode: 'open' });
      sr.appendChild(this.template.content.cloneNode(true));
    }
  }
}

customElements.define('story-header', StoryHeader);
