class ThumbnailStack extends HTMLElement {
  constructor() {
    super();

    if(window.ShadyCSS) {
      ShadyCSS.prepareTemplate(this.template, 'thumbnail-stack');
    }
  }

  get template() {
    let t = document.createElement('template');
    t.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: row;
          padding: 20px 0;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          border-top: 1px solid #ddd;
        }

        :host(:last-of-type) {
          border-bottom: 1px solid #ddd;
        }

        .thumb {
          position: relative;
          width: 180px;
          max-height: 180px;
          margin-right: 1rem;
        }

        :host .thumb ::slotted(img) {
          position: absolute;
          height: 100%;
          width: 100%;
          object-fit: cover;
        }

        .flex {
          flex: 1;
          max-width: 24em;
        }

        .flex ::slotted(*) {
          margin-top: 0 !important;
          font-family: "McClatchy Sans", sans-serif !important;
        }

        .flex ::slotted(p) {
          font-size: 14px !important;
        }

        @media (max-width: 769px) {
          :host {
            display: block;
          }

          .thumb {
            width: 100%;
            max-height: initial;
            margin: 0 0 8px 0;
          }
        }
      </style>

      <div class="thumb">
        <slot name="image"></slot>
      </div>

      <div class="flex">
        <slot></slot>
      </div>
    `;

    return t;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define('thumbnail-stack', ThumbnailStack);
