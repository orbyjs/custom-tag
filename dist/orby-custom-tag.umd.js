!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("@orby/core")):"function"==typeof define&&define.amd?define(["@orby/core"],t):(e=e||self)["@orby/custom-tag"]=t(e["@orby/core"])}(this,function(e){"use strict";let t={},o={};return function({tag:s,props:r,children:p}){o[s]={Component:p[0],scoped:r.scoped,props:r.props||[]},t[s]||(t[s]=class extends HTMLElement{constructor(){super(),this.props={},o[s].scoped&&this.attachShadow({mode:"open"})}static get observedAttributes(){return o[s]?o[s].props:[]}connectedCallback(){this.mounted=!0,this.mapAllProps(),this.update()}disconnectedCallback(){this.update(!0)}attributeChangedCallback(e,t,o){t!==o&&(this.props[e]=o,this.update())}mapAllProps(){let e=o[s].props;for(let t=0;t<e.length;t++){let o=e[t];this.props[o]=this.getAttribute(o)}}update(t){this.mounted&&(this.prevent||(this.prevent=!0,setTimeout(()=>{this.lastView=e.render(e.h(t?"":o[s].Component,r),o[s].scoped&&this.shadowRoot||this,this.lastView),this.prevent=!1})))}},customElements.define(s,t[s])),document.querySelectorAll(s).forEach(e=>e.update())}});
//# sourceMappingURL=orby-custom-tag.umd.js.map
