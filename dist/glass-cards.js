let t=!1;function e(t,e,s,i){var a,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var o=t.length-1;o>=0;o--)(a=t[o])&&(n=(r<3?a(n):r>3?a(e,s,n):a(e,s))||n);return r>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const s=globalThis,i=s.ShadowRoot&&(void 0===s.ShadyCSS||s.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),r=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,a)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,a))(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:g,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,m=globalThis,f=m.trustedTypes,v=f?f.emptyScript:"",b=m.reactiveElementPolyfillSupport,_=(t,e)=>t,x={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&d(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:a}=g(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);a?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(i)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),a=s.litNonce;void 0!==a&&e.setAttribute("nonce",a),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const a=(void 0!==s.converter?.toAttribute?s.converter:x).toAttribute(e,s.type);this._$Em=t,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:x;this._$Em=i;const r=a.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,a){if(void 0!==t){const r=this.constructor;if(!1===i&&(a=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??y)(a,e)||s.useDefault&&s.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:a},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==a||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[_("elementProperties")]=new Map,w[_("finalized")]=new Map,b?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,S=t=>t,C=k.trustedTypes,z=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,N="?"+E,M=`<${N}>`,P=document,O=()=>P.createComment(""),j=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,T="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,W=/>/g,R=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,D=/"/g,I=/^(?:script|style|textarea|title)$/i,G=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),q=G(1),F=G(2),V=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),Y=new WeakMap,X=P.createTreeWalker(P,129);function J(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==z?z.createHTML(e):e}const Q=(t,e)=>{const s=t.length-1,i=[];let a,r=2===e?"<svg>":3===e?"<math>":"",n=L;for(let e=0;e<s;e++){const s=t[e];let o,l,c=-1,d=0;for(;d<s.length&&(n.lastIndex=d,l=n.exec(s),null!==l);)d=n.lastIndex,n===L?"!--"===l[1]?n=H:void 0!==l[1]?n=W:void 0!==l[2]?(I.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=R):void 0!==l[3]&&(n=R):n===R?">"===l[0]?(n=a??L,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,o=l[1],n=void 0===l[3]?R:'"'===l[3]?D:B):n===D||n===B?n=R:n===H||n===W?n=L:(n=R,a=void 0);const g=n===R&&t[e+1].startsWith("/>")?" ":"";r+=n===L?s+M:c>=0?(i.push(o),s.slice(0,c)+A+s.slice(c)+E+g):s+E+(-2===c?e:g)}return[J(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Z{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let a=0,r=0;const n=t.length-1,o=this.parts,[l,c]=Q(t,e);if(this.el=Z.createElement(l,s),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=X.nextNode())&&o.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(A)){const e=c[r++],s=i.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:n[2],strings:s,ctor:"."===n[1]?at:"?"===n[1]?rt:"@"===n[1]?nt:it}),i.removeAttribute(t)}else t.startsWith(E)&&(o.push({type:6,index:a}),i.removeAttribute(t));if(I.test(i.tagName)){const t=i.textContent.split(E),e=t.length-1;if(e>0){i.textContent=C?C.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],O()),X.nextNode(),o.push({type:2,index:++a});i.append(t[e],O())}}}else if(8===i.nodeType)if(i.data===N)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=i.data.indexOf(E,t+1));)o.push({type:7,index:a}),t+=E.length-1}a++}}static createElement(t,e){const s=P.createElement("template");return s.innerHTML=t,s}}function tt(t,e,s=t,i){if(e===V)return e;let a=void 0!==i?s._$Co?.[i]:s._$Cl;const r=j(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(t),a._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=a:s._$Cl=a),void 0!==a&&(e=tt(t,a._$AS(t,e.values),a,i)),e}class et{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);X.currentNode=i;let a=X.nextNode(),r=0,n=0,o=s[0];for(;void 0!==o;){if(r===o.index){let e;2===o.type?e=new st(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new ot(a,this,t)),this._$AV.push(e),o=s[++n]}r!==o?.index&&(a=X.nextNode(),r++)}return X.currentNode=P,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class st{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=tt(this,t,e),j(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new et(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const a of t)i===e.length?e.push(s=new st(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(a),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,a){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=a,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=K}_$AI(t,e=this,s,i){const a=this.strings;let r=!1;if(void 0===a)t=tt(this,t,e,0),r=!j(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const i=t;let n,o;for(t=a[0],n=0;n<a.length-1;n++)o=tt(this,i[s+n],e,n),o===V&&(o=this._$AH[n]),r||=!j(o)||o!==this._$AH[n],o===K?t=K:t!==K&&(t+=(o??"")+a[n+1]),this._$AH[n]=o}r&&!i&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class at extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class nt extends it{constructor(t,e,s,i,a){super(t,e,s,i,a),this.type=5}_$AI(t,e=this){if((t=tt(this,t,e,0)??K)===V)return;const s=this._$AH,i=t===K&&s!==K||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,a=t!==K&&(s===K||i);i&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t)}}const lt=k.litHtmlPolyfillSupport;lt?.(Z,st),(k.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;class dt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let a=i._$litPart$;if(void 0===a){const t=s?.renderBefore??null;i._$litPart$=a=new st(e.insertBefore(O(),t),t,void 0,s??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}dt._$litElement$=!0,dt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:dt});const gt=ct.litElementPolyfillSupport;gt?.({LitElement:dt}),(ct.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:y},ut=(t=ht,e,s)=>{const{kind:i,metadata:a}=s;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const a=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,a,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const a=this[i];e.call(this,s),this.requestUpdate(i,a,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function mt(t){return(e,s)=>"object"==typeof s?ut(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function ft(t){return mt({...t,state:!0,attribute:!1})}var vt,bt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(vt||(vt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(bt||(bt={}));var _t=function(t,e,s,i){i=i||{},s=null==s?{}:s;var a=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return a.detail=s,t.dispatchEvent(a),a};function xt(t,e=22,s){return q`<span class="ms" style=${`font-size:${e}px${s?`;color:${s}`:""}`}>${t}</span>`}function yt(t,e="add_box"){return q`<div class="g-ph">${xt(e,26,"var(--g-faint)")}<span>${t}</span></div>`}const $t=o`
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
`;let wt=class extends dt{setConfig(t){this._config={title:"Home",entities:[],...t}}getCardSize(){return 2}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{title:"Home",entities:[]}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||this._config.entities.some(t=>e.states[t]!==this.hass.states[t])}_statusOf(t){const e=this.hass?.states[t];if(!e)return{label:"Unknown",home:!1,accent:"var(--g-dim)"};if("home"===e.state)return{label:"Home",home:!0,accent:"var(--g-green)"};if("not_home"===e.state)return{label:"Away",home:!1,accent:"var(--g-dim)"};return{label:e.state.charAt(0).toUpperCase()+e.state.slice(1),home:!1,accent:"var(--g-amber)"}}_relTime(t){if(!t)return"";const e=Math.round((Date.now()-new Date(t).getTime())/6e4);if(e<1)return"just now";if(e<60)return`${e}m ago`;const s=Math.round(e/60);return s<24?`${s}h ago`:`${Math.round(s/24)}d ago`}_open(t){_t(this,"hass-more-info",{entityId:t})}render(){if(!this._config||!this.hass)return K;if(!this._config.entities.length)return yt("Add person entities","group");const t=this._config.entities.map(t=>({id:t,st:this.hass.states[t]})),e=t.filter(t=>"home"===t.st?.state).length;return q`
      <div class="card">
        <div class="hdr">
          <div class="hdr-l">${xt("home",20,"var(--g-amber)")}<span class="title">${this._config.title}</span></div>
          <span class="badge ${e>0?"green":""}">
            <span class="dot"></span>${e}/${t.length} home
          </span>
        </div>

        <div class="people">
          ${t.map(t=>{if(!t.st)return q`<div class="missing">${t.id} not found</div>`;const e=this._statusOf(t.id),s=t.st.attributes.entity_picture,i=t.st.attributes.friendly_name??t.id,a=i.split(" ").map(t=>t[0]).slice(0,2).join("").toUpperCase();return q`
              <button class="person" @click=${()=>this._open(t.id)} title=${i}>
                <div class="avatar" style="--accent:${e.accent}">
                  ${s?q`<img src=${s} alt=${i} />`:q`<span class="mono-av">${a}</span>`}
                  ${e.home?q`<span class="ring"></span>`:K}
                </div>
                <div class="who">
                  <span class="name">${i}</span>
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
    `],e([mt({attribute:!1})],wt.prototype,"hass",void 0),e([ft()],wt.prototype,"_config",void 0),wt=e([pt("glass-person-card")],wt);const kt={"clear-night":{icon:"bedtime",label:"Clear night"},cloudy:{icon:"cloud",label:"Cloudy"},fog:{icon:"foggy",label:"Fog"},hail:{icon:"weather_hail",label:"Hail"},lightning:{icon:"thunderstorm",label:"Lightning"},"lightning-rainy":{icon:"thunderstorm",label:"Storms"},partlycloudy:{icon:"partly_cloudy_day",label:"Partly cloudy"},pouring:{icon:"rainy",label:"Heavy rain"},rainy:{icon:"rainy",label:"Rain"},snowy:{icon:"weather_snowy",label:"Snow"},"snowy-rainy":{icon:"weather_mix",label:"Sleet"},sunny:{icon:"clear_day",label:"Sunny"},windy:{icon:"air",label:"Windy"},"windy-variant":{icon:"air",label:"Windy"},exceptional:{icon:"warning",label:"Severe"}},St=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];let Ct=class extends dt{setConfig(t){this._config=t}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:"",sun:"sun.sun"}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");if(!e||!this.hass||!this._config)return!0;return[this._config.entity,this._config.sun,this._config.humidity].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}_compass(t){return"number"==typeof t?St[Math.round(t/22.5)%16]:"string"==typeof t&&t?t.toUpperCase():""}_time(t){if(!t)return"—";const e=new Date(t);return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;if(!t)return yt("Select a weather entity","partly_cloudy_day");const e=kt[t.state]??{icon:"thermostat",label:t.state},s=t.attributes,i=s.temperature_unit||`°${this.hass.config.unit_system.temperature.replace("°","")}`,a=null!=s.temperature?Math.round(Number(s.temperature)):"—",r=null!=s.wind_speed?`${Math.round(Number(s.wind_speed))} ${s.wind_speed_unit??"km/h"}`:"",n=[this._compass(s.wind_bearing),r].filter(Boolean).join(" "),o=this._config.humidity,l=o?this.hass.states[o]?.state:s.humidity,c=null!=l?`${Math.round(Number(l))}%`:"—",d=this._config.sun?this.hass.states[this._config.sun]:void 0,g=d?.attributes.next_setting,p=d?.attributes.next_rising,h="below_horizon"===d?.state;return q`
      <div class="card" @click=${()=>_t(this,"hass-more-info",{entityId:this._config.entity})}>
        <div class="top">
          <div class="cond">
            ${xt(e.icon,48,"var(--g-amber)")}
            <div>
              <div class="cond-label">${e.label}</div>
              ${n?q`<div class="wind">Wind ${n}</div>`:K}
            </div>
          </div>
          <div class="temp"><span class="t-num deg">${a}</span><span class="unit">${i}</span></div>
        </div>
        <div class="tiles">
          <div class="tile">
            <div class="tile-h">${xt("water_drop",16,"var(--g-dim)")}Humidity</div>
            <div class="t-num tile-v">${c}</div>
          </div>
          <div class="tile">
            <div class="tile-h">
              ${xt(h?"wb_sunny":"wb_twilight",16,"var(--g-dim)")}${h?"Sunrise":"Sunset"}
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
    `],e([mt({attribute:!1})],Ct.prototype,"hass",void 0),e([ft()],Ct.prototype,"_config",void 0),Ct=e([pt("glass-weather-card")],Ct);let zt=class extends dt{setConfig(t){this._config={icon:"videocam",...t}}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:"camera.garage",icon:"garage"}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}_stamp(t){const e=t?new Date(t):new Date,s=t=>String(t).padStart(2,"0");return`${e.getFullYear()}-${s(e.getMonth()+1)}-${s(e.getDate())} · ${s(e.getHours())}:${s(e.getMinutes())}:${s(e.getSeconds())}`}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;if(!t)return yt("Select a camera entity","videocam");const e=t.attributes.entity_picture,s=this._config.name??t.attributes.friendly_name??this._config.entity,i="streaming"===t.state||"recording"===t.state||"idle"===t.state;return q`
      <div class="cam" @click=${()=>_t(this,"hass-more-info",{entityId:this._config.entity})}>
        ${e?q`<img src=${e} alt=${s} />`:K}
        <div class="scan"></div>
        <div class="ts">${this._stamp(t.last_changed)}</div>
        ${i?q`<div class="live-badge"><span class="rec"></span>LIVE</div>`:q`<div class="live-badge off">OFFLINE</div>`}
        ${e?K:q`<div class="ph">${xt("videocam",52)}</div>`}
        <div class="label">${xt(this._config.icon,20,"#fff")}<span>${s}</span></div>
        <div class="expand">${xt("open_in_full",20,"#fff")}</div>
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
    `],e([mt({attribute:!1})],zt.prototype,"hass",void 0),e([ft()],zt.prototype,"_config",void 0),zt=e([pt("glass-camera-card")],zt);const At={disarm:{label:"Disarm",icon:"lock_open",service:"alarm_disarm"},arm_home:{label:"Home",icon:"home",service:"alarm_arm_home",activeState:"armed_home"},arm_away:{label:"Away",icon:"lock",service:"alarm_arm_away",activeState:"armed_away"},arm_night:{label:"Night",icon:"bedtime",service:"alarm_arm_night",activeState:"armed_night"},arm_vacation:{label:"Vacation",icon:"luggage",service:"alarm_arm_vacation",activeState:"armed_vacation"}},Et=["disarm","arm_home","arm_away"];let Nt=class extends dt{constructor(){super(...arguments),this._code=""}setConfig(t){this._config={variant:"shield",...t}}getCardSize(){return"bar"===this._config?.variant||"triggered"===this._config?.variant?1:3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:"",variant:"shield"}}shouldUpdate(t){if(t.has("_config")||t.has("_code"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}_look(t){switch(t){case"armed_away":return{accent:"var(--g-green)",glyph:"verified_user",label:"Armed · Away",border:"rgba(185,246,166,0.25)",blink:!1};case"armed_home":case"armed_night":case"armed_custom_bypass":return{accent:"var(--g-green)",glyph:"security",label:"Armed · "+t.replace("armed_","").replace("_"," "),border:"rgba(185,246,166,0.25)",blink:!1};case"arming":case"pending":return{accent:"var(--g-amber)",glyph:"shield_moon",label:"arming"===t?"Arming…":"Entry delay",border:"rgba(243,208,106,0.3)",blink:!0};case"triggered":return{accent:"var(--g-red-text)",glyph:"crisis_alert",label:"Triggered",border:"rgba(255,92,92,0.4)",blink:!0};default:return{accent:"var(--g-dim)",glyph:"gpp_maybe",label:"Disarmed",border:"var(--g-hair)",blink:!1}}}get _st(){return this.hass.states[this._config.entity]}_call(t,e){const s={entity_id:this._config.entity},i=e??this._config.code;i&&(s.code=i),this.hass.callService("alarm_control_panel",t,s)}_more(){_t(this,"hass-more-info",{entityId:this._config.entity})}_time(t){if(!t)return"";const e=new Date(t);return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}_key(t){const e=this._config.code_length??4;"back"!==t?"ok"!==t?this._code.length>=e||(this._code+=t,this._code.length===e&&this._submitCode()):this._submitCode():this._code=this._code.slice(0,-1)}_submitCode(){if(!this._code)return;const t=this._st.state.startsWith("armed")||"triggered"===this._st.state;this._call(t?"alarm_disarm":"alarm_arm_away",this._code),this._code=""}_actionButtons(){return(this._config.buttons??Et).map(t=>At[t]).filter(Boolean).map(t=>q`
          <button class="btn ${t.activeState&&this._st.state===t.activeState?"success":"soft"}" @click=${()=>this._call(t.service)}>
            ${xt(t.icon,18)}${t.label}
          </button>
        `)}render(){if(!this._config||!this.hass)return K;if(!this._st)return yt("Select an alarm panel","security");switch(this._config.variant){case"radial":return this._renderRadial();case"bar":return this._renderBar();case"keypad":return this._renderKeypad();case"triggered":return this._renderTriggered();default:return this._renderShield()}}_header(t,e){return q`
      <div class="row">
        <div class="badge-box ${t.blink?"blink":""}" style="--a:${t.accent}">${xt(t.glyph,26,t.accent)}</div>
        <div class="who">
          <div class="title">${e}</div>
          <div class="sub" style="color:${t.accent}">${t.label}</div>
        </div>
        <button class="more" @click=${this._more}>${xt("more_horiz",20,"var(--g-dim)")}</button>
      </div>
    `}_renderShield(){const t=this._look(this._st.state),e=this._config.name??this._st.attributes.friendly_name??"Security";return q`<div class="card" style="border-color:${t.border}">
      ${this._header(t,e)}
      <div class="actions">${this._actionButtons()}</div>
    </div>`}_renderRadial(){const t=this._look(this._st.state),e=this._config.name??this._st.attributes.friendly_name??"Security";return q`<div class="card center" style="border-color:${t.border}">
      <div class="ring ${t.blink?"blink":""}" style="background:color-mix(in srgb, ${t.accent} 20%, transparent)">
        <div class="ring-in">
          ${xt(t.glyph,44,t.accent)}
          <div class="ring-label" style="color:${t.accent}">${t.label}</div>
        </div>
      </div>
      <div class="name-c">${e}</div>
      <div class="actions">${this._actionButtons()}</div>
    </div>`}_renderBar(){const t=this._look(this._st.state),e=this._config.name??this._st.attributes.friendly_name??"Security",s=this._st.state.startsWith("armed")||"triggered"===this._st.state;return q`<div class="bar" style="border-color:${t.border}">
      <div class="badge-box sm ${t.blink?"blink":""}" style="--a:${t.accent}">${xt(t.glyph,24,t.accent)}</div>
      <div class="who"><div class="title sm">${t.label}</div><div class="sub2">${this._config.subtitle??e}</div></div>
      <button class="btn soft" @click=${()=>this._call(s?"alarm_disarm":"alarm_arm_away")}>
        ${xt(s?"lock_open":"lock",17)}${s?"Disarm":"Arm"}
      </button>
    </div>`}_renderKeypad(){const t=this._config.code_length??4,e=Array.from({length:t},(t,e)=>e<this._code.length?"●":"○").join(" "),s=this._look(this._st.state);return q`<div class="card">
      <div class="disp"><span class="ms" style="font-size:22px;color:${s.accent}">${s.glyph}</span><div class="dots">${e}</div></div>
      <div class="pad">
        ${["1","2","3","4","5","6","7","8","9","back","0","ok"].map(t=>"back"===t?q`<button class="k" @click=${()=>this._key("back")}>${xt("backspace",20,"var(--g-dim)")}</button>`:"ok"===t?q`<button class="k ok" @click=${()=>this._key("ok")}>${xt("check",20,"var(--g-amber-ink)")}</button>`:q`<button class="k" @click=${()=>this._key(t)}>${t}</button>`)}
      </div>
    </div>`}_renderTriggered(){if("triggered"===this._st.state)return q`<div class="alert red">
        <div class="badge-box sm blink" style="--a:var(--g-red-text)">${xt("crisis_alert",24,"var(--g-red-text)")}</div>
        <div class="who"><div class="title sm" style="color:var(--g-red-text)">Alarm triggered</div>
          <div class="sub2">${this._st.attributes.changed_by??"Sensor"} · ${this._time(this._st.last_changed)}</div></div>
        <button class="btn danger" @click=${()=>this._call("alarm_disarm")}>Dismiss</button>
      </div>`;const t=this._look(this._st.state);return q`<div class="alert" style="border-color:${t.border}">
      <div class="badge-box sm" style="--a:${t.accent}">${xt("verified_user",24,t.accent)}</div>
      <div class="who"><div class="title sm">All secure</div><div class="sub2" style="color:${t.accent}">${t.label}</div></div>
    </div>`}};Nt.styles=[$t,o`
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
    `],e([mt({attribute:!1})],Nt.prototype,"hass",void 0),e([ft()],Nt.prototype,"_config",void 0),e([ft()],Nt.prototype,"_code",void 0),Nt=e([pt("glass-alarm-card")],Nt);const Mt=[["#7dd68a","var(--g-green)"],["#e0b24a","var(--g-amber)"],["#a97ff0","var(--g-purple)"],["#5ab9bd","var(--g-cyan)"]];let Pt=class extends dt{constructor(){super(...arguments),this._bars=[]}setConfig(t){this._config={title:"Energy",variant:"flow",...t},this._fetchedFor=void 0}getCardSize(){return"flow"===this._config?.variant||"production"===this._config?.variant?4:3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{title:"Energy",variant:"flow",solar:"sensor.solar_power",grid:"sensor.grid_power",battery:"sensor.battery_power"}}shouldUpdate(t){if(t.has("_config")||t.has("_bars"))return!0;const e=t.get("hass");if(!e||!this.hass||!this._config)return!0;const s=this._config;return[s.solar,s.grid,s.battery,s.battery_soc,s.house,s.today,s.imported,s.exported,s.saved,s.production,...s.meters??[]].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}updated(){if(!this.hass||!this._config||"production"!==this._config.variant||!this._config.production)return;const t=this.hass.states[this._config.production];t&&t.last_updated!==this._fetchedFor&&(this._fetchedFor=t.last_updated,this._loadProduction(this._config.production))}async _loadProduction(t){const e=new Date;e.setHours(0,0,0,0);try{const s=(await this.hass.callWS({type:"recorder/statistics_during_period",start_time:e.toISOString(),statistic_ids:[t],period:"hour"}))[t]??[];this._bars=s.map(t=>({v:Math.max(0,Number(t.change??t.state??0)),label:String(new Date(Number(t.start)).getHours())}))}catch{this._bars=[]}}_watts(t){if(!t||!this.hass)return null;const e=this.hass.states[t];if(!e||"unavailable"===e.state||"unknown"===e.state)return null;const s=Number(e.state);if(Number.isNaN(s))return null;return"kw"===String(e.attributes.unit_of_measurement??"").toLowerCase()?1e3*s:s}_kw(t){return(t/1e3).toFixed(1)}_stateNum(t){const e=t?Number(this.hass.states[t]?.state):NaN;return Number.isNaN(e)?null:e}_label(t){return this.hass.states[t]?.attributes.friendly_name??t}render(){if(!this._config||!this.hass)return K;switch(this._config.variant){case"ring":return this._renderRing();case"stats":return this._renderStats();case"meters":return this._renderMeters();case"production":return this._renderProduction();default:return this._renderFlow()}}_head(t){return q`<div class="hdr"><div class="hdr-l">${xt("bolt",22,"var(--g-amber)")}<span class="title">${this._config.title}</span></div>${t??K}</div>`}_renderFlow(){const t=this._watts(this._config.solar),e=this._watts(this._config.grid),s=this._watts(this._config.battery);let i=this._watts(this._config.house);null==i&&(i=(t??0)+(e??0)+(s??0));const a=this._stateNum(this._config.battery_soc),r=(t??0)>20,n=(e??0)>20,o=(e??0)<-20,l=(s??0)>20,c=(s??0)<-20,d=o?{label:"Exporting",purple:!1}:n?{label:"Grid import",purple:!0}:{label:"Self-powered",purple:!1},g=(t,e,s=!1)=>t?`stroke:${e};animation:g-flow 0.7s linear infinite${s?" reverse":""};`:"stroke:rgba(255,255,255,0.06);";return q`<div class="card">
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
        ${null!=t?q`<div class="node solar"><div class="chip amber">${xt("solar_power",20,"var(--g-amber)")}<span>${this._kw(t)}</span></div><span class="cap">Solar · kW</span></div>`:K}
        <div class="node home">${xt("home",26,"var(--g-amber)")}<span class="watts t-num">${Math.round(i)}</span><span class="cap">Watts now</span></div>
        ${null!=e?q`<div class="node grid"><div class="chip">${xt("bolt",20,"var(--g-purple)")}<span style="color:var(--g-purple)">${this._kw(Math.abs(e))}</span></div><span class="cap">Grid · kW${n?" (import)":o?" (export)":" (idle)"}</span></div>`:K}
        ${null!=s?q`<div class="node batt"><div class="chip green">${xt(c?"battery_charging_full":"battery_full",20,"var(--g-green)")}<span style="color:var(--g-green)">${this._kw(Math.abs(s))}</span></div><span class="cap">Battery${null!=a?` · ${Math.round(a)}%`:" · kW"}</span></div>`:K}
      </div>
    </div>`}_renderRing(){const t=this._config,e=this._stateNum(t.battery_soc)??0,s=this._watts(t.solar);let i=this._watts(t.house);null==i&&(i=(s??0)+(this._watts(t.grid)??0)+(this._watts(t.battery)??0));const a=this._watts(t.battery),r=null!=a&&Math.abs(a)>5?q`<div class="delta" style="color:${a<0?"var(--g-green)":"var(--g-amber)"}">${a<0?"↓":"↑"} ${Math.abs(Math.round(a))} W</div>`:K;return q`<div class="card">
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
          <div class="rside"><span class="ms" style="font-size:22px;color:var(--g-dim)">solar_power</span><div><div class="t-num rv">${null!=s?Math.round(s):"—"} W</div><div class="rc">Solar production</div></div></div>
          <div class="hair"></div>
          <div class="rside"><span class="ms" style="font-size:22px;color:var(--g-dim)">home</span><div><div class="t-num rv">${Math.round(i)} W</div><div class="rc">House load</div></div></div>
        </div>
      </div>
      ${t.today||t.grid?q`<div class="ring-tiles">
            ${t.today?q`<div class="stat"><div class="t-num sv">${this._fmt(t.today).val} <span class="su">${this._fmt(t.today).unit||"kWh"}</span></div><div class="sc">Solar today</div></div>`:K}
            ${t.grid?q`<div class="stat"><div class="t-num sv">${(this._watts(t.grid)??0)>5?"Import":(this._watts(t.grid)??0)<-5?"Export":"On"} <span style="color:var(--g-green)">●</span></div><div class="sc">Grid status</div></div>`:K}
          </div>`:K}
    </div>`}_fmt(t){const e=t?this.hass.states[t]:void 0;if(!e)return{val:"—",unit:""};const s=Number(e.state);return{val:Number.isNaN(s)?e.state:s.toFixed(1),unit:e.attributes.unit_of_measurement??""}}_renderStats(){const t=this._config,e=this._fmt(t.today),s=[{id:t.imported,color:"var(--g-purple)"},{id:t.exported,color:"var(--g-green)"},{id:t.saved,color:"var(--g-amber)"}].filter(t=>t.id);return q`<div class="card">
      <div class="section">Solar today</div>
      <div class="big-row"><div class="t-display">${e.val}</div><div class="big-unit">${e.unit||"kWh"} ${t.today?this._label(t.today):""}</div></div>
      ${s.length?q`<div class="tri">
            ${s.map(t=>{const e=this._fmt(t.id);return q`<div class="stat"><div class="t-num sv" style="color:${t.color}">${e.val}${e.unit?q` <span class="su">${e.unit}</span>`:K}</div><div class="sc">${this._label(t.id)}</div></div>`})}
          </div>`:K}
    </div>`}_renderMeters(){const t=this._config,e=[...t.battery_soc?[t.battery_soc]:[],...t.meters??[]];return q`<div class="card">
      ${this._head()}
      <div class="meters">
        ${e.map((e,s)=>{const i=Math.max(0,Math.min(100,this._stateNum(e)??0)),[a,r]=Mt[s%Mt.length];return q`<div class="m">
            <div class="m-h"><span class="m-l">${xt(0===s&&t.battery_soc?"battery_charging_full":"bolt",18,r)}${this._label(e)}</span><span class="m-v">${Math.round(i)}%</span></div>
            <div class="m-track"><span style="width:${i}%;background:linear-gradient(90deg, ${a}, ${r})"></span></div>
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
    `],e([mt({attribute:!1})],Pt.prototype,"hass",void 0),e([ft()],Pt.prototype,"_config",void 0),e([ft()],Pt.prototype,"_bars",void 0),Pt=e([pt("glass-energy-card")],Pt);const Ot=new Set(["light","switch","fan","input_boolean","automation","script","siren","humidifier"]),jt={light:"lightbulb",switch:"toggle_on",fan:"mode_fan",climate:"thermostat",cover:"garage",lock:"lock",media_player:"speaker",script:"play_arrow",automation:"bolt",humidifier:"humidity_high",vacuum:"cleaning_services"},Ut={temperature:"thermostat",humidity:"water_drop",pressure:"compress",power:"bolt",energy:"bolt",battery:"battery_full",illuminance:"light_mode",motion:"sensors",door:"sensor_door",window:"window",co2:"co2"};let Tt=class extends dt{setConfig(t){this._config=t}getCardSize(){return 1}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}get _domain(){return this._config.entity.split(".")[0]}_iconName(t){return this._config.icon?this._config.icon:t&&Ut[t]?Ut[t]:jt[this._domain]??"circle"}_stateText(){const t=this.hass.states[this._config.entity];if(Ot.has(this._domain))return"light"===this._domain&&"on"===t.state&&null!=t.attributes.brightness?`${Math.round(Number(t.attributes.brightness)/255*100)}%`:"on"===t.state?"On":"Off";const e=t.attributes.unit_of_measurement,s=Number(t.state),i=Number.isNaN(s)?t.state:Math.abs(s)>=100?Math.round(s):s;return e?`${i}${e.startsWith("°")?"":" "}${e}`:String(i)}_tap(){this.hass&&this._config&&(Ot.has(this._domain)?this.hass.callService("homeassistant","toggle",{entity_id:this._config.entity}):_t(this,"hass-more-info",{entityId:this._config.entity}))}_toggleClick(t){t.stopPropagation(),this.hass.callService("homeassistant","toggle",{entity_id:this._config.entity})}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;if(!t)return yt("Select an entity","add_box");const e="on"===t.state||"open"===t.state||"home"===t.state||"playing"===t.state,s=Ot.has(this._domain),i=this._config.name??t.attributes.friendly_name??this._config.entity,a=t.attributes.device_class;return q`
      <div class="tile ${e?"on":""}" @click=${this._tap}>
        <div class="row">
          ${xt(this._iconName(a),24,e?"var(--g-amber)":"var(--g-dim)")}
          ${s?q`<div class="toggle ${e?"on":""}" @click=${this._toggleClick}><div class="knob"></div></div>`:K}
        </div>
        <div class="body">
          <div class="name">${i}</div>
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
    `],e([mt({attribute:!1})],Tt.prototype,"hass",void 0),e([ft()],Tt.prototype,"_config",void 0),Tt=e([pt("glass-tile-card")],Tt);let Lt=class extends dt{constructor(){super(...arguments),this._rows=[]}setConfig(t){this._rows=(t.entities??[]).map(t=>"string"==typeof t?{entity:t}:t),this._config={title:"Sensors",...t}}getCardSize(){return this._rows.length+1}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{title:"Sensors",entities:[]}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!e||!this.hass||this._rows.some(t=>e.states[t.entity]!==this.hass.states[t.entity])}_resolveType(t){if(t.type&&"auto"!==t.type)return t.type;const e=this.hass.states[t.entity],s=e?.attributes.device_class;return t.entity.startsWith("cover.")||"garage"===s?"garage":"window"===s?"window":"door"}_isOpen(t){const e=this.hass.states[t];return!!e&&("open"===e.state||"on"===e.state||"opening"===e.state)}_visual(t,e){return"garage"===t?q`<div class="v garage">
        <div class="slats" style="transform:translateY(${e?"-100%":"0"})">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="floor"></div>
      </div>`:"window"===t?q`<div class="v window">
        <div class="pane top" style="transform:translateY(${e?"-60%":"0"})"></div>
        <div class="pane bot"></div>
      </div>`:q`<div class="v door">
      <div class="frame"><div class="leaf" style="transform:rotateY(${e?"-62deg":"0deg"})"><span class="knob"></span></div></div>
    </div>`}render(){if(!this._config||!this.hass)return K;if(!this._rows.length)return yt("Add door / window / cover sensors","sensors");const t=this._rows.filter(t=>this._isOpen(t.entity)).length;return q`
      <div class="card">
        <div class="hdr">
          <div class="hdr-l">${xt("sensors",20,"var(--g-amber)")}<span class="title">${this._config.title}</span></div>
          <span class="badge ${t?"amber":"green"}">${t?`${t} open`:"All closed"}</span>
        </div>
        ${this._rows.map((t,e)=>{const s=this.hass.states[t.entity];if(!s)return q`<div class="line"><div class="missing">${t.entity} not found</div></div>`;const i=this._resolveType(t),a=this._isOpen(t.entity),r=t.name??s.attributes.friendly_name??t.entity;return q`
            <div class="line ${e<this._rows.length-1?"sep":""}" @click=${()=>_t(this,"hass-more-info",{entityId:t.entity})}>
              ${this._visual(i,a)}
              <div class="txt">
                <div class="name">${r}</div>
                <div class="eid">${t.entity}</div>
              </div>
              <span class="badge ${a?"amber":"green"}">${a?"Open":"Closed"}</span>
            </div>
          `})}
      </div>
    `}};Lt.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 8px; }
      .hdr { margin-bottom: 6px; }
      .line { display: flex; align-items: center; gap: 14px; padding: 12px 4px; cursor: pointer; }
      .line.sep { border-bottom: 1px solid var(--g-hair); }
      .txt { flex: 1; min-width: 0; }
      .name { font-size: 14px; font-weight: 700; }
      .eid { font-size: 11.5px; color: var(--g-dim); }
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
    `],e([mt({attribute:!1})],Lt.prototype,"hass",void 0),e([ft()],Lt.prototype,"_config",void 0),Lt=e([pt("glass-sensor-list-card")],Lt);let Ht=class extends dt{setConfig(t){this._config=t}getCardSize(){return 2}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:"media_player.kitchen"}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}_cmd(t,e){e.stopPropagation(),this.hass.callService("media_player",t,{entity_id:this._config.entity})}_progress(){const t=this.hass.states[this._config.entity],e=Number(t.attributes.media_duration);let s=Number(t.attributes.media_position);return!e||Number.isNaN(e)||Number.isNaN(s)?0:("playing"===t.state&&t.attributes.media_position_updated_at&&(s+=(Date.now()-new Date(t.attributes.media_position_updated_at).getTime())/1e3),Math.max(0,Math.min(100,s/e*100)))}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;if(!t)return yt("Select a media player","speaker");const e="off"===t.state||"unavailable"===t.state||"standby"===t.state,s="playing"===t.state,i=t.attributes,a=i.entity_picture,r=i.media_title||(this._config.name??i.friendly_name??"Media"),n=[i.media_artist,i.media_album_name].filter(Boolean).join(" · ")||(e?String(t.state):i.friendly_name??"");return q`
      <div class="card" @click=${()=>_t(this,"hass-more-info",{entityId:this._config.entity})}>
        <div class="art ${a?"":"ph"}">
          ${a?q`<img src=${a} alt="" />`:xt("music_note",34,"#fff")}
        </div>
        <div class="mid">
          <div class="title">${r}</div>
          <div class="sub">${n}</div>
          ${e?K:q`<div class="bar"><span style="width:${this._progress()}%"></span></div>`}
        </div>
        <div class="ctl">
          <button class="ico" @click=${t=>this._cmd("media_previous_track",t)}>${xt("skip_previous",22)}</button>
          <button class="ico play" @click=${t=>this._cmd("media_play_pause",t)}>${xt(s?"pause":"play_arrow",24,"var(--g-amber-ink)")}</button>
          <button class="ico" @click=${t=>this._cmd("media_next_track",t)}>${xt("skip_next",22)}</button>
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
    `],e([mt({attribute:!1})],Ht.prototype,"hass",void 0),e([ft()],Ht.prototype,"_config",void 0),Ht=e([pt("glass-media-card")],Ht);let Wt=class extends dt{setConfig(t){this._config={title:"Overhead",max:4,...t}}getCardSize(){return 2}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:"sensor.flightradar24_current_in_area",title:"Overhead"}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}_route(t){const e=t.airport_origin_code_iata||t.airport_origin_city,s=t.airport_destination_code_iata||t.airport_destination_city;return e&&s?`${e} → ${s}`:e||s||""}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;if(!t)return yt("Select a Flightradar24 sensor","flight");const e=t.attributes.flights??[],s=e.length;return q`
      <div class="card" @click=${()=>_t(this,"hass-more-info",{entityId:this._config.entity})}>
        <div class="hdr">
          <div class="hdr-l">${xt("flight",20,"var(--g-amber)")}<span class="title">${this._config.title}</span></div>
          <span class="badge ${s?"amber":"green"}">${s?`${s} overhead`:"Clear skies"}</span>
        </div>

        ${0===s?q`<div class="empty">${xt("travel_explore",30,"var(--g-faint)")}<span>No aircraft in your area</span></div>`:e.slice(0,this._config.max).map(t=>{const e=t.callsign||t.flight_number||"Unknown",s=[null!=t.altitude?`${Math.round(Number(t.altitude)).toLocaleString()} ft`:null,null!=t.ground_speed?`${Math.round(Number(t.ground_speed))} kt`:null,t.aircraft_code||t.aircraft_model].filter(Boolean);return q`
                <div class="row">
                  <div class="plane" style=${null!=t.heading?`transform:rotate(${Number(t.heading)}deg)`:""}>
                    ${xt("flight",20,"var(--g-cyan)")}
                  </div>
                  <div class="info">
                    <div class="cs">${e}${this._route(t)?q`<span class="rt">${this._route(t)}</span>`:K}</div>
                    ${s.length?q`<div class="det">${s.join(" · ")}</div>`:K}
                  </div>
                  ${null!=t.distance?q`<span class="dist">${Number(t.distance).toFixed(1)} km</span>`:K}
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
    `],e([mt({attribute:!1})],Wt.prototype,"hass",void 0),e([ft()],Wt.prototype,"_config",void 0),Wt=e([pt("glass-flight-card")],Wt);const Rt={cyan:"var(--g-cyan)",amber:"var(--g-amber)",green:"var(--g-green)",purple:"var(--g-purple)",red:"var(--g-red-text)"},Bt=["door","window","opening","garage_door"];let Dt=class extends dt{setConfig(t){this._config={icon:"local_laundry_service",icon_color:"cyan",...t}}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{name:"Washer",icon:"local_laundry_service",status:"",remaining:"",total:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");if(!e||!this.hass||!this._config)return!0;return[this._config.status,this._config.remaining,this._config.total,this._config.toggle,...this._config.stats??[]].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}_val(t){return t?this.hass?.states[t]?.state:void 0}_statusLook(t){if(!t)return null;const e=this.hass.states[t];if(!e)return null;const s=e.attributes.device_class,i=e.state.toLowerCase(),a=e.state.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase());return s&&Bt.includes(s)?"on"===i?{color:"var(--g-amber)",label:"Open"}:{color:"var(--g-green)",label:"Closed"}:"connectivity"===s?"on"===i?{color:"var(--g-green)",label:"Online"}:{color:"var(--g-dim)",label:"Offline"}:/(run|active|washing|drying|cleaning|start)/.test(i)||"on"===i?{color:"var(--g-cyan)",label:a}:/(pause|delay|hold)/.test(i)?{color:"var(--g-amber)",label:a}:/(complete|finish|clean|done|ready)/.test(i)?{color:"var(--g-green)",label:a}:/(error|fault|alarm)/.test(i)?{color:"var(--g-red-text)",label:a}:{color:"var(--g-dim)",label:a}}_ring(){const t=this._val(this._config.remaining);if(!t||"unknown"===t||"unavailable"===t)return null;const e=Date.parse(t);if(Number.isNaN(e))return null;const s=Math.max(0,(e-Date.now())/6e4),i=Number(this._val(this._config.total)),a=`${Math.floor(s/60)}:${String(Math.round(s%60)).padStart(2,"0")}`;return{pct:i&&!Number.isNaN(i)?Math.max(0,Math.min(1,1-s/i)):.5,label:a}}_statLabel(t){const e=this.hass.states[t];let s=e?.attributes.friendly_name??t;const i=this._config.name;return i&&s.toLowerCase().startsWith(i.toLowerCase()+" ")&&(s=s.slice(i.length+1)),s}_statValue(t){const e=this.hass.states[t];if(!e)return"—";const s=e.attributes.unit_of_measurement,i=e.state.replace(/_/g," ");return s?`${i} ${s}`:i}_toggle(t){t.stopPropagation();const e=this._config.toggle;this.hass.callService("homeassistant","toggle",{entity_id:e})}render(){if(!this._config||!this.hass)return K;const t=this._config,e=Rt[t.icon_color??"cyan"]??"var(--g-cyan)",s=t.name??"Appliance",i=this._statusLook(t.status),a=this._ring(),r=(t.stats??[]).filter(t=>this.hass.states[t]),n=!!t.toggle&&"on"===this.hass.states[t.toggle]?.state;return q`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:color-mix(in srgb, ${e} 14%, transparent)">${xt(t.icon,26,e)}</div>
          <div class="who">
            <div class="title">${s}</div>
            ${t.subtitle?q`<div class="sub">${t.subtitle}</div>`:K}
          </div>
          ${i?q`<span class="pill" style="color:${i.color}"><span class="dot" style="background:${i.color}"></span>${i.label}</span>`:K}
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
              </div>`:K}

        ${t.toggle?q`<button class="power ${n?"on":""}" @click=${this._toggle}>
              ${xt("power_settings_new",18)}${n?"On":"Off"}
            </button>`:K}
      </div>
    `}};Dt.styles=[$t,o`
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
    `],e([mt({attribute:!1})],Dt.prototype,"hass",void 0),e([ft()],Dt.prototype,"_config",void 0),Dt=e([pt("glass-appliance-card")],Dt);let It=class extends dt{constructor(){super(...arguments),this._toggles=[]}setConfig(t){this._toggles=(t.toggles??[]).map(t=>"string"==typeof t?{entity:t}:t),this._config={name:"Refrigerator",subtitle:"Kitchen",...t}}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{name:"Refrigerator",subtitle:"Kitchen",door:"",fridge_temp:"",freezer_temp:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");if(!e||!this.hass||!this._config)return!0;const s=[this._config.door,this._config.wifi,this._config.fridge_temp,this._config.freezer_temp,...this._toggles.map(t=>t.entity)].filter(Boolean);return s.some(t=>e.states[t]!==this.hass.states[t])}_num(t){const e=t?this.hass.states[t]:void 0;if(!e)return null;const s=Number(e.state);return{value:Number.isNaN(s)?null:s,min:Number(e.attributes.min??-30),max:Number(e.attributes.max??30),step:Number(e.attributes.step??1)}}_step(t,e,s){s.stopPropagation();const i=this._num(t);if(!t||!i||null==i.value)return;const a=Math.min(i.max,Math.max(i.min,i.value+e*i.step));this.hass.callService("number","set_value",{entity_id:t,value:a})}_toggle(t,e){e.stopPropagation(),this.hass.callService("homeassistant","toggle",{entity_id:t})}_tempTile(t,e,s,i){const a=this._num(i);return q`
      <div class="tt">
        <div class="tt-h" style="color:${s}">${xt(e,18,s)}${t}</div>
        <div class="stepper">
          <button class="step" @click=${t=>this._step(i,-1,t)}>${xt("remove",20)}</button>
          <div class="temp"><span class="t-num tv">${a?.value??"—"}</span><span class="deg">°C</span></div>
          <button class="step" @click=${t=>this._step(i,1,t)}>${xt("add",20)}</button>
        </div>
        ${a?q`<div class="range">range ${a.min}…${a.max} °C</div>`:K}
      </div>
    `}render(){if(!this._config||!this.hass)return K;const t=this._config,e=!!t.door&&"on"===this.hass.states[t.door]?.state,s=t.wifi?"on"===this.hass.states[t.wifi]?.state:null;return q`
      <div class="card">
        <div class="head">
          <div class="ibox">${xt("kitchen",26,"var(--g-cyan)")}</div>
          <div class="who">
            <div class="title">${t.name}</div>
            <div class="sub">
              ${t.subtitle}${null!=s?q` · ${xt("wifi",14,s?"var(--g-green)":"var(--g-dim)")}${s?"Connected":"Offline"}`:K}
            </div>
          </div>
          ${t.door?q`<button class="pill ${e?"open":"closed"}" @click=${()=>_t(this,"hass-more-info",{entityId:t.door})}>
                <span class="dot"></span>Door ${e?"Open":"Closed"}
              </button>`:K}
        </div>

        <div class="grid">
          ${this._tempTile("Fridge","ac_unit","var(--g-cyan)",t.fridge_temp)}
          ${this._tempTile("Freezer","severe_cold","var(--g-purple)",t.freezer_temp)}
        </div>

        ${this._toggles.length?q`<div class="rows">
              ${this._toggles.map(e=>{const s=this.hass.states[e.entity],i="on"===s?.state;let a=e.name??s?.attributes.friendly_name??e.entity;t.name&&a.toLowerCase().startsWith(t.name.toLowerCase()+" ")&&(a=a.slice(t.name.length+1));const r=e.icon??(/cool/i.test(a)?"mode_cool":"bolt");return q`
                  <div class="row">
                    ${xt(r,22,i?"var(--g-cyan)":"var(--g-dim)")}
                    <div class="row-t"><div class="rn">${a}</div></div>
                    <div class="toggle ${i?"on":""}" @click=${t=>this._toggle(e.entity,t)}><div class="knob"></div></div>
                  </div>
                `})}
            </div>`:K}
      </div>
    `}};It.styles=[$t,o`
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
    `],e([mt({attribute:!1})],It.prototype,"hass",void 0),e([ft()],It.prototype,"_config",void 0),It=e([pt("glass-fridge-card")],It);const Gt={green:"var(--g-green)",amber:"var(--g-amber)",cyan:"var(--g-cyan)",purple:"var(--g-purple)",red:"var(--g-red-text)"};let qt=class extends dt{setConfig(t){this._config={name:"Pool Pump",subtitle:"Backyard",...t}}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{name:"Pool Pump",subtitle:"Backyard",switch:"",energy:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||[this._config.switch,this._config.energy].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}_toggle(t){t.stopPropagation(),this._config.switch&&this.hass.callService("homeassistant","toggle",{entity_id:this._config.switch})}render(){if(!this._config||!this.hass)return K;const t=this._config,e=t.switch?this.hass.states[t.switch]:void 0,s=!e||"unavailable"===e.state,i="on"===e?.state,a=Gt[t.color??"green"]??"var(--g-green)",r=s?"var(--g-dim)":i?a:"var(--g-amber)",n=s?"Unavailable":i?"Running":"Idle",o=t.energy?this.hass.states[t.energy]:void 0,l=o&&!Number.isNaN(Number(o.state))?Number(o.state).toFixed(1):"—",c=o?.attributes.unit_of_measurement??"kWh",d=i?"animation:g-spin 1.1s linear infinite;transform-origin:48px 48px;":"",g=i?"animation:g-spin 6s linear infinite;transform-origin:48px 48px;":"";return q`
      <div class="card" style="border-color:${i?`color-mix(in srgb, ${a} 30%, transparent)`:"var(--g-hair)"}">
        <div class="head">
          <div class="ibox" style="background:color-mix(in srgb, ${r} 14%, transparent)">${xt("pool",26,r)}</div>
          <div class="who">
            <div class="title">${t.name}${i?q` <span class="live">LIVE</span>`:K}</div>
            <div class="sub">${t.subtitle}</div>
          </div>
          <span class="pill" style="color:${r}"><span class="dot" style="background:${r}"></span>${n}</span>
        </div>

        <div class="body">
          <div class="impeller">
            <svg viewBox="0 0 96 96" width="96" height="96">
              ${F`
                <circle cx="48" cy="48" r="43" fill="var(--g-panel)" stroke="${i?`color-mix(in srgb, ${r} 45%, transparent)`:"rgba(255,255,255,0.1)"}" stroke-width="2"></circle>
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
              <div class="toggle ${i?"on":""}" @click=${this._toggle}><div class="knob"></div></div>
            </div>
            <div class="hair"></div>
            <div class="energy" @click=${()=>t.energy&&_t(this,"hass-more-info",{entityId:t.energy})}>
              ${xt("bolt",22,"var(--g-amber)")}
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
    `],e([mt({attribute:!1})],qt.prototype,"hass",void 0),e([ft()],qt.prototype,"_config",void 0),qt=e([pt("glass-pool-card")],qt);const Ft={door:"door_front",window:"window",connectivity:"wifi",running:"check_circle"};let Vt=class extends dt{setConfig(t){this._config={name:"Dishwasher",subtitle:"Kitchen",level_max:4,...t}}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{name:"Dishwasher",subtitle:"Kitchen",status:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");if(!e||!this.hass||!this._config)return!0;const s=this._config;return[s.status,s.alert,...s.tiles??[],...s.levels??[]].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}_label(t){let e=this.hass.states[t]?.attributes.friendly_name??t;const s=this._config.name;return s&&e.toLowerCase().startsWith(s.toLowerCase()+" ")&&(e=e.slice(s.length+1)),e}_pretty(t){return t.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}_statusLook(t){const e=t.toLowerCase(),s=this._pretty(t);return/(run|washing|active|start)/.test(e)?{color:"var(--g-cyan)",label:s}:/(complete|finish|clean|done)/.test(e)?{color:"var(--g-green)",label:s}:/(pause|delay)/.test(e)?{color:"var(--g-amber)",label:s}:/(off|idle|power_off|standby)/.test(e)?{color:"var(--g-dim)",label:"Power off"}:{color:"var(--g-dim)",label:s}}_tile(t){const e=this.hass.states[t];if(!e)return K;const s=e.attributes.device_class,i=t.split(".")[0];let a,r=!1;"binary_sensor"===i||"switch"===i?(r="on"===e.state,a="door"===s||"window"===s||"opening"===s?r?"Open":"Closed":"connectivity"===s?r?"Online":"Offline":r?"On":"Off"):a=this._pretty(e.state);return q`<div class="tile" @click=${()=>_t(this,"hass-more-info",{entityId:t})}>
      ${xt(Ft[s??""]??"info",20,"door"===s&&!r||"connectivity"===s&&r?"var(--g-green)":"var(--g-dim)")}
      <div><div class="tv">${a}</div><div class="tl">${this._label(t)}</div></div>
    </div>`}_level(t){const e=this.hass.states[t];if(!e)return K;const s=this._config.level_max??4,i=String(e.state).match(/(\d+(\.\d+)?)/),a=i?Number(i[1]):0,r=Math.max(0,Math.min(100,a/s*100));return q`<div class="lv">
      <div class="lv-h"><span>${this._label(t)}</span><span class="lv-n">${a} / ${s}</span></div>
      <div class="meter"><span style="width:${r}%"></span></div>
    </div>`}render(){if(!this._config||!this.hass)return K;const t=this._config,e=t.status?this.hass.states[t.status]?.state:void 0,s=e?this._statusLook(e):null,i=!!t.alert&&"on"===this.hass.states[t.alert]?.state,a=(t.tiles??[]).filter(t=>this.hass.states[t]),r=(t.levels??[]).filter(t=>this.hass.states[t]);return q`
      <div class="card">
        <div class="head">
          <div class="ibox">${xt("dishwasher_gen",26,"var(--g-dim)")}</div>
          <div class="who"><div class="title">${t.name}</div><div class="sub">${t.subtitle}</div></div>
          ${s?q`<span class="pill" style="color:${s.color}"><span class="dot" style="background:${s.color}"></span>${s.label}</span>`:K}
        </div>

        ${i?q`<div class="alert">${xt("opacity",22,"var(--g-amber)")}<div><div class="a-t">${t.alert_text??"Attention needed"}</div></div></div>`:K}

        ${a.length?q`<div class="tiles">${a.slice(0,3).map(t=>this._tile(t))}</div>`:K}
        ${r.length?q`<div class="levels">${r.map(t=>this._level(t))}</div>`:K}
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
    `],e([mt({attribute:!1})],Vt.prototype,"hass",void 0),e([ft()],Vt.prototype,"_config",void 0),Vt=e([pt("glass-dishwasher-card")],Vt);const Kt={amber:"var(--g-amber)",green:"var(--g-green)",cyan:"var(--g-cyan)",purple:"var(--g-purple)",red:"var(--g-red-text)",dim:"var(--g-dim)"};let Yt=class extends dt{setConfig(t){this._config=t}getCardSize(){return 1}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}_value(){const t=this.hass.states[this._config.entity];if(!t)return"—";const e=this._config.entity.split(".")[0];if("binary_sensor"===e||"switch"===e||"input_boolean"===e||"light"===e)return"on"===t.state?"On":"Off";const s=t.attributes.unit_of_measurement,i=Number(t.state),a=Number.isNaN(i)?t.state.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase()):Math.abs(i)>=100?Math.round(i):i;return s?`${a}${s.startsWith("°")?"":" "}${s}`:String(a)}render(){if(!this._config||!this.hass)return K;if(!this._config.entity)return yt("Select an entity","insights");const t=this.hass.states[this._config.entity],e=t&&("on"===t.state||"home"===t.state||"open"===t.state),s=Kt[this._config.color??(e?"green":"dim")]??"var(--g-dim)",i=this._config.name??t?.attributes.friendly_name??this._config.entity,a=this._config.icon??"insights";return q`
      <div class="card" @click=${()=>_t(this,"hass-more-info",{entityId:this._config.entity})}>
        ${xt(a,24,s)}
        <div class="txt">
          <div class="val">${this._value()}</div>
          <div class="lbl">${i}</div>
        </div>
      </div>
    `}};Yt.styles=[$t,o`
      .card { display: flex; align-items: center; gap: 12px; padding: 16px 18px; border-radius: var(--g-r-tile); background: var(--g-card); border: 1px solid var(--g-hair); cursor: pointer; }
      .card:hover { border-color: var(--g-border-hi); }
      .txt { min-width: 0; }
      .val { font-size: 16px; font-weight: 700; line-height: 1.1; }
      .lbl { font-size: 12px; color: var(--g-dim); margin-top: 1px; }
    `],e([mt({attribute:!1})],Yt.prototype,"hass",void 0),e([ft()],Yt.prototype,"_config",void 0),Yt=e([pt("glass-stat-card")],Yt);let Xt=class extends dt{constructor(){super(...arguments),this._groups=[]}setConfig(t){t.groups?.length?this._groups=t.groups:t.entities?.length?this._groups=[{entities:t.entities}]:this._groups=[],this._config={title:"Lights",...t}}getCardSize(){return 1+this._groups.reduce((t,e)=>t+Math.ceil(e.entities.length/3),0)}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{title:"Lights",entities:[]}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!e||!this.hass||this._all().some(t=>e.states[t]!==this.hass.states[t])}_all(){return this._groups.flatMap(t=>t.entities)}_isOn(t){return"on"===this.hass.states[t]?.state}_toggle(t,e){e.stopPropagation(),this.hass.callService("homeassistant","toggle",{entity_id:t})}_master(t,e){e.stopPropagation();const s=t.entities.some(t=>this._isOn(t));this.hass.callService("light",s?"turn_off":"turn_on",{entity_id:t.entities})}_name(t){return this.hass.states[t]?.attributes.friendly_name??t}render(){if(!this._config||!this.hass)return K;if(!this._all().length)return yt("Add lights","lightbulb");const t=this._all().filter(t=>this._isOn(t)).length;return q`
      <div class="card">
        <div class="hdr">
          <div class="hdr-l">${xt("lightbulb",22,"var(--g-amber)")}<span class="title">${this._config.title}</span></div>
          <div class="meta"><span class="on-n">${t}</span> on</div>
        </div>
        ${this._groups.map(t=>{const e=t.entities.filter(t=>this._isOn(t)).length,s=e>0;return q`
            <div class="group">
              ${t.name?q`<div class="g-hdr">
                    ${xt(t.icon??"home",18,"var(--g-dim)")}
                    <span class="g-name">${t.name}</span>
                    <span class="g-sum">${e}/${t.entities.length}</span>
                    <div class="grow"></div>
                    <div class="toggle ${s?"on":""}" @click=${e=>this._master(t,e)}><div class="knob"></div></div>
                  </div>`:K}
              <div class="tiles">
                ${t.entities.map(t=>{const e=this._isOn(t),s=this.hass.states[t],i=e&&null!=s?.attributes.brightness?`${Math.round(Number(s.attributes.brightness)/255*100)}%`:e?"On":"Off";return q`
                    <button class="lt ${e?"on":""}" @click=${e=>this._toggle(t,e)}>
                      <div class="lt-top">
                        ${xt("lightbulb",20,e?"var(--g-amber-ink)":"var(--g-dim)")}
                        <div class="mini ${e?"on":""}"><div class="mknob"></div></div>
                      </div>
                      <div class="lt-b"><div class="ln">${this._name(t)}</div><div class="ls">${i}</div></div>
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
      .tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
      .lt {
        display: flex; flex-direction: column; justify-content: space-between; gap: 10px;
        min-height: 78px; padding: 12px 13px; border-radius: 16px; cursor: pointer; text-align: left;
        background: var(--g-inset); color: var(--g-text-hi); border: 1px solid var(--g-hair);
        transition: background 0.18s ease, color 0.18s ease;
      }
      .lt.on { background: var(--g-amber); color: var(--g-amber-ink); border-color: transparent; }
      .lt-top { display: flex; align-items: flex-start; justify-content: space-between; }
      .ln { font-size: 13.5px; font-weight: 700; line-height: 1.15; }
      .ls { font-size: 11.5px; margin-top: 2px; opacity: 0.75; }
      /* mini toggle inside a light tile */
      .mini { width: 34px; height: 20px; border-radius: 20px; background: rgba(255, 255, 255, 0.13); position: relative; flex: none; }
      .mini.on { background: rgba(0, 0, 0, 0.22); }
      .mknob { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: #c7ccd3; transition: transform 0.18s; }
      .mini.on .mknob { transform: translateX(14px); background: var(--g-amber-ink); }
    `],e([mt({attribute:!1})],Xt.prototype,"hass",void 0),e([ft()],Xt.prototype,"_config",void 0),Xt=e([pt("glass-lights-card")],Xt);const Jt={scene:"palette",script:"play_arrow",automation:"bolt"};let Qt=class extends dt{constructor(){super(...arguments),this._scenes=[]}setConfig(t){this._scenes=(t.scenes??[]).map(t=>"string"==typeof t?{entity:t}:t),this._config={columns:4,...t}}getCardSize(){return Math.ceil(this._scenes.length/(this._config?.columns??4))+1}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{scenes:[]}}shouldUpdate(){return!0}_activate(t){const e=t.split(".")[0],s="scene"===e?"scene.turn_on":"script"===e?"script.turn_on":"automation"===e?"automation.trigger":"homeassistant.turn_on",[i,a]=s.split(".");this.hass.callService(i,a,{entity_id:t})}render(){return this._config&&this.hass?this._scenes.length?q`
      <div class="card">
        ${this._config.title?q`<div class="hdr"><div class="hdr-l">${xt("auto_awesome",20,"var(--g-amber)")}<span class="title">${this._config.title}</span></div></div>`:K}
        <div class="grid" style="grid-template-columns:repeat(${this._config.columns}, 1fr)">
          ${this._scenes.map(t=>{const e=this.hass.states[t.entity],s=t.name??e?.attributes.friendly_name??t.entity,i=t.icon??Jt[t.entity.split(".")[0]]??"palette";return q`<button class="scene" @click=${()=>this._activate(t.entity)}>${xt(i,24,"var(--g-text-hi)")}<span class="sn">${s}</span></button>`})}
        </div>
      </div>
    `:yt("Add scenes or scripts","auto_awesome"):K}};Qt.styles=[$t,o`
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
    `],e([mt({attribute:!1})],Qt.prototype,"hass",void 0),e([ft()],Qt.prototype,"_config",void 0),Qt=e([pt("glass-scenes-card")],Qt);const Zt=[[255,92,92],[243,208,106],[185,246,166],[135,221,225],[130,170,255],[201,166,255],[255,150,200],[255,244,224]];let te=class extends dt{setConfig(t){this._config=t}getCardSize(){return 4}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}get _st(){return this.hass.states[this._config.entity]}_modes(){return this._st?.attributes.supported_color_modes??[]}_brightPct(){const t=this._st?.attributes.brightness;return null!=t?Math.round(Number(t)/255*100):0}_rgb(){const t=this._st?.attributes.rgb_color;return t&&3===t.length?[t[0],t[1],t[2]]:null}_clickPct(t){const e=t.currentTarget.getBoundingClientRect();return Math.max(0,Math.min(1,(t.clientX-e.left)/e.width))}_toggle(t){t.stopPropagation(),this.hass.callService("light","toggle",{entity_id:this._config.entity})}_setBright(t){const e=Math.max(1,Math.round(100*this._clickPct(t)));this.hass.callService("light","turn_on",{entity_id:this._config.entity,brightness_pct:e})}_setTemp(t){const e=Number(this._st.attributes.min_color_temp_kelvin??2e3),s=Number(this._st.attributes.max_color_temp_kelvin??6500),i=Math.round(e+this._clickPct(t)*(s-e));this.hass.callService("light","turn_on",{entity_id:this._config.entity,color_temp_kelvin:i})}_setRgb(t){this.hass.callService("light","turn_on",{entity_id:this._config.entity,rgb_color:t})}render(){if(!this._config||!this.hass)return K;if(!this._st)return yt("Select a light","lightbulb");const t="on"===this._st.state,e=this._modes(),s=t&&e.some(t=>["brightness","color_temp","hs","rgb","rgbw","rgbww","xy","white"].includes(t)),i=t&&e.includes("color_temp"),a=t&&e.some(t=>["hs","rgb","rgbw","rgbww","xy"].includes(t)),r=this._rgb(),n=this._brightPct(),o=this._config.name??this._st.attributes.friendly_name??this._config.entity,l=t?r?`rgb(${r.join(",")})`:"var(--g-amber)":"var(--g-faint)",c=t?`radial-gradient(circle at 50% 45%, ${r?`rgba(${r.join(",")},0.35)`:"rgba(243,208,106,0.3)"} 0%, transparent 70%)`:"transparent";return q`
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

        ${s?q`<div class="ctl">
              <div class="ctl-h"><span>${xt("brightness_6",16,"var(--g-dim)")}Brightness</span><span class="mono">${n}%</span></div>
              <div class="slider" @click=${this._setBright}><div class="fill bright" style="width:${n}%"></div></div>
            </div>`:K}

        ${i?q`<div class="ctl">
              <div class="ctl-h"><span>${xt("thermostat",16,"var(--g-dim)")}Color temp</span></div>
              <div class="slider temp" @click=${this._setTemp}></div>
            </div>`:K}

        ${a?q`<div class="swatches">
              ${Zt.map(t=>q`<button class="sw" style="background:rgb(${t.join(",")})" @click=${()=>this._setRgb(t)}></button>`)}
            </div>`:K}
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
    `],e([mt({attribute:!1})],te.prototype,"hass",void 0),e([ft()],te.prototype,"_config",void 0),te=e([pt("glass-light-card")],te);const ee={off:{icon:"power_settings_new",color:"var(--g-dim)"},cool:{icon:"ac_unit",color:"var(--g-cyan)"},heat:{icon:"local_fire_department",color:"var(--g-amber)"},dry:{icon:"water_drop",color:"var(--g-purple)"},fan_only:{icon:"mode_fan",color:"var(--g-cyan)"},auto:{icon:"autorenew",color:"var(--g-green)"},heat_cool:{icon:"device_thermostat",color:"var(--g-green)"}};let se=class extends dt{setConfig(t){this._config=t}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}get _st(){return this.hass.states[this._config.entity]}_setTemp(t,e){e.stopPropagation();const s=this._st.attributes,i=Number(s.target_temp_step??.5),a=Number(s.temperature);if(Number.isNaN(a))return;const r=Number(s.min_temp??7),n=Number(s.max_temp??35),o=Math.min(n,Math.max(r,a+t*i));this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:o})}_setMode(t){this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}_setFan(t){this.hass.callService("climate","set_fan_mode",{entity_id:this._config.entity,fan_mode:t})}_toggle(t){t.stopPropagation();if("off"!==this._st.state)this._setMode("off");else{const t=this._st.attributes.hvac_modes??[];this._setMode(t.find(t=>"off"!==t)??"cool")}}render(){if(!this._config||!this.hass)return K;if(!this._st)return yt("Select a climate entity","mode_fan");const t=this._st.attributes,e=this._st.state,s="off"!==e,i=ee[e]??ee.off,a=this._config.name??t.friendly_name??"Aircon",r=t.current_temperature,n=null!=t.temperature?Number(t.temperature):null,o=t.hvac_action??e,l=(t.hvac_modes??[]).filter(t=>"off"!==t),c=t.fan_modes??[];return q`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:color-mix(in srgb, ${i.color} 14%, transparent)">${xt(i.icon,26,i.color)}</div>
          <div class="who"><div class="title">${a}</div><div class="sub">${this._config.subtitle??"Climate"}${null!=r?` · ${r}° now`:""}</div></div>
          <div class="toggle ${s?"on":""}" @click=${this._toggle}><div class="knob"></div></div>
        </div>

        <div class="body">
          <div class="airflow">
            <svg viewBox="0 0 96 96" width="96" height="96">
              <rect x="16" y="20" width="64" height="18" rx="6" fill="var(--g-inset)" stroke="#2a2e36" stroke-width="1.5"></rect>
              <g fill="none" stroke="${i.color}" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 9" style=${s?"animation:g-air 1.1s linear infinite":"opacity:0.25"}>
                <path d="M28 44 Q 24 62 30 80"></path>
                <path d="M48 44 L 48 82"></path>
                <path d="M68 44 Q 72 62 66 80"></path>
              </g>
            </svg>
          </div>
          <div class="right">
            <span class="pill" style="color:${i.color}"><span class="dot" style="background:${i.color}"></span>${o.replace(/_/g," ")}</span>
            <div class="stepper">
              <button class="step" @click=${t=>this._setTemp(-1,t)}>${xt("remove",20)}</button>
              <div class="tgt"><span class="t-num tv">${n??"—"}</span><span class="deg">°C</span><div class="tcap">Set point</div></div>
              <button class="step" @click=${t=>this._setTemp(1,t)}>${xt("add",20)}</button>
            </div>
          </div>
        </div>

        ${l.length?q`<div class="seg">
              ${l.map(t=>q`<button class="sg ${e===t?"on":""}" title=${t} @click=${()=>this._setMode(t)}>${xt((ee[t]??{icon:"circle"}).icon,19)}</button>`)}
            </div>`:K}

        ${c.length?q`<div class="fan-row">
              ${xt("air",18,"var(--g-dim)")}
              <div class="seg fan">
                ${c.map(e=>q`<button class="sg txt ${t.fan_mode===e?"on":""}" @click=${()=>this._setFan(e)}>${e}</button>`)}
              </div>
            </div>`:K}
      </div>
    `}};se.styles=[$t,o`
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
    `],e([mt({attribute:!1})],se.prototype,"hass",void 0),e([ft()],se.prototype,"_config",void 0),se=e([pt("glass-aircon-card")],se);let ie=class extends dt{constructor(){super(...arguments),this._modes=[],this._optimisticOn=null,this._optimisticTimer=null}setConfig(t){this._modes=(t.modes??[]).map(t=>"string"==typeof t?{entity:t}:t),this._config={name:"Geyser",subtitle:"Water heater",min_temp:20,max_temp:70,...t}}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{name:"Geyser",subtitle:"Bathroom",power:"",current:"",target:""}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");if(!e||!this.hass||!this._config)return!0;const s=this._config,i=[s.power,s.current,s.target,s.solar,s.power_sensor,s.solar_mode,...this._modes.map(t=>t.entity)].filter(Boolean);return i.some(t=>e.states[t]!==this.hass.states[t])}updated(t){if(t.has("hass")&&null!==this._optimisticOn&&this._config?.power){const e=this._config.power,s=t.get("hass")?.states[e],i=this.hass?.states[e];s!==i&&(null!==this._optimisticTimer&&(clearTimeout(this._optimisticTimer),this._optimisticTimer=null),this._optimisticOn=null)}}_num(t){const e=t?Number(this.hass.states[t]?.state):NaN;return Number.isNaN(e)?null:e}_isOn(t){if(!t)return!1;const e=this.hass.states[t];return!!e&&("on"===e.state||t.startsWith("water_heater.")&&"off"!==e.state)}_toggle(t,e){if(e.stopPropagation(),!t)return;const s=this._isOn(t);t===this._config?.power&&(this._optimisticOn=!s,null!==this._optimisticTimer&&clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticOn=null,this._optimisticTimer=null},5e3)),t.startsWith("water_heater.")?this.hass.callService("water_heater",s?"turn_off":"turn_on",{entity_id:t}):this.hass.callService("homeassistant","toggle",{entity_id:t})}_step(t,e){e.stopPropagation();const s=this._config.target;if(!s)return;const i=this.hass.states[s];if(!i)return;const a=s.split(".")[0];if("number"===a){const e=Number(i.state);if(Number.isNaN(e))return;const a=Number(i.attributes.min??this._config.min_temp??20),r=Number(i.attributes.max??this._config.max_temp??70),n=Number(i.attributes.step??1);this.hass.callService("number","set_value",{entity_id:s,value:Math.min(r,Math.max(a,e+t*n))})}else{const e=Number(i.attributes.temperature);if(Number.isNaN(e))return;const r=Number(i.attributes.target_temp_step??1);this.hass.callService(a,"set_temperature",{entity_id:s,temperature:e+t*r})}}_target(){const t=this._config.target;if(!t)return null;const e=this.hass.states[t];return e?t.startsWith("number.")?this._num(t):Number(e.attributes.temperature)||null:null}_fillColor(t){return`hsl(${Math.round(200-170*t)}, 72%, 52%)`}render(){if(!this._config||!this.hass)return K;const t=this._config,e=null!==this._optimisticOn?this._optimisticOn:this._isOn(t.power),s=this._num(t.current),i=this._target(),a=t.min_temp??20,r=t.max_temp??70,n=null!=s?Math.max(.05,Math.min(1,(s-a)/(r-a))):.5,o=e&&null!=s&&null!=i?s<i-.5:e,l=e?o?"#ff8c42":"var(--g-green)":"var(--g-dim)",c=e?o?"Heating":"Ready":"Off",d=o?"#ff8c42":"rgba(255,140,66,0.2)",g=this._isOn(t.solar_mode);return q`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:rgba(255,140,66,0.14)">${xt("water_heater",26,l)}</div>
          <div class="who"><div class="title">${t.name}</div><div class="sub">${t.subtitle}</div></div>
          ${t.power?q`<div class="toggle ${e?"on":""}" @click=${e=>this._toggle(t.power,e)}><div class="knob"></div></div>`:K}
        </div>

        <div class="body">
          <div class="tank">
            <div class="water" style="height:${100*n}%;background:linear-gradient(180deg, ${this._fillColor(n)}, ${this._fillColor(Math.min(1,n+.25))})">
              <div class="shimmer"></div>
            </div>
            <div class="element" style="background:${d};box-shadow:0 0 12px ${d}"></div>
            ${o?q`<span class="rise" style="left:24px"></span><span class="rise" style="left:44px;animation-delay:.5s"></span><span class="rise" style="left:62px;animation-delay:1s"></span>`:K}
            <div class="cur">${null!=s?Math.round(s):"—"}°</div>
          </div>

          <div class="right">
            <span class="pill" style="color:${l}"><span class="dot" style="background:${l}"></span>${c}</span>
            <div class="stepper">
              <button class="step" @click=${t=>this._step(-1,t)}>${xt("remove",20)}</button>
              <div class="tgt"><span class="t-num tv">${i??"—"}<span class="deg">°C</span></span><div class="tcap">Target temp</div></div>
              <button class="step" @click=${t=>this._step(1,t)}>${xt("add",20)}</button>
            </div>
            ${t.solar||t.power_sensor?q`<div class="tiles">
                  ${t.solar?q`<div class="tile"><div class="th">${xt("wb_sunny",14,"var(--g-amber)")}Solar</div><div class="t-num tvv">${this._num(t.solar)??"—"}°</div></div>`:K}
                  ${t.power_sensor?q`<div class="tile"><div class="th">${xt("bolt",14,"var(--g-purple)")}Power</div><div class="t-num tvv">${this._num(t.power_sensor)??"—"} <span class="u">kW</span></div></div>`:K}
                </div>`:K}
          </div>
        </div>

        ${t.solar_mode||this._modes.length?q`<div class="modes">
              ${t.solar_mode?q`<button class="mode ${g?"on":""}" @click=${e=>this._toggle(t.solar_mode,e)}>${xt("wb_sunny",18,g?"var(--g-amber-ink)":"var(--g-amber)")}Solar</button>`:K}
              ${this._modes.map(t=>{const e=this._isOn(t.entity),s=t.name??this.hass.states[t.entity]?.attributes.friendly_name??t.entity;return q`<button class="mode ${e?"on":""}" @click=${e=>this._toggle(t.entity,e)}>${xt(t.icon??"bolt",18,e?"var(--g-amber-ink)":"var(--g-dim)")}${s}</button>`})}
            </div>`:K}
      </div>
    `}};ie.styles=[$t,o`
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
    `],e([mt({attribute:!1})],ie.prototype,"hass",void 0),e([ft()],ie.prototype,"_config",void 0),e([ft()],ie.prototype,"_optimisticOn",void 0),ie=e([pt("glass-geyser-card")],ie);const ae={light:"lightbulb",switch:"toggle_on",fan:"mode_fan",input_boolean:"toggle_on",script:"play_arrow",automation:"bolt",scene:"palette"};let re=class extends dt{constructor(){super(...arguments),this._items=[]}setConfig(t){this._items=(t.entities??[]).map(t=>"string"==typeof t?{entity:t}:t),this._config={columns:4,...t}}getCardSize(){return Math.ceil(this._items.length/(this._config?.columns??4))+1}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entities:[]}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!e||!this.hass||this._items.some(t=>e.states[t.entity]!==this.hass.states[t.entity])}_toggle(t){this.hass.callService("homeassistant","toggle",{entity_id:t})}render(){return this._config&&this.hass?this._items.length?q`
      <div class="card">
        ${this._config.title?q`<div class="hdr"><div class="hdr-l">${xt("grid_view",20,"var(--g-amber)")}<span class="title">${this._config.title}</span></div></div>`:K}
        <div class="grid" style="grid-template-columns:repeat(${this._config.columns}, 1fr)">
          ${this._items.map(t=>{const e=this.hass.states[t.entity],s=e&&("on"===e.state||"open"===e.state||"home"===e.state||"playing"===e.state),i=t.entity.split(".")[0],a=t.icon??ae[i]??"circle",r=t.name??e?.attributes.friendly_name??t.entity,n=e?s?"On":"off"===e.state?"Off":e.state:"n/a";return q`
              <button class="q ${s?"on":""}" @click=${()=>this._toggle(t.entity)} title=${r}>
                ${xt(a,22,s?"var(--g-amber-ink)":"var(--g-dim)")}
                <div class="qt"><div class="qn">${r}</div><div class="qs">${n}</div></div>
              </button>
            `})}
        </div>
      </div>
    `:yt("Add entities to toggle","grid_view"):K}};re.styles=[$t,o`
      .card { display: flex; flex-direction: column; gap: 14px; }
      .grid { display: grid; gap: 12px; }
      .q {
        aspect-ratio: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 8px;
        padding: 13px;
        border-radius: 16px;
        cursor: pointer;
        text-align: left;
        background: var(--g-inset);
        border: 1px solid var(--g-hair);
        color: var(--g-text-hi);
        transition: background 0.18s ease, color 0.18s ease;
      }
      .q.on { background: var(--g-amber); color: var(--g-amber-ink); border-color: transparent; }
      .q:hover { border-color: var(--g-border-hi); }
      .qn { font-size: 13px; font-weight: 700; line-height: 1.15; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .qs { font-size: 11.5px; margin-top: 2px; opacity: 0.75; text-transform: capitalize; }
    `],e([mt({attribute:!1})],re.prototype,"hass",void 0),e([ft()],re.prototype,"_config",void 0),re=e([pt("glass-toggle-grid-card")],re);const ne={heat:{icon:"local_fire_department",color:"var(--g-amber)",label:"Heat"},cool:{icon:"ac_unit",color:"var(--g-cyan)",label:"Cool"},auto:{icon:"autorenew",color:"var(--g-green)",label:"Auto"},heat_cool:{icon:"device_thermostat",color:"var(--g-green)",label:"Auto"},off:{icon:"power_settings_new",color:"var(--g-dim)",label:"Off"}};let oe=class extends dt{setConfig(t){this._config=t}getCardSize(){return 3}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{entity:"",name:"Heat Pump",subtitle:"Pool heater"}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!(e&&this.hass&&this._config)||e.states[this._config.entity]!==this.hass.states[this._config.entity]}get _st(){return this._config.entity?this.hass.states[this._config.entity]:void 0}_step(t,e){e.stopPropagation();const s=this._st.attributes,i=Number(s.target_temp_step??.5),a=Number(s.temperature);if(Number.isNaN(a))return;const r=Number(s.min_temp??15),n=Number(s.max_temp??40);this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:Math.min(n,Math.max(r,a+t*i))})}_setMode(t){this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}_toggle(t){t.stopPropagation();if("off"!==this._st.state)this._setMode("off");else{const t=this._st.attributes.hvac_modes??[];this._setMode(t.find(t=>"off"!==t)??"heat")}}render(){if(!this._config||!this.hass)return K;const t=this._st;if(!t)return yt("Select a heat-pump (climate) entity","heat_pump");const e=t.attributes,s=t.state,i="off"!==s,a=ne[s]??ne.off,r=this._config.name??e.friendly_name??"Heat Pump",n=null!=e.temperature?Number(e.temperature):null,o=Number(e.min_temp??15),l=Number(e.max_temp??40),c=null!=n?Math.max(0,Math.min(100,(n-o)/(l-o)*100)):0,d=(e.hvac_action??s).replace(/_/g," "),g=(e.hvac_modes??[]).filter(t=>["heat","cool","auto","heat_cool"].includes(t));return q`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:color-mix(in srgb, ${a.color} 14%, transparent)">${xt("heat_pump",26,a.color)}</div>
          <div class="who"><div class="title">${r}</div><div class="sub">${this._config.subtitle??"Heater"}</div></div>
          <div class="toggle ${i?"on":""}" @click=${this._toggle}><div class="knob"></div></div>
        </div>

        <div class="dial">
          <button class="step" @click=${t=>this._step(-1,t)}>${xt("remove",22)}</button>
          <div class="ring" style="background:conic-gradient(${a.color} 0 ${c}%, rgba(255,255,255,0.07) ${c}% 100%)">
            <div class="ring-in">
              <div class="t-num tv">${n??"—"}<span class="deg">°</span></div>
              <span class="pill" style="color:${a.color}"><span class="dot" style="background:${a.color}"></span>${d}</span>
            </div>
          </div>
          <button class="step" @click=${t=>this._step(1,t)}>${xt("add",22)}</button>
        </div>

        ${g.length?q`<div class="seg">
              ${g.map(t=>{const e=ne[t]??ne.off;return q`<button class="sg ${s===t?"on":""}" @click=${()=>this._setMode(t)}>${xt(e.icon,17)}${e.label}</button>`})}
            </div>`:K}
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
    `],e([mt({attribute:!1})],oe.prototype,"hass",void 0),e([ft()],oe.prototype,"_config",void 0),oe=e([pt("glass-heatpump-card")],oe);let le=class extends dt{constructor(){super(...arguments),this._metrics=[]}setConfig(t){this._metrics=(t.metrics??[]).map(t=>"string"==typeof t?{entity:t}:t),this._config={title:"Water Chemistry",...t}}getCardSize(){return this._metrics.length+1}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{title:"Water Chemistry",metrics:[]}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!e||!this.hass||this._metrics.some(t=>e.states[t.entity]!==this.hass.states[t.entity])}_row(t){const e=this.hass.states[t.entity];if(!e)return q`<div class="row"><div class="miss">${t.entity} not found</div></div>`;const s=Number(e.state),i=!Number.isNaN(s),a=t.unit??e.attributes.unit_of_measurement??"",r=t.label??e.attributes.friendly_name??t.entity,n=t.color??"var(--g-cyan)",o=t.min??0,l=t.max??(i?Math.max(2*s,1):100),c=i?Math.max(0,Math.min(100,(s-o)/(l-o)*100)):0;let d=null;null==t.ok_min&&null==t.ok_max||(d=i&&(null==t.ok_min||s>=t.ok_min)&&(null==t.ok_max||s<=t.ok_max)?{label:"OK",cls:"green"}:i&&null!=t.ok_min&&s<t.ok_min?{label:"Low",cls:"amber"}:{label:"High",cls:"red"});const g=null!=t.ok_min?Math.max(0,Math.min(100,(t.ok_min-o)/(l-o)*100)):0,p=null!=t.ok_max?Math.max(0,Math.min(100,(t.ok_max-o)/(l-o)*100)):100;return q`
      <div class="row" @click=${()=>_t(this,"hass-more-info",{entityId:t.entity})}>
        <div class="well" style="background:color-mix(in srgb, ${n} 14%, transparent)">${xt(t.icon??"science",22,n)}</div>
        <div class="body">
          <div class="top">
            <div class="lhs"><span class="lbl">${r}</span>${d?q`<span class="badge ${d.cls}">${d.label}</span>`:K}</div>
            <div class="val"><span class="t-num">${i?s:e.state}</span> <span class="u">${a}</span></div>
          </div>
          <div class="bar">
            <div class="zone" style="left:${g}%;right:${100-p}%"></div>
            <div class="dot" style="left:${c}%;background:${n}"></div>
          </div>
        </div>
      </div>
    `}render(){return this._config&&this.hass?this._metrics.length?q`
      <div class="card">
        <div class="hdr"><div class="hdr-l">${xt("water_drop",22,"var(--g-cyan)")}<span class="title">${this._config.title}</span></div></div>
        <div class="metrics">${this._metrics.map(t=>this._row(t))}</div>
      </div>
    `:yt("Add water metrics (pH, chlorine, …)","science"):K}};le.styles=[$t,o`
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
    `],e([mt({attribute:!1})],le.prototype,"hass",void 0),e([ft()],le.prototype,"_config",void 0),le=e([pt("glass-water-chemistry-card")],le);let ce=class extends dt{constructor(){super(...arguments),this._onLocation=()=>this.requestUpdate()}setConfig(t){this._config={variant:"dock",fixed:!0,max_width:900,items:[],...t}}getCardSize(){return 1}static getConfigElement(){return document.createElement("glass-config-editor")}static getStubConfig(){return{variant:"dock",fixed:!0,items:[{icon:"home",label:"Home",path:"/lovelace/0"},{icon:"lightbulb",label:"Lights",path:"/lovelace/lights"},{icon:"thermostat",label:"Climate",path:"/lovelace/climate"},{icon:"bolt",label:"Energy",path:"/lovelace/energy"},{icon:"security",label:"Security",path:"/lovelace/security"}]}}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this._onLocation),window.addEventListener("popstate",this._onLocation)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("location-changed",this._onLocation),window.removeEventListener("popstate",this._onLocation)}_navigate(t){t&&(history.pushState(null,"",t),window.dispatchEvent(new Event("location-changed")))}_active(t){const e=window.location.pathname;return!!t&&(e===t||e.startsWith(t+"/"))}render(){if(!this._config)return K;const t=this._config,e="pill"===t.variant,s=t.fixed?"position:fixed;left:0;right:0;bottom:0;z-index:6;display:flex;justify-content:center;padding:12px 16px calc(12px + env(safe-area-inset-bottom));":"display:flex;justify-content:center;",i=t.items.map(t=>{const s=this._active(t.path);return q`
        <button class="item ${e?"pill":""} ${s?"active":""}" @click=${()=>this._navigate(t.path)} title=${t.label??""}>
          ${xt(t.icon,e?22:24,s?"var(--g-amber-ink)":"var(--g-dim)")}
          ${t.label?q`<span class="lbl">${t.label}</span>`:K}
        </button>
      `});return q`
      <div class="wrap" style=${s}>
        <div class="bar ${e?"pill":"dock"}" style="max-width:${t.max_width}px">${i}</div>
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
    `],e([mt({attribute:!1})],ce.prototype,"hass",void 0),e([ft()],ce.prototype,"_config",void 0),ce=e([pt("glass-nav-card")],ce);const de=(t,e=!1)=>({entity:{...t?{domain:t}:{},...e?{multiple:!0}:{}}}),ge={text:{}},pe=(t,e)=>({number:{min:t,max:e,mode:"box"}}),he=t=>({select:{mode:"dropdown",options:t}}),ue={"glass-person-card":[{name:"title",selector:ge},{name:"entities",required:!0,selector:de("person",!0)}],"glass-weather-card":[{name:"entity",required:!0,selector:de("weather")},{name:"sun",selector:de("sun")},{name:"humidity",selector:de("sensor")}],"glass-camera-card":[{name:"entity",required:!0,selector:de("camera")},{name:"name",selector:ge},{name:"icon",selector:ge}],"glass-alarm-card":[{name:"entity",required:!0,selector:de("alarm_control_panel")},{name:"variant",selector:he([{value:"shield",label:"Shield (default)"},{value:"radial",label:"Radial"},{value:"bar",label:"Compact bar"},{value:"keypad",label:"Keypad"},{value:"triggered",label:"Triggered / status"}])},{name:"name",selector:ge},{name:"subtitle",selector:ge},{name:"code",selector:ge},{name:"code_length",selector:pe(1,8)},{name:"buttons",selector:{select:{multiple:!0,mode:"list",options:[{value:"disarm",label:"Disarm"},{value:"arm_home",label:"Arm Home"},{value:"arm_away",label:"Arm Away"},{value:"arm_night",label:"Arm Night"},{value:"arm_vacation",label:"Arm Vacation"}]}}}],"glass-media-card":[{name:"entity",required:!0,selector:de("media_player")},{name:"name",selector:ge}],"glass-flight-card":[{name:"entity",required:!0,selector:de("sensor")},{name:"title",selector:ge},{name:"max",selector:pe(1,10)}],"glass-tile-card":[{name:"entity",required:!0,selector:de()},{name:"name",selector:ge},{name:"icon",selector:ge}],"glass-energy-card":[{name:"title",selector:ge},{name:"variant",selector:he([{value:"flow",label:"Power flow (default)"},{value:"ring",label:"Battery ring"},{value:"stats",label:"Stat trio"},{value:"meters",label:"Meters"},{value:"production",label:"Production bars"}])},{name:"solar",selector:de("sensor")},{name:"grid",selector:de("sensor")},{name:"battery",selector:de("sensor")},{name:"battery_soc",selector:de("sensor")},{name:"house",selector:de("sensor")},{name:"today",selector:de("sensor")},{name:"imported",selector:de("sensor")},{name:"exported",selector:de("sensor")},{name:"saved",selector:de("sensor")},{name:"meters",selector:de("sensor",!0)},{name:"production",selector:de("sensor")}],"glass-sensor-list-card":[{name:"title",selector:ge},{name:"entities",required:!0,selector:de(["cover","binary_sensor"],!0)}],"glass-appliance-card":[{name:"name",selector:ge},{name:"subtitle",selector:ge},{name:"icon",selector:ge},{name:"icon_color",selector:{select:{mode:"dropdown",options:["cyan","amber","green","purple","red"]}}},{name:"status",selector:de(["sensor","binary_sensor"])},{name:"remaining",selector:de("sensor")},{name:"total",selector:de("sensor")},{name:"toggle",selector:de(["switch","input_boolean"])},{name:"stats",selector:de(["sensor","binary_sensor","number"],!0)}],"glass-fridge-card":[{name:"name",selector:ge},{name:"subtitle",selector:ge},{name:"door",selector:de("binary_sensor")},{name:"wifi",selector:de("binary_sensor")},{name:"fridge_temp",selector:de("number")},{name:"freezer_temp",selector:de("number")},{name:"toggles",selector:de(["switch","input_boolean"],!0)}],"glass-pool-card":[{name:"name",selector:ge},{name:"subtitle",selector:ge},{name:"switch",selector:de(["switch","input_boolean"])},{name:"energy",selector:de("sensor")},{name:"color",selector:he(["green","amber","cyan","purple","red"])}],"glass-stat-card":[{name:"entity",required:!0,selector:de()},{name:"name",selector:ge},{name:"icon",selector:ge},{name:"color",selector:he(["amber","green","cyan","purple","red","dim"])}],"glass-lights-card":[{name:"title",selector:ge},{name:"entities",required:!0,selector:de("light",!0)}],"glass-scenes-card":[{name:"title",selector:ge},{name:"columns",selector:pe(2,6)},{name:"scenes",required:!0,selector:de(["scene","script","automation"],!0)}],"glass-toggle-grid-card":[{name:"title",selector:ge},{name:"columns",selector:pe(2,8)},{name:"entities",required:!0,selector:de(["light","switch","fan","input_boolean","script","scene"],!0)}],"glass-heatpump-card":[{name:"entity",required:!0,selector:de("climate")},{name:"name",selector:ge},{name:"subtitle",selector:ge}],"glass-water-chemistry-card":[{name:"title",selector:ge},{name:"metrics",selector:de("sensor",!0)}],"glass-nav-card":[{name:"variant",selector:he([{value:"dock",label:"Full-width dock"},{value:"pill",label:"Floating pill"}])},{name:"fixed",selector:{boolean:{}}},{name:"max_width",selector:pe(320,1600)}],"glass-light-card":[{name:"entity",required:!0,selector:de("light")},{name:"name",selector:ge},{name:"subtitle",selector:ge}],"glass-aircon-card":[{name:"entity",required:!0,selector:de("climate")},{name:"name",selector:ge},{name:"subtitle",selector:ge}],"glass-geyser-card":[{name:"name",selector:ge},{name:"subtitle",selector:ge},{name:"power",selector:de(["switch","input_boolean","water_heater"])},{name:"current",selector:de("sensor")},{name:"target",selector:de(["number","water_heater","climate"])},{name:"min_temp",selector:pe(0,100)},{name:"max_temp",selector:pe(0,100)},{name:"solar",selector:de("sensor")},{name:"power_sensor",selector:de("sensor")},{name:"solar_mode",selector:de(["switch","input_boolean"])},{name:"modes",selector:de(["switch","input_boolean"],!0)}],"glass-dishwasher-card":[{name:"name",selector:ge},{name:"subtitle",selector:ge},{name:"status",selector:de("sensor")},{name:"alert",selector:de("binary_sensor")},{name:"alert_text",selector:ge},{name:"tiles",selector:de(["binary_sensor","sensor"],!0)},{name:"levels",selector:de("sensor",!0)},{name:"level_max",selector:pe(1,10)}]},me={entity:"Entity",entities:"Entities",title:"Title",name:"Name (optional)",icon:"Icon (optional)",sun:"Sun entity (for sunrise/sunset)",humidity:"Humidity sensor (optional)",code:"Arm/disarm code (optional)",max:"Max flights to show",buttons:"Action buttons to show",variant:"Layout / style",code_length:"Keypad code length",today:"Solar-today energy sensor (big number)",imported:"Imported-today sensor",exported:"Exported-today sensor",saved:"Money-saved sensor",meters:"Percentage sensors to show as meters",production:"Production sensor for hourly bars (needs statistics)",subtitle:"Subtitle (e.g. room/area)",icon_color:"Icon accent colour",status:"Status sensor (drives the pill)",remaining:"Remaining-time sensor (timestamp → progress ring)",total:"Total-time sensor (minutes, for the ring %)",toggle:"Power switch (optional on/off button)",stats:"Extra sensors shown as stat tiles",door:"Door sensor",wifi:"Wi-Fi / connectivity sensor (optional)",fridge_temp:"Fridge temperature (number entity)",freezer_temp:"Freezer temperature (number entity)",toggles:"Feature switches (Express cool/mode, etc.)",switch:"Pump switch",energy:"Energy sensor (kWh)",color:"Accent colour",columns:"Columns",scenes:"Scenes / scripts to show",alert:"Alert sensor (e.g. refill needed)",alert_text:"Alert message",tiles:"Status tiles",levels:"Level sensors (shown as bars)",level_max:"Level bar maximum",power:"Power switch (on/off)",current:"Current temperature sensor",target:"Target temperature (number / thermostat)",min_temp:"Minimum temperature",max_temp:"Maximum temperature",solar:"Solar collector temperature sensor",power_sensor:"Power draw sensor (kW)",solar_mode:"Solar mode switch (toggleable)",modes:"Extra mode switches (boost, element, timer)",metrics:"Water metric sensors (pH, chlorine, …)",fixed:"Stick to bottom of screen",max_width:"Maximum width (px)",solar:"Solar power sensor",grid:"Grid power sensor (+import / −export)",battery:"Battery power sensor (+discharge / −charge)",battery_soc:"Battery charge % sensor",house:"House load sensor (optional; derived if empty)"},fe={icon:"Material Symbols name, e.g. lightbulb, garage, kitchen",code:"Only if your panel requires a code to arm/disarm"};let ve=class extends dt{constructor(){super(...arguments),this._label=t=>me[t.name]??t.name,this._helper=t=>fe[t.name]??""}setConfig(t){this._config=t}_valueChanged(t){if(t.stopPropagation(),!this._config)return;const e={...this._config,...t.detail.value,type:this._config.type};_t(this,"config-changed",{config:e})}render(){if(!this.hass||!this._config)return K;const t=this._config.type.replace(/^custom:/,""),e=ue[t];return e?q`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:q`<div class="fallback">No visual editor for <code>${this._config.type}</code> — edit in YAML.</div>`}};ve.styles=o`
    .fallback { padding: 12px; color: var(--secondary-text-color, #8b9099); font-size: 14px; }
    code { font-family: monospace; }
  `,e([mt({attribute:!1})],ve.prototype,"hass",void 0),e([ft()],ve.prototype,"_config",void 0),ve=e([pt("glass-config-editor")],ve);const be="0.12.0";!function(){if(t||"undefined"==typeof document)return;t=!0;const e=[{rel:"stylesheet",href:"/local/glass-fonts/glass-fonts.css"},{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400,0..1,0&display=swap"}];for(const t of e){if(t.href&&document.head.querySelector(`link[href="${t.href}"]`))continue;const e=document.createElement("link");Object.assign(e,t),document.head.appendChild(e)}}();const _e=window;_e.customCards=_e.customCards||[],_e.customCards.push({type:"glass-person-card",name:"Glass Person Card",description:"Household presence with avatars, Midnight style.",preview:!0},{type:"glass-weather-card",name:"Glass Weather Card",description:"Conditions, temperature and sun/humidity tiles.",preview:!0},{type:"glass-camera-card",name:"Glass Camera Card",description:"Live camera tile with timestamp and LIVE badge.",preview:!0},{type:"glass-alarm-card",name:"Glass Alarm Card",description:"Alarm panel with shield and arm/disarm actions.",preview:!0},{type:"glass-energy-card",name:"Glass Energy Card",description:"Solar / grid / battery power-flow diagram.",preview:!0},{type:"glass-tile-card",name:"Glass Tile Card",description:"Compact entity tile: lights, switches, sensors.",preview:!0},{type:"glass-sensor-list-card",name:"Glass Sensor List Card",description:"Doors, windows and covers with animated state icons.",preview:!0},{type:"glass-media-card",name:"Glass Media Card",description:"Media player with album art, progress and transport.",preview:!0},{type:"glass-flight-card",name:"Glass Flight Card",description:"Aircraft overhead via Flightradar24.",preview:!0},{type:"glass-appliance-card",name:"Glass Appliance Card",description:"Washer / dishwasher: status, progress ring, stats.",preview:!0},{type:"glass-fridge-card",name:"Glass Fridge Card",description:"Refrigerator: fridge/freezer temp steppers, door, express modes.",preview:!0},{type:"glass-pool-card",name:"Glass Pool Pump Card",description:"Pool pump: animated impeller, switch, energy used.",preview:!0},{type:"glass-dishwasher-card",name:"Glass Dishwasher Card",description:"Dishwasher: status, refill alert, tiles, level bars.",preview:!0},{type:"glass-stat-card",name:"Glass Stat Card",description:"Compact stat tile: icon, value, label.",preview:!0},{type:"glass-lights-card",name:"Glass Lights Card",description:"Lights grouped by area with master toggles.",preview:!0},{type:"glass-scenes-card",name:"Glass Scenes Card",description:"Scene / script buttons.",preview:!0},{type:"glass-light-card",name:"Glass Light Card",description:"Single light: brightness, colour temp, RGB swatches.",preview:!0},{type:"glass-aircon-card",name:"Glass Aircon Card",description:"Climate thermostat: modes, fan speed, airflow.",preview:!0},{type:"glass-geyser-card",name:"Glass Geyser Card",description:"Water heater: tank, target temp, toggleable solar mode.",preview:!0},{type:"glass-toggle-grid-card",name:"Glass Toggle Grid Card",description:"Square tap-to-toggle tiles (no dimmer) for any switchables.",preview:!0},{type:"glass-heatpump-card",name:"Glass Heat Pump Card",description:"Pool heat-pump thermostat: ring dial, heat/cool/auto.",preview:!0},{type:"glass-water-chemistry-card",name:"Glass Water Chemistry Card",description:"Pool metrics (pH, chlorine, …) with in-range bars.",preview:!0},{type:"glass-nav-card",name:"Glass Bottom Nav Card",description:"Bottom navigation — dock or floating pill, sticks to screen bottom.",preview:!0}),console.info(`%c GLASS-CARDS %c v${be} `,"background:#f3d06a;color:#16181d;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px","background:#16181d;color:#b9f6a6;border-radius:0 4px 4px 0;padding:2px 6px");export{be as GLASS_VERSION};
