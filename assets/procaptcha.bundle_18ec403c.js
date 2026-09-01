import{C as e,w as t}from"./c7f8be86c-BOv8--t_.js";import{o as n}from"./web2Chunk-CkLRnb53.js";import{b as r,c as i,d as a,f as o,l as s,m as c,o as l,p as u,s as d,u as f,v as p,y as m}from"./dist-1EhK3FhO.js";import{t as h}from"./loadI18next-D1P7USev.js";import{t as g}from"./language-C1WK7w3L.js";function _(e){let t=document.createElement(`div`);t.className=`prosopo-checkbox`;let n=t.attachShadow({mode:`open`});return n.innerHTML=b(e)+y,t}var v=e=>{let t=(e.shadowRoot||e).querySelector(`.prosopo-checkbox`);return t?(t.shadowRoot||t).querySelector(`.prosopo-checkbox__content`):null},y=`
    <div class="prosopo-checkbox__outer">
        <div class="prosopo-checkbox__wrapper">
            <div class="prosopo-checkbox__inner">
                <div class="prosopo-checkbox__content">
                    <div class="${a}" aria-label="Loading spinner"></div>
                </div>
            </div>
        </div>
    </div>
`,b=e=>`
<style>
:host(.prosopo-checkbox) {
    display: flex;
    flex-direction: column;
}

.prosopo-checkbox__outer {
    align-items: center;
    flex: 0 1 auto !important;
    width: auto !important;
    display: flex !important;
}

.prosopo-checkbox__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    vertical-align: middle;
}

.prosopo-checkbox__inner {
    display: flex;
}

.prosopo-checkbox__content {
    display: inline-flex;
}

.${a} {
    margin-top: 0;
    margin-left: 15px !important;
    margin-right: 15px !important;
    width: 28px !important;
    height: 28px !important;
    border: 4px solid ${e.palette.border};
    border-bottom-color: ${e.palette.primary.main};
    border-radius: 50%;
    display: inherit;
    box-sizing: border-box;
    animation: ${a}-rotation 1s linear infinite;
    will-change: transform;
}

@keyframes ${a}-rotation {
  0% {
	transform: rotate(0deg);
  }
  100% {
	transform: rotate(360deg);
  }
}
</style>
`;function x(e){let t=document.createElement(`div`);return t.className=`prosopo-logo-container`,t.innerHTML=S+C(e),t}var S=`
<style>
.prosopo-logo-container {
    display: flex !important;
    margin-left: auto !important;
    width: auto !important;
    flex-shrink: 0 !important;
    align-items: center !important;
    justify-content: center !important;
    margin-inline-start: auto !important;
}

.prosopo-logo-container a {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    text-decoration: none !important;
    gap: 2px !important;
    padding: 0 8px !important;
}

.prosopo-logo-text {
    all: unset;
    display: block !important;
    font-size: 9px !important;
    font-weight: bold !important;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif !important;
    line-height: 1 !important;
    text-align: center !important;
}

#prosopo-logo {
    width: 28px !important;
    height: 28px !important;
    display: block !important;
}
</style>
`;function C(e){return`
<a href="${c}/" target="_blank" rel="noopener" style="color: ${e.palette.logoFill};">
    <svg id="prosopo-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.010001 49.009997" style="fill: ${e.palette.logoFill};" aria-hidden="true">
        <g transform="matrix(0.11319331,0,0,0.11319331,6.504999,-2.2052113e-4)">
            <g>
                <path d="m 119.79,50.5 a 147.75,147.75 0 0 1 147.75,147.75 h 50.5 C 318.04,88.76 229.28,0 119.79,0 Z"></path>
                <path d="m 53.6,116.7 a 147.74,147.74 0 0 1 147.74,147.74 h 50.5 C 251.84,154.95 163.09,66.2 53.6,66.2 Z"></path>
                <path d="M 198.24,382.48 A 147.75,147.75 0 0 1 50.5,234.74 H 0 c 0,109.49 88.75,198.24 198.24,198.24 z"></path>
                <path d="M 264.41,316.31 A 147.74,147.74 0 0 1 116.67,168.56 H 66.16 c 0,109.49 88.76,198.25 198.25,198.25 z"></path>
            </g>
        </g>
    </svg>
    <span class="prosopo-logo-text">Prosopo</span>
</a>
`}e();function ee(e){let t=document.createElement(`div`);t.className=`prosopo-widget`;let n=_(e),r=x(e);return t.innerHTML=E(e)+T(A()),w(t,`.prosopo-widget__checkbox`,n),w(t,`.prosopo-widget__logo`,r),t}function w(e,t,n){let r=e.querySelector(t);if(r===null)throw Error(`widget skeleton has no ${t} placeholder`);r.replaceWith(n)}function T(e){return`
<div class="prosopo-widget__outer">
	<div class="prosopo-widget__wrapper">
		<div class="prosopo-widget__inner">
			<div class="prosopo-widget__dimensions" ${e?`data-cy="captcha-checkbox"`:``}>
				<div class="prosopo-widget__content">
					<div class="prosopo-widget__checkbox"></div>
					<div class="prosopo-widget__logo"></div>
				</div>
			</div>
		</div>
	</div>
</div>
`}function E(e){return`
<style>
.prosopo-widget {
    width: 100%;
    min-height: ${u}
}

.prosopo-widget::after,
.prosopo-widget a::before,
.prosopo-widget a::after {
  content: none !important;
  display: none !important;
}

.prosopo-widget__outer {
    max-width: ${o};
    min-height: 100%;
    overflow-x: auto;
    width: 100%;
    font-family: ${e.font.fontFamily};
    color: ${e.font.color};
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.prosopo-widget__outer::-webkit-scrollbar {
    display: none;
}

.prosopo-widget__wrapper {
    container-type: size;
    container-name: prosopo-widget;
    display: flex;
    flex-direction: column;
    height: 80px;
    min-width: 170px;
}

.prosopo-widget__inner {
    max-height: 100%;
    min-width: 100%;
    overflow: hidden;
    height: 80px;
    width: 100%;
    display: grid;
}

.prosopo-widget__dimensions {
    max-width: ${o};
    min-height: 80px;
}

.prosopo-widget__content {
    padding: 2px;
    border: ${s};
    background-color: ${e.palette.surface};
    border-color: ${e.palette.border};
    border-radius: ${f};
    transition: background-image 0.15s ease, border-color 0.15s ease;
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    justify-content: space-between !important;
    width: 100% !important;
    box-sizing: border-box;
    min-height: 74px;
    height: 100%;
    direction: ltr !important;
}

/* Shadowless hover: an M3 state layer (onSurface at 8%) laid over the surface
   as a gradient overlay, so the background-color token stays untouched. */
.prosopo-widget__content:hover {
    background-image: linear-gradient(
        ${i(e.palette.onSurface,e.stateLayer.hover)},
        ${i(e.palette.onSurface,e.stateLayer.hover)}
    );
}
</style>
`}var D=()=>({nodeEnv:t===void 0?void 0:`production`,bundlerMode:O()}),O=()=>{try{return import.meta.env?.MODE}catch{return}};function k(e=D()){return e.nodeEnv??e.bundlerMode}var A=(e=D())=>k(e)!==`production`,j=e=>{e.style.display=`flex`,e.style.flexDirection=`column`,e.style.width=`100%`,e.style.maxWidth=o};function M(e,t,n){let r=document.createElement(n);j(r);let i=ee(t);r.appendChild(i),e.innerHTML=``,e.appendChild(r);let a=v(r);if(!(a instanceof HTMLElement))throw Error(`Fail to initialize widget: interactive area is not found`);return{widgetInteractiveArea:a,webComponent:r}}var N=e=>{for(let t of e){let e=document.querySelector(`script[src*="${t}"]`);if(e)return e}return null},P=e=>{let t=N(e);if(t){let e=new URLSearchParams(t.src.split(`?`)[1]);return{onloadUrlCallback:e.get(`onload`)||void 0,renderExplicit:e.get(`render`)||void 0}}return{onloadUrlCallback:void 0,renderExplicit:void 0}},F=class{constructor(e){this.widgetThemeResolver=e,this.captchaRenderer=null,this._i18n=null}get i18n(){if(this._i18n===null)throw Error(`I18n is not initialized`);return this._i18n}async createWidgets(e,t,n=!0,r=!1){return Promise.all(e.map(e=>{let i=p(e);return m(t,i,e),this.createWidget(e,t,i,n,r)}))}async createWidget(e,t,n,r=!0,i=!1){t.theme=this.widgetThemeResolver.resolveWidgetTheme(e,t);let a=t.theme===`light`?d:l,o,s;if(i){let t=document.createElement(`div`);e.appendChild(t),o=t,s=t}else{let t=M(e,a,`prosopo-procaptcha`);o=t.widgetInteractiveArea,s=t.webComponent}let c=g(t,e);return(await this.getCaptchaRenderer(c)).renderCaptcha({identifierPrefix:`procaptcha-`,emotionCacheKey:`procaptcha`,webComponentTag:`prosopo-procaptcha`},o,t,n,r,this.i18n,i,s,e)}async getCaptchaRenderer(e){return this._i18n===null?this._i18n=await h(!1,e):e&&this._i18n.language!==e&&await this._i18n.changeLanguage(e),this.captchaRenderer===null&&(this.captchaRenderer=await this.createCaptchaRenderer()),this.captchaRenderer}async createCaptchaRenderer(){let e=(await import(`./captchaRenderer-YuwSJo-u.js`)).CaptchaRenderer;return new e}},I=class{constructor(){this.themesSet=new Set([`light`,`dark`]),this.defaultTheme=`light`}resolveWidgetTheme(e,t){let n=t.theme||e.getAttribute(`data-theme`)||this.defaultTheme;return this.validateTheme(n)}validateTheme(e){return this.themesSet.has(e)?e:this.defaultTheme}},L=[`procaptcha.bundle.iife.js`,`procaptcha.bundle.js`],R=new Map,z=0,B=()=>`procaptcha-widget-${z++}`,V=(e,t,r,i,a)=>e.map((e,o)=>{let s=B();return R.set(s,{root:e,element:n(t,o),renderOptions:r,isWeb2:i,invisible:a}),s}),H=new F(new I),U=(e,t)=>{e&&Promise.all([import(`./dist-ebrzyBZt.js`).then(e=>e.t),import(`./dist-1EhK3FhO.js`).then(e=>e.t)]).then(([n,r])=>{n.prefetchDetector(`production`,r.pickIpMode(t),e)}).catch(()=>void 0)},W=`procaptcha:execute`,G=`procaptcha:ready`,K=async()=>{let e=Array.from(document.getElementsByClassName(`procaptcha`)).filter(e=>e.tagName.toLowerCase()!==`button`);if(e.length){let t=n(e,0),r=t.getAttribute(`data-sitekey`),i=t.getAttribute(`data-web3`),a=t.getAttribute(`data-ipv4`)===`true`,o=t.getAttribute(`data-ipv6`)===`true`;if(!r){console.error(`No site key found`);return}U(r,{ipv4:a,ipv6:o});let s={siteKey:r,ipv4:a,ipv6:o};V(await H.createWidgets(e,s,i!==`true`),e,s,i!==`true`,!1)}let t=Array.from(document.getElementsByClassName(`procaptcha`)).filter(e=>e.tagName.toLowerCase()===`button`);if(t.length)for(let e of t){let t=e.getAttribute(`data-sitekey`)||``,n=e.getAttribute(`data-callback`)||``,r=e.getAttribute(`data-ipv4`)===`true`,i=e.getAttribute(`data-ipv6`)===`true`;U(t,{ipv4:r,ipv6:i});let a={siteKey:t,callback:n,ipv4:r,ipv6:i};V(await H.createWidgets([e],a,!0,!0),[e],a,!0,!0),e.addEventListener(`click`,async e=>{e.preventDefault(),Y()})}},q=async(e,t)=>{U(t.siteKey,t);let n=Object.prototype.hasOwnProperty.call(t,`size`)&&t.size===`invisible`,r=!t.web3,i=n||e.tagName.toLowerCase()===`button`;return V(await H.createWidgets([e],t,r,i),[e],t,r,i)[0]};function J(e){document&&document.readyState!==`loading`?(console.log(`document.readyState ready!`),e()):(console.log(`DOMContentLoaded listener!`),document.addEventListener(`DOMContentLoaded`,()=>{console.log(`DOMContentLoaded fired`),console.log(window),e()}))}var Y=()=>{let e=X();if(e.length===0){console.error(`No Procaptcha containers found for execution`);return}let t=new CustomEvent(W,{detail:{containerId:e[0]?.id||`procaptcha-container`,containerCount:e.length,timestamp:Date.now()},bubbles:!0,cancelable:!0});document.dispatchEvent(t)};function X(){let e=[],t=Array.from(document.querySelectorAll(`[data-size="invisible"]`));e.push(...t);let n=Array.from(document.querySelectorAll(`#procaptcha-container, [id$="-procaptcha-container"]`)),r=Array.from(document.getElementsByClassName(`p-procaptcha`));e.push(...r);for(let t of n)e.includes(t)||e.push(t);return e}var Z=()=>{let{onloadUrlCallback:e,renderExplicit:t}=P(L),n=!1;t!==`explicit`&&(N(L)?.addEventListener(`load`,()=>{J(K),n=!0}),document.readyState===`complete`&&!n&&J(K)),e&&(N(L)?.addEventListener(`load`,()=>{J(r(e))}),document.readyState===`complete`&&!n&&J(r(e)))},Q=async e=>{let t=e===void 0?Array.from(R.keys()):[e];for(let e of t){let t=R.get(e);if(!t)continue;t.root.unmount();let[n]=await H.createWidgets([t.element],t.renderOptions,t.isWeb2,t.invisible);n?R.set(e,{...t,root:n}):R.delete(e)}},$=e=>{let t=e===void 0?Array.from(R.keys()):[e];for(let e of t){let t=R.get(e);t&&(t.root.unmount(),t.element.innerHTML=``,R.delete(e))}};window.procaptcha={ready:J,render:q,reset:Q,remove:$,execute:Y};var te=new CustomEvent(G,{detail:{timestamp:Date.now()},bubbles:!0,cancelable:!1});document.dispatchEvent(te),Z();export{J as default,Y as execute,$ as remove,q as render,Q as reset};