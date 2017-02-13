class StoryHeader extends HTMLElement {
  constructor() {
    super();

    if(window.ShadyCSS) {
      ShadyCSS.prepareTemplate(this.template, 'story-header');
    }
  }

  get template() {
    let t = document.createElement('template');
    t.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        ::slotted(h1) {
          text-align: center;
        }

        .social-media {
          margin: 2rem 0 1rem;
        }

        .social-media a {
          display: inline-block;
          padding-right: 6px;
        }
      </style>

      <slot></slot>

      <div class="social-media">
        <a href="${this.facebook.url}"><img src="${this.facebook.icon}"></a>
        <a href="${this.twitter.url}"><img src="${this.twitter.icon}"></a>
      </div>
    `;

    return t;
  }

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

  connectedCallback() {
    if(InDepth.app) {
      this.style.display = 'none';
    } else {
      let sr = this.attachShadow({ mode: 'open' });
      sr.appendChild(this.template.content.cloneNode(true));
    }
  }
}

customElements.define('story-header', StoryHeader);
