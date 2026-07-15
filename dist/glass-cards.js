let t=!1;function e(t,e,i,s){var a,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var o=t.length-1;o>=0;o--)(a=t[o])&&(n=(r<3?a(n):r>3?a(e,i,n):a(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),r=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,a)},l=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,a))(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:g,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,m=globalThis,f=m.trustedTypes,v=f?f.emptyScript:"",b=m.reactiveElementPolyfillSupport,x=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=g(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);a?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(s)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of e){const e=document.createElement("style"),a=i.litNonce;void 0!==a&&e.setAttribute("nonce",a),e.textContent=s.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=s;const r=a.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const r=this.constructor;if(!1===s&&(a=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??y)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==a||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[x("elementProperties")]=new Map,w[x("finalized")]=new Map,b?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,S=t=>t,C=k.trustedTypes,z=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+E,N=`<${M}>`,P=document,O=()=>P.createComment(""),j=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,T="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,W=/>/g,I=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,B=/"/g,D=/^(?:script|style|textarea|title)$/i,G=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),q=G(1),F=G(2),V=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),K=new WeakMap,X=P.createTreeWalker(P,129);function Q(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==z?z.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let a,r=2===e?"<svg>":3===e?"<math>":"",n=U;for(let e=0;e<i;e++){const i=t[e];let o,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===U?"!--"===l[1]?n=H:void 0!==l[1]?n=W:void 0!==l[2]?(D.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=I):void 0!==l[3]&&(n=I):n===I?">"===l[0]?(n=a??U,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,o=l[1],n=void 0===l[3]?I:'"'===l[3]?B:R):n===B||n===R?n=I:n===H||n===W?n=U:(n=I,a=void 0);const g=n===I&&t[e+1].startsWith("/>")?" ":"";r+=n===U?i+N:c>=0?(s.push(o),i.slice(0,c)+A+i.slice(c)+E+g):i+E+(-2===c?e:g)}return[Q(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,r=0;const n=t.length-1,o=this.parts,[l,c]=Z(t,e);if(this.el=J.createElement(l,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&o.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(A)){const e=c[r++],i=s.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?at:"?"===n[1]?rt:"@"===n[1]?nt:st}),s.removeAttribute(t)}else t.startsWith(E)&&(o.push({type:6,index:a}),s.removeAttribute(t));if(D.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),X.nextNode(),o.push({type:2,index:++a});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===M)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)o.push({type:7,index:a}),t+=E.length-1}a++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function tt(t,e,i=t,s){if(e===V)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const r=j(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=tt(t,a._$AS(t,e.values),a,s)),e}class et{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);X.currentNode=s;let a=X.nextNode(),r=0,n=0,o=i[0];for(;void 0!==o;){if(r===o.index){let e;2===o.type?e=new it(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new ot(a,this,t)),this._$AV.push(e),o=i[++n]}r!==o?.index&&(a=X.nextNode(),r++)}return X.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class it{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=tt(this,t,e),j(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new et(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new J(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new it(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class st{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Y}_$AI(t,e=this,i,s){const a=this.strings;let r=!1;if(void 0===a)t=tt(this,t,e,0),r=!j(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const s=t;let n,o;for(t=a[0],n=0;n<a.length-1;n++)o=tt(this,s[i+n],e,n),o===V&&(o=this._$AH[n]),r||=!j(o)||o!==this._$AH[n],o===Y?t=Y:t!==Y&&(t+=(o??"")+a[n+1]),this._$AH[n]=o}r&&!s&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class at extends st{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}}class rt extends st{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}}class nt extends st{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=tt(this,t,e,0)??Y)===V)return;const i=this._$AH,s=t===Y&&i!==Y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==Y&&(i===Y||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t)}}const lt=k.litHtmlPolyfillSupport;lt?.(J,it),(k.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;class dt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new it(e.insertBefore(O(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}dt._$litElement$=!0,dt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:dt});const gt=ct.litElementPolyfillSupport;gt?.({LitElement:dt}),(ct.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:y},ut=(t=ht,e,i)=>{const{kind:s,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function mt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ft(t){return mt({...t,state:!0,attribute:!1})}var vt,bt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(vt||(vt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(bt||(bt={}));var xt=function(t,e,i,s){s=s||{},i=null==i?{}:i;var a=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return a.detail=i,t.dispatchEvent(a),a};function _t(t,e=22,i){return q`<span class="ms" style=${`font-size:${e}px${i?`;color:${i}`:""}`}>${t}</span>`}function yt(t,e="add_box"){return q`<div class="g-ph">${_t(e,26,"var(--g-faint)")}<span>${t}</span></div>`}const $t=o`
  :host {
    --g-page: #050506;
    --g-panel: #0f1013;
    --g-card: #16181d;
    --g-inset: #1c1f26;

    --g-text-hi: #e7e9ee;
    --g-text: #c8ccd3;
    --g-dim: #8b9099;
    --g-faint: #6b7078;
    --g-disabled: #4b5058;

    --g-amber: #f3d06a;
    --g-amber-hi: #f7dc8a;
    --g-amber-deep: #e0b24a;
    --g-amber-ink: #221a02;
    --g-green: #b9f6a6;
    --g-green-ink: #0f1a0d;
    --g-red: #ff5c5c;
    --g-red-text: #ff8080;
    --g-cyan: #87dde1;
    --g-purple: #c9a6ff;

    --g-border: rgba(255, 255, 255, 0.06);
    --g-border-hi: rgba(255, 255, 255, 0.14);
    --g-hair: rgba(255, 255, 255, 0.05);

    --g-r-card: 24px;
    --g-r-tile: 20px;
    --g-r-ctl: 14px;
    --g-r-sm: 12px;

    --g-font: 'Manrope', system-ui, -apple-system, sans-serif;
    --g-display: 'Space Grotesk', var(--g-font);
    --g-mono: 'IBM Plex Mono', ui-monospace, monospace;

    display: block;
    font-family: var(--g-font);
    color: var(--g-text-hi);
    -webkit-font-smoothing: antialiased;
  }

  /* Material Symbols Rounded glyph */
  .ms {
    font-family: 'Material Symbols Rounded';
    line-height: 1;
    font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
    -webkit-font-smoothing: antialiased;
    user-select: none;
  }

  /* Card shell */
  .card {
    background: var(--g-card);
    border-radius: var(--g-r-card);
    padding: 22px;
    border: 1px solid var(--g-hair);
    box-sizing: border-box;
  }

  /* Card header: icon + title on the left, meta on the right */
  .hdr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .hdr-l {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .title {
    font-size: 17px;
    font-weight: 700;
    color: var(--g-text-hi);
  }
  .meta {
    font-size: 12.5px;
    color: var(--g-dim);
  }

  /* Type scale */
  .t-display {
    font-family: var(--g-display);
    font-size: 46px;
    font-weight: 600;
    letter-spacing: -1.5px;
    line-height: 1;
  }
  .t-num {
    font-family: var(--g-display);
    font-weight: 600;
    line-height: 1;
  }
  .t-label {
    font-size: 12px;
    color: var(--g-dim);
  }
  .t-mono {
    font-family: var(--g-mono);
    font-size: 13px;
    color: var(--g-text);
  }

  /* LIVE tag */
  .live {
    background: rgba(243, 208, 106, 0.15);
    color: var(--g-amber);
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 6px;
    letter-spacing: 0.5px;
    font-weight: 700;
  }

  /* Badge / chip / pill */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12.5px;
    font-weight: 700;
    padding: 6px 13px;
    border-radius: 999px;
    background: var(--g-inset);
    color: var(--g-dim);
  }
  .badge .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
    flex: none;
  }
  .badge.green { background: rgba(185, 246, 166, 0.14); color: var(--g-green); }
  .badge.amber { background: rgba(243, 208, 106, 0.16); color: var(--g-amber); }
  .badge.red { background: rgba(255, 92, 92, 0.14); color: var(--g-red-text); }
  .badge.cyan { background: rgba(135, 221, 225, 0.14); color: var(--g-cyan); }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: var(--g-font);
    font-weight: 700;
    font-size: 14px;
    padding: 12px 20px;
    border-radius: var(--g-r-ctl);
    border: 1px solid transparent;
    cursor: pointer;
    color: var(--g-text);
    background: var(--g-inset);
    transition: filter 0.15s ease, background 0.15s ease;
  }
  .btn:hover { filter: brightness(1.12); }
  .btn.primary { background: var(--g-amber); color: var(--g-amber-ink); }
  .btn.secondary { background: var(--g-inset); color: var(--g-text-hi); border-color: var(--g-border); }
  .btn.ghost { background: transparent; color: var(--g-dim); }
  .btn.success { background: var(--g-green); color: var(--g-green-ink); }
  .btn.danger { background: var(--g-red); color: var(--g-red-ink, #2a0808); }
  .btn.tonal { background: rgba(243, 208, 106, 0.12); color: var(--g-amber); border-color: rgba(243, 208, 106, 0.4); }
  .btn.soft { background: rgba(255, 255, 255, 0.06); color: var(--g-text); }

  /* Toggle */
  .toggle {
    width: 46px;
    height: 26px;
    border-radius: 26px;
    background: rgba(255, 255, 255, 0.08);
    position: relative;
    cursor: pointer;
    flex: none;
    transition: background 0.2s ease;
  }
  .toggle.on { background: var(--g-amber); }
  .toggle .knob {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.2s ease;
  }
  .toggle.on .knob { transform: translateX(20px); }

  /* Neutral placeholder (unconfigured / missing entity) */
  .g-ph {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 88px;
    padding: 22px;
    border: 1px dashed var(--g-border-hi);
    border-radius: var(--g-r-card);
    background: var(--g-card);
    color: var(--g-dim);
    font-size: 13px;
    text-align: center;
  }

  /* Meter bar */
  .meter {
    height: 10px;
    border-radius: 10px;
    background: var(--g-inset);
    position: relative;
    overflow: hidden;
  }
  .meter > span {
    position: absolute;
    inset: 0;
    transform-origin: left;
    border-radius: 10px;
    background: var(--g-amber);
  }
`;let wt=class extends dt{setConfig(t){this._config={title:"Home",entities:[],...t}}getCardSize(){return 2}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{title:"Home",entities:[]}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||this._config.entities.some(t=>e.states[t]!==this.hass.states[t])}_statusOf(t){const e=this.hass?.states[t];if(!e)return{label:"Unknown",home:!1,accent:"var(--g-dim)"};if("home"===e.state)return{label:"Home",home:!0,accent:"var(--g-green)"};if("not_home"===e.state)return{label:"Away",home:!1,accent:"var(--g-dim)"};return{label:e.state.charAt(0).toUpperCase()+e.state.slice(1),home:!1,accent:"var(--g-amber)"}}_relTime(t){if(!t)return"";const e=Math.round((Date.now()-new Date(t).getTime())/6e4);if(e<1)return"just now";if(e<60)return`${e}m ago`;const i=Math.round(e/60);return i<24?`${i}h ago`:`${Math.round(i/24)}d ago`}_open(t){xt(this,"hass-more-info",{entityId:t})}render(){if(!this._config||!this.hass)return Y;if(!this._config.entities.length)return yt("Add person entities","group");const t=this._config.entities.map(t=>({id:t,st:this.hass.states[t]})),e=t.filter(t=>"home"===t.st?.state).length;return q`
      <div class="card">
        <div class="hdr">
          <div class="hdr-l">${_t("home",20,"var(--g-amber)")}<span class="title">${this._config.title}</span></div>
          <span class="badge ${e>0?"green":""}">
            <span class="dot"></span>${e}/${t.length} home
          </span>
        </div>

        <div class="people">
          ${t.map(t=>{if(!t.st)return q`<div class="missing">${t.id} not found</div>`;const e=this._statusOf(t.id),i=t.st.attributes.entity_picture,s=t.st.attributes.friendly_name??t.id,a=s.split(" ").map(t=>t[0]).slice(0,2).join("").toUpperCase();return q`
              <button class="person" @click=${()=>this._open(t.id)} title=${s}>
                <div class="avatar" style="--accent:${e.accent}">
                  ${i?q`<img src=${i} alt=${s} />`:q`<span class="mono-av">${a}</span>`}
                  ${e.home?q`<span class="ring"></span>`:Y}
                </div>
                <div class="who">
                  <span class="name">${s}</span>
                  <span class="status" style="color:${e.accent}">${e.label}</span>
                </div>
                <span class="ago">${this._relTime(t.st.last_changed)}</span>
              </button>
            `})}
        </div>
      </div>
    `}};wt.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 14px; }
      .people { display: flex; flex-direction: column; gap: 8px; }
      .person {
        display: flex;
        align-items: center;
        gap: 14px;
        width: 100%;
        padding: 10px 12px;
        border-radius: var(--g-r-tile);
        background: var(--g-inset);
        border: 1px solid var(--g-hair);
        color: inherit;
        font: inherit;
        cursor: pointer;
        text-align: left;
        transition: background 0.15s ease, transform 0.15s ease;
      }
      .person:hover { background: rgba(255, 255, 255, 0.07); transform: translateY(-1px); }
      .missing { text-align: center; color: var(--g-red-text); font-size: 13px; padding: 8px; }
      .avatar { position: relative; width: 44px; height: 44px; flex: none; }
      .avatar img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
      .mono-av {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--g-amber), var(--g-amber-deep));
        color: var(--g-amber-ink);
        font-family: var(--g-display);
        font-weight: 700;
        font-size: 15px;
      }
      .ring {
        position: absolute;
        inset: -3px;
        border-radius: 50%;
        border: 2px solid var(--accent);
        box-shadow: 0 0 12px rgba(185, 246, 166, 0.35);
        pointer-events: none;
      }
      .who { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
      .name { font-family: var(--g-display); font-weight: 600; color: var(--g-text-hi); font-size: 15px; }
      .status { font-size: 12.5px; font-weight: 700; }
      .ago { font-family: var(--g-mono); font-size: 12px; color: var(--g-dim); flex: none; }
    `],e([mt({attribute:!1})],wt.prototype,"hass",void 0),e([ft()],wt.prototype,"_config",void 0),wt=e([pt("glass-person-card")],wt);const kt={"clear-night":{icon:"bedtime",label:"Clear night"},cloudy:{icon:"cloud",label:"Cloudy"},fog:{icon:"foggy",label:"Fog"},hail:{icon:"weather_hail",label:"Hail"},lightning:{icon:"thunderstorm",label:"Lightning"},"lightning-rainy":{icon:"thunderstorm",label:"Storms"},partlycloudy:{icon:"partly_cloudy_day",label:"Partly cloudy"},pouring:{icon:"rainy",label:"Heavy rain"},rainy:{icon:"rainy",label:"Rain"},snowy:{icon:"weather_snowy",label:"Snow"},"snowy-rainy":{icon:"weather_mix",label:"Sleet"},sunny:{icon:"clear_day",label:"Sunny"},windy:{icon:"air",label:"Windy"},"windy-variant":{icon:"air",label:"Windy"},exceptional:{icon:"warning",label:"Severe"}},St=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];let Ct=class extends dt{setConfig(t){this._config=t}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:"",sun:"sun.sun"}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");if(!e||!this.hass||!this._config)return!0;return[this._config.entity,this._config.sun,this._config.humidity].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}_compass(t){return"number"==typeof t?St[Math.round(t/22.5)%16]:"string"==typeof t&&t?t.toUpperCase():""}_time(t){if(!t)return"—";const e=new Date(t);return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}render(){if(!this._config||!this.hass)return Y;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;if(!t)return yt("Select a weather entity","partly_cloudy_day");const e=kt[t.state]??{icon:"thermostat",label:t.state},i=t.attributes,s=i.temperature_unit||`°${this.hass.config.unit_system.temperature.replace("°","")}`,a=null!=i.temperature?Math.round(Number(i.temperature)):"—",r=null!=i.wind_speed?`${Math.round(Number(i.wind_speed))} ${i.wind_speed_unit??"km/h"}`:"",n=[this._compass(i.wind_bearing),r].filter(Boolean).join(" "),o=this._config.humidity,l=o?this.hass.states[o]?.state:i.humidity,c=null!=l?`${Math.round(Number(l))}%`:"—",d=this._config.sun?this.hass.states[this._config.sun]:void 0,g=d?.attributes.next_setting,p=d?.attributes.next_rising,h="below_horizon"===d?.state;return q`
      <div class="card" @click=${()=>xt(this,"hass-more-info",{entityId:this._config.entity})}>
        <div class="top">
          <div class="cond">
            ${_t(e.icon,48,"var(--g-amber)")}
            <div>
              <div class="cond-label">${e.label}</div>
              ${n?q`<div class="wind">Wind ${n}</div>`:Y}
            </div>
          </div>
          <div class="temp"><span class="t-num deg">${a}</span><span class="unit">${s}</span></div>
        </div>
        <div class="tiles">
          <div class="tile">
            <div class="tile-h">${_t("water_drop",16,"var(--g-dim)")}Humidity</div>
            <div class="t-num tile-v">${c}</div>
          </div>
          <div class="tile">
            <div class="tile-h">
              ${_t(h?"wb_sunny":"wb_twilight",16,"var(--g-dim)")}${h?"Sunrise":"Sunset"}
            </div>
            <div class="t-num tile-v">${this._time(h?p:g)}</div>
          </div>
        </div>
      </div>
    `}};Ct.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 18px; cursor: pointer; }
      .top { display: flex; align-items: flex-start; justify-content: space-between; }
      .cond { display: flex; align-items: center; gap: 16px; }
      .cond-label { font-size: 18px; font-weight: 700; }
      .wind { font-size: 13px; color: var(--g-dim); margin-top: 2px; }
      .temp { display: flex; align-items: flex-start; font-family: var(--g-display); }
      .deg { font-size: 56px; letter-spacing: -2px; }
      .unit { font-size: 20px; font-weight: 500; color: var(--g-dim); margin-top: 4px; }
      .tiles { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
      .tile { background: var(--g-inset); border-radius: var(--g-r-ctl); padding: 12px 14px; }
      .tile-h { display: flex; align-items: center; gap: 6px; color: var(--g-dim); font-size: 12px; }
      .tile-v { font-size: 19px; margin-top: 4px; }
      .missing { text-align: center; color: var(--g-red-text); font-size: 13px; padding: 8px; }
    `],e([mt({attribute:!1})],Ct.prototype,"hass",void 0),e([ft()],Ct.prototype,"_config",void 0),Ct=e([pt("glass-weather-card")],Ct);let zt=class extends dt{setConfig(t){this._config={icon:"videocam",...t}}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:"camera.garage",icon:"garage"}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}_stamp(t){const e=t?new Date(t):new Date,i=t=>String(t).padStart(2,"0");return`${e.getFullYear()}-${i(e.getMonth()+1)}-${i(e.getDate())} · ${i(e.getHours())}:${i(e.getMinutes())}:${i(e.getSeconds())}`}render(){if(!this._config||!this.hass)return Y;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;if(!t)return yt("Select a camera entity","videocam");const e=t.attributes.entity_picture,i=this._config.name??t.attributes.friendly_name??this._config.entity,s="streaming"===t.state||"recording"===t.state||"idle"===t.state;return q`
      <div class="cam" @click=${()=>xt(this,"hass-more-info",{entityId:this._config.entity})}>
        ${e?q`<img src=${e} alt=${i} />`:Y}
        <div class="scan"></div>
        ${!1===this._config.show_timestamp?Y:q`<div class="ts">${this._stamp(t.last_changed)}</div>`}
        ${s?q`<div class="live-badge"><span class="rec"></span>LIVE</div>`:q`<div class="live-badge off">OFFLINE</div>`}
        ${e?Y:q`<div class="ph">${_t("videocam",52)}</div>`}
        <div class="label">${_t(this._config.icon,20,"#fff")}<span>${i}</span></div>
        <div class="expand">${_t("open_in_full",20,"#fff")}</div>
      </div>
    `}};zt.styles=[$t,o`
      .cam {
        position: relative;
        width: 100%;
        aspect-ratio: 452 / 262;
        border-radius: var(--g-r-card);
        overflow: hidden;
        cursor: pointer;
        background: radial-gradient(130% 100% at 50% 35%, #2b2f33 0%, #14161a 55%, #0c0e11 100%);
      }
      .cam img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      .scan {
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px 3px);
        pointer-events: none;
      }
      .ts {
        position: absolute;
        top: 14px;
        left: 16px;
        font-family: var(--g-mono);
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
      }
      .live-badge {
        position: absolute;
        top: 12px;
        right: 14px;
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(0, 0, 0, 0.35);
        padding: 5px 10px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1px;
        color: #fff;
      }
      .live-badge.off { color: var(--g-dim); }
      .rec { width: 8px; height: 8px; border-radius: 50%; background: var(--g-red); }
      .ph { position: absolute; left: 50%; top: 44%; transform: translate(-50%, -50%); color: rgba(255, 255, 255, 0.18); }
      .label {
        position: absolute;
        left: 16px;
        bottom: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 700;
        color: #fff;
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
      }
      .expand {
        position: absolute;
        right: 14px;
        bottom: 14px;
        width: 36px;
        height: 36px;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .missing { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: var(--g-red-text); font-size: 13px; }
    `],e([mt({attribute:!1})],zt.prototype,"hass",void 0),e([ft()],zt.prototype,"_config",void 0),zt=e([pt("glass-camera-card")],zt);const At={disarm:{label:"Disarm",icon:"lock_open",service:"alarm_disarm"},arm:{label:"Arm",icon:"lock",service:"alarm_arm_away",activeState:"armed_away"},arm_home:{label:"Home",icon:"home",service:"alarm_arm_home",activeState:"armed_home"},arm_away:{label:"Away",icon:"lock",service:"alarm_arm_away",activeState:"armed_away"},arm_night:{label:"Night",icon:"bedtime",service:"alarm_arm_night",activeState:"armed_night"},arm_vacation:{label:"Vacation",icon:"luggage",service:"alarm_arm_vacation",activeState:"armed_vacation"}},Et=["disarm","arm_home","arm_away"];let Mt=class extends dt{constructor(){super(...arguments),this._code=""}setConfig(t){this._config={variant:"shield",...t}}getCardSize(){return"bar"===this._config?.variant||"triggered"===this._config?.variant?1:3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:"",variant:"shield"}}shouldUpdate(t){if(t.has("_config")||t.has("_code"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}_look(t){switch(t){case"armed_away":return{accent:"var(--g-green)",glyph:"verified_user",label:"Armed · Away",border:"rgba(185,246,166,0.25)",blink:!1};case"armed_home":case"armed_night":case"armed_custom_bypass":return{accent:"var(--g-green)",glyph:"security",label:"Armed · "+t.replace("armed_","").replace("_"," "),border:"rgba(185,246,166,0.25)",blink:!1};case"arming":case"pending":return{accent:"var(--g-amber)",glyph:"shield_moon",label:"arming"===t?"Arming…":"Entry delay",border:"rgba(243,208,106,0.3)",blink:!0};case"triggered":return{accent:"var(--g-red-text)",glyph:"crisis_alert",label:"Triggered",border:"rgba(255,92,92,0.4)",blink:!0};default:return{accent:"var(--g-dim)",glyph:"gpp_maybe",label:"Disarmed",border:"var(--g-hair)",blink:!1}}}get _st(){return this.hass.states[this._config.entity]}_call(t,e){const i={entity_id:this._config.entity},s=e??this._config.code;s&&(i.code=s),this.hass.callService("alarm_control_panel",t,i)}_more(){xt(this,"hass-more-info",{entityId:this._config.entity})}_time(t){if(!t)return"";const e=new Date(t);return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}_key(t){const e=this._config.code_length??4;"back"!==t?"ok"!==t?this._code.length>=e||(this._code+=t,this._code.length===e&&this._submitCode()):this._submitCode():this._code=this._code.slice(0,-1)}_submitCode(){if(!this._code)return;const t=this._st.state.startsWith("armed")||"triggered"===this._st.state;this._call(t?"alarm_disarm":"alarm_arm_away",this._code),this._code=""}_resolveButton(t){return"string"==typeof t?At[t]:t&&t.service?{label:t.label,icon:t.icon??"lock",service:t.service,activeState:t.state}:void 0}_actionButtons(){return(this._config.buttons??Et).map(t=>this._resolveButton(t)).filter(t=>!!t).map(t=>q`
          <button class="btn ${t.activeState&&this._st.state===t.activeState?"success":"soft"}" @click=${()=>this._call(t.service)}>
            ${_t(t.icon,18)}${t.label}
          </button>
        `)}render(){if(!this._config||!this.hass)return Y;if(!this._st)return yt("Select an alarm panel","security");switch(this._config.variant){case"radial":return this._renderRadial();case"bar":return this._renderBar();case"keypad":return this._renderKeypad();case"triggered":return this._renderTriggered();default:return this._renderShield()}}_header(t,e){return q`
      <div class="row">
        <div class="badge-box ${t.blink?"blink":""}" style="--a:${t.accent}">${_t(t.glyph,26,t.accent)}</div>
        <div class="who">
          <div class="title">${e}</div>
          <div class="sub" style="color:${t.accent}">${t.label}</div>
        </div>
        <button class="more" @click=${this._more}>${_t("more_horiz",20,"var(--g-dim)")}</button>
      </div>
    `}_renderShield(){const t=this._look(this._st.state),e=this._config.name??this._st.attributes.friendly_name??"Security";return q`<div class="card" style="border-color:${t.border}">
      ${this._header(t,e)}
      <div class="actions">${this._actionButtons()}</div>
    </div>`}_renderRadial(){const t=this._look(this._st.state),e=this._config.name??this._st.attributes.friendly_name??"Security";return q`<div class="card center" style="border-color:${t.border}">
      <div class="ring ${t.blink?"blink":""}" style="background:color-mix(in srgb, ${t.accent} 20%, transparent)">
        <div class="ring-in">
          ${_t(t.glyph,44,t.accent)}
          <div class="ring-label" style="color:${t.accent}">${t.label}</div>
        </div>
      </div>
      <div class="name-c">${e}</div>
      <div class="actions">${this._actionButtons()}</div>
    </div>`}_renderBar(){const t=this._look(this._st.state),e=this._config.name??this._st.attributes.friendly_name??"Security",i=this._st.state.startsWith("armed")||"triggered"===this._st.state;return q`<div class="bar" style="border-color:${t.border}">
      <div class="badge-box sm ${t.blink?"blink":""}" style="--a:${t.accent}">${_t(t.glyph,24,t.accent)}</div>
      <div class="who"><div class="title sm">${t.label}</div><div class="sub2">${this._config.subtitle??e}</div></div>
      <button class="btn soft" @click=${()=>this._call(i?"alarm_disarm":"alarm_arm_away")}>
        ${_t(i?"lock_open":"lock",17)}${i?"Disarm":"Arm"}
      </button>
    </div>`}_renderKeypad(){const t=this._config.code_length??4,e=Array.from({length:t},(t,e)=>e<this._code.length?"●":"○").join(" "),i=this._look(this._st.state);return q`<div class="card">
      <div class="disp"><span class="ms" style="font-size:22px;color:${i.accent}">${i.glyph}</span><div class="dots">${e}</div></div>
      <div class="pad">
        ${["1","2","3","4","5","6","7","8","9","back","0","ok"].map(t=>"back"===t?q`<button class="k" @click=${()=>this._key("back")}>${_t("backspace",20,"var(--g-dim)")}</button>`:"ok"===t?q`<button class="k ok" @click=${()=>this._key("ok")}>${_t("check",20,"var(--g-amber-ink)")}</button>`:q`<button class="k" @click=${()=>this._key(t)}>${t}</button>`)}
      </div>
    </div>`}_renderTriggered(){if("triggered"===this._st.state)return q`<div class="alert red">
        <div class="badge-box sm blink" style="--a:var(--g-red-text)">${_t("crisis_alert",24,"var(--g-red-text)")}</div>
        <div class="who"><div class="title sm" style="color:var(--g-red-text)">Alarm triggered</div>
          <div class="sub2">${this._st.attributes.changed_by??"Sensor"} · ${this._time(this._st.last_changed)}</div></div>
        <button class="btn danger" @click=${()=>this._call("alarm_disarm")}>Dismiss</button>
      </div>`;const t=this._look(this._st.state);return q`<div class="alert" style="border-color:${t.border}">
      <div class="badge-box sm" style="--a:${t.accent}">${_t("verified_user",24,t.accent)}</div>
      <div class="who"><div class="title sm">All secure</div><div class="sub2" style="color:${t.accent}">${t.label}</div></div>
    </div>`}};Mt.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 16px; border: 1px solid var(--g-hair); }
      .card.center { align-items: center; }
      .row { display: flex; align-items: center; gap: 14px; }
      .badge-box { width: 50px; height: 50px; border-radius: 15px; background: color-mix(in srgb, var(--a) 14%, transparent); display: flex; align-items: center; justify-content: center; flex: none; }
      .badge-box.sm { width: 42px; height: 42px; border-radius: 12px; }
      .blink { animation: g-blink 1.2s ease-in-out infinite; }
      @keyframes g-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 13px; font-weight: 600; margin-top: 1px; text-transform: capitalize; }
      .sub2 { font-size: 12px; color: var(--g-dim); }
      .title.sm { font-size: 15px; }
      .more { background: none; border: none; cursor: pointer; padding: 4px; }
      .actions { display: flex; gap: 10px; width: 100%; }
      .actions .btn { flex: 1; padding: 11px; border-radius: var(--g-r-ctl); }

      .ring { width: 150px; height: 150px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
      .ring-in { width: 122px; height: 122px; border-radius: 50%; background: var(--g-card); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; }
      .ring-label { font-size: 13px; font-weight: 700; text-transform: capitalize; }
      .name-c { font-size: 14px; font-weight: 700; }

      .bar, .alert { display: flex; align-items: center; gap: 14px; background: var(--g-card); border: 1px solid var(--g-hair); border-radius: 18px; padding: 14px 18px; }
      .alert.red { background: rgba(255, 92, 92, 0.1); border-color: rgba(255, 92, 92, 0.4); }

      .disp { display: flex; align-items: center; gap: 10px; background: var(--g-inset); border-radius: var(--g-r-ctl); padding: 12px 16px; }
      .dots { flex: 1; font-family: var(--g-mono); font-size: 22px; letter-spacing: 4px; color: var(--g-text-hi); }
      .pad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
      .k { aspect-ratio: 1.6; display: flex; align-items: center; justify-content: center; background: var(--g-inset); border: none; border-radius: 12px; font-family: var(--g-display); font-size: 20px; font-weight: 600; cursor: pointer; color: var(--g-text-hi); }
      .k:hover { filter: brightness(1.25); }
      .k.ok { background: var(--g-amber); }
      .missing { text-align: center; color: var(--g-red-text); font-size: 13px; padding: 8px; }
    `],e([mt({attribute:!1})],Mt.prototype,"hass",void 0),e([ft()],Mt.prototype,"_config",void 0),e([ft()],Mt.prototype,"_code",void 0),Mt=e([pt("glass-alarm-card")],Mt);const Nt=[["#7dd68a","var(--g-green)"],["#e0b24a","var(--g-amber)"],["#a97ff0","var(--g-purple)"],["#5ab9bd","var(--g-cyan)"]];let Pt=class extends dt{constructor(){super(...arguments),this._bars=[]}setConfig(t){this._config={title:"Energy",variant:"flow",...t},this._fetchedFor=void 0}getCardSize(){return"flow"===this._config?.variant||"production"===this._config?.variant?4:3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{title:"Energy",variant:"flow",solar:"sensor.solar_power",grid:"sensor.grid_power",battery:"sensor.battery_power"}}shouldUpdate(t){if(t.has("_config")||t.has("_bars"))return!0;const e=t.get("hass");if(!e||!this.hass||!this._config)return!0;const i=this._config;return[i.solar,i.grid,i.battery,i.battery_soc,i.house,i.today,i.imported,i.exported,i.saved,i.production,...i.meters??[]].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}updated(){if(!this.hass||!this._config||"production"!==this._config.variant||!this._config.production)return;const t=this.hass.states[this._config.production];t&&t.last_updated!==this._fetchedFor&&(this._fetchedFor=t.last_updated,this._loadProduction(this._config.production))}async _loadProduction(t){const e=new Date;e.setHours(0,0,0,0);try{const i=(await this.hass.callWS({type:"recorder/statistics_during_period",start_time:e.toISOString(),statistic_ids:[t],period:"hour"}))[t]??[];this._bars=i.map(t=>({v:Math.max(0,Number(t.change??t.state??0)),label:String(new Date(Number(t.start)).getHours())}))}catch{this._bars=[]}}_watts(t){if(!t||!this.hass)return null;const e=this.hass.states[t];if(!e||"unavailable"===e.state||"unknown"===e.state)return null;const i=Number(e.state);if(Number.isNaN(i))return null;return"kw"===String(e.attributes.unit_of_measurement??"").toLowerCase()?1e3*i:i}_kw(t){return(t/1e3).toFixed(1)}_stateNum(t){const e=t?Number(this.hass.states[t]?.state):NaN;return Number.isNaN(e)?null:e}_label(t){return this.hass.states[t]?.attributes.friendly_name??t}render(){if(!this._config||!this.hass)return Y;switch(this._config.variant){case"ring":return this._renderRing();case"stats":return this._renderStats();case"meters":return this._renderMeters();case"production":return this._renderProduction();default:return this._renderFlow()}}_head(t){return q`<div class="hdr"><div class="hdr-l">${_t("bolt",22,"var(--g-amber)")}<span class="title">${this._config.title}</span></div>${t??Y}</div>`}_renderFlow(){const t=this._watts(this._config.solar),e=this._watts(this._config.grid),i=this._watts(this._config.battery);let s=this._watts(this._config.house);null==s&&(s=(t??0)+(e??0)+(i??0));const a=this._stateNum(this._config.battery_soc),r=(t??0)>20,n=(e??0)>20,o=(e??0)<-20,l=(i??0)>20,c=(i??0)<-20,d=o?{label:"Exporting",purple:!1}:n?{label:"Grid import",purple:!0}:{label:"Self-powered",purple:!1},g=(t,e,i=!1)=>t?`stroke:${e};animation:g-flow 0.7s linear infinite${i?" reverse":""};`:"stroke:rgba(255,255,255,0.06);";return q`<div class="card">
      ${this._head(q`<div class="badge ${d.purple?"":"green"}" style=${d.purple?"background:rgba(201,166,255,0.14);color:var(--g-purple)":""}><span class="dot pulse"></span>${d.label}</div>`)}
      <div class="flow">
        <svg viewBox="0 0 408 264" preserveAspectRatio="xMidYMid meet">
          ${F`
            <path d="M204 58 L204 108" fill="none" stroke-width="8" stroke-linecap="round" stroke="rgba(255,255,255,0.06)"></path>
            <path d="M92 176 L166 148" fill="none" stroke-width="8" stroke-linecap="round" stroke="rgba(255,255,255,0.06)"></path>
            <path d="M242 148 L316 176" fill="none" stroke-width="8" stroke-linecap="round" stroke="rgba(255,255,255,0.06)"></path>
            <path d="M204 58 L204 108" fill="none" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="2 12" style=${g(r,"var(--g-amber)")}></path>
            <path d="M92 176 L166 148" fill="none" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="2 12" style=${g(n||o,"var(--g-purple)",o)}></path>
            <path d="M242 148 L316 176" fill="none" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="2 12" style=${g(l||c,"var(--g-green)",c)}></path>
          `}
        </svg>
        ${null!=t?q`<div class="node solar"><div class="chip amber">${_t("solar_power",20,"var(--g-amber)")}<span>${this._kw(t)}</span></div><span class="cap">Solar · kW</span></div>`:Y}
        <div class="node home">${_t("home",26,"var(--g-amber)")}<span class="watts t-num">${Math.round(s)}</span><span class="cap">Watts now</span></div>
        ${null!=e?q`<div class="node grid"><div class="chip">${_t("bolt",20,"var(--g-purple)")}<span style="color:var(--g-purple)">${this._kw(Math.abs(e))}</span></div><span class="cap">Grid · kW${n?" (import)":o?" (export)":" (idle)"}</span></div>`:Y}
        ${null!=i?q`<div class="node batt"><div class="chip green">${_t(c?"battery_charging_full":"battery_full",20,"var(--g-green)")}<span style="color:var(--g-green)">${this._kw(Math.abs(i))}</span></div><span class="cap">Battery${null!=a?` · ${Math.round(a)}%`:" · kW"}</span></div>`:Y}
      </div>
    </div>`}_renderRing(){const t=this._config,e=this._stateNum(t.battery_soc)??0,i=this._watts(t.solar);let s=this._watts(t.house);null==s&&(s=(i??0)+(this._watts(t.grid)??0)+(this._watts(t.battery)??0));const a=this._watts(t.battery),r=null!=a&&Math.abs(a)>5?q`<div class="delta" style="color:${a<0?"var(--g-green)":"var(--g-amber)"}">${a<0?"↓":"↑"} ${Math.abs(Math.round(a))} W</div>`:Y;return q`<div class="card">
      ${this._head()}
      <div class="ring-row">
        <div class="bring" style="background:conic-gradient(var(--g-amber) 0 ${e}%, rgba(255,255,255,0.07) ${e}% 100%)">
          <div class="bring-in">
            <div class="t-num bpct">${Math.round(e)}<span class="pctu">%</span></div>
            <div class="bcap">Battery</div>
            ${r}
          </div>
        </div>
        <div class="ring-side">
          <div class="rside"><span class="ms" style="font-size:22px;color:var(--g-dim)">solar_power</span><div><div class="t-num rv">${null!=i?Math.round(i):"—"} W</div><div class="rc">Solar production</div></div></div>
          <div class="hair"></div>
          <div class="rside"><span class="ms" style="font-size:22px;color:var(--g-dim)">home</span><div><div class="t-num rv">${Math.round(s)} W</div><div class="rc">House load</div></div></div>
        </div>
      </div>
      ${t.today||t.grid?q`<div class="ring-tiles">
            ${t.today?q`<div class="stat"><div class="t-num sv">${this._fmt(t.today).val} <span class="su">${this._fmt(t.today).unit||"kWh"}</span></div><div class="sc">Solar today</div></div>`:Y}
            ${t.grid?q`<div class="stat"><div class="t-num sv">${(this._watts(t.grid)??0)>5?"Import":(this._watts(t.grid)??0)<-5?"Export":"On"} <span style="color:var(--g-green)">●</span></div><div class="sc">Grid status</div></div>`:Y}
          </div>`:Y}
    </div>`}_fmt(t){const e=t?this.hass.states[t]:void 0;if(!e)return{val:"—",unit:""};const i=Number(e.state);return{val:Number.isNaN(i)?e.state:i.toFixed(1),unit:e.attributes.unit_of_measurement??""}}_renderStats(){const t=this._config,e=this._fmt(t.today),i=[{id:t.imported,color:"var(--g-purple)"},{id:t.exported,color:"var(--g-green)"},{id:t.saved,color:"var(--g-amber)"}].filter(t=>t.id);return q`<div class="card">
      <div class="section">Solar today</div>
      <div class="big-row"><div class="t-display">${e.val}</div><div class="big-unit">${e.unit||"kWh"} ${t.today?this._label(t.today):""}</div></div>
      ${i.length?q`<div class="tri">
            ${i.map(t=>{const e=this._fmt(t.id);return q`<div class="stat"><div class="t-num sv" style="color:${t.color}">${e.val}${e.unit?q` <span class="su">${e.unit}</span>`:Y}</div><div class="sc">${this._label(t.id)}</div></div>`})}
          </div>`:Y}
    </div>`}_renderMeters(){const t=this._config,e=[...t.battery_soc?[t.battery_soc]:[],...t.meters??[]];return q`<div class="card">
      ${this._head()}
      <div class="meters">
        ${e.map((e,i)=>{const s=Math.max(0,Math.min(100,this._stateNum(e)??0)),[a,r]=Nt[i%Nt.length];return q`<div class="m">
            <div class="m-h"><span class="m-l">${_t(0===i&&t.battery_soc?"battery_charging_full":"bolt",18,r)}${this._label(e)}</span><span class="m-v">${Math.round(s)}%</span></div>
            <div class="m-track"><span style="width:${s}%;background:linear-gradient(90deg, ${a}, ${r})"></span></div>
          </div>`})}
      </div>
    </div>`}_renderProduction(){const t=this._bars.reduce((t,e)=>t+e.v,0),e=Math.max(.001,...this._bars.map(t=>t.v));return q`<div class="card">
      ${this._head(q`<div class="t-num total">${t.toFixed(1)} <span class="su">kWh</span></div>`)}
      ${this._bars.length?q`<div class="bars">
            ${this._bars.map(t=>q`<div class="bar-col"><div class="bar" style="height:${t.v/e*100}%;background:${t.v>=.66*e?"var(--g-amber)":"var(--g-amber-deep)"}"></div><span class="bl">${t.label}</span></div>`)}
          </div>`:q`<div class="empty">No production data for today yet.</div>`}
    </div>`}};Pt.styles=[$t,o`
      @keyframes g-flow { to { stroke-dashoffset: -16; } }
      .card { display: flex; flex-direction: column; gap: 18px; }
      .section { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--g-faint); font-weight: 700; }
      .dot.pulse { animation: g-pulse 1.4s ease-in-out infinite; }
      @keyframes g-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

      .flow { position: relative; height: 264px; }
      .flow svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
      .node { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 4px; }
      .chip { display: flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: 14px; background: var(--g-inset); border: 1px solid var(--g-border); font-family: var(--g-display); font-size: 16px; font-weight: 700; }
      .chip.amber { background: rgba(243, 208, 106, 0.12); border-color: rgba(243, 208, 106, 0.35); color: var(--g-amber); }
      .chip.green { background: rgba(185, 246, 166, 0.1); border-color: rgba(185, 246, 166, 0.3); }
      .cap { font-size: 10.5px; color: var(--g-dim); font-weight: 600; }
      .solar { left: 50%; top: 0; transform: translateX(-50%); }
      .grid { left: 0; bottom: 0; }
      .batt { right: 0; bottom: 0; }
      .home { left: 50%; top: 50%; transform: translate(-50%, -50%); width: 96px; height: 96px; border-radius: 50%; gap: 2px; background: radial-gradient(circle at 50% 35%, #20242c, #14161a); border: 1.5px solid rgba(243, 208, 106, 0.4); box-shadow: 0 0 34px rgba(243, 208, 106, 0.18); justify-content: center; }
      .home .watts { font-size: 19px; }
      .home .cap { font-size: 9.5px; }

      .ring-row { display: flex; align-items: center; gap: 22px; }
      .bring { width: 148px; height: 148px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex: none; }
      .bring-in { width: 118px; height: 118px; border-radius: 50%; background: var(--g-card); display: flex; flex-direction: column; align-items: center; justify-content: center; }
      .bpct { font-size: 36px; }
      .pctu { font-size: 17px; }
      .bcap { font-size: 12px; color: var(--g-dim); margin-top: 3px; }
      .delta { font-size: 11px; font-weight: 600; margin-top: 2px; }
      .ring-side { flex: 1; display: flex; flex-direction: column; gap: 12px; }
      .rside { display: flex; align-items: center; gap: 12px; }
      .rv { font-size: 22px; }
      .rc { font-size: 12px; color: var(--g-dim); }
      .hair { height: 1px; background: var(--g-hair); }
      .ring-tiles { display: flex; gap: 12px; }
      .ring-tiles .stat { flex: 1; }

      .big-row { display: flex; align-items: flex-end; gap: 12px; }
      .big-unit { font-size: 16px; color: var(--g-dim); margin-bottom: 6px; }
      .tri { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
      .stat { background: var(--g-inset); border-radius: var(--g-r-ctl); padding: 14px; }
      .sv { font-size: 22px; }
      .su { font-size: 13px; color: var(--g-dim); }
      .sc { font-size: 11px; color: var(--g-dim); margin-top: 2px; }

      .meters { display: flex; flex-direction: column; gap: 16px; }
      .m-h { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 7px; }
      .m-l { display: flex; align-items: center; gap: 7px; font-weight: 600; }
      .m-v { font-family: var(--g-mono); color: var(--g-dim); }
      .m-track { height: 12px; border-radius: 12px; background: var(--g-inset); overflow: hidden; position: relative; }
      .m-track > span { position: absolute; inset: 0 auto 0 0; border-radius: 12px; }

      .total { font-size: 22px; }
      .bars { display: flex; align-items: flex-end; gap: 6px; height: 130px; }
      .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; justify-content: flex-end; height: 100%; }
      .bar { width: 100%; border-radius: 5px 5px 0 0; min-height: 2px; }
      .bl { font-size: 9px; color: var(--g-faint); }
      .empty { color: var(--g-dim); font-size: 13px; text-align: center; padding: 24px 0; }
    `],e([mt({attribute:!1})],Pt.prototype,"hass",void 0),e([ft()],Pt.prototype,"_config",void 0),e([ft()],Pt.prototype,"_bars",void 0),Pt=e([pt("glass-energy-card")],Pt);const Ot=new Set(["light","switch","fan","input_boolean","automation","script","siren","humidifier"]),jt={light:"lightbulb",switch:"toggle_on",fan:"mode_fan",climate:"thermostat",cover:"garage",lock:"lock",media_player:"speaker",script:"play_arrow",automation:"bolt",humidifier:"humidity_high",vacuum:"cleaning_services"},Lt={temperature:"thermostat",humidity:"water_drop",pressure:"compress",power:"bolt",energy:"bolt",battery:"battery_full",illuminance:"light_mode",motion:"sensors",door:"sensor_door",window:"window",co2:"co2"};let Tt=class extends dt{setConfig(t){this._config=t}getCardSize(){return 1}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}get _domain(){return this._config.entity.split(".")[0]}_iconName(t){return this._config.icon?this._config.icon:t&&Lt[t]?Lt[t]:jt[this._domain]??"circle"}_stateText(){const t=this.hass.states[this._config.entity];if(Ot.has(this._domain))return"light"===this._domain&&"on"===t.state&&null!=t.attributes.brightness?`${Math.round(Number(t.attributes.brightness)/255*100)}%`:"on"===t.state?"On":"Off";const e=t.attributes.unit_of_measurement,i=Number(t.state),s=Number.isNaN(i)?t.state:Math.abs(i)>=100?Math.round(i):i;return e?`${s}${e.startsWith("°")?"":" "}${e}`:String(s)}_tap(){this.hass&&this._config&&(Ot.has(this._domain)?this.hass.callService("homeassistant","toggle",{entity_id:this._config.entity}):xt(this,"hass-more-info",{entityId:this._config.entity}))}_toggleClick(t){t.stopPropagation(),this.hass.callService("homeassistant","toggle",{entity_id:this._config.entity})}render(){if(!this._config||!this.hass)return Y;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;if(!t)return yt("Select an entity","add_box");const e="on"===t.state||"open"===t.state||"home"===t.state||"playing"===t.state,i=Ot.has(this._domain),s=this._config.name??t.attributes.friendly_name??this._config.entity,a=t.attributes.device_class;return q`
      <div class="tile ${e?"on":""}" @click=${this._tap}>
        <div class="row">
          ${_t(this._iconName(a),24,e?"var(--g-amber)":"var(--g-dim)")}
          ${i?q`<div class="toggle ${e?"on":""}" @click=${this._toggleClick}><div class="knob"></div></div>`:Y}
        </div>
        <div class="body">
          <div class="name">${s}</div>
          <div class="state ${e?"lit":""}">${this._stateText()}</div>
        </div>
      </div>
    `}};Tt.styles=[$t,o`
      .tile {
        background: var(--g-card);
        border: 1px solid var(--g-hair);
        border-radius: var(--g-r-tile);
        padding: 16px 18px;
        min-height: 104px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 14px;
        cursor: pointer;
        transition: background 0.15s ease, border-color 0.15s ease;
      }
      .tile.on { background: rgba(243, 208, 106, 0.08); border-color: rgba(243, 208, 106, 0.28); }
      .tile:hover { border-color: var(--g-border-hi); }
      .row { display: flex; align-items: flex-start; justify-content: space-between; }
      .body { display: flex; flex-direction: column; gap: 2px; }
      .name { font-size: 14px; font-weight: 700; line-height: 1.15; }
      .state { font-size: 12px; color: var(--g-dim); }
      .state.lit { color: var(--g-amber); font-weight: 600; }
      .missing { color: var(--g-red-text); font-size: 12px; }
    `],e([mt({attribute:!1})],Tt.prototype,"hass",void 0),e([ft()],Tt.prototype,"_config",void 0),Tt=e([pt("glass-tile-card")],Tt);let Ut=class extends dt{constructor(){super(...arguments),this._rows=[]}setConfig(t){this._rows=(t.entities??[]).map(t=>"string"==typeof t?{entity:t}:t),this._config={title:"Sensors",...t}}getCardSize(){return this._rows.length+1}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{title:"Sensors",entities:[]}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!e||!this.hass||this._rows.some(t=>e.states[t.entity]!==this.hass.states[t.entity])}_resolveType(t){if(t.type&&"auto"!==t.type)return t.type;const e=this.hass.states[t.entity],i=e?.attributes.device_class;return t.entity.startsWith("cover.")||"garage"===i?"garage":"window"===i?"window":"door"}_isOpen(t){const e=this.hass.states[t];return!!e&&("open"===e.state||"on"===e.state||"opening"===e.state)}_visual(t,e){return"garage"===t?q`<div class="v garage">
        <div class="slats" style="transform:translateY(${e?"-100%":"0"})">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="floor"></div>
      </div>`:"window"===t?q`<div class="v window">
        <div class="pane top" style="transform:translateY(${e?"-60%":"0"})"></div>
        <div class="pane bot"></div>
      </div>`:q`<div class="v door">
      <div class="frame"><div class="leaf" style="transform:rotateY(${e?"-62deg":"0deg"})"><span class="knob"></span></div></div>
    </div>`}render(){if(!this._config||!this.hass)return Y;if(!this._rows.length)return yt("Add door / window / cover sensors","sensors");const t=this._rows.filter(t=>this._isOpen(t.entity)).length;return q`
      <div class="card">
        <div class="hdr">
          <div class="hdr-l">${_t("sensors",20,"var(--g-amber)")}<span class="title">${this._config.title}</span></div>
          <span class="badge ${t?"amber":"green"}">${t?`${t} open`:"All closed"}</span>
        </div>
        ${this._rows.map((t,e)=>{const i=this.hass.states[t.entity];if(!i)return q`<div class="line"><div class="missing">${t.entity} not found</div></div>`;const s=this._resolveType(t),a=this._isOpen(t.entity),r=t.name??i.attributes.friendly_name??t.entity;return q`
            <div class="line ${e<this._rows.length-1?"sep":""}" @click=${()=>xt(this,"hass-more-info",{entityId:t.entity})}>
              ${this._visual(s,a)}
              <div class="txt">
                <div class="name">${r}</div>
              </div>
              <span class="badge ${a?"amber":"green"}">${a?"Open":"Closed"}</span>
            </div>
          `})}
      </div>
    `}};Ut.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 8px; }
      .hdr { margin-bottom: 6px; }
      .line { display: flex; align-items: center; gap: 14px; padding: 12px 4px; cursor: pointer; }
      .line.sep { border-bottom: 1px solid var(--g-hair); }
      .txt { flex: 1; min-width: 0; }
      .name { font-size: 14px; font-weight: 700; }
      .missing { color: var(--g-red-text); font-size: 12px; }

      .v { width: 48px; height: 48px; flex: none; position: relative; }
      /* Garage roller */
      .garage { border-radius: 9px; overflow: hidden; background: #0a0c0f; border: 2px solid #3a3f47; }
      .garage .slats { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 2px; padding: 3px; transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1); }
      .garage .slats span { flex: 1; background: linear-gradient(#5a606a, #4a4f58); border-radius: 2px; }
      .garage .floor { position: absolute; left: 0; right: 0; bottom: 0; height: 6px; background: #3a3f47; }
      /* Door swing */
      .door { perspective: 130px; display: flex; align-items: flex-end; justify-content: center; }
      .door .frame { width: 34px; height: 44px; border: 2px solid #3a3f47; border-bottom: none; border-radius: 4px 4px 0 0; background: #0a0c0f; position: relative; transform-style: preserve-3d; }
      .door .leaf { position: absolute; inset: 2px; transform-origin: left center; transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1); background: linear-gradient(#6a5030, #54401f); border-radius: 2px; box-shadow: 2px 0 6px rgba(0, 0, 0, 0.5); }
      .door .knob { position: absolute; top: 50%; right: 3px; width: 4px; height: 4px; border-radius: 50%; background: var(--g-amber); transform: translateY(-50%); }
      /* Window slide */
      .window { border-radius: 5px; overflow: hidden; background: #12303a; border: 2px solid #3a3f47; }
      .window::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(135, 221, 225, 0.35), rgba(135, 221, 225, 0.05)); }
      .window .pane { position: absolute; left: 0; right: 0; height: 50%; background: linear-gradient(135deg, #2a3138, #1c2228); border: 1.5px solid #4a4f58; box-sizing: border-box; transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
      .window .top { top: 0; }
      .window .bot { bottom: 0; }
    `],e([mt({attribute:!1})],Ut.prototype,"hass",void 0),e([ft()],Ut.prototype,"_config",void 0),Ut=e([pt("glass-sensor-list-card")],Ut);let Ht=class extends dt{setConfig(t){this._config=t}getCardSize(){return 2}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:"media_player.kitchen"}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}_cmd(t,e){e.stopPropagation(),this.hass.callService("media_player",t,{entity_id:this._config.entity})}_progress(){const t=this.hass.states[this._config.entity],e=Number(t.attributes.media_duration);let i=Number(t.attributes.media_position);return!e||Number.isNaN(e)||Number.isNaN(i)?0:("playing"===t.state&&t.attributes.media_position_updated_at&&(i+=(Date.now()-new Date(t.attributes.media_position_updated_at).getTime())/1e3),Math.max(0,Math.min(100,i/e*100)))}render(){if(!this._config||!this.hass)return Y;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;if(!t)return yt("Select a media player","speaker");const e="off"===t.state||"unavailable"===t.state||"standby"===t.state,i="playing"===t.state,s=t.attributes,a=s.entity_picture,r=s.media_title||(this._config.name??s.friendly_name??"Media"),n=[s.media_artist,s.media_album_name].filter(Boolean).join(" · ")||(e?String(t.state):s.friendly_name??"");return q`
      <div class="card" @click=${()=>xt(this,"hass-more-info",{entityId:this._config.entity})}>
        <div class="art ${a?"":"ph"}">
          ${a?q`<img src=${a} alt="" />`:_t("music_note",34,"#fff")}
        </div>
        <div class="mid">
          <div class="title">${r}</div>
          <div class="sub">${n}</div>
          ${e?Y:q`<div class="bar"><span style="width:${this._progress()}%"></span></div>`}
        </div>
        <div class="ctl">
          <button class="ico" @click=${t=>this._cmd("media_previous_track",t)}>${_t("skip_previous",22)}</button>
          <button class="ico play" @click=${t=>this._cmd("media_play_pause",t)}>${_t(i?"pause":"play_arrow",24,"var(--g-amber-ink)")}</button>
          <button class="ico" @click=${t=>this._cmd("media_next_track",t)}>${_t("skip_next",22)}</button>
        </div>
      </div>
    `}};Ht.styles=[$t,o`
      .card { display: flex; align-items: center; gap: 18px; cursor: pointer; }
      .art { width: 76px; height: 76px; border-radius: 16px; overflow: hidden; flex: none; }
      .art img { width: 100%; height: 100%; object-fit: cover; }
      .art.ph { display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--g-purple), var(--g-purple-deep, #7d5bd6)); }
      .mid { flex: 1; min-width: 0; }
      .title { font-size: 16px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .sub { font-size: 13px; color: var(--g-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-transform: capitalize; }
      .bar { height: 4px; border-radius: 4px; background: var(--g-inset); margin-top: 10px; overflow: hidden; }
      .bar > span { display: block; height: 100%; border-radius: 4px; background: var(--g-amber); }
      .ctl { display: flex; gap: 8px; align-items: center; }
      .ico {
        width: 40px; height: 40px; border-radius: 12px; border: none; cursor: pointer;
        background: var(--g-inset); color: var(--g-text-hi);
        display: flex; align-items: center; justify-content: center;
        transition: filter 0.15s ease;
      }
      .ico:hover { filter: brightness(1.2); }
      .ico.play { width: 44px; height: 44px; background: var(--g-amber); }
      .missing { text-align: center; color: var(--g-red-text); font-size: 13px; padding: 8px; }
    `],e([mt({attribute:!1})],Ht.prototype,"hass",void 0),e([ft()],Ht.prototype,"_config",void 0),Ht=e([pt("glass-media-card")],Ht);let Wt=class extends dt{setConfig(t){this._config={title:"Overhead",max:4,...t}}getCardSize(){return 2}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:"sensor.flightradar24_current_in_area",title:"Overhead"}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}_route(t){const e=t.airport_origin_code_iata||t.airport_origin_city,i=t.airport_destination_code_iata||t.airport_destination_city;return e&&i?`${e} → ${i}`:e||i||""}render(){if(!this._config||!this.hass)return Y;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;if(!t)return yt("Select a Flightradar24 sensor","flight");const e=t.attributes.flights??[],i=e.length;return q`
      <div class="card" @click=${()=>xt(this,"hass-more-info",{entityId:this._config.entity})}>
        <div class="hdr">
          <div class="hdr-l">${_t("flight",20,"var(--g-amber)")}<span class="title">${this._config.title}</span></div>
          <span class="badge ${i?"amber":"green"}">${i?`${i} overhead`:"Clear skies"}</span>
        </div>

        ${0===i?q`<div class="empty">${_t("travel_explore",30,"var(--g-faint)")}<span>No aircraft in your area</span></div>`:e.slice(0,this._config.max).map(t=>{const e=t.callsign||t.flight_number||"Unknown",i=[null!=t.altitude?`${Math.round(Number(t.altitude)).toLocaleString()} ft`:null,null!=t.ground_speed?`${Math.round(Number(t.ground_speed))} kt`:null,t.aircraft_code||t.aircraft_model].filter(Boolean);return q`
                <div class="row">
                  <div class="plane" style=${null!=t.heading?`transform:rotate(${Number(t.heading)}deg)`:""}>
                    ${_t("flight",20,"var(--g-cyan)")}
                  </div>
                  <div class="info">
                    <div class="cs">${e}${this._route(t)?q`<span class="rt">${this._route(t)}</span>`:Y}</div>
                    ${i.length?q`<div class="det">${i.join(" · ")}</div>`:Y}
                  </div>
                  ${null!=t.distance?q`<span class="dist">${Number(t.distance).toFixed(1)} km</span>`:Y}
                </div>
              `})}
      </div>
    `}};Wt.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 8px; }
      .hdr { margin-bottom: 4px; }
      .empty { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 20px 0; color: var(--g-dim); font-size: 13px; }
      .row { display: flex; align-items: center; gap: 14px; padding: 10px 4px; border-bottom: 1px solid var(--g-hair); }
      .row:last-child { border-bottom: none; }
      .plane { flex: none; width: 32px; height: 32px; border-radius: 10px; background: var(--g-inset); display: flex; align-items: center; justify-content: center; }
      .info { flex: 1; min-width: 0; }
      .cs { font-size: 14px; font-weight: 700; display: flex; align-items: baseline; gap: 8px; }
      .rt { font-size: 12px; font-weight: 600; color: var(--g-dim); }
      .det { font-size: 11.5px; color: var(--g-dim); font-family: var(--g-mono); }
      .dist { font-family: var(--g-mono); font-size: 12px; color: var(--g-cyan); flex: none; }
      .missing { text-align: center; color: var(--g-red-text); font-size: 13px; padding: 8px; }
    `],e([mt({attribute:!1})],Wt.prototype,"hass",void 0),e([ft()],Wt.prototype,"_config",void 0),Wt=e([pt("glass-flight-card")],Wt);const It={cyan:"var(--g-cyan)",amber:"var(--g-amber)",green:"var(--g-green)",purple:"var(--g-purple)",red:"var(--g-red-text)"},Rt=["door","window","opening","garage_door"];let Bt=class extends dt{setConfig(t){this._config={icon:"local_laundry_service",icon_color:"cyan",...t}}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{name:"Washer",icon:"local_laundry_service",status:"",remaining:"",total:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");if(!e||!this.hass||!this._config)return!0;return[this._config.status,this._config.remaining,this._config.total,this._config.toggle,...this._config.stats??[]].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}_val(t){return t?this.hass?.states[t]?.state:void 0}_statusLook(t){if(!t)return null;const e=this.hass.states[t];if(!e)return null;const i=e.attributes.device_class,s=e.state.toLowerCase(),a=e.state.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase());return i&&Rt.includes(i)?"on"===s?{color:"var(--g-amber)",label:"Open"}:{color:"var(--g-green)",label:"Closed"}:"connectivity"===i?"on"===s?{color:"var(--g-green)",label:"Online"}:{color:"var(--g-dim)",label:"Offline"}:/(run|active|washing|drying|cleaning|start)/.test(s)||"on"===s?{color:"var(--g-cyan)",label:a}:/(pause|delay|hold)/.test(s)?{color:"var(--g-amber)",label:a}:/(complete|finish|clean|done|ready)/.test(s)?{color:"var(--g-green)",label:a}:/(error|fault|alarm)/.test(s)?{color:"var(--g-red-text)",label:a}:{color:"var(--g-dim)",label:a}}_ring(){const t=this._val(this._config.remaining);if(!t||"unknown"===t||"unavailable"===t)return null;const e=Date.parse(t);if(Number.isNaN(e))return null;const i=Math.max(0,(e-Date.now())/6e4),s=Number(this._val(this._config.total)),a=`${Math.floor(i/60)}:${String(Math.round(i%60)).padStart(2,"0")}`;return{pct:s&&!Number.isNaN(s)?Math.max(0,Math.min(1,1-i/s)):.5,label:a}}_statLabel(t){const e=this.hass.states[t];let i=e?.attributes.friendly_name??t;const s=this._config.name;return s&&i.toLowerCase().startsWith(s.toLowerCase()+" ")&&(i=i.slice(s.length+1)),i}_statValue(t){const e=this.hass.states[t];if(!e)return"—";const i=e.attributes.unit_of_measurement,s=e.state.replace(/_/g," ");return i?`${s} ${i}`:s}_toggle(t){t.stopPropagation();const e=this._config.toggle;this.hass.callService("homeassistant","toggle",{entity_id:e})}render(){if(!this._config||!this.hass)return Y;const t=this._config,e=It[t.icon_color??"cyan"]??"var(--g-cyan)",i=t.name??"Appliance",s=this._statusLook(t.status),a=this._ring(),r=(t.stats??[]).filter(t=>this.hass.states[t]),n=!!t.toggle&&"on"===this.hass.states[t.toggle]?.state;return q`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:color-mix(in srgb, ${e} 14%, transparent)">${_t(t.icon,26,e)}</div>
          <div class="who">
            <div class="title">${i}</div>
            ${t.subtitle?q`<div class="sub">${t.subtitle}</div>`:Y}
          </div>
          ${s?q`<span class="pill" style="color:${s.color}"><span class="dot" style="background:${s.color}"></span>${s.label}</span>`:Y}
        </div>

        ${a?q`
              <div class="active">
                <div class="ring" style="background:conic-gradient(${e} 0 ${(100*a.pct).toFixed(0)}%, rgba(255,255,255,0.07) 0 100%)">
                  <div class="ring-in">
                    <div class="t-num rem">${a.label}</div>
                    <div class="rem-cap">remaining</div>
                  </div>
                </div>
                <div class="stat-rows">
                  ${r.map(t=>q`<div class="srow"><div class="t-num sval">${this._statValue(t)}</div><div class="scap">${this._statLabel(t)}</div></div>`)}
                </div>
              </div>
            `:r.length?q`<div class="stat-grid">
                ${r.map(t=>q`<div class="stile"><div class="t-num sval">${this._statValue(t)}</div><div class="scap">${this._statLabel(t)}</div></div>`)}
              </div>`:Y}

        ${t.toggle?q`<button class="power ${n?"on":""}" @click=${this._toggle}>
              ${_t("power_settings_new",18)}${n?"On":"Off"}
            </button>`:Y}
      </div>
    `}};Bt.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 20px; }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; background: var(--g-inset); }
      .pill .dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }

      .active { display: flex; align-items: center; gap: 22px; }
      .ring { width: 132px; height: 132px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex: none; }
      .ring-in { width: 106px; height: 106px; border-radius: 50%; background: var(--g-panel); display: flex; flex-direction: column; align-items: center; justify-content: center; }
      .rem { font-size: 26px; }
      .rem-cap { font-size: 11px; color: var(--g-dim); margin-top: 2px; }
      .stat-rows { flex: 1; display: flex; flex-direction: column; gap: 14px; }
      .srow .sval { font-size: 19px; }
      .scap { font-size: 11px; color: var(--g-dim); margin-top: 3px; }

      .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
      .stile { background: var(--g-inset); border-radius: var(--g-r-ctl); padding: 13px; }
      .stile .sval { font-size: 16px; text-transform: capitalize; }

      .power {
        display: flex; align-items: center; justify-content: center; gap: 7px;
        padding: 12px; border-radius: 13px; border: none; cursor: pointer;
        font-size: 13.5px; font-weight: 700; font-family: var(--g-font);
        background: rgba(255, 255, 255, 0.06); color: var(--g-text);
      }
      .power.on { background: var(--g-amber); color: var(--g-amber-ink); }
    `],e([mt({attribute:!1})],Bt.prototype,"hass",void 0),e([ft()],Bt.prototype,"_config",void 0),Bt=e([pt("glass-appliance-card")],Bt);let Dt=class extends dt{constructor(){super(...arguments),this._toggles=[]}setConfig(t){this._toggles=(t.toggles??[]).map(t=>"string"==typeof t?{entity:t}:t),this._config={name:"Refrigerator",subtitle:"Kitchen",...t}}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{name:"Refrigerator",subtitle:"Kitchen",door:"",fridge_temp:"",freezer_temp:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");if(!e||!this.hass||!this._config)return!0;const i=[this._config.door,this._config.wifi,this._config.fridge_temp,this._config.freezer_temp,...this._toggles.map(t=>t.entity)].filter(Boolean);return i.some(t=>e.states[t]!==this.hass.states[t])}_num(t){const e=t?this.hass.states[t]:void 0;if(!e)return null;const i=Number(e.state);return{value:Number.isNaN(i)?null:i,min:Number(e.attributes.min??-30),max:Number(e.attributes.max??30),step:Number(e.attributes.step??1)}}_step(t,e,i){i.stopPropagation();const s=this._num(t);if(!t||!s||null==s.value)return;const a=Math.min(s.max,Math.max(s.min,s.value+e*s.step));this.hass.callService("number","set_value",{entity_id:t,value:a})}_toggle(t,e){e.stopPropagation(),this.hass.callService("homeassistant","toggle",{entity_id:t})}_tempTile(t,e,i,s){const a=this._num(s);return q`
      <div class="tt">
        <div class="tt-h" style="color:${i}">${_t(e,18,i)}${t}</div>
        <div class="stepper">
          <button class="step" @click=${t=>this._step(s,-1,t)}>${_t("remove",20)}</button>
          <div class="temp"><span class="t-num tv">${a?.value??"—"}</span><span class="deg">°C</span></div>
          <button class="step" @click=${t=>this._step(s,1,t)}>${_t("add",20)}</button>
        </div>
        ${a?q`<div class="range">range ${a.min}…${a.max} °C</div>`:Y}
      </div>
    `}render(){if(!this._config||!this.hass)return Y;const t=this._config,e=!!t.door&&"on"===this.hass.states[t.door]?.state,i=t.wifi?"on"===this.hass.states[t.wifi]?.state:null;return q`
      <div class="card">
        <div class="head">
          <div class="ibox">${_t("kitchen",26,"var(--g-cyan)")}</div>
          <div class="who">
            <div class="title">${t.name}</div>
            <div class="sub">
              ${t.subtitle}${null!=i?q` · ${_t("wifi",14,i?"var(--g-green)":"var(--g-dim)")}${i?"Connected":"Offline"}`:Y}
            </div>
          </div>
          ${t.door?q`<button class="pill ${e?"open":"closed"}" @click=${()=>xt(this,"hass-more-info",{entityId:t.door})}>
                <span class="dot"></span>Door ${e?"Open":"Closed"}
              </button>`:Y}
        </div>

        <div class="grid">
          ${this._tempTile("Fridge","ac_unit","var(--g-cyan)",t.fridge_temp)}
          ${this._tempTile("Freezer","severe_cold","var(--g-purple)",t.freezer_temp)}
        </div>

        ${this._toggles.length?q`<div class="rows">
              ${this._toggles.map(e=>{const i=this.hass.states[e.entity],s="on"===i?.state;let a=e.name??i?.attributes.friendly_name??e.entity;t.name&&a.toLowerCase().startsWith(t.name.toLowerCase()+" ")&&(a=a.slice(t.name.length+1));const r=e.icon??(/cool/i.test(a)?"mode_cool":"bolt");return q`
                  <div class="row">
                    ${_t(r,22,s?"var(--g-cyan)":"var(--g-dim)")}
                    <div class="row-t"><div class="rn">${a}</div></div>
                    <div class="toggle ${s?"on":""}" @click=${t=>this._toggle(e.entity,t)}><div class="knob"></div></div>
                  </div>
                `})}
            </div>`:Y}
      </div>
    `}};Dt.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 18px; }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; background: rgba(135, 221, 225, 0.14); display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; border: none; cursor: pointer; background: var(--g-inset); }
      .pill .dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; flex: none; }
      .pill.open { background: rgba(243, 208, 106, 0.16); color: var(--g-amber); }
      .pill.closed { background: rgba(185, 246, 166, 0.14); color: var(--g-green); }

      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .tt { background: var(--g-inset); border-radius: var(--g-r-sm); padding: 16px; display: flex; flex-direction: column; gap: 14px; }
      .tt-h { display: flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 700; }
      .stepper { display: flex; align-items: center; justify-content: space-between; }
      .step { width: 34px; height: 34px; border-radius: 10px; border: none; cursor: pointer; background: rgba(255, 255, 255, 0.06); color: var(--g-text-hi); display: flex; align-items: center; justify-content: center; }
      .step:hover { filter: brightness(1.3); }
      .temp { text-align: center; }
      .tv { font-size: 32px; }
      .deg { font-size: 15px; color: var(--g-dim); }
      .range { font-size: 10.5px; color: var(--g-faint); font-family: var(--g-mono); text-align: center; }

      .rows { display: flex; flex-direction: column; }
      .row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--g-hair); }
      .row:last-child { border-bottom: none; }
      .row-t { flex: 1; min-width: 0; }
      .rn { font-size: 14px; font-weight: 700; }
    `],e([mt({attribute:!1})],Dt.prototype,"hass",void 0),e([ft()],Dt.prototype,"_config",void 0),Dt=e([pt("glass-fridge-card")],Dt);const Gt={green:"var(--g-green)",amber:"var(--g-amber)",cyan:"var(--g-cyan)",purple:"var(--g-purple)",red:"var(--g-red-text)"};let qt=class extends dt{setConfig(t){this._config={name:"Pool Pump",subtitle:"Backyard",...t}}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{name:"Pool Pump",subtitle:"Backyard",switch:"",energy:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||[this._config.switch,this._config.energy].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}_toggle(t){t.stopPropagation(),this._config.switch&&this.hass.callService("homeassistant","toggle",{entity_id:this._config.switch})}render(){if(!this._config||!this.hass)return Y;const t=this._config,e=t.switch?this.hass.states[t.switch]:void 0,i=!e||"unavailable"===e.state,s="on"===e?.state,a=Gt[t.color??"green"]??"var(--g-green)",r=i?"var(--g-dim)":s?a:"var(--g-amber)",n=i?"Unavailable":s?"Running":"Idle",o=t.energy?this.hass.states[t.energy]:void 0,l=o&&!Number.isNaN(Number(o.state))?Number(o.state).toFixed(1):"—",c=o?.attributes.unit_of_measurement??"kWh",d=s?"animation:g-spin 1.1s linear infinite;transform-origin:48px 48px;":"",g=s?"animation:g-spin 6s linear infinite;transform-origin:48px 48px;":"";return q`
      <div class="card" style="border-color:${s?`color-mix(in srgb, ${a} 30%, transparent)`:"var(--g-hair)"}">
        <div class="head">
          <div class="ibox" style="background:color-mix(in srgb, ${r} 14%, transparent)">${_t("pool",26,r)}</div>
          <div class="who">
            <div class="title">${t.name}${s?q` <span class="live">LIVE</span>`:Y}</div>
            <div class="sub">${t.subtitle}</div>
          </div>
          <span class="pill" style="color:${r}"><span class="dot" style="background:${r}"></span>${n}</span>
        </div>

        <div class="body">
          <div class="impeller">
            <svg viewBox="0 0 96 96" width="96" height="96">
              ${F`
                <circle cx="48" cy="48" r="43" fill="var(--g-panel)" stroke="${s?`color-mix(in srgb, ${r} 45%, transparent)`:"rgba(255,255,255,0.1)"}" stroke-width="2"></circle>
                <g fill="none" stroke="${r}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 10" style="${g}">
                  <path d="M48 8 A 40 40 0 0 1 88 48"></path>
                  <path d="M48 88 A 40 40 0 0 1 8 48"></path>
                </g>
                <g fill="none" stroke="${r}" stroke-width="4.5" stroke-linecap="round" style="${d}">
                  <path d="M48 30 A 20 20 0 0 1 66 41"></path>
                  <path d="M48 30 A 20 20 0 0 1 66 41" transform="rotate(60 48 48)"></path>
                  <path d="M48 30 A 20 20 0 0 1 66 41" transform="rotate(120 48 48)"></path>
                  <path d="M48 30 A 20 20 0 0 1 66 41" transform="rotate(180 48 48)"></path>
                  <path d="M48 30 A 20 20 0 0 1 66 41" transform="rotate(240 48 48)"></path>
                  <path d="M48 30 A 20 20 0 0 1 66 41" transform="rotate(300 48 48)"></path>
                </g>
                <circle cx="48" cy="48" r="8" fill="${r}"></circle>
                <circle cx="48" cy="48" r="3" fill="var(--g-panel)"></circle>
              `}
            </svg>
          </div>

          <div class="right">
            <div class="sw">
              <div>
                <div class="sw-n">${e?.attributes.friendly_name??"Switch"}</div>
                <div class="sw-s">${t.subtitle}</div>
              </div>
              <div class="toggle ${s?"on":""}" @click=${this._toggle}><div class="knob"></div></div>
            </div>
            <div class="hair"></div>
            <div class="energy" @click=${()=>t.energy&&xt(this,"hass-more-info",{entityId:t.energy})}>
              ${_t("bolt",22,"var(--g-amber)")}
              <div>
                <div class="t-num ev">${l} <span class="eu">${c}</span></div>
                <div class="ec">Total energy used</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}};qt.styles=[$t,o`
      @keyframes g-spin { to { transform: rotate(360deg); } }
      .card { display: flex; flex-direction: column; gap: 20px; border: 1px solid var(--g-hair); }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .title { display: flex; align-items: center; gap: 8px; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; background: var(--g-inset); }
      .pill .dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }

      .body { display: flex; align-items: center; gap: 22px; }
      .impeller { width: 96px; height: 96px; flex: none; }
      .right { flex: 1; display: flex; flex-direction: column; gap: 14px; }
      .sw { display: flex; align-items: center; justify-content: space-between; }
      .sw-n { font-size: 14px; font-weight: 700; }
      .sw-s { font-size: 11.5px; color: var(--g-dim); }
      .hair { height: 1px; background: var(--g-hair); }
      .energy { display: flex; align-items: center; gap: 11px; cursor: pointer; }
      .ev { font-size: 22px; }
      .eu { font-size: 13px; color: var(--g-dim); }
      .ec { font-size: 11px; color: var(--g-dim); margin-top: 2px; }
    `],e([mt({attribute:!1})],qt.prototype,"hass",void 0),e([ft()],qt.prototype,"_config",void 0),qt=e([pt("glass-pool-card")],qt);const Ft={door:"door_front",window:"window",connectivity:"wifi",running:"check_circle"};let Vt=class extends dt{setConfig(t){this._config={name:"Dishwasher",subtitle:"Kitchen",level_max:4,...t}}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{name:"Dishwasher",subtitle:"Kitchen",status:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");if(!e||!this.hass||!this._config)return!0;const i=this._config;return[i.status,i.alert,...i.tiles??[],...i.levels??[]].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}_label(t){let e=this.hass.states[t]?.attributes.friendly_name??t;const i=this._config.name;return i&&e.toLowerCase().startsWith(i.toLowerCase()+" ")&&(e=e.slice(i.length+1)),e}_pretty(t){return t.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}_statusLook(t){const e=t.toLowerCase(),i=this._pretty(t);return/(run|washing|active|start)/.test(e)?{color:"var(--g-cyan)",label:i}:/(complete|finish|clean|done)/.test(e)?{color:"var(--g-green)",label:i}:/(pause|delay)/.test(e)?{color:"var(--g-amber)",label:i}:/(off|idle|power_off|standby)/.test(e)?{color:"var(--g-dim)",label:"Power off"}:{color:"var(--g-dim)",label:i}}_tile(t){const e=this.hass.states[t];if(!e)return Y;const i=e.attributes.device_class,s=t.split(".")[0];let a,r=!1;"binary_sensor"===s||"switch"===s?(r="on"===e.state,a="door"===i||"window"===i||"opening"===i?r?"Open":"Closed":"connectivity"===i?r?"Online":"Offline":r?"On":"Off"):a=this._pretty(e.state);return q`<div class="tile" @click=${()=>xt(this,"hass-more-info",{entityId:t})}>
      ${_t(Ft[i??""]??"info",20,"door"===i&&!r||"connectivity"===i&&r?"var(--g-green)":"var(--g-dim)")}
      <div><div class="tv">${a}</div><div class="tl">${this._label(t)}</div></div>
    </div>`}_level(t){const e=this.hass.states[t];if(!e)return Y;const i=this._config.level_max??4,s=String(e.state).match(/(\d+(\.\d+)?)/),a=s?Number(s[1]):0,r=Math.max(0,Math.min(100,a/i*100));return q`<div class="lv">
      <div class="lv-h"><span>${this._label(t)}</span><span class="lv-n">${a} / ${i}</span></div>
      <div class="meter"><span style="width:${r}%"></span></div>
    </div>`}render(){if(!this._config||!this.hass)return Y;const t=this._config,e=t.status?this.hass.states[t.status]?.state:void 0,i=e?this._statusLook(e):null,s=!!t.alert&&"on"===this.hass.states[t.alert]?.state,a=(t.tiles??[]).filter(t=>this.hass.states[t]),r=(t.levels??[]).filter(t=>this.hass.states[t]);return q`
      <div class="card">
        <div class="head">
          <div class="ibox">${_t("dishwasher_gen",26,"var(--g-dim)")}</div>
          <div class="who"><div class="title">${t.name}</div><div class="sub">${t.subtitle}</div></div>
          ${i?q`<span class="pill" style="color:${i.color}"><span class="dot" style="background:${i.color}"></span>${i.label}</span>`:Y}
        </div>

        ${s?q`<div class="alert">${_t("opacity",22,"var(--g-amber)")}<div><div class="a-t">${t.alert_text??"Attention needed"}</div></div></div>`:Y}

        ${a.length?q`<div class="tiles">${a.slice(0,3).map(t=>this._tile(t))}</div>`:Y}
        ${r.length?q`<div class="levels">${r.map(t=>this._level(t))}</div>`:Y}
      </div>
    `}};Vt.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 16px; }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; background: var(--g-inset); display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; background: var(--g-inset); }
      .pill .dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }
      .alert { display: flex; align-items: center; gap: 11px; background: rgba(243, 208, 106, 0.1); border: 1px solid rgba(243, 208, 106, 0.3); border-radius: var(--g-r-ctl); padding: 12px 15px; }
      .a-t { font-size: 13.5px; font-weight: 700; color: var(--g-amber); }
      .tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
      .tile { background: var(--g-inset); border-radius: var(--g-r-sm); padding: 13px; display: flex; flex-direction: column; gap: 6px; cursor: pointer; }
      .tv { font-size: 14px; font-weight: 700; line-height: 1; }
      .tl { font-size: 10.5px; color: var(--g-dim); margin-top: 3px; }
      .levels { display: flex; flex-direction: column; gap: 14px; }
      .lv-h { display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 600; margin-bottom: 6px; }
      .lv-n { font-family: var(--g-mono); color: var(--g-dim); }
      .meter { height: 9px; border-radius: 9px; background: var(--g-inset); overflow: hidden; position: relative; }
      .meter > span { position: absolute; inset: 0 auto 0 0; border-radius: 9px; background: var(--g-amber); }
    `],e([mt({attribute:!1})],Vt.prototype,"hass",void 0),e([ft()],Vt.prototype,"_config",void 0),Vt=e([pt("glass-dishwasher-card")],Vt);const Yt={amber:"var(--g-amber)",green:"var(--g-green)",cyan:"var(--g-cyan)",purple:"var(--g-purple)",red:"var(--g-red-text)",dim:"var(--g-dim)"};let Kt=class extends dt{setConfig(t){this._config=t}getCardSize(){return 1}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}_value(){const t=this.hass.states[this._config.entity];if(!t)return"—";const e=this._config.entity.split(".")[0];if("binary_sensor"===e||"switch"===e||"input_boolean"===e||"light"===e)return"on"===t.state?"On":"Off";const i=t.attributes.unit_of_measurement,s=Number(t.state),a=Number.isNaN(s)?t.state.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase()):Math.abs(s)>=100?Math.round(s):s;return i?`${a}${i.startsWith("°")?"":" "}${i}`:String(a)}render(){if(!this._config||!this.hass)return Y;if(!this._config.entity)return yt("Select an entity","insights");const t=this.hass.states[this._config.entity],e=t&&("on"===t.state||"home"===t.state||"open"===t.state),i=Yt[this._config.color??(e?"green":"dim")]??"var(--g-dim)",s=this._config.name??t?.attributes.friendly_name??this._config.entity,a=this._config.icon??"insights";return q`
      <div class="card" @click=${()=>xt(this,"hass-more-info",{entityId:this._config.entity})}>
        ${_t(a,24,i)}
        <div class="txt">
          <div class="val">${this._value()}</div>
          <div class="lbl">${s}</div>
        </div>
      </div>
    `}};Kt.styles=[$t,o`
      .card { display: flex; align-items: center; gap: 12px; padding: 16px 18px; border-radius: var(--g-r-tile); background: var(--g-card); border: 1px solid var(--g-hair); cursor: pointer; }
      .card:hover { border-color: var(--g-border-hi); }
      .txt { min-width: 0; }
      .val { font-size: 16px; font-weight: 700; line-height: 1.1; }
      .lbl { font-size: 12px; color: var(--g-dim); margin-top: 1px; }
    `],e([mt({attribute:!1})],Kt.prototype,"hass",void 0),e([ft()],Kt.prototype,"_config",void 0),Kt=e([pt("glass-stat-card")],Kt);let Xt=class extends dt{constructor(){super(...arguments),this._groups=[]}setConfig(t){t.groups?.length?this._groups=t.groups:t.entities?.length?this._groups=[{entities:t.entities}]:this._groups=[],this._config={title:"Lights",...t}}getCardSize(){return 1+this._groups.reduce((t,e)=>t+Math.ceil(e.entities.length/3),0)}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{title:"Lights",entities:[]}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!e||!this.hass||this._all().some(t=>e.states[t]!==this.hass.states[t])}_all(){return this._groups.flatMap(t=>t.entities)}_isOn(t){return"on"===this.hass.states[t]?.state}_toggle(t,e){e.stopPropagation(),this.hass.callService("homeassistant","toggle",{entity_id:t})}_master(t,e){e.stopPropagation();const i=t.entities.some(t=>this._isOn(t));this.hass.callService("light",i?"turn_off":"turn_on",{entity_id:t.entities})}_name(t){return this.hass.states[t]?.attributes.friendly_name??t}render(){if(!this._config||!this.hass)return Y;if(!this._all().length)return yt("Add lights","lightbulb");const t=this._all().filter(t=>this._isOn(t)).length;return q`
      <div class="card">
        <div class="hdr">
          <div class="hdr-l">${_t("lightbulb",22,"var(--g-amber)")}<span class="title">${this._config.title}</span></div>
          <div class="meta"><span class="on-n">${t}</span> on</div>
        </div>
        ${this._groups.map(t=>{const e=t.entities.filter(t=>this._isOn(t)).length,i=e>0;return q`
            <div class="group">
              ${t.name?q`<div class="g-hdr">
                    ${_t(t.icon??"home",18,"var(--g-dim)")}
                    <span class="g-name">${t.name}</span>
                    <span class="g-sum">${e}/${t.entities.length}</span>
                    <div class="grow"></div>
                    <div class="toggle ${i?"on":""}" @click=${e=>this._master(t,e)}><div class="knob"></div></div>
                  </div>`:Y}
              <div class="tiles">
                ${t.entities.map(t=>{const e=this._isOn(t),i=this.hass.states[t],s=e&&null!=i?.attributes.brightness?`${Math.round(Number(i.attributes.brightness)/255*100)}%`:e?"On":"Off";return q`
                    <button class="lt ${e?"on":""}" @click=${e=>this._toggle(t,e)}>
                      <div class="lt-top">
                        ${_t("lightbulb",20,e?"var(--g-amber-ink)":"var(--g-dim)")}
                        <div class="mini ${e?"on":""}"><div class="mknob"></div></div>
                      </div>
                      <div class="lt-b"><div class="ln">${this._name(t)}</div><div class="ls">${s}</div></div>
                    </button>
                  `})}
              </div>
            </div>
          `})}
      </div>
    `}};Xt.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 16px; }
      .on-n { color: var(--g-amber); font-weight: 700; }
      .group { display: flex; flex-direction: column; gap: 10px; }
      .g-hdr { display: flex; align-items: center; gap: 10px; }
      .g-name { font-size: 14px; font-weight: 700; color: var(--g-text); }
      .g-sum { font-size: 12px; color: var(--g-faint); }
      .grow { flex: 1; }
      .tiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
      .lt {
        display: flex; flex-direction: column; justify-content: space-between; gap: 10px;
        min-height: 78px; min-width: 0; overflow: hidden; padding: 12px 13px; border-radius: 16px; cursor: pointer; text-align: left;
        background: var(--g-inset); color: var(--g-text-hi); border: 1px solid var(--g-hair);
        transition: background 0.18s ease, color 0.18s ease;
      }
      .ln { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .lt.on { background: var(--g-amber); color: var(--g-amber-ink); border-color: transparent; }
      .lt-top { display: flex; align-items: flex-start; justify-content: space-between; }
      .ln { font-size: 13.5px; font-weight: 700; line-height: 1.15; }
      .ls { font-size: 11.5px; margin-top: 2px; opacity: 0.75; }
      /* mini toggle inside a light tile */
      .mini { width: 34px; height: 20px; border-radius: 20px; background: rgba(255, 255, 255, 0.13); position: relative; flex: none; }
      .mini.on { background: rgba(0, 0, 0, 0.22); }
      .mknob { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: #c7ccd3; transition: transform 0.18s; }
      .mini.on .mknob { transform: translateX(14px); background: var(--g-amber-ink); }
    `],e([mt({attribute:!1})],Xt.prototype,"hass",void 0),e([ft()],Xt.prototype,"_config",void 0),Xt=e([pt("glass-lights-card")],Xt);const Qt={scene:"palette",script:"play_arrow",automation:"bolt"};let Zt=class extends dt{constructor(){super(...arguments),this._scenes=[]}setConfig(t){this._scenes=(t.scenes??[]).map(t=>"string"==typeof t?{entity:t}:t),this._config={columns:4,...t}}getCardSize(){return Math.ceil(this._scenes.length/(this._config?.columns??4))+1}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{scenes:[]}}shouldUpdate(){return!0}_activate(t){const e=t.split(".")[0],i="scene"===e?"scene.turn_on":"script"===e?"script.turn_on":"automation"===e?"automation.trigger":"homeassistant.turn_on",[s,a]=i.split(".");this.hass.callService(s,a,{entity_id:t})}render(){return this._config&&this.hass?this._scenes.length?q`
      <div class="card">
        ${this._config.title?q`<div class="hdr"><div class="hdr-l">${_t("auto_awesome",20,"var(--g-amber)")}<span class="title">${this._config.title}</span></div></div>`:Y}
        <div class="grid" style="grid-template-columns:repeat(${this._config.columns}, minmax(0, 1fr))">
          ${this._scenes.map(t=>{const e=this.hass.states[t.entity],i=t.name??e?.attributes.friendly_name??t.entity,s=t.icon??Qt[t.entity.split(".")[0]]??"palette";return q`<button class="scene" @click=${()=>this._activate(t.entity)}>${_t(s,24,"var(--g-text-hi)")}<span class="sn">${i}</span></button>`})}
        </div>
      </div>
    `:yt("Add scenes or scripts","auto_awesome"):Y}};Zt.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 14px; }
      .grid { display: grid; gap: 10px; }
      .scene {
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
        padding: 16px 10px; border-radius: 16px; cursor: pointer;
        background: var(--g-inset); border: 1px solid var(--g-hair); color: var(--g-text-hi);
        transition: background 0.15s ease, transform 0.15s ease;
      }
      .scene:hover { background: rgba(255, 255, 255, 0.07); transform: translateY(-1px); }
      .scene:active { background: var(--g-amber); color: var(--g-amber-ink); }
      .sn { font-size: 13px; font-weight: 700; }
    `],e([mt({attribute:!1})],Zt.prototype,"hass",void 0),e([ft()],Zt.prototype,"_config",void 0),Zt=e([pt("glass-scenes-card")],Zt);const Jt=[[255,92,92],[243,208,106],[185,246,166],[135,221,225],[130,170,255],[201,166,255],[255,150,200],[255,244,224]];let te=class extends dt{setConfig(t){this._config=t}getCardSize(){return 4}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}get _st(){return this.hass.states[this._config.entity]}_modes(){return this._st?.attributes.supported_color_modes??[]}_brightPct(){const t=this._st?.attributes.brightness;return null!=t?Math.round(Number(t)/255*100):0}_rgb(){const t=this._st?.attributes.rgb_color;return t&&3===t.length?[t[0],t[1],t[2]]:null}_clickPct(t){const e=t.currentTarget.getBoundingClientRect();return Math.max(0,Math.min(1,(t.clientX-e.left)/e.width))}_toggle(t){t.stopPropagation(),this.hass.callService("light","toggle",{entity_id:this._config.entity})}_setBright(t){const e=Math.max(1,Math.round(100*this._clickPct(t)));this.hass.callService("light","turn_on",{entity_id:this._config.entity,brightness_pct:e})}_setTemp(t){const e=Number(this._st.attributes.min_color_temp_kelvin??2e3),i=Number(this._st.attributes.max_color_temp_kelvin??6500),s=Math.round(e+this._clickPct(t)*(i-e));this.hass.callService("light","turn_on",{entity_id:this._config.entity,color_temp_kelvin:s})}_setRgb(t){this.hass.callService("light","turn_on",{entity_id:this._config.entity,rgb_color:t})}render(){if(!this._config||!this.hass)return Y;if(!this._st)return yt("Select a light","lightbulb");const t="on"===this._st.state,e=this._modes(),i=t&&e.some(t=>["brightness","color_temp","hs","rgb","rgbw","rgbww","xy","white"].includes(t)),s=t&&e.includes("color_temp"),a=t&&e.some(t=>["hs","rgb","rgbw","rgbww","xy"].includes(t)),r=this._rgb(),n=this._brightPct(),o=this._config.name??this._st.attributes.friendly_name??this._config.entity,l=t?r?`rgb(${r.join(",")})`:"var(--g-amber)":"var(--g-faint)",c=t?`radial-gradient(circle at 50% 45%, ${r?`rgba(${r.join(",")},0.35)`:"rgba(243,208,106,0.3)"} 0%, transparent 70%)`:"transparent";return q`
      <div class="card">
        <div class="head">
          <div class="who"><div class="title">${o}</div><div class="sub">${this._config.subtitle??(t?`${n}%`:"Off")}</div></div>
          <div class="toggle ${t?"on":""}" @click=${this._toggle}><div class="knob"></div></div>
        </div>

        <div class="glow-wrap">
          <div class="glow" style="background:${c}"></div>
          <span class="ms bulb" style="font-size:64px;color:${l};opacity:${t?Math.max(.4,n/100):.4}">${a?"wb_incandescent":"lightbulb"}</span>
          <div class="state">${t?`${n}%`:"Off"}</div>
        </div>

        ${i?q`<div class="ctl">
              <div class="ctl-h"><span>${_t("brightness_6",16,"var(--g-dim)")}Brightness</span><span class="mono">${n}%</span></div>
              <div class="slider" @click=${this._setBright}><div class="fill bright" style="width:${n}%"></div></div>
            </div>`:Y}

        ${s?q`<div class="ctl">
              <div class="ctl-h"><span>${_t("thermostat",16,"var(--g-dim)")}Color temp</span></div>
              <div class="slider temp" @click=${this._setTemp}></div>
            </div>`:Y}

        ${a?q`<div class="swatches">
              ${Jt.map(t=>q`<button class="sw" style="background:rgb(${t.join(",")})" @click=${()=>this._setRgb(t)}></button>`)}
            </div>`:Y}
      </div>
    `}};te.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 18px; }
      .head { display: flex; align-items: center; gap: 12px; }
      .who { flex: 1; min-width: 0; }
      .title { font-size: 16px; font-weight: 700; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .glow-wrap { height: 150px; border-radius: 18px; background: var(--g-panel); position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
      .glow { position: absolute; inset: 0; transition: background 0.25s; }
      .bulb { z-index: 1; transition: all 0.25s; }
      .state { position: absolute; bottom: 12px; left: 0; right: 0; text-align: center; font-family: var(--g-display); font-size: 14px; font-weight: 700; z-index: 1; }
      .ctl-h { display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--g-dim); margin-bottom: 8px; }
      .ctl-h span { display: flex; align-items: center; gap: 6px; }
      .mono { font-family: var(--g-mono); }
      .slider { height: 40px; border-radius: 13px; background: var(--g-inset); position: relative; overflow: hidden; cursor: pointer; }
      .fill { position: absolute; top: 0; left: 0; bottom: 0; }
      .fill.bright { background: linear-gradient(90deg, var(--g-amber-deep), var(--g-amber)); }
      .slider.temp { background: linear-gradient(90deg, #f3d06a, #fff5e0, #bfe3ff); }
      .swatches { display: flex; justify-content: space-between; gap: 8px; }
      .sw { width: 34px; height: 34px; border-radius: 10px; border: 2px solid rgba(255, 255, 255, 0.1); cursor: pointer; padding: 0; }
      .sw:hover { border-color: #fff; }
      .missing { text-align: center; color: var(--g-red-text); font-size: 13px; padding: 8px; }
    `],e([mt({attribute:!1})],te.prototype,"hass",void 0),e([ft()],te.prototype,"_config",void 0),te=e([pt("glass-light-card")],te);const ee={off:{icon:"power_settings_new",color:"var(--g-dim)"},cool:{icon:"ac_unit",color:"var(--g-cyan)"},heat:{icon:"local_fire_department",color:"var(--g-amber)"},dry:{icon:"water_drop",color:"var(--g-purple)"},fan_only:{icon:"mode_fan",color:"var(--g-cyan)"},auto:{icon:"autorenew",color:"var(--g-green)"},heat_cool:{icon:"device_thermostat",color:"var(--g-green)"}};let ie=class extends dt{setConfig(t){this._config=t}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}get _st(){return this.hass.states[this._config.entity]}_setTemp(t,e){e.stopPropagation();const i=this._st.attributes,s=Number(i.target_temp_step??.5),a=Number(i.temperature);if(Number.isNaN(a))return;const r=Number(i.min_temp??7),n=Number(i.max_temp??35),o=Math.min(n,Math.max(r,a+t*s));this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:o})}_setMode(t){this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}_setFan(t){this.hass.callService("climate","set_fan_mode",{entity_id:this._config.entity,fan_mode:t})}_toggle(t){t.stopPropagation();if("off"!==this._st.state)this._setMode("off");else{const t=this._st.attributes.hvac_modes??[];this._setMode(t.find(t=>"off"!==t)??"cool")}}render(){if(!this._config||!this.hass)return Y;if(!this._st)return yt("Select a climate entity","mode_fan");const t=this._st.attributes,e=this._st.state,i="off"!==e,s=ee[e]??ee.off,a=this._config.name??t.friendly_name??"Aircon",r=t.current_temperature,n=null!=t.temperature?Number(t.temperature):null,o=t.hvac_action??e,l=(t.hvac_modes??[]).filter(t=>"off"!==t),c=t.fan_modes??[];return q`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:color-mix(in srgb, ${s.color} 14%, transparent)">${_t(s.icon,26,s.color)}</div>
          <div class="who"><div class="title">${a}</div><div class="sub">${this._config.subtitle??"Climate"}${null!=r?` · ${r}° now`:""}</div></div>
          <div class="toggle ${i?"on":""}" @click=${this._toggle}><div class="knob"></div></div>
        </div>

        <div class="body">
          <div class="airflow">
            <svg viewBox="0 0 96 96" width="96" height="96">
              <rect x="16" y="20" width="64" height="18" rx="6" fill="var(--g-inset)" stroke="#2a2e36" stroke-width="1.5"></rect>
              <g fill="none" stroke="${s.color}" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 9" style=${i?"animation:g-air 1.1s linear infinite":"opacity:0.25"}>
                <path d="M28 44 Q 24 62 30 80"></path>
                <path d="M48 44 L 48 82"></path>
                <path d="M68 44 Q 72 62 66 80"></path>
              </g>
            </svg>
          </div>
          <div class="right">
            <span class="pill" style="color:${s.color}"><span class="dot" style="background:${s.color}"></span>${o.replace(/_/g," ")}</span>
            <div class="stepper">
              <button class="step" @click=${t=>this._setTemp(-1,t)}>${_t("remove",20)}</button>
              <div class="tgt"><span class="t-num tv">${n??"—"}</span><span class="deg">°C</span><div class="tcap">Set point</div></div>
              <button class="step" @click=${t=>this._setTemp(1,t)}>${_t("add",20)}</button>
            </div>
          </div>
        </div>

        ${l.length?q`<div class="seg">
              ${l.map(t=>q`<button class="sg ${e===t?"on":""}" title=${t} @click=${()=>this._setMode(t)}>${_t((ee[t]??{icon:"circle"}).icon,19)}</button>`)}
            </div>`:Y}

        ${c.length?q`<div class="fan-row">
              ${_t("air",18,"var(--g-dim)")}
              <div class="seg fan">
                ${c.map(e=>q`<button class="sg txt ${t.fan_mode===e?"on":""}" @click=${()=>this._setFan(e)}>${e}</button>`)}
              </div>
            </div>`:Y}
      </div>
    `}};ie.styles=[$t,o`
      @keyframes g-air { to { stroke-dashoffset: -26; } }
      .card { display: flex; flex-direction: column; gap: 16px; }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .body { display: flex; align-items: center; gap: 18px; }
      .airflow { width: 96px; height: 96px; border-radius: 18px; background: var(--g-panel); flex: none; display: flex; align-items: center; justify-content: center; }
      .right { flex: 1; display: flex; flex-direction: column; gap: 12px; }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; background: var(--g-inset); text-transform: capitalize; align-self: flex-start; }
      .pill .dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }
      .stepper { display: flex; align-items: center; gap: 14px; }
      .step { width: 40px; height: 40px; border-radius: 12px; border: none; cursor: pointer; background: var(--g-inset); color: var(--g-text-hi); display: flex; align-items: center; justify-content: center; }
      .step:hover { filter: brightness(1.3); }
      .tgt { text-align: center; flex: 1; }
      .tv { font-size: 34px; }
      .deg { font-size: 15px; color: var(--g-dim); }
      .tcap { font-size: 10.5px; color: var(--g-dim); margin-top: 2px; }
      .seg { display: flex; gap: 6px; background: var(--g-inset); padding: 5px; border-radius: 14px; }
      .sg { flex: 1; display: flex; align-items: center; justify-content: center; padding: 9px; border: none; border-radius: 10px; background: transparent; color: var(--g-text); cursor: pointer; }
      .sg.txt { font-family: var(--g-font); font-size: 12px; font-weight: 700; text-transform: capitalize; }
      .sg.on { background: var(--g-amber); color: var(--g-amber-ink); }
      .fan-row { display: flex; align-items: center; gap: 10px; }
      .fan { flex: 1; padding: 4px; border-radius: 11px; }
      .missing { text-align: center; color: var(--g-red-text); font-size: 13px; padding: 8px; }
    `],e([mt({attribute:!1})],ie.prototype,"hass",void 0),e([ft()],ie.prototype,"_config",void 0),ie=e([pt("glass-aircon-card")],ie);let se=class extends dt{constructor(){super(...arguments),this._modes=[],this._optimisticOn=null,this._optimisticTimer=null}setConfig(t){this._modes=(t.modes??[]).map(t=>"string"==typeof t?{entity:t}:t),this._config={name:"Geyser",subtitle:"Water heater",min_temp:20,max_temp:70,...t}}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{name:"Geyser",subtitle:"Bathroom",power:"",current:"",target:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");if(!e||!this.hass||!this._config)return!0;const i=this._config,s=[i.power,i.current,i.target,i.solar,i.power_sensor,i.solar_mode,...this._modes.map(t=>t.entity)].filter(Boolean);return s.some(t=>e.states[t]!==this.hass.states[t])}updated(t){if(t.has("hass")&&null!==this._optimisticOn&&this._config?.power){const e=this._config.power,i=t.get("hass")?.states[e],s=this.hass?.states[e];i!==s&&(null!==this._optimisticTimer&&(clearTimeout(this._optimisticTimer),this._optimisticTimer=null),this._optimisticOn=null)}}_num(t){const e=t?Number(this.hass.states[t]?.state):NaN;return Number.isNaN(e)?null:e}_isOn(t){if(!t)return!1;const e=this.hass.states[t];return!!e&&("on"===e.state||t.startsWith("water_heater.")&&"off"!==e.state)}_toggle(t,e){if(e.stopPropagation(),!t)return;const i=this._isOn(t);t===this._config?.power&&(this._optimisticOn=!i,null!==this._optimisticTimer&&clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticOn=null,this._optimisticTimer=null},5e3)),t.startsWith("water_heater.")?this.hass.callService("water_heater",i?"turn_off":"turn_on",{entity_id:t}):this.hass.callService("homeassistant","toggle",{entity_id:t})}_step(t,e){e.stopPropagation();const i=this._config.target;if(!i)return;const s=this.hass.states[i];if(!s)return;const a=i.split(".")[0];if("number"===a){const e=Number(s.state);if(Number.isNaN(e))return;const a=Number(s.attributes.min??this._config.min_temp??20),r=Number(s.attributes.max??this._config.max_temp??70),n=Number(s.attributes.step??1);this.hass.callService("number","set_value",{entity_id:i,value:Math.min(r,Math.max(a,e+t*n))})}else{const e=Number(s.attributes.temperature);if(Number.isNaN(e))return;const r=Number(s.attributes.target_temp_step??1);this.hass.callService(a,"set_temperature",{entity_id:i,temperature:e+t*r})}}_target(){const t=this._config.target;if(!t)return null;const e=this.hass.states[t];return e?t.startsWith("number.")?this._num(t):Number(e.attributes.temperature)||null:null}_fillColor(t){return`hsl(${Math.round(200-170*t)}, 72%, 52%)`}render(){if(!this._config||!this.hass)return Y;const t=this._config,e=null!==this._optimisticOn?this._optimisticOn:this._isOn(t.power),i=this._num(t.current),s=this._target(),a=t.min_temp??20,r=t.max_temp??70,n=null!=i?Math.max(.05,Math.min(1,(i-a)/(r-a))):.5,o=e&&null!=i&&null!=s?i<s-.5:e,l=e?o?"#ff8c42":"var(--g-green)":"var(--g-dim)",c=e?o?"Heating":"Ready":"Off",d=o?"#ff8c42":"rgba(255,140,66,0.2)",g=this._isOn(t.solar_mode);return q`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:rgba(255,140,66,0.14)">${_t("water_heater",26,l)}</div>
          <div class="who"><div class="title">${t.name}</div><div class="sub">${t.subtitle}</div></div>
          ${t.power?q`<div class="toggle ${e?"on":""}" @click=${e=>this._toggle(t.power,e)}><div class="knob"></div></div>`:Y}
        </div>

        <div class="body">
          <div class="tank">
            <div class="water" style="height:${100*n}%;background:linear-gradient(180deg, ${this._fillColor(n)}, ${this._fillColor(Math.min(1,n+.25))})">
              <div class="shimmer"></div>
            </div>
            <div class="element" style="background:${d};box-shadow:0 0 12px ${d}"></div>
            ${o?q`<span class="rise" style="left:24px"></span><span class="rise" style="left:44px;animation-delay:.5s"></span><span class="rise" style="left:62px;animation-delay:1s"></span>`:Y}
            <div class="cur">${null!=i?Math.round(i):"—"}°</div>
          </div>

          <div class="right">
            <span class="pill" style="color:${l}"><span class="dot" style="background:${l}"></span>${c}</span>
            <div class="stepper">
              <button class="step" @click=${t=>this._step(-1,t)}>${_t("remove",20)}</button>
              <div class="tgt"><span class="t-num tv">${s??"—"}<span class="deg">°C</span></span><div class="tcap">Target temp</div></div>
              <button class="step" @click=${t=>this._step(1,t)}>${_t("add",20)}</button>
            </div>
            ${t.solar||t.power_sensor?q`<div class="tiles">
                  ${t.solar?q`<div class="tile"><div class="th">${_t("wb_sunny",14,"var(--g-amber)")}Solar</div><div class="t-num tvv">${this._num(t.solar)??"—"}°</div></div>`:Y}
                  ${t.power_sensor?q`<div class="tile"><div class="th">${_t("bolt",14,"var(--g-purple)")}Power</div><div class="t-num tvv">${this._num(t.power_sensor)??"—"} <span class="u">kW</span></div></div>`:Y}
                </div>`:Y}
          </div>
        </div>

        ${t.solar_mode||this._modes.length?q`<div class="modes">
              ${t.solar_mode?q`<button class="mode ${g?"on":""}" @click=${e=>this._toggle(t.solar_mode,e)}>${_t("wb_sunny",18,g?"var(--g-amber-ink)":"var(--g-amber)")}Solar</button>`:Y}
              ${this._modes.map(t=>{const e=this._isOn(t.entity),i=t.name??this.hass.states[t.entity]?.attributes.friendly_name??t.entity;return q`<button class="mode ${e?"on":""}" @click=${e=>this._toggle(t.entity,e)}>${_t(t.icon??"bolt",18,e?"var(--g-amber-ink)":"var(--g-dim)")}${i}</button>`})}
            </div>`:Y}
      </div>
    `}};se.styles=[$t,o`
      @keyframes g-rise { 0% { transform: translateY(6px); opacity: 0; } 30% { opacity: 0.9; } 100% { transform: translateY(-22px); opacity: 0; } }
      @keyframes g-shim { 0%, 100% { transform: translateX(-3px); } 50% { transform: translateX(3px); } }
      .card { display: flex; flex-direction: column; gap: 18px; }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .body { display: flex; align-items: center; gap: 20px; }
      .tank { width: 88px; height: 132px; border-radius: 16px; background: var(--g-panel); border: 2px solid #2a2e36; position: relative; overflow: hidden; flex: none; }
      .water { position: absolute; left: 0; right: 0; bottom: 0; transition: height 0.4s, background 0.4s; }
      .shimmer { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent); animation: g-shim 3s ease-in-out infinite; }
      .element { position: absolute; left: 14px; right: 14px; bottom: 20px; height: 5px; border-radius: 5px; transition: all 0.3s; }
      .rise { position: absolute; bottom: 26px; width: 5px; height: 16px; border-radius: 5px; background: rgba(255, 180, 120, 0.7); animation: g-rise 1.6s ease-out infinite; }
      .cur { position: absolute; top: 8px; left: 0; right: 0; text-align: center; font-family: var(--g-display); font-size: 24px; font-weight: 600; color: #fff; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6); }
      .right { flex: 1; display: flex; flex-direction: column; gap: 12px; }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; background: var(--g-inset); align-self: flex-start; }
      .pill .dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }
      .stepper { display: flex; align-items: center; gap: 14px; }
      .step { width: 38px; height: 38px; border-radius: 11px; border: none; cursor: pointer; background: var(--g-inset); color: var(--g-text-hi); display: flex; align-items: center; justify-content: center; }
      .step:hover { filter: brightness(1.3); }
      .tgt { text-align: center; flex: 1; }
      .tv { font-size: 30px; font-weight: 600; }
      .deg { font-size: 15px; color: var(--g-dim); }
      .tcap { font-size: 10.5px; color: var(--g-dim); margin-top: 2px; }
      .tiles { display: flex; gap: 10px; }
      .tile { flex: 1; background: var(--g-inset); border-radius: 12px; padding: 10px 12px; }
      .th { display: flex; align-items: center; gap: 5px; color: var(--g-dim); font-size: 10.5px; }
      .tvv { font-size: 16px; margin-top: 2px; }
      .u { font-size: 10px; color: var(--g-dim); }
      .modes { display: flex; gap: 8px; }
      .mode { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px; border: none; border-radius: 12px; cursor: pointer; font-family: var(--g-font); font-size: 12.5px; font-weight: 700; background: var(--g-inset); color: var(--g-text); }
      .mode.on { background: var(--g-amber); color: var(--g-amber-ink); }
    `],e([mt({attribute:!1})],se.prototype,"hass",void 0),e([ft()],se.prototype,"_config",void 0),e([ft()],se.prototype,"_optimisticOn",void 0),se=e([pt("glass-geyser-card")],se);const ae={light:"lightbulb",switch:"toggle_on",fan:"mode_fan",input_boolean:"toggle_on",script:"play_arrow",automation:"bolt",scene:"palette"};let re=class extends dt{constructor(){super(...arguments),this._items=[]}setConfig(t){this._items=(t.entities??[]).map(t=>"string"==typeof t?{entity:t}:t),this._config={columns:4,...t}}getCardSize(){return Math.ceil(this._items.length/(this._config?.columns??4))+1}static getConfigElement(){return document.createElement("glass-toggle-grid-editor")}static getStubConfig(){return{entities:[]}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!e||!this.hass||this._items.some(t=>e.states[t.entity]!==this.hass.states[t.entity])}_toggle(t){this.hass.callService("homeassistant","toggle",{entity_id:t})}render(){return this._config&&this.hass?this._items.length?q`
      <div class="card">
        ${this._config.title?q`<div class="hdr"><div class="hdr-l">${_t("grid_view",20,"var(--g-amber)")}<span class="title">${this._config.title}</span></div></div>`:Y}
        <div class="grid" style="grid-template-columns:repeat(${this._config.columns}, minmax(0, 1fr))">
          ${this._items.map(t=>{const e=this.hass.states[t.entity],i=e&&("on"===e.state||"open"===e.state||"home"===e.state||"playing"===e.state),s=t.entity.split(".")[0],a=t.icon??ae[s]??"circle",r=t.name??e?.attributes.friendly_name??t.entity,n=e?i?"On":"off"===e.state?"Off":e.state:"n/a";return q`
              <button class="q ${i?"on":""}" @click=${()=>this._toggle(t.entity)} title=${r}>
                ${_t(a,22,i?"var(--g-amber-ink)":"var(--g-dim)")}
                <div class="qt"><div class="qn">${r}</div><div class="qs">${n}</div></div>
              </button>
            `})}
        </div>
      </div>
    `:yt("Add entities to toggle","grid_view"):Y}};re.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 14px; }
      .grid { display: grid; gap: 12px; }
      .q {
        aspect-ratio: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 8px;
        padding: 13px;
        border-radius: 16px;
        cursor: pointer;
        text-align: left;
        overflow: hidden;
        background: var(--g-inset);
        border: 1px solid var(--g-hair);
        color: var(--g-text-hi);
        transition: background 0.18s ease, color 0.18s ease;
      }
      .q.on { background: var(--g-amber); color: var(--g-amber-ink); border-color: transparent; }
      .q:hover { border-color: var(--g-border-hi); }
      .qt { min-width: 0; }
      .qn { font-size: 13px; font-weight: 700; line-height: 1.15; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .qs { font-size: 11.5px; margin-top: 2px; opacity: 0.75; text-transform: capitalize; }
    `],e([mt({attribute:!1})],re.prototype,"hass",void 0),e([ft()],re.prototype,"_config",void 0),re=e([pt("glass-toggle-grid-card")],re);const ne={heat:{icon:"local_fire_department",color:"var(--g-amber)",label:"Heat"},cool:{icon:"ac_unit",color:"var(--g-cyan)",label:"Cool"},auto:{icon:"autorenew",color:"var(--g-green)",label:"Auto"},heat_cool:{icon:"device_thermostat",color:"var(--g-green)",label:"Auto"},off:{icon:"power_settings_new",color:"var(--g-dim)",label:"Off"}};let oe=class extends dt{setConfig(t){this._config=t}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:"",name:"Heat Pump",subtitle:"Pool heater"}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}get _st(){return this._config.entity?this.hass.states[this._config.entity]:void 0}_step(t,e){e.stopPropagation();const i=this._st.attributes,s=Number(i.target_temp_step??.5),a=Number(i.temperature);if(Number.isNaN(a))return;const r=Number(i.min_temp??15),n=Number(i.max_temp??40);this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:Math.min(n,Math.max(r,a+t*s))})}_setMode(t){this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}_toggle(t){t.stopPropagation();if("off"!==this._st.state)this._setMode("off");else{const t=this._st.attributes.hvac_modes??[];this._setMode(t.find(t=>"off"!==t)??"heat")}}render(){if(!this._config||!this.hass)return Y;const t=this._st;if(!t)return yt("Select a heat-pump (climate) entity","heat_pump");const e=t.attributes,i=t.state,s="off"!==i,a=ne[i]??ne.off,r=this._config.name??e.friendly_name??"Heat Pump",n=null!=e.temperature?Number(e.temperature):null,o=Number(e.min_temp??15),l=Number(e.max_temp??40),c=null!=n?Math.max(0,Math.min(100,(n-o)/(l-o)*100)):0,d=(e.hvac_action??i).replace(/_/g," "),g=(e.hvac_modes??[]).filter(t=>["heat","cool","auto","heat_cool"].includes(t));return q`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:color-mix(in srgb, ${a.color} 14%, transparent)">${_t("heat_pump",26,a.color)}</div>
          <div class="who"><div class="title">${r}</div><div class="sub">${this._config.subtitle??"Heater"}</div></div>
          <div class="toggle ${s?"on":""}" @click=${this._toggle}><div class="knob"></div></div>
        </div>

        <div class="dial">
          <button class="step" @click=${t=>this._step(-1,t)}>${_t("remove",22)}</button>
          <div class="ring" style="background:conic-gradient(${a.color} 0 ${c}%, rgba(255,255,255,0.07) ${c}% 100%)">
            <div class="ring-in">
              <div class="t-num tv">${n??"—"}<span class="deg">°</span></div>
              <span class="pill" style="color:${a.color}"><span class="dot" style="background:${a.color}"></span>${d}</span>
            </div>
          </div>
          <button class="step" @click=${t=>this._step(1,t)}>${_t("add",22)}</button>
        </div>

        ${g.length?q`<div class="seg">
              ${g.map(t=>{const e=ne[t]??ne.off;return q`<button class="sg ${i===t?"on":""}" @click=${()=>this._setMode(t)}>${_t(e.icon,17)}${e.label}</button>`})}
            </div>`:Y}
      </div>
    `}};oe.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 18px; }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .dial { display: flex; align-items: center; justify-content: center; gap: 18px; }
      .step { width: 44px; height: 44px; border-radius: 13px; border: none; cursor: pointer; background: var(--g-inset); color: var(--g-text-hi); display: flex; align-items: center; justify-content: center; flex: none; }
      .step:hover { filter: brightness(1.3); }
      .ring { width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex: none; transition: background 0.3s; }
      .ring-in { width: 98px; height: 98px; border-radius: 50%; background: var(--g-card); display: flex; flex-direction: column; align-items: center; justify-content: center; }
      .tv { font-size: 34px; font-weight: 600; }
      .deg { font-size: 15px; color: var(--g-dim); }
      .pill { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 999px; background: var(--g-inset); margin-top: 5px; text-transform: capitalize; }
      .pill .dot { width: 6px; height: 6px; border-radius: 50%; flex: none; }
      .seg { display: flex; gap: 6px; background: var(--g-inset); padding: 5px; border-radius: 14px; }
      .sg { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 9px; border: none; border-radius: 10px; background: transparent; color: var(--g-text); cursor: pointer; font-family: var(--g-font); font-size: 12.5px; font-weight: 700; }
      .sg.on { background: var(--g-amber); color: var(--g-amber-ink); }
    `],e([mt({attribute:!1})],oe.prototype,"hass",void 0),e([ft()],oe.prototype,"_config",void 0),oe=e([pt("glass-heatpump-card")],oe);let le=class extends dt{constructor(){super(...arguments),this._metrics=[]}setConfig(t){this._metrics=(t.metrics??[]).map(t=>"string"==typeof t?{entity:t}:t),this._config={title:"Water Chemistry",...t}}getCardSize(){return this._metrics.length+1}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{title:"Water Chemistry",metrics:[]}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!e||!this.hass||this._metrics.some(t=>e.states[t.entity]!==this.hass.states[t.entity])}_row(t){const e=this.hass.states[t.entity];if(!e)return q`<div class="row"><div class="miss">${t.entity} not found</div></div>`;const i=Number(e.state),s=!Number.isNaN(i),a=t.unit??e.attributes.unit_of_measurement??"",r=t.label??e.attributes.friendly_name??t.entity,n=t.color??"var(--g-cyan)",o=t.min??0,l=t.max??(s?Math.max(2*i,1):100),c=s?Math.max(0,Math.min(100,(i-o)/(l-o)*100)):0;let d=null;null==t.ok_min&&null==t.ok_max||(d=s&&(null==t.ok_min||i>=t.ok_min)&&(null==t.ok_max||i<=t.ok_max)?{label:"OK",cls:"green"}:s&&null!=t.ok_min&&i<t.ok_min?{label:"Low",cls:"amber"}:{label:"High",cls:"red"});const g=null!=t.ok_min?Math.max(0,Math.min(100,(t.ok_min-o)/(l-o)*100)):0,p=null!=t.ok_max?Math.max(0,Math.min(100,(t.ok_max-o)/(l-o)*100)):100;return q`
      <div class="row" @click=${()=>xt(this,"hass-more-info",{entityId:t.entity})}>
        <div class="well" style="background:color-mix(in srgb, ${n} 14%, transparent)">${_t(t.icon??"science",22,n)}</div>
        <div class="body">
          <div class="top">
            <div class="lhs"><span class="lbl">${r}</span>${d?q`<span class="badge ${d.cls}">${d.label}</span>`:Y}</div>
            <div class="val"><span class="t-num">${s?i:e.state}</span> <span class="u">${a}</span></div>
          </div>
          <div class="bar">
            <div class="zone" style="left:${g}%;right:${100-p}%"></div>
            <div class="dot" style="left:${c}%;background:${n}"></div>
          </div>
        </div>
      </div>
    `}render(){return this._config&&this.hass?this._metrics.length?q`
      <div class="card">
        <div class="hdr"><div class="hdr-l">${_t("water_drop",22,"var(--g-cyan)")}<span class="title">${this._config.title}</span></div></div>
        <div class="metrics">${this._metrics.map(t=>this._row(t))}</div>
      </div>
    `:yt("Add water metrics (pH, chlorine, …)","science"):Y}};le.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 16px; }
      .metrics { display: flex; flex-direction: column; gap: 16px; }
      .row { display: flex; align-items: center; gap: 14px; cursor: pointer; }
      .well { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex: none; }
      .body { flex: 1; min-width: 0; }
      .top { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 7px; }
      .lhs { display: flex; align-items: center; gap: 8px; }
      .lbl { font-size: 13.5px; font-weight: 700; }
      .val .t-num { font-size: 18px; }
      .u { font-size: 11px; color: var(--g-dim); }
      .bar { height: 8px; border-radius: 8px; background: var(--g-inset); position: relative; }
      .zone { position: absolute; top: 0; bottom: 0; background: rgba(185, 246, 166, 0.25); border-radius: 8px; }
      .dot { position: absolute; top: 50%; width: 12px; height: 12px; border-radius: 50%; transform: translate(-50%, -50%); border: 2px solid var(--g-card); box-shadow: 0 0 6px rgba(0, 0, 0, 0.5); }
      .miss { color: var(--g-red-text); font-size: 12px; }
    `],e([mt({attribute:!1})],le.prototype,"hass",void 0),e([ft()],le.prototype,"_config",void 0),le=e([pt("glass-water-chemistry-card")],le);let ce=class extends dt{constructor(){super(...arguments),this._onLocation=()=>this.requestUpdate()}setConfig(t){this._config={variant:"dock",fixed:!0,max_width:900,items:[],...t}}getCardSize(){return 1}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{variant:"dock",fixed:!0,items:[{icon:"home",label:"Home",path:"/lovelace/0"},{icon:"lightbulb",label:"Lights",path:"/lovelace/lights"},{icon:"thermostat",label:"Climate",path:"/lovelace/climate"},{icon:"bolt",label:"Energy",path:"/lovelace/energy"},{icon:"security",label:"Security",path:"/lovelace/security"}]}}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this._onLocation),window.addEventListener("popstate",this._onLocation)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("location-changed",this._onLocation),window.removeEventListener("popstate",this._onLocation)}_navigate(t){t&&(history.pushState(null,"",t),window.dispatchEvent(new Event("location-changed")))}_active(t){const e=window.location.pathname;return!!t&&(e===t||e.startsWith(t+"/"))}render(){if(!this._config)return Y;const t=this._config,e="pill"===t.variant,i=t.fixed?"position:fixed;left:0;right:0;bottom:0;z-index:6;display:flex;justify-content:center;padding:12px 16px calc(12px + env(safe-area-inset-bottom));":"display:flex;justify-content:center;",s=t.items.map(t=>{const i=this._active(t.path);return q`
        <button class="item ${e?"pill":""} ${i?"active":""}" @click=${()=>this._navigate(t.path)} title=${t.label??""}>
          ${_t(t.icon,e?22:24,i?"var(--g-amber-ink)":"var(--g-dim)")}
          ${t.label?q`<span class="lbl">${t.label}</span>`:Y}
        </button>
      `});return q`
      <div class="wrap" style=${i}>
        <div class="bar ${e?"pill":"dock"}" style="max-width:${t.max_width}px">${s}</div>
      </div>
    `}};ce.styles=[$t,o`
      :host { display: block; }
      .bar { width: 100%; box-sizing: border-box; }
      .dock {
        background: var(--g-card);
        border: 1px solid var(--g-border);
        border-radius: 24px;
        padding: 10px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
      }
      .bar.pill {
        width: auto;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: rgba(20, 22, 26, 0.9);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid var(--g-border-hi);
        border-radius: 999px;
        padding: 8px;
        box-shadow: 0 18px 44px rgba(0, 0, 0, 0.5);
        margin: 0 auto;
      }
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px 14px;
        border: none;
        background: transparent;
        border-radius: 14px;
        cursor: pointer;
        color: var(--g-dim);
        font-family: var(--g-font);
        transition: background 0.15s ease, color 0.15s ease;
      }
      .item.pill { flex-direction: row; gap: 8px; padding: 10px 16px; border-radius: 999px; }
      .item:hover { color: var(--g-text-hi); }
      .item.active { background: var(--g-amber); color: var(--g-amber-ink); }
      .lbl { font-size: 12px; font-weight: 700; }
      .item.pill .lbl { font-size: 13px; }
    `],e([mt({attribute:!1})],ce.prototype,"hass",void 0),e([ft()],ce.prototype,"_config",void 0),ce=e([pt("glass-nav-card")],ce);let de=class extends dt{setConfig(t){this._config={variant:"full",...t}}getCardSize(){return"compact"===this._config?.variant?1:4}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:"",variant:"full"}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");if(!e||!this.hass||!this._config)return!0;return[this._stateId,this._config.trigger].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}get _stateId(){return this._config.state_entity||this._config.entity}get _st(){return this._stateId?this.hass.states[this._stateId]:void 0}get _hasControl(){const t=this._config;return!!(t.trigger||t.entity&&t.entity.startsWith("cover."))}_openPct(){const t=this._st,e=t.attributes.current_position;return null==e||Number.isNaN(Number(e))?"open"===t.state||"on"===t.state?100:"opening"===t.state?60:"closing"===t.state?40:0:Number(e)}_look(){const t=this._st.state;return"open"===t||"on"===t?{color:"var(--g-amber)",label:"Open",icon:"garage_home"}:"opening"===t||"closing"===t?{color:"var(--g-amber)",label:"opening"===t?"Opening…":"Closing…",icon:"garage_home",moving:!0}:{color:"var(--g-green)",label:"Closed",icon:"garage"}}_toggle(t){if(t.stopPropagation(),!this._hasControl)return;const e=this._config;if(e.trigger){const t=e.trigger.split(".")[0];"button"===t?this.hass.callService("button","press",{entity_id:e.trigger}):"script"===t?this.hass.callService("script","turn_on",{entity_id:e.trigger}):this.hass.callService("homeassistant","toggle",{entity_id:e.trigger})}else if(e.entity&&e.entity.startsWith("cover.")){const t=this._st.state,i="open"===t||"opening"===t?"close_cover":"open_cover";this.hass.callService("cover",i,{entity_id:e.entity})}}render(){if(!this._config||!this.hass)return Y;if(!this._st)return yt("Select a garage cover — or a state sensor + trigger","garage");const t=this._look(),e=this._openPct(),i=this._config.name??this._st.attributes.friendly_name??"Garage",s=this._hasControl;if("compact"===this._config.variant)return q`
        <button class="tile" @click=${this._toggle} title=${i} ?disabled=${!s}>
          <div class="top">
            <div class="mini">
              <div class="mini-door" style="transform:translateY(-${e}%)"></div>
            </div>
            <span class="dot" style="background:${t.color}"></span>
          </div>
          <div><div class="tn">${i}</div><div class="ts" style="color:${t.color}">${t.label}</div></div>
        </button>
      `;const a=e>5;return q`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:color-mix(in srgb, ${t.color} 14%, transparent)">${_t(t.icon,26,t.color)}</div>
          <div class="who"><div class="title">${i}</div><div class="sub">${this._config.subtitle??this._config.entity}</div></div>
          <span class="pill" style="color:${t.color}"><span class="dot" style="background:${t.color}"></span>${t.label}</span>
        </div>

        <div class="stage">
          <div class="interior"></div>
          <div class="car" style="opacity:${a?.9:0}">
            <svg viewBox="0 0 180 70" width="200" height="78">
              ${F`
                <path d="M8 56 L26 34 Q30 28 40 27 L116 27 Q128 27 138 36 L166 48 Q174 51 174 58 L174 60 Q174 64 168 64 L14 64 Q8 64 8 58 Z" fill="#2a2e36"></path>
                <path d="M40 30 L112 30 Q122 30 130 38 L142 48 L44 48 Z" fill="#3a4250"></path>
                <circle cx="48" cy="62" r="11" fill="#14161a" stroke="#3a4250" stroke-width="3"></circle>
                <circle cx="140" cy="62" r="11" fill="#14161a" stroke="#3a4250" stroke-width="3"></circle>
              `}
            </svg>
          </div>
          <div class="frame">
            <div class="opening"></div>
            <div class="door" style="transform:translateY(-${e}%)">
              <div class="handles"><span></span><span></span></div>
            </div>
          </div>
          <div class="floor"></div>
        </div>

        ${s?q`<button class="btn ${"var(--g-amber)"===t.color?"primary":"soft"}" @click=${this._toggle}>
              ${_t(t.moving?"autorenew":a?"arrow_downward":"arrow_upward",20)}${a?"Close":"Open"}
            </button>`:q`<div class="viewonly">${_t("visibility",18,"var(--g-dim)")}View only — add a trigger to control</div>`}
      </div>
    `}};de.styles=[$t,o`
      @keyframes g-spin { to { transform: rotate(360deg); } }
      .card { display: flex; flex-direction: column; gap: 18px; }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex: none; transition: background 0.3s; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; background: var(--g-inset); }
      .pill .dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }

      .stage { height: 240px; border-radius: 18px; background: linear-gradient(180deg, #0c0e11, #090a0c); position: relative; overflow: hidden; }
      .interior { position: absolute; inset: 0; background: radial-gradient(120% 80% at 50% 100%, #1a1d22 0%, #0c0e11 70%); }
      .car { position: absolute; left: 50%; bottom: 34px; transform: translateX(-50%); transition: opacity 0.5s; }
      .frame { position: absolute; inset: 14px; border-radius: 12px; overflow: hidden; }
      .opening { position: absolute; inset: 0; background: linear-gradient(180deg, #070809, #101318); }
      .door {
        position: absolute; inset: 0;
        background: repeating-linear-gradient(180deg, #3a4048 0 3px, #4a515b 3px 34px, #3a4048 34px 37px);
        border-bottom: 3px solid #2a2e36;
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.5);
        transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .handles { position: absolute; left: 0; right: 0; bottom: 52px; display: flex; justify-content: center; gap: 38px; }
      .handles span { width: 26px; height: 12px; border-radius: 4px; background: #20242b; }
      .floor { position: absolute; left: 14px; right: 14px; bottom: 14px; height: 4px; background: var(--g-amber); opacity: 0.5; }
      .btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 13px; border-radius: var(--g-r-ctl); border: none; cursor: pointer; font-family: var(--g-font); font-weight: 700; font-size: 14px; }
      .btn .ms { }
      .btn.primary .ms[style*='autorenew'] { animation: g-spin 1s linear infinite; }
      .viewonly { display: flex; align-items: center; justify-content: center; gap: 7px; padding: 11px; border-radius: var(--g-r-ctl); background: var(--g-inset); color: var(--g-dim); font-size: 12.5px; font-weight: 600; }
      .tile[disabled] { cursor: default; }

      /* compact */
      .tile { width: 100%; aspect-ratio: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 8px; padding: 13px; border-radius: 16px; cursor: pointer; text-align: left; background: var(--g-inset); border: 1px solid var(--g-hair); color: var(--g-text-hi); }
      .tile:hover { border-color: var(--g-border-hi); }
      .top { display: flex; align-items: flex-start; justify-content: space-between; }
      .mini { width: 40px; height: 36px; border-radius: 6px 6px 3px 3px; background: #0c0e11; position: relative; overflow: hidden; border: 1.5px solid #2a2e36; flex: none; }
      .mini-door { position: absolute; inset: 0; background: repeating-linear-gradient(180deg, #3a4048 0 2px, #4a515b 2px 9px); transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
      .tn { font-size: 13.5px; font-weight: 700; line-height: 1.1; }
      .ts { font-size: 11.5px; font-weight: 600; margin-top: 2px; }
      .dot { width: 9px; height: 9px; border-radius: 50%; flex: none; }
    `],e([mt({attribute:!1})],de.prototype,"hass",void 0),e([ft()],de.prototype,"_config",void 0),de=e([pt("glass-garage-card")],de);let ge=class extends dt{setConfig(t){this._config={variant:"hero",...t}}getCardSize(){return"compact"===this._config?.variant?1:4}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:"",name:"Front Lawn",subtitle:"Sprinkler zone",variant:"hero"}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}get _st(){return this._config.entity?this.hass.states[this._config.entity]:void 0}_on(){const t=this._st?.state;return"on"===t||"open"===t}_toggle(t){t.stopPropagation(),this.hass.callService("homeassistant","toggle",{entity_id:this._config.entity})}render(){if(!this._config||!this.hass)return Y;if(!this._st)return yt("Select a sprinkler switch/valve","sprinkler");const t=this._on(),e=t?"var(--g-cyan)":"var(--g-dim)",i=this._config.name??this._st.attributes.friendly_name??"Sprinkler";return"compact"===this._config.variant?q`
        <button class="tile ${t?"on":""}" @click=${this._toggle} title=${i}>
          <div class="top">${_t("sprinkler",30,e)}<span class="dot" style="background:${t?"var(--g-cyan)":"var(--g-dim)"}"></span></div>
          <div><div class="tn">${i}</div><div class="ts" style="color:${e}">${t?"Watering":"Idle"}</div></div>
        </button>
      `:q`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:rgba(135,221,225,0.14)">${_t("sprinkler",26,e)}</div>
          <div class="who"><div class="title">${i}</div><div class="sub">${this._config.subtitle??"Sprinkler zone"}</div></div>
          <span class="pill" style="color:${e}"><span class="pdot" style="background:${e}"></span>${t?"Watering":"Idle"}</span>
        </div>

        <div class="scene">
          <div class="spray" style="opacity:${t?1:0}">
            ${[8,24,42,58,74,90].map((t,e)=>q`<span class="drop" style="left:${t}%;top:${[34,18,8,8,18,34][e]}px;animation-delay:${[0,.2,.45,.3,.15,.5][e]}s"></span>`)}
          </div>
          <div class="arm" style=${t?"animation:g-arm 1.6s ease-in-out infinite":""}><div class="arm-bar" style="background:${t?"var(--g-cyan)":"#3a4048"}"></div></div>
          <div class="headpiece" style="background:${t?"var(--g-cyan)":"#3a4048"}"></div>
          <div class="grass"></div>
          <div class="blades">
            ${[16,22,14,20,17].map((e,i)=>q`<span style="height:${e}px;background:${i%2?"#256e3d":"#1f6b38"};${t?`animation:g-sway 1.4s ease-in-out infinite;animation-delay:${.15*i}s`:""}"></span>`)}
          </div>
        </div>

        <button class="toggle-row" @click=${this._toggle}>
          <div><div class="tr-t">Watering</div><div class="tr-s">Tap to toggle</div></div>
          <div class="toggle ${t?"on":""}"><div class="knob"></div></div>
        </button>
      </div>
    `}};ge.styles=[$t,o`
      @keyframes g-drop { 0% { transform: translateY(0); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateY(72px); opacity: 0; } }
      @keyframes g-arm { 0%, 100% { transform: rotate(-42deg); } 50% { transform: rotate(42deg); } }
      @keyframes g-sway { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
      .card { display: flex; flex-direction: column; gap: 18px; }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; background: var(--g-inset); }
      .pdot { width: 7px; height: 7px; border-radius: 50%; flex: none; }

      .scene { height: 180px; border-radius: 18px; background: linear-gradient(180deg, #0d1b22 0%, #0c1418 60%, #0a1a10 100%); position: relative; overflow: hidden; }
      .spray { position: absolute; left: 50%; bottom: 52px; transform: translateX(-50%); width: 140px; height: 110px; transition: opacity 0.3s; }
      .drop { position: absolute; width: 5px; height: 5px; border-radius: 50%; background: #9fe8ec; animation: g-drop 1.3s ease-in infinite; }
      .arm { position: absolute; left: 50%; bottom: 40px; transform: translateX(-50%); width: 6px; height: 56px; transform-origin: bottom center; }
      .arm-bar { width: 4px; height: 56px; margin: 0 auto; border-radius: 4px; transition: background 0.3s; }
      .headpiece { position: absolute; left: 50%; bottom: 30px; transform: translateX(-50%); width: 26px; height: 16px; border-radius: 5px 5px 3px 3px; transition: background 0.3s; }
      .grass { position: absolute; left: 0; right: 0; bottom: 0; height: 34px; background: linear-gradient(180deg, #123a1e, #0a2412); }
      .blades { position: absolute; left: 0; right: 0; bottom: 22px; display: flex; justify-content: space-around; align-items: flex-end; padding: 0 10px; }
      .blades span { width: 4px; border-radius: 3px; transform-origin: bottom center; }

      .toggle-row { display: flex; align-items: center; justify-content: space-between; background: none; border: none; cursor: pointer; padding: 0; color: inherit; text-align: left; }
      .tr-t { font-size: 14px; font-weight: 700; }
      .tr-s { font-size: 11.5px; color: var(--g-dim); }

      .tile { width: 100%; aspect-ratio: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 14px; border-radius: 20px; cursor: pointer; text-align: left; background: var(--g-inset); border: 1px solid var(--g-hair); color: var(--g-text-hi); }
      .tile.on { background: rgba(135, 221, 225, 0.12); border-color: rgba(135, 221, 225, 0.3); }
      .top { display: flex; align-items: flex-start; justify-content: space-between; }
      .dot { width: 9px; height: 9px; border-radius: 50%; }
      .tn { font-size: 13.5px; font-weight: 700; line-height: 1.1; }
      .ts { font-size: 11.5px; font-weight: 600; margin-top: 2px; }
    `],e([mt({attribute:!1})],ge.prototype,"hass",void 0),e([ft()],ge.prototype,"_config",void 0),ge=e([pt("glass-sprinkler-card")],ge);let pe=class extends dt{constructor(){super(...arguments),this._zones=[]}setConfig(t){this._zones=(t.zones??[]).map(t=>"string"==typeof t?{entity:t}:t),this._config={title:"Irrigation Zones",...t}}getCardSize(){return this._zones.length+1}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{title:"Irrigation Zones",zones:[]}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!e||!this.hass||this._zones.some(t=>e.states[t.entity]!==this.hass.states[t.entity])}_on(t){const e=this.hass.states[t]?.state;return"on"===e||"open"===e}_toggle(t){this.hass.callService("homeassistant","toggle",{entity_id:t})}render(){if(!this._config||!this.hass)return Y;if(!this._zones.length)return yt("Add irrigation zones (switches/valves)","water_drop");const t=this._zones.filter(t=>this._on(t.entity)).length;return q`
      <div class="card">
        <div class="hdr">
          <div class="hdr-l">${_t("water_drop",22,"var(--g-cyan)")}<span class="title">${this._config.title}</span></div>
          <span class="badge ${t?"cyan":""}">${t?`${t} on`:"All off"}</span>
        </div>
        <div class="zones">
          ${this._zones.map(t=>{const e=this.hass.states[t.entity];if(!e)return q`<div class="zone"><div class="miss">${t.entity} not found</div></div>`;const i=this._on(t.entity),s=t.name??e.attributes.friendly_name??t.entity,a=i?"var(--g-cyan)":"var(--g-dim)";return q`
              <button class="zone ${i?"on":""}" @click=${()=>this._toggle(t.entity)}>
                <div class="well">
                  ${i?q`<span class="ripple"></span>`:Y}
                  ${_t(t.icon??"sprinkler",22,a)}
                </div>
                <div class="txt"><div class="zn">${s}</div><div class="zs">${i?"Watering":"Idle"}</div></div>
                <div class="toggle ${i?"on":""}"><div class="knob"></div></div>
              </button>
            `})}
        </div>
      </div>
    `}};pe.styles=[$t,o`
      @keyframes g-ripple { 0% { transform: scale(0.7); opacity: 0.7; } 100% { transform: scale(2); opacity: 0; } }
      .card { display: flex; flex-direction: column; gap: 16px; }
      .badge.cyan { background: rgba(135, 221, 225, 0.14); color: var(--g-cyan); }
      .zones { display: flex; flex-direction: column; gap: 10px; }
      .zone {
        display: flex; align-items: center; gap: 14px; width: 100%; padding: 10px 12px;
        border-radius: 16px; cursor: pointer; text-align: left;
        background: var(--g-inset); border: 1px solid var(--g-hair); color: var(--g-text-hi);
        transition: background 0.15s ease;
      }
      .zone.on { background: rgba(135, 221, 225, 0.08); border-color: rgba(135, 221, 225, 0.28); }
      .well { width: 44px; height: 44px; border-radius: 12px; background: var(--g-card); display: flex; align-items: center; justify-content: center; flex: none; position: relative; }
      .ripple { position: absolute; inset: 0; border-radius: 12px; border: 2px solid var(--g-cyan); animation: g-ripple 1.6s ease-out infinite; }
      .txt { flex: 1; min-width: 0; }
      .zn { font-size: 14.5px; font-weight: 700; }
      .zs { font-size: 11.5px; color: var(--g-dim); }
      .miss { color: var(--g-red-text); font-size: 12px; }
    `],e([mt({attribute:!1})],pe.prototype,"hass",void 0),e([ft()],pe.prototype,"_config",void 0),pe=e([pt("glass-irrigation-card")],pe);const he=(t,e=!1)=>({entity:{...t?{domain:t}:{},...e?{multiple:!0}:{}}}),ue={text:{}},me=(t,e)=>({number:{min:t,max:e,mode:"box"}}),fe=t=>({select:{mode:"dropdown",options:t}}),ve={boolean:{}},be={"glass-person-card":[{name:"title",selector:ue},{name:"entities",required:!0,selector:he("person",!0)}],"glass-weather-card":[{name:"entity",required:!0,selector:he("weather")},{name:"sun",selector:he("sun")},{name:"humidity",selector:he("sensor")}],"glass-camera-card":[{name:"entity",required:!0,selector:he("camera")},{name:"name",selector:ue},{name:"icon",selector:ue},{name:"show_timestamp",selector:ve}],"glass-alarm-card":[{name:"entity",required:!0,selector:he("alarm_control_panel")},{name:"variant",selector:fe([{value:"shield",label:"Shield (default)"},{value:"radial",label:"Radial"},{value:"bar",label:"Compact bar"},{value:"keypad",label:"Keypad"},{value:"triggered",label:"Triggered / status"}])},{name:"name",selector:ue},{name:"subtitle",selector:ue},{name:"code",selector:ue},{name:"code_length",selector:me(1,8)},{name:"buttons",selector:{select:{multiple:!0,mode:"list",options:[{value:"disarm",label:"Disarm"},{value:"arm",label:"Arm (single button)"},{value:"arm_home",label:"Arm Home"},{value:"arm_away",label:"Arm Away"},{value:"arm_night",label:"Arm Night"},{value:"arm_vacation",label:"Arm Vacation"}]}}}],"glass-media-card":[{name:"entity",required:!0,selector:he("media_player")},{name:"name",selector:ue}],"glass-flight-card":[{name:"entity",required:!0,selector:he("sensor")},{name:"title",selector:ue},{name:"max",selector:me(1,10)}],"glass-tile-card":[{name:"entity",required:!0,selector:he()},{name:"name",selector:ue},{name:"icon",selector:ue}],"glass-energy-card":[{name:"title",selector:ue},{name:"variant",selector:fe([{value:"flow",label:"Power flow (default)"},{value:"ring",label:"Battery ring"},{value:"stats",label:"Stat trio"},{value:"meters",label:"Meters"},{value:"production",label:"Production bars"}])},{name:"solar",selector:he("sensor")},{name:"grid",selector:he("sensor")},{name:"battery",selector:he("sensor")},{name:"battery_soc",selector:he("sensor")},{name:"house",selector:he("sensor")},{name:"today",selector:he("sensor")},{name:"imported",selector:he("sensor")},{name:"exported",selector:he("sensor")},{name:"saved",selector:he("sensor")},{name:"meters",selector:he("sensor",!0)},{name:"production",selector:he("sensor")}],"glass-sensor-list-card":[{name:"title",selector:ue},{name:"entities",required:!0,selector:he(["cover","binary_sensor"],!0)}],"glass-appliance-card":[{name:"name",selector:ue},{name:"subtitle",selector:ue},{name:"icon",selector:ue},{name:"icon_color",selector:{select:{mode:"dropdown",options:["cyan","amber","green","purple","red"]}}},{name:"status",selector:he(["sensor","binary_sensor"])},{name:"remaining",selector:he("sensor")},{name:"total",selector:he("sensor")},{name:"toggle",selector:he(["switch","input_boolean"])},{name:"stats",selector:he(["sensor","binary_sensor","number"],!0)}],"glass-fridge-card":[{name:"name",selector:ue},{name:"subtitle",selector:ue},{name:"door",selector:he("binary_sensor")},{name:"wifi",selector:he("binary_sensor")},{name:"fridge_temp",selector:he("number")},{name:"freezer_temp",selector:he("number")},{name:"toggles",selector:he(["switch","input_boolean"],!0)}],"glass-pool-card":[{name:"name",selector:ue},{name:"subtitle",selector:ue},{name:"switch",selector:he(["switch","input_boolean"])},{name:"energy",selector:he("sensor")},{name:"color",selector:fe(["green","amber","cyan","purple","red"])}],"glass-stat-card":[{name:"entity",required:!0,selector:he()},{name:"name",selector:ue},{name:"icon",selector:ue},{name:"color",selector:fe(["amber","green","cyan","purple","red","dim"])}],"glass-lights-card":[{name:"title",selector:ue},{name:"entities",required:!0,selector:he("light",!0)}],"glass-scenes-card":[{name:"title",selector:ue},{name:"columns",selector:me(2,6)},{name:"scenes",required:!0,selector:he(["scene","script","automation"],!0)}],"glass-toggle-grid-card":[{name:"title",selector:ue},{name:"columns",selector:me(2,8)},{name:"entities",required:!0,selector:he(["light","switch","fan","input_boolean","script","scene"],!0)}],"glass-heatpump-card":[{name:"entity",required:!0,selector:he("climate")},{name:"name",selector:ue},{name:"subtitle",selector:ue}],"glass-garage-card":[{name:"entity",selector:he("cover")},{name:"state_entity",selector:he(["binary_sensor","cover"])},{name:"trigger",selector:he(["switch","button","script","input_boolean"])},{name:"variant",selector:fe([{value:"full",label:"Full (animated visual)"},{value:"compact",label:"Compact tile"}])},{name:"name",selector:ue},{name:"subtitle",selector:ue}],"glass-sprinkler-card":[{name:"entity",required:!0,selector:he(["switch","valve","input_boolean"])},{name:"variant",selector:fe([{value:"hero",label:"Hero (animated)"},{value:"compact",label:"Compact tile"}])},{name:"name",selector:ue},{name:"subtitle",selector:ue}],"glass-irrigation-card":[{name:"title",selector:ue},{name:"zones",required:!0,selector:he(["switch","valve","input_boolean"],!0)}],"glass-water-chemistry-card":[{name:"title",selector:ue},{name:"metrics",selector:he("sensor",!0)}],"glass-nav-card":[{name:"variant",selector:fe([{value:"dock",label:"Full-width dock"},{value:"pill",label:"Floating pill"}])},{name:"fixed",selector:ve},{name:"max_width",selector:me(320,1600)}],"glass-light-card":[{name:"entity",required:!0,selector:he("light")},{name:"name",selector:ue},{name:"subtitle",selector:ue}],"glass-aircon-card":[{name:"entity",required:!0,selector:he("climate")},{name:"name",selector:ue},{name:"subtitle",selector:ue}],"glass-geyser-card":[{name:"name",selector:ue},{name:"subtitle",selector:ue},{name:"power",selector:he(["switch","input_boolean","water_heater"])},{name:"current",selector:he("sensor")},{name:"target",selector:he(["number","water_heater","climate"])},{name:"min_temp",selector:me(0,100)},{name:"max_temp",selector:me(0,100)},{name:"solar",selector:he("sensor")},{name:"power_sensor",selector:he("sensor")},{name:"solar_mode",selector:he(["switch","input_boolean"])},{name:"modes",selector:he(["switch","input_boolean"],!0)}],"glass-dishwasher-card":[{name:"name",selector:ue},{name:"subtitle",selector:ue},{name:"status",selector:he("sensor")},{name:"alert",selector:he("binary_sensor")},{name:"alert_text",selector:ue},{name:"tiles",selector:he(["binary_sensor","sensor"],!0)},{name:"levels",selector:he("sensor",!0)},{name:"level_max",selector:me(1,10)}]},xe={entity:"Entity",entities:"Entities",title:"Title",name:"Name (optional)",icon:"Icon (optional)",sun:"Sun entity (for sunrise/sunset)",humidity:"Humidity sensor (optional)",code:"Arm/disarm code (optional)",max:"Max flights to show",buttons:"Action buttons to show",variant:"Layout / style",code_length:"Keypad code length",today:"Solar-today energy sensor (big number)",imported:"Imported-today sensor",exported:"Exported-today sensor",saved:"Money-saved sensor",meters:"Percentage sensors to show as meters",production:"Production sensor for hourly bars (needs statistics)",subtitle:"Subtitle (e.g. room/area)",icon_color:"Icon accent colour",status:"Status sensor (drives the pill)",remaining:"Remaining-time sensor (timestamp → progress ring)",total:"Total-time sensor (minutes, for the ring %)",toggle:"Power switch (optional on/off button)",stats:"Extra sensors shown as stat tiles",door:"Door sensor",wifi:"Wi-Fi / connectivity sensor (optional)",fridge_temp:"Fridge temperature (number entity)",freezer_temp:"Freezer temperature (number entity)",toggles:"Feature switches (Express cool/mode, etc.)",switch:"Pump switch",energy:"Energy sensor (kWh)",color:"Accent colour",columns:"Columns",scenes:"Scenes / scripts to show",alert:"Alert sensor (e.g. refill needed)",alert_text:"Alert message",tiles:"Status tiles",levels:"Level sensors (shown as bars)",level_max:"Level bar maximum",power:"Power switch (on/off)",current:"Current temperature sensor",target:"Target temperature (number / thermostat)",min_temp:"Minimum temperature",max_temp:"Maximum temperature",solar:"Solar collector temperature sensor",power_sensor:"Power draw sensor (kW)",solar_mode:"Solar mode switch (toggleable)",modes:"Extra mode switches (boost, element, timer)",metrics:"Water metric sensors (pH, chlorine, …)",fixed:"Stick to bottom of screen",max_width:"Maximum width (px)",show_timestamp:"Show date/time overlay",state_entity:"State sensor (open / closed)",trigger:"Trigger to open/close (switch / button / script)",solar:"Solar power sensor",grid:"Grid power sensor (+import / −export)",battery:"Battery power sensor (+discharge / −charge)",battery_soc:"Battery charge % sensor",house:"House load sensor (optional; derived if empty)"},_e={icon:"Material Symbols name, e.g. lightbulb, garage, kitchen",code:"Only if your panel requires a code to arm/disarm"};let ye=class extends dt{constructor(){super(...arguments),this._label=t=>xe[t.name]??t.name,this._helper=t=>_e[t.name]??""}setConfig(t){this._config=t}_valueChanged(t){if(t.stopPropagation(),!this._config)return;const e={...this._config,...t.detail.value,type:this._config.type};xt(this,"config-changed",{config:e})}render(){if(!this.hass||!this._config)return Y;const t=this._config.type.replace(/^custom:/,""),e=be[t];return e?q`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:q`<div class="fallback">No visual editor for <code>${this._config.type}</code> — edit in YAML.</div>`}};ye.styles=o`
    .fallback { padding: 12px; color: var(--secondary-text-color, #8b9099); font-size: 14px; }
    code { font-family: monospace; }
  `,e([mt({attribute:!1})],ye.prototype,"hass",void 0),e([ft()],ye.prototype,"_config",void 0),ye=e([pt("glass-config-editor")],ye);const $e=["light","switch","fan","input_boolean","script","scene","automation","cover"],we=[{name:"title",selector:{text:{}}},{name:"columns",selector:{number:{min:1,max:12,mode:"box"}}}];let ke=class extends dt{constructor(){super(...arguments),this._headLabel=t=>"columns"===t.name?"Columns":"Title"}setConfig(t){this._config=t}get _items(){return(this._config?.entities??[]).map(t=>"string"==typeof t?{entity:t}:{...t})}_emit(t){xt(this,"config-changed",{config:{...this._config,...t}})}_headChanged(t){t.stopPropagation(),this._emit(t.detail.value)}_setItems(t){const e=t.map(t=>{const e={entity:t.entity};return t.name&&(e.name=t.name),t.icon&&(e.icon=t.icon),e});this._emit({entities:e})}_update(t,e){const i=this._items;i[t]={...i[t],...e},this._setItems(i)}_remove(t){const e=this._items;e.splice(t,1),this._setItems(e)}_add(){this._setItems([...this._items,{entity:""}])}render(){if(!this.hass||!this._config)return Y;const t=this._items;return q`
      <div class="wrap">
        <ha-form
          .hass=${this.hass}
          .data=${{title:this._config.title,columns:this._config.columns??4}}
          .schema=${we}
          .computeLabel=${this._headLabel}
          @value-changed=${this._headChanged}
        ></ha-form>

        <div class="items-h">Tiles</div>
        ${t.map((t,e)=>q`
            <div class="item">
              <div class="item-top">
                <ha-selector
                  class="grow"
                  .hass=${this.hass}
                  .selector=${{entity:{domain:$e}}}
                  .value=${t.entity}
                  @value-changed=${t=>this._update(e,{entity:t.detail.value??""})}
                ></ha-selector>
                <ha-icon-button class="del" .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"} @click=${()=>this._remove(e)}></ha-icon-button>
              </div>
              <div class="item-bot">
                <ha-textfield
                  class="grow"
                  label="Icon (Material Symbols name)"
                  .value=${t.icon??""}
                  @input=${t=>this._update(e,{icon:t.target.value})}
                ></ha-textfield>
                <span class="prev">${t.icon?q`<span class="ms">${t.icon}</span>`:"—"}</span>
                <ha-textfield
                  class="grow"
                  label="Name (optional)"
                  .value=${t.name??""}
                  @input=${t=>this._update(e,{name:t.target.value})}
                ></ha-textfield>
              </div>
            </div>
          `)}
        <ha-button @click=${this._add}>
          <ha-icon icon="mdi:plus" slot="icon"></ha-icon>
          Add tile
        </ha-button>
        <div class="hint">Icon names come from Google <a href="https://fonts.google.com/icons" target="_blank" rel="noopener">Material Symbols</a> — e.g. <code>lightbulb</code>, <code>power</code>, <code>tv</code>. Leave blank for the default.</div>
      </div>
    `}};ke.styles=[$t,o`
      .wrap { display: flex; flex-direction: column; gap: 12px; }
      .items-h { font-size: 13px; font-weight: 700; color: var(--secondary-text-color, #8b9099); margin-top: 4px; }
      .item { border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12)); border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 8px; }
      .item-top, .item-bot { display: flex; align-items: center; gap: 8px; }
      .grow { flex: 1; min-width: 0; }
      ha-textfield.grow { width: 100%; }
      .del { color: var(--error-color, #ff5c5c); --mdc-icon-button-size: 40px; flex: none; }
      .prev { width: 30px; text-align: center; color: var(--g-amber); flex: none; }
      .prev .ms { font-size: 22px; }
      .hint { font-size: 12px; color: var(--secondary-text-color, #8b9099); }
      .hint code { font-family: var(--g-mono); }
    `],e([mt({attribute:!1})],ke.prototype,"hass",void 0),e([ft()],ke.prototype,"_config",void 0),ke=e([pt("glass-toggle-grid-editor")],ke);const Se="0.16.0";!function(){if(t||"undefined"==typeof document)return;t=!0;const e=[{rel:"stylesheet",href:"/local/glass-fonts/glass-fonts.css"},{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400,0..1,0&display=swap"}];for(const t of e){if(t.href&&document.head.querySelector(`link[href="${t.href}"]`))continue;const e=document.createElement("link");Object.assign(e,t),document.head.appendChild(e)}}();const Ce=window;Ce.customCards=Ce.customCards||[],Ce.customCards.push({type:"glass-person-card",name:"Glass Person Card",description:"Household presence with avatars, Midnight style.",preview:!0},{type:"glass-weather-card",name:"Glass Weather Card",description:"Conditions, temperature and sun/humidity tiles.",preview:!0},{type:"glass-camera-card",name:"Glass Camera Card",description:"Live camera tile with timestamp and LIVE badge.",preview:!0},{type:"glass-alarm-card",name:"Glass Alarm Card",description:"Alarm panel with shield and arm/disarm actions.",preview:!0},{type:"glass-energy-card",name:"Glass Energy Card",description:"Solar / grid / battery power-flow diagram.",preview:!0},{type:"glass-tile-card",name:"Glass Tile Card",description:"Compact entity tile: lights, switches, sensors.",preview:!0},{type:"glass-sensor-list-card",name:"Glass Sensor List Card",description:"Doors, windows and covers with animated state icons.",preview:!0},{type:"glass-media-card",name:"Glass Media Card",description:"Media player with album art, progress and transport.",preview:!0},{type:"glass-flight-card",name:"Glass Flight Card",description:"Aircraft overhead via Flightradar24.",preview:!0},{type:"glass-appliance-card",name:"Glass Appliance Card",description:"Washer / dishwasher: status, progress ring, stats.",preview:!0},{type:"glass-fridge-card",name:"Glass Fridge Card",description:"Refrigerator: fridge/freezer temp steppers, door, express modes.",preview:!0},{type:"glass-pool-card",name:"Glass Pool Pump Card",description:"Pool pump: animated impeller, switch, energy used.",preview:!0},{type:"glass-dishwasher-card",name:"Glass Dishwasher Card",description:"Dishwasher: status, refill alert, tiles, level bars.",preview:!0},{type:"glass-stat-card",name:"Glass Stat Card",description:"Compact stat tile: icon, value, label.",preview:!0},{type:"glass-lights-card",name:"Glass Lights Card",description:"Lights grouped by area with master toggles.",preview:!0},{type:"glass-scenes-card",name:"Glass Scenes Card",description:"Scene / script buttons.",preview:!0},{type:"glass-light-card",name:"Glass Light Card",description:"Single light: brightness, colour temp, RGB swatches.",preview:!0},{type:"glass-aircon-card",name:"Glass Aircon Card",description:"Climate thermostat: modes, fan speed, airflow.",preview:!0},{type:"glass-geyser-card",name:"Glass Geyser Card",description:"Water heater: tank, target temp, toggleable solar mode.",preview:!0},{type:"glass-toggle-grid-card",name:"Glass Toggle Grid Card",description:"Square tap-to-toggle tiles (no dimmer) for any switchables.",preview:!0},{type:"glass-heatpump-card",name:"Glass Heat Pump Card",description:"Pool heat-pump thermostat: ring dial, heat/cool/auto.",preview:!0},{type:"glass-water-chemistry-card",name:"Glass Water Chemistry Card",description:"Pool metrics (pH, chlorine, …) with in-range bars.",preview:!0},{type:"glass-nav-card",name:"Glass Bottom Nav Card",description:"Bottom navigation — dock or floating pill, sticks to screen bottom.",preview:!0},{type:"glass-garage-card",name:"Glass Garage Card",description:"Garage door — animated rolling-door visual or compact tile.",preview:!0},{type:"glass-sprinkler-card",name:"Glass Sprinkler Card",description:"Sprinkler zone — animated spray hero or compact tile.",preview:!0},{type:"glass-irrigation-card",name:"Glass Irrigation Card",description:"Multi-zone irrigation control with per-zone toggles.",preview:!0}),console.info(`%c GLASS-CARDS %c v${Se} `,"background:#f3d06a;color:#16181d;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px","background:#16181d;color:#b9f6a6;border-radius:0 4px 4px 0;padding:2px 6px");export{Se as GLASS_VERSION};
