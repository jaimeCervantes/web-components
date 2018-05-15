export class MyQuote extends HTMLElement {
  static get observedAttributes() {
    return ['quote', 'author'];
  }

  get quote() {
    return this.getAttribute('quote');
  }
  set quote(val) {
    this.setAttribute('quote', val);
  }

  set author(val) {
    this.setAttribute('author', val);
  }

  static get template() {
    return `
      <style>
          :host {
            cursor:pointer;
            border: 1px solid #ccc;
            display: block;
            padding: 10px;
          }

          :host([hidden]) {
            display: none;
          }

          .quote:before {
            content: '"';
            font-size: 3rem;
            font-style: italic;
          }

          .author {
            margin-top: 5px;
          }
        </style>
        <slot name="header"></slot>
        <p class="quote"></div>
        <p class="author"></div>
      `;
  }
  
  constructor() {
    super();
    this.addEventListener('click', this.getQuote);
    const shadowRoot = this.attachShadow({ mode: 'open'});
    shadowRoot.innerHTML = MyQuote.template;
  }

  printQuote(val) {
    this.shadowRoot.querySelector('.quote').innerHTML = val;
  }

  printAuthor(val) {
    this.shadowRoot.querySelector('.author').innerHTML = val;
  }

  getQuote(e) {
    this.quote = 'Loading...';
    this.author = 'Loading...';
    fetch('https://talaikis.com/api/quotes/random/')
    .then( res => res.json())
    .then(jsonRes => {
      this.quote = jsonRes.quote;
      this.author = jsonRes.author;
    });
  }
  
  connectedCallback () {
    this.getQuote();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch(attrName) {
      case 'quote':
        this.printQuote(newVal);
        break;
      case 'author':
        this.printAuthor(newVal);
    }
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.getQuote);
    alert('bye!');
  }
}

customElements.define('my-quote', MyQuote);