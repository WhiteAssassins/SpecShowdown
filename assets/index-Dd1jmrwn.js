(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=a(i);fetch(i.href,s)}})();const v=["cpu","gpu","motherboard","ram","storage","cooling","psu","case","monitor","keyboard","mouse","headset"];function C(e="setup"){const t=Math.random().toString(36).slice(2,10),a=globalThis.crypto?.randomUUID?.()||`${Date.now()}-${t}`;return`${e}-${a}`}function ie(){return Object.fromEntries(v.map(e=>[e,""]))}function Ce(e="Untitled Setup"){return{id:C(),name:e,owner:"",tagline:"",notes:"",gear:ie()}}function M(e=[]){return e.map(t=>{const a=t.gear||{};return{id:t.id||C(),name:t.name||"",owner:t.owner||"",tagline:t.tagline||"",notes:t.notes||"",gear:{...ie(),...a,motherboard:a.motherboard||a.board||"",headset:a.headset||a.headphones||""}}})}function ne(e="en"){const t=e==="es";return M([{id:C("demo"),name:"Latency Lab",owner:"Nia Vega",tagline:t?"Rig competitivo afinado para FPS y baja latencia":"Competitive build tuned for FPS and low latency",notes:t?"Montado alrededor de un Ryzen 7 7800X3D con memoria rápida y una RTX 4080 SUPER para mantener FPS altos y tiempos estables.":"Built around a Ryzen 7 7800X3D with fast memory and an RTX 4080 SUPER to keep frame times stable in competitive play.",gear:{cpu:"AMD Ryzen 7 7800X3D",gpu:"NVIDIA GeForce RTX 4080 SUPER",motherboard:"ASUS ROG Strix X670E-E",ram:"32GB DDR5-6000 CL30",storage:"2TB WD Black SN850X NVMe",cooling:"Lian Li Galahad II Trinity 360",psu:"Corsair RM1000x Shift",case:"Lian Li O11 Vision Compact",monitor:"ASUS ROG XG27AQMR 300Hz",keyboard:"Wooting 80HE",mouse:"Lamzu Atlantis Mini 4K",headset:"Audeze Maxwell"}},{id:C("demo"),name:"Studio Focus",owner:"Marco Ruiz",tagline:t?"PC híbrido para ranked, edición y streaming limpio":"Hybrid PC for ranked play, editing, and clean streaming",notes:t?"Busca equilibrio entre juego a alta tasa, tiempos de render sólidos y un perfil acústico razonable para jornadas largas.":"Balances high-refresh gaming, reliable render times, and a quieter acoustic profile for long sessions.",gear:{cpu:"Intel Core i7-14700K",gpu:"NVIDIA GeForce RTX 4070 Ti SUPER",motherboard:"MSI MPG Z790 Carbon WiFi",ram:"64GB DDR5-6400",storage:"4TB Samsung 990 PRO NVMe",cooling:"Arctic Liquid Freezer III 360",psu:"Seasonic Vertex GX-1000",case:"Fractal North XL",monitor:"Dell Alienware AW2725DF 360Hz",keyboard:"Keychron Q1 HE",mouse:"Logitech G Pro X Superlight 2",headset:"SteelSeries Arctis Nova Pro Wireless"}},{id:C("demo"),name:"Creator Stack",owner:"Ari Chen",tagline:t?"Setup premium para directos, clips y cargas pesadas":"Premium stack for live sessions, clips, and heavy workloads",notes:t?"Pensado para quien quiere jugar, grabar y editar desde la misma máquina sin sacrificar estética ni margen térmico.":"For creators who want to game, record, and edit on the same machine without sacrificing thermals or presentation.",gear:{cpu:"AMD Ryzen 9 9950X",gpu:"NVIDIA GeForce RTX 4090",motherboard:"Gigabyte X870E AORUS Master",ram:"96GB DDR5-6400",storage:"2TB Crucial T705 + 4TB SN850X",cooling:"NZXT Kraken Elite 360 RGB",psu:"be quiet! Dark Power 13 1000W",case:"Hyte Y70 Touch Infinite",monitor:"LG 32GS95UE",keyboard:"Razer BlackWidow V4 75%",mouse:"Razer Viper V3 Pro",headset:"Beyerdynamic MMX 300 Pro"}}])}function xe(e,t){if(e.match(/^[a-z]+:\/\//i))return e;if(e.match(/^\/\//))return window.location.protocol+e;if(e.match(/^[a-z]+:/i))return e;const a=document.implementation.createHTMLDocument(),r=a.createElement("base"),i=a.createElement("a");return a.head.appendChild(r),a.body.appendChild(i),t&&(r.href=t),i.href=e,i.href}const _e=(()=>{let e=0;const t=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(e+=1,`u${t()}${e}`)})();function x(e){const t=[];for(let a=0,r=e.length;a<r;a++)t.push(e[a]);return t}let P=null;function se(e={}){return P||(e.includeStyleProperties?(P=e.includeStyleProperties,P):(P=x(window.getComputedStyle(document.documentElement)),P))}function F(e,t){const r=(e.ownerDocument.defaultView||window).getComputedStyle(e).getPropertyValue(t);return r?parseFloat(r.replace("px","")):0}function Pe(e){const t=F(e,"border-left-width"),a=F(e,"border-right-width");return e.clientWidth+t+a}function Ee(e){const t=F(e,"border-top-width"),a=F(e,"border-bottom-width");return e.clientHeight+t+a}function le(e,t={}){const a=t.width||Pe(e),r=t.height||Ee(e);return{width:a,height:r}}function Re(){let e,t;try{t=process}catch{}const a=t&&t.env?t.env.devicePixelRatio:null;return a&&(e=parseInt(a,10),Number.isNaN(e)&&(e=1)),e||window.devicePixelRatio||1}const b=16384;function Le(e){(e.width>b||e.height>b)&&(e.width>b&&e.height>b?e.width>e.height?(e.height*=b/e.width,e.width=b):(e.width*=b/e.height,e.height=b):e.width>b?(e.height*=b/e.width,e.width=b):(e.width*=b/e.height,e.height=b))}function U(e){return new Promise((t,a)=>{const r=new Image;r.onload=()=>{r.decode().then(()=>{requestAnimationFrame(()=>t(r))})},r.onerror=a,r.crossOrigin="anonymous",r.decoding="async",r.src=e})}async function Te(e){return Promise.resolve().then(()=>new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then(t=>`data:image/svg+xml;charset=utf-8,${t}`)}async function Ie(e,t,a){const r="http://www.w3.org/2000/svg",i=document.createElementNS(r,"svg"),s=document.createElementNS(r,"foreignObject");return i.setAttribute("width",`${t}`),i.setAttribute("height",`${a}`),i.setAttribute("viewBox",`0 0 ${t} ${a}`),s.setAttribute("width","100%"),s.setAttribute("height","100%"),s.setAttribute("x","0"),s.setAttribute("y","0"),s.setAttribute("externalResourcesRequired","true"),i.appendChild(s),s.appendChild(e),Te(i)}const g=(e,t)=>{if(e instanceof t)return!0;const a=Object.getPrototypeOf(e);return a===null?!1:a.constructor.name===t.name||g(a,t)};function ke(e){const t=e.getPropertyValue("content");return`${e.cssText} content: '${t.replace(/'|"/g,"")}';`}function Me(e,t){return se(t).map(a=>{const r=e.getPropertyValue(a),i=e.getPropertyPriority(a);return`${a}: ${r}${i?" !important":""};`}).join(" ")}function Ae(e,t,a,r){const i=`.${e}:${t}`,s=a.cssText?ke(a):Me(a,r);return document.createTextNode(`${i}{${s}}`)}function K(e,t,a,r){const i=window.getComputedStyle(e,a),s=i.getPropertyValue("content");if(s===""||s==="none")return;const l=_e();try{t.className=`${t.className} ${l}`}catch{return}const c=document.createElement("style");c.appendChild(Ae(l,a,i,r)),t.appendChild(c)}function De(e,t,a){K(e,t,":before",a),K(e,t,":after",a)}const Q="application/font-woff",Y="image/jpeg",je={woff:Q,woff2:Q,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:Y,jpeg:Y,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml",webp:"image/webp"};function Fe(e){const t=/\.([^./]*?)$/g.exec(e);return t?t[1]:""}function W(e){const t=Fe(e).toLowerCase();return je[t]||""}function Ue(e){return e.split(/,/)[1]}function q(e){return e.search(/^(data:)/)!==-1}function Oe(e,t){return`data:${t};base64,${e}`}async function ce(e,t,a){const r=await fetch(e,t);if(r.status===404)throw new Error(`Resource "${r.url}" not found`);const i=await r.blob();return new Promise((s,l)=>{const c=new FileReader;c.onerror=l,c.onloadend=()=>{try{s(a({res:r,result:c.result}))}catch(d){l(d)}},c.readAsDataURL(i)})}const H={};function Be(e,t,a){let r=e.replace(/\?.*/,"");return a&&(r=e),/ttf|otf|eot|woff2?/i.test(r)&&(r=r.replace(/.*\//,"")),t?`[${t}]${r}`:r}async function N(e,t,a){const r=Be(e,t,a.includeQueryParams);if(H[r]!=null)return H[r];a.cacheBust&&(e+=(/\?/.test(e)?"&":"?")+new Date().getTime());let i;try{const s=await ce(e,a.fetchRequestInit,({res:l,result:c})=>(t||(t=l.headers.get("Content-Type")||""),Ue(c)));i=Oe(s,t)}catch(s){i=a.imagePlaceholder||"";let l=`Failed to fetch resource: ${e}`;s&&(l=typeof s=="string"?s:s.message),l&&console.warn(l)}return H[r]=i,i}async function He(e){const t=e.toDataURL();return t==="data:,"?e.cloneNode(!1):U(t)}async function Ve(e,t){if(e.currentSrc){const s=document.createElement("canvas"),l=s.getContext("2d");s.width=e.clientWidth,s.height=e.clientHeight,l?.drawImage(e,0,0,s.width,s.height);const c=s.toDataURL();return U(c)}const a=e.poster,r=W(a),i=await N(a,r,t);return U(i)}async function qe(e,t){var a;try{if(!((a=e?.contentDocument)===null||a===void 0)&&a.body)return await B(e.contentDocument.body,t,!0)}catch{}return e.cloneNode(!1)}async function ze(e,t){return g(e,HTMLCanvasElement)?He(e):g(e,HTMLVideoElement)?Ve(e,t):g(e,HTMLIFrameElement)?qe(e,t):e.cloneNode(de(e))}const Ge=e=>e.tagName!=null&&e.tagName.toUpperCase()==="SLOT",de=e=>e.tagName!=null&&e.tagName.toUpperCase()==="SVG";async function We(e,t,a){var r,i;if(de(t))return t;let s=[];return Ge(e)&&e.assignedNodes?s=x(e.assignedNodes()):g(e,HTMLIFrameElement)&&(!((r=e.contentDocument)===null||r===void 0)&&r.body)?s=x(e.contentDocument.body.childNodes):s=x(((i=e.shadowRoot)!==null&&i!==void 0?i:e).childNodes),s.length===0||g(e,HTMLVideoElement)||await s.reduce((l,c)=>l.then(()=>B(c,a)).then(d=>{d&&t.appendChild(d)}),Promise.resolve()),t}function Ne(e,t,a){const r=t.style;if(!r)return;const i=window.getComputedStyle(e);i.cssText?(r.cssText=i.cssText,r.transformOrigin=i.transformOrigin):se(a).forEach(s=>{let l=i.getPropertyValue(s);s==="font-size"&&l.endsWith("px")&&(l=`${Math.floor(parseFloat(l.substring(0,l.length-2)))-.1}px`),g(e,HTMLIFrameElement)&&s==="display"&&l==="inline"&&(l="block"),s==="d"&&t.getAttribute("d")&&(l=`path(${t.getAttribute("d")})`),r.setProperty(s,l,i.getPropertyPriority(s))})}function Xe(e,t){g(e,HTMLTextAreaElement)&&(t.innerHTML=e.value),g(e,HTMLInputElement)&&t.setAttribute("value",e.value)}function Je(e,t){if(g(e,HTMLSelectElement)){const r=Array.from(t.children).find(i=>e.value===i.getAttribute("value"));r&&r.setAttribute("selected","")}}function Ke(e,t,a){return g(t,Element)&&(Ne(e,t,a),De(e,t,a),Xe(e,t),Je(e,t)),t}async function Qe(e,t){const a=e.querySelectorAll?e.querySelectorAll("use"):[];if(a.length===0)return e;const r={};for(let s=0;s<a.length;s++){const c=a[s].getAttribute("xlink:href");if(c){const d=e.querySelector(c),u=document.querySelector(c);!d&&u&&!r[c]&&(r[c]=await B(u,t,!0))}}const i=Object.values(r);if(i.length){const s="http://www.w3.org/1999/xhtml",l=document.createElementNS(s,"svg");l.setAttribute("xmlns",s),l.style.position="absolute",l.style.width="0",l.style.height="0",l.style.overflow="hidden",l.style.display="none";const c=document.createElementNS(s,"defs");l.appendChild(c);for(let d=0;d<i.length;d++)c.appendChild(i[d]);e.appendChild(l)}return e}async function B(e,t,a){return!a&&t.filter&&!t.filter(e)?null:Promise.resolve(e).then(r=>ze(r,t)).then(r=>We(e,r,t)).then(r=>Ke(e,r,t)).then(r=>Qe(r,t))}const pe=/url\((['"]?)([^'"]+?)\1\)/g,Ye=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,Ze=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function et(e){const t=e.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`,"g")}function tt(e){const t=[];return e.replace(pe,(a,r,i)=>(t.push(i),a)),t.filter(a=>!q(a))}async function at(e,t,a,r,i){try{const s=a?xe(t,a):t,l=W(t);let c;return i||(c=await N(s,l,r)),e.replace(et(t),`$1${c}$3`)}catch{}return e}function rt(e,{preferredFontFormat:t}){return t?e.replace(Ze,a=>{for(;;){const[r,,i]=Ye.exec(a)||[];if(!i)return"";if(i===t)return`src: ${r};`}}):e}function ue(e){return e.search(pe)!==-1}async function me(e,t,a){if(!ue(e))return e;const r=rt(e,a);return tt(r).reduce((s,l)=>s.then(c=>at(c,l,t,a)),Promise.resolve(r))}async function E(e,t,a){var r;const i=(r=t.style)===null||r===void 0?void 0:r.getPropertyValue(e);if(i){const s=await me(i,null,a);return t.style.setProperty(e,s,t.style.getPropertyPriority(e)),!0}return!1}async function ot(e,t){await E("background",e,t)||await E("background-image",e,t),await E("mask",e,t)||await E("-webkit-mask",e,t)||await E("mask-image",e,t)||await E("-webkit-mask-image",e,t)}async function it(e,t){const a=g(e,HTMLImageElement);if(!(a&&!q(e.src))&&!(g(e,SVGImageElement)&&!q(e.href.baseVal)))return;const r=a?e.src:e.href.baseVal,i=await N(r,W(r),t);await new Promise((s,l)=>{e.onload=s,e.onerror=t.onImageErrorHandler?(...d)=>{try{s(t.onImageErrorHandler(...d))}catch(u){l(u)}}:l;const c=e;c.decode&&(c.decode=s),c.loading==="lazy"&&(c.loading="eager"),a?(e.srcset="",e.src=i):e.href.baseVal=i})}async function nt(e,t){const r=x(e.childNodes).map(i=>he(i,t));await Promise.all(r).then(()=>e)}async function he(e,t){g(e,Element)&&(await ot(e,t),await it(e,t),await nt(e,t))}function st(e,t){const{style:a}=e;t.backgroundColor&&(a.backgroundColor=t.backgroundColor),t.width&&(a.width=`${t.width}px`),t.height&&(a.height=`${t.height}px`);const r=t.style;return r!=null&&Object.keys(r).forEach(i=>{a[i]=r[i]}),e}const Z={};async function ee(e){let t=Z[e];if(t!=null)return t;const r=await(await fetch(e)).text();return t={url:e,cssText:r},Z[e]=t,t}async function te(e,t){let a=e.cssText;const r=/url\(["']?([^"')]+)["']?\)/g,s=(a.match(/url\([^)]+\)/g)||[]).map(async l=>{let c=l.replace(r,"$1");return c.startsWith("https://")||(c=new URL(c,e.url).href),ce(c,t.fetchRequestInit,({result:d})=>(a=a.replace(l,`url(${d})`),[l,d]))});return Promise.all(s).then(()=>a)}function ae(e){if(e==null)return[];const t=[],a=/(\/\*[\s\S]*?\*\/)/gi;let r=e.replace(a,"");const i=new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi");for(;;){const d=i.exec(r);if(d===null)break;t.push(d[0])}r=r.replace(i,"");const s=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,l="((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",c=new RegExp(l,"gi");for(;;){let d=s.exec(r);if(d===null){if(d=c.exec(r),d===null)break;s.lastIndex=c.lastIndex}else c.lastIndex=s.lastIndex;t.push(d[0])}return t}async function lt(e,t){const a=[],r=[];return e.forEach(i=>{if("cssRules"in i)try{x(i.cssRules||[]).forEach((s,l)=>{if(s.type===CSSRule.IMPORT_RULE){let c=l+1;const d=s.href,u=ee(d).then(m=>te(m,t)).then(m=>ae(m).forEach(_=>{try{i.insertRule(_,_.startsWith("@import")?c+=1:i.cssRules.length)}catch(j){console.error("Error inserting rule from remote css",{rule:_,error:j})}})).catch(m=>{console.error("Error loading remote css",m.toString())});r.push(u)}})}catch(s){const l=e.find(c=>c.href==null)||document.styleSheets[0];i.href!=null&&r.push(ee(i.href).then(c=>te(c,t)).then(c=>ae(c).forEach(d=>{l.insertRule(d,l.cssRules.length)})).catch(c=>{console.error("Error loading remote stylesheet",c)})),console.error("Error inlining remote css file",s)}}),Promise.all(r).then(()=>(e.forEach(i=>{if("cssRules"in i)try{x(i.cssRules||[]).forEach(s=>{a.push(s)})}catch(s){console.error(`Error while reading CSS rules from ${i.href}`,s)}}),a))}function ct(e){return e.filter(t=>t.type===CSSRule.FONT_FACE_RULE).filter(t=>ue(t.style.getPropertyValue("src")))}async function dt(e,t){if(e.ownerDocument==null)throw new Error("Provided element is not within a Document");const a=x(e.ownerDocument.styleSheets),r=await lt(a,t);return ct(r)}function fe(e){return e.trim().replace(/["']/g,"")}function pt(e){const t=new Set;function a(r){(r.style.fontFamily||getComputedStyle(r).fontFamily).split(",").forEach(s=>{t.add(fe(s))}),Array.from(r.children).forEach(s=>{s instanceof HTMLElement&&a(s)})}return a(e),t}async function ut(e,t){const a=await dt(e,t),r=pt(e);return(await Promise.all(a.filter(s=>r.has(fe(s.style.fontFamily))).map(s=>{const l=s.parentStyleSheet?s.parentStyleSheet.href:null;return me(s.cssText,l,t)}))).join(`
`)}async function mt(e,t){const a=t.fontEmbedCSS!=null?t.fontEmbedCSS:t.skipFonts?null:await ut(e,t);if(a){const r=document.createElement("style"),i=document.createTextNode(a);r.appendChild(i),e.firstChild?e.insertBefore(r,e.firstChild):e.appendChild(r)}}async function ht(e,t={}){const{width:a,height:r}=le(e,t),i=await B(e,t,!0);return await mt(i,t),await he(i,t),st(i,t),await Ie(i,a,r)}async function ft(e,t={}){const{width:a,height:r}=le(e,t),i=await ht(e,t),s=await U(i),l=document.createElement("canvas"),c=l.getContext("2d"),d=t.pixelRatio||Re(),u=t.canvasWidth||a,m=t.canvasHeight||r;return l.width=u*d,l.height=m*d,t.skipAutoScale||Le(l),l.style.width=`${u}`,l.style.height=`${m}`,t.backgroundColor&&(c.fillStyle=t.backgroundColor,c.fillRect(0,0,l.width,l.height)),c.drawImage(s,0,0,l.width,l.height),l}async function gt(e,t={}){return(await ft(e,t)).toDataURL()}function X(e,t){const a=document.createElement("a");a.href=URL.createObjectURL(e),a.download=t,a.click(),URL.revokeObjectURL(a.href)}async function bt(e,t){const a=Number(e.dataset.exportWidth)||1200,r=Number(e.dataset.exportHeight)||675,i=await gt(e,{cacheBust:!0,pixelRatio:2,backgroundColor:"#05070d",width:a,height:r,style:{width:`${a}px`,height:`${r}px`,maxWidth:"none",margin:"0",display:"block",background:"#05070d"}}),l=await(await fetch(i)).blob();X(l,t)}function yt(e,t){const a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"});X(a,t)}function wt(e,t){const a=new Blob([e],{type:"text/plain;charset=utf-8"});X(a,t)}async function re(e){return navigator.clipboard?(await navigator.clipboard.writeText(e),!0):!1}const ge=["en","es"],vt={en:{meta:{title:"SpecShowdown | Show off your gaming PC with a polished profile card",description:"Build a gaming rig profile, generate a polished image card, and optionally compare two hardware stacks side by side."},brand:{name:"SpecShowdown",tagline:"Beautiful profile cards for the rig you actually run."},common:{versus:"vs",category:"Category",left:"Left",right:"Right",secondSetup:"Second setup",copySuffix:"Copy"},nav:{workspace:"Workspace",compare:"Compare",share:"Share card",language:"Language"},hero:{eyebrow:"No account needed. Built to be shared.",title:"Turn your gaming rig into something worth showing.",accent:"showing",body:"Build a hardware profile around your CPU, GPU, RAM, and the rest of the stack, then export a polished horizontal card for socials, bios, and embeds.",primaryCta:"Open workspace",secondaryCta:"Load demo rigs",statOne:"12 hardware slots",statTwo:"3 share card styles",statThree:"Export-ready image cards",helperTitle:"What you can publish fast",helperOne:"A polished profile card for your gaming PC or creator rig.",helperTwo:"An optional compare board when you want a head-to-head view.",helperThree:"JSON, text, and image export from the same profile."},workspace:{title:"Workspace",body:"Build the rig profile, fine-tune the parts list, and export a card that already feels ready to post."},library:{title:"Profile library",body:"Pick a profile to edit, export, or send into compare mode. Demo rigs are included so the app is useful on first load.",create:"New profile",duplicate:"Duplicate",delete:"Delete",leftSlot:"Left slot",rightSlot:"Right slot",emptyTitle:"No saved profiles yet",emptyBody:"Start with a blank rig or reload the example data to explore the full experience.",useDemo:"Use demo data",selectForEdit:"Edit this profile",selected:"Active profile",filled:"{count} filled categories",localStatus:"Build a lineup of rigs and switch between them fast.",hint:"Tip: duplicate a profile before testing a major upgrade path."},editor:{title:"Profile editor",body:"Give the profile a clear title, then fill the hardware list field by field until it is ready to share.",identityTitle:"Identity",gearTitle:"Hardware stack",notesTitle:"Notes",name:"Profile title",owner:"Creator or owner",tagline:"Short summary",notes:"Optional notes",namePlaceholder:"Example: Ranked Night Rig",ownerPlaceholder:"Example: Alex Rivera",taglinePlaceholder:"Example: 7800X3D + 4080 SUPER build tuned for FPS and streams",notesPlaceholder:"What makes this rig special? Cooling, use case, upgrade path, favorite pairing...",newProfileName:"Untitled Profile",onboarding:"Onboarding hint: keep the profile name short, then use the summary and notes to explain the build direction.",emptyTitle:"Create your first profile",emptyBody:"A profile is the fastest way to turn your PC build into a card you can publish anywhere."},compare:{title:"Compare view",body:"Choose two profiles, trim the category list, and switch between minimal and detailed modes.",activeProfile:"Active profile",useActiveLeft:"Use active on left",useActiveRight:"Use active on right",swapProfiles:"Swap sides",leftLabel:"Left profile",rightLabel:"Right profile",minimal:"Minimal",full:"Detailed",filters:"Visible categories",filtersHint:"Use filters to create cleaner public comparisons.",emptyTitle:"Pick two rigs to compare",emptyBody:"You need at least two profiles in your library. Demo data can fill the gap instantly.",sameTag:"Shared choice",notesLabel:"Notes",copiedLink:"Share link copied.",copyShare:"Copy share link",importShared:"Load shared compare into my library",clearShared:"Exit shared mode",sharedTitle:"Shared compare loaded from the URL",sharedBody:"Import this match-up if you want to remix the profiles and make it your own.",loadDemoCompare:"Use demo compare"},share:{title:"Profile card",body:"Export a polished hardware card from the active profile, or switch to compare mode when you want a showdown graphic.",exportImage:"Download image",exportJson:"Download JSON",exportText:"Download text",copyText:"Copy text summary",previewTitle:"Public card preview",previewBody:"A cleaner horizontal card built to look good in posts, bios, and embedded blocks.",generatedFrom:"Generated from",compareLabel:"Rig showdown",textPreview:"Text preview",noCategories:"Select at least one category to generate a card.",copiedText:"Text summary copied.",horizontalLabel:"Horizontal social card",profileLabel:"Profile card",profileMode:"Profile",compareMode:"Compare",styleLabel:"Card style",categoriesCount:"{count} specs selected",sharedCount:"{count} shared picks",notesFallback:"No extra notes added",readyLabel:"Share ready",style:{editorial:"Editorial",specsheet:"Spec sheet",spotlight:"Spotlight"}},actions:{loadDemo:"Reload demo data"},notices:{saved:"Changes saved.",deleted:"Profile deleted.",duplicated:"Profile duplicated.",demoLoaded:"Demo profiles loaded.",imported:"Shared compare imported into your library.",imageReady:"Share card downloaded.",jsonReady:"JSON export downloaded.",textReady:"Text export ready.",copyFailed:"Clipboard access failed on this browser."},category:{cpu:"CPU",gpu:"GPU",motherboard:"Motherboard",ram:"RAM",storage:"Storage",cooling:"Cooling",psu:"Power supply",case:"Case",monitor:"Monitor",keyboard:"Keyboard",mouse:"Mouse",headset:"Headset"},placeholder:{cpu:"Example: AMD Ryzen 7 7800X3D",gpu:"Example: NVIDIA GeForce RTX 4080 SUPER",motherboard:"Example: ASUS ROG Strix X670E-E",ram:"Example: 32GB DDR5-6000 CL30",storage:"Example: 2TB NVMe SSD",cooling:"Example: 360mm AIO liquid cooler",psu:"Example: 850W 80+ Gold",case:"Example: Fractal North",monitor:"Example: 27-inch 240Hz OLED",keyboard:"Example: Wooting 80HE",mouse:"Example: Razer Viper V3 Pro",headset:"Example: Audeze Maxwell"}},es:{meta:{title:"SpecShowdown | Muestra tu PC gaming con una tarjeta de perfil pulida",description:"Crea un perfil de hardware, genera una tarjeta visual pulida y compara dos configuraciones cuando quieras una vista cara a cara."},brand:{name:"SpecShowdown",tagline:"Tarjetas de perfil bonitas para el rig que realmente usas."},common:{versus:"vs",category:"Categoría",left:"Izquierda",right:"Derecha",secondSetup:"Segundo setup",copySuffix:"Copia"},nav:{workspace:"Espacio",compare:"Comparar",share:"Tarjeta",language:"Idioma"},hero:{eyebrow:"Sin cuenta. Hecho para compartirse.",title:"Convierte tu rig gaming en algo que den ganas de mostrar.",accent:"mostrar",body:"Crea un perfil alrededor de tu CPU, GPU, RAM y el resto del stack, y luego exporta una tarjeta horizontal pulida para redes, bios y embeds.",primaryCta:"Abrir espacio",secondaryCta:"Cargar rigs demo",statOne:"12 slots de hardware",statTwo:"3 estilos de tarjeta",statThree:"Imagen lista para exportar",helperTitle:"Qué puedes publicar rápido",helperOne:"Una tarjeta de perfil pulida para tu PC gaming o rig de creator.",helperTwo:"Una comparativa opcional para cuando quieras un duelo visual.",helperThree:"Exportación en JSON, texto e imagen desde el mismo perfil."},workspace:{title:"Espacio de trabajo",body:"Construye el perfil del rig, ajusta la lista de componentes y exporta una tarjeta que ya se sienta lista para publicar."},library:{title:"Biblioteca de perfiles",body:"Elige un perfil para editar, exportar o mandar a comparativa. Incluye rigs demo para que la app sea útil desde la primera carga.",create:"Nuevo perfil",duplicate:"Duplicar",delete:"Eliminar",leftSlot:"Lado izquierdo",rightSlot:"Lado derecho",emptyTitle:"Todavía no hay perfiles guardados",emptyBody:"Empieza con un rig vacío o recarga los datos de ejemplo para explorar la experiencia completa.",useDemo:"Usar datos demo",selectForEdit:"Editar este perfil",selected:"Perfil activo",filled:"{count} categorías completas",localStatus:"Construye una alineación de rigs y cambia entre ellos rápido.",hint:"Consejo: duplica un perfil antes de probar una ruta de upgrade grande."},editor:{title:"Editor de perfil",body:"Ponle un título claro al perfil y luego completa el hardware hasta que quede listo para compartir.",identityTitle:"Identidad",gearTitle:"Stack de hardware",notesTitle:"Notas",name:"Título del perfil",owner:"Creador o dueño",tagline:"Resumen corto",notes:"Notas opcionales",namePlaceholder:"Ejemplo: Rig para ranked nocturno",ownerPlaceholder:"Ejemplo: Alex Rivera",taglinePlaceholder:"Ejemplo: Build con 7800X3D y 4080 SUPER afinada para FPS y stream",notesPlaceholder:"¿Qué hace especial a este rig? Refrigeración, uso principal, ruta de upgrade, combinación favorita...",newProfileName:"Perfil sin título",onboarding:"Pista inicial: mantén corto el nombre del perfil y usa el resumen y las notas para explicar hacia dónde va el build.",emptyTitle:"Crea tu primer perfil",emptyBody:"Un perfil es la forma más rápida de convertir tu PC en una tarjeta que puedas publicar en cualquier parte."},compare:{title:"Vista de comparación",body:"Elige dos perfiles, recorta la lista de categorías y alterna entre modo minimalista o detallado.",activeProfile:"Perfil activo",useActiveLeft:"Usar activo a la izquierda",useActiveRight:"Usar activo a la derecha",swapProfiles:"Intercambiar lados",leftLabel:"Perfil izquierdo",rightLabel:"Perfil derecho",minimal:"Minimal",full:"Detallado",filters:"Categorías visibles",filtersHint:"Usa filtros para crear comparativas públicas más limpias.",emptyTitle:"Elige dos rigs para comparar",emptyBody:"Necesitas al menos dos perfiles en tu biblioteca. Los datos demo resuelven eso al instante.",sameTag:"Coinciden",notesLabel:"Notas",copiedLink:"Enlace copiado.",copyShare:"Copiar enlace",importShared:"Cargar comparación compartida a mi biblioteca",clearShared:"Salir del modo compartido",sharedTitle:"Comparación compartida cargada desde la URL",sharedBody:"Importa este duelo si quieres remezclar los perfiles y hacerlo tuyo.",loadDemoCompare:"Usar comparación demo"},share:{title:"Tarjeta de perfil",body:"Exporta una tarjeta pulida desde el perfil activo o cambia a modo comparativa cuando quieras un gráfico tipo showdown.",exportImage:"Descargar imagen",exportJson:"Descargar JSON",exportText:"Descargar texto",copyText:"Copiar resumen",previewTitle:"Vista previa pública",previewBody:"Una tarjeta horizontal más limpia, pensada para verse bien en posts, bios y bloques embebidos.",generatedFrom:"Generado desde",compareLabel:"Duelo de rigs",textPreview:"Vista previa de texto",noCategories:"Selecciona al menos una categoría para generar una tarjeta.",copiedText:"Resumen copiado.",horizontalLabel:"Tarjeta social horizontal",profileLabel:"Tarjeta de perfil",profileMode:"Perfil",compareMode:"Comparar",styleLabel:"Estilo de tarjeta",categoriesCount:"{count} specs seleccionadas",sharedCount:"{count} elecciones iguales",notesFallback:"Sin notas extra",readyLabel:"Lista para compartir",style:{editorial:"Editorial",specsheet:"Ficha",spotlight:"Spotlight"}},actions:{loadDemo:"Recargar datos demo"},notices:{saved:"Cambios guardados.",deleted:"Perfil eliminado.",duplicated:"Perfil duplicado.",demoLoaded:"Perfiles demo cargados.",imported:"La comparación compartida se importó a tu biblioteca.",imageReady:"Tarjeta descargada.",jsonReady:"Exportación JSON descargada.",textReady:"Exportación de texto lista.",copyFailed:"No se pudo acceder al portapapeles en este navegador."},category:{cpu:"CPU",gpu:"GPU",motherboard:"Placa base",ram:"RAM",storage:"Almacenamiento",cooling:"Refrigeración",psu:"Fuente",case:"Caja",monitor:"Monitor",keyboard:"Teclado",mouse:"Mouse",headset:"Headset"},placeholder:{cpu:"Ejemplo: AMD Ryzen 7 7800X3D",gpu:"Ejemplo: NVIDIA GeForce RTX 4080 SUPER",motherboard:"Ejemplo: ASUS ROG Strix X670E-E",ram:"Ejemplo: 32GB DDR5-6000 CL30",storage:"Ejemplo: SSD NVMe de 2TB",cooling:"Ejemplo: AIO líquida de 360 mm",psu:"Ejemplo: 850W 80+ Gold",case:"Ejemplo: Fractal North",monitor:"Ejemplo: OLED de 27 pulgadas y 240 Hz",keyboard:"Ejemplo: Wooting 80HE",mouse:"Ejemplo: Razer Viper V3 Pro",headset:"Ejemplo: Audeze Maxwell"}}};function $t(e="en"){return function(a,r={}){const i=a.split(".");let s=vt[e];for(const l of i)s=s?.[l];return typeof s!="string"?s??a:s.replace(/\{(\w+)\}/g,(l,c)=>r[c]??"")}}function St(e){return e.replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function Ct(e){const t=e.replace(/-/g,"+").replace(/_/g,"/"),a=t.length%4===0?"":"=".repeat(4-t.length%4);return t+a}function xt(e){const t=new TextEncoder().encode(JSON.stringify(e));let a="";return t.forEach(r=>{a+=String.fromCharCode(r)}),St(window.btoa(a))}function _t(e=window.location.hash){const t=e.match(/share=([^&]+)/);if(!t)return null;try{const a=window.atob(Ct(t[1])),r=Uint8Array.from(a,i=>i.charCodeAt(0));return JSON.parse(new TextDecoder().decode(r))}catch(a){return console.warn("SpecShowdown: failed to decode shared payload.",a),null}}function Pt(e){return`${window.location.href.split("#")[0]}#share=${xt(e)}`}function V(){window.history.replaceState({},"",`${window.location.pathname}${window.location.search}`)}const be="specshowdown-state-v1";function Et(){try{const e=window.localStorage.getItem(be);return e?JSON.parse(e):null}catch(e){return console.warn("SpecShowdown: failed to load local state.",e),null}}function Rt(e){try{window.localStorage.setItem(be,JSON.stringify(e))}catch(t){console.warn("SpecShowdown: failed to save local state.",t)}}const R=document.querySelector("#app"),w=Et(),ye=w?.language||(navigator.language?.toLowerCase().startsWith("es")?"es":"en"),k=w?.profiles?.length>0?M(w.profiles):ne(ye),A=Tt(_t()),z=w?.visibleCategories?.filter(Boolean)||[],Lt=z.length>0&&z.every(e=>v.includes(e)),n={language:ye,profiles:k,selectedProfileId:w?.selectedProfileId||k[0]?.id||null,compareLeftId:w?.compareLeftId||k[0]?.id||null,compareRightId:w?.compareRightId||k[1]?.id||k[0]?.id||null,shareMode:w?.shareMode==="compare"?"compare":"profile",cardStyle:w?.cardStyle||"editorial",visibleCategories:Lt?z:[...v],viewMode:w?.viewMode==="minimal"?"minimal":"full",sharedCompare:A,notice:null,lastSavedAt:w?.lastSavedAt||null};A?.visibleCategories?.length&&(n.visibleCategories=A.visibleCategories);A?.viewMode&&(n.viewMode=A.viewMode);we();ve();S();It();h(!1);function Tt(e){return!e?.left||!e?.right?null:{left:M([e.left])[0],right:M([e.right])[0],visibleCategories:e.visibleCategories?.filter(t=>v.includes(t))||[...v],viewMode:e.viewMode==="minimal"?"minimal":"full"}}function we(){if(n.profiles=M(n.profiles),!n.profiles.length){n.selectedProfileId=null,n.compareLeftId=null,n.compareRightId=null;return}n.profiles.some(e=>e.id===n.selectedProfileId)||(n.selectedProfileId=n.profiles[0].id),n.profiles.some(e=>e.id===n.compareLeftId)||(n.compareLeftId=n.profiles[0].id),n.profiles.some(e=>e.id===n.compareRightId)||(n.compareRightId=n.profiles[1]?.id||n.profiles[0].id),n.visibleCategories=n.visibleCategories.filter(e=>v.includes(e)),n.visibleCategories.length||(n.visibleCategories=[...v])}function It(){R.dataset.bound!=="true"&&(R.dataset.bound="true",R.addEventListener("click",async e=>{const t=e.target.closest("[data-action]");if(!t)return;const a=t.dataset.action;if(a==="set-language"){ge.includes(t.dataset.language)&&n.language!==t.dataset.language&&(n.language=t.dataset.language,ve(),S(),h(!1));return}if(a==="new-profile"){const r=Ce(o("editor.newProfileName"));n.profiles.unshift(r),n.selectedProfileId=r.id,n.compareLeftId?n.compareRightId||(n.compareRightId=r.id):n.compareLeftId=r.id,S(),h();return}if(a==="select-profile"){n.selectedProfileId=t.dataset.profileId,T(),$e();return}if(a==="duplicate-profile"){const r=O(t.dataset.profileId);if(!r)return;const i=structuredClone(r);i.id=C(),i.name=`${r.name||o("editor.newProfileName")} ${o("common.copySuffix")}`,n.profiles.unshift(i),n.selectedProfileId=i.id,y("notices.duplicated"),S(),h();return}if(a==="delete-profile"){n.profiles=n.profiles.filter(r=>r.id!==t.dataset.profileId),we(),y("notices.deleted"),S(),h();return}if(a==="load-demo-data"){n.profiles=ne(n.language),n.selectedProfileId=n.profiles[0].id,n.compareLeftId=n.profiles[0].id,n.compareRightId=n.profiles[1].id,n.sharedCompare=null,V(),y("notices.demoLoaded"),S(),h();return}if(a==="view-mode"){n.viewMode=t.dataset.mode==="minimal"?"minimal":"full",$(),f(),h();return}if(a==="set-share-mode"){n.shareMode=t.dataset.mode==="compare"?"compare":"profile",f(),h(!1);return}if(a==="set-card-style"){n.cardStyle=t.dataset.style||"editorial",f(),h(!1);return}if(a==="assign-left"){const r=t.dataset.profileId||n.selectedProfileId;r&&(n.compareLeftId=r,L(),T(),$(),f(),h());return}if(a==="assign-right"){const r=t.dataset.profileId||n.selectedProfileId;r&&(n.compareRightId=r,L(),T(),$(),f(),h());return}if(a==="swap-compare"){const r=n.compareLeftId;n.compareLeftId=n.compareRightId,n.compareRightId=r,L(),T(),$(),f(),h();return}if(a==="copy-share-link"){const r=Se();if(!r)return;try{const i=await re(Pt(r));y(i?"compare.copiedLink":"notices.copyFailed")}catch{y("notices.copyFailed")}$();return}if(a==="clear-shared-mode"){n.sharedCompare=null,V(),S(),h();return}if(a==="import-shared"){if(!n.sharedCompare)return;const r=structuredClone(n.sharedCompare.left),i=structuredClone(n.sharedCompare.right);r.id=C("import"),i.id=C("import"),n.profiles.unshift(i),n.profiles.unshift(r),n.selectedProfileId=r.id,n.compareLeftId=r.id,n.compareRightId=i.id,n.sharedCompare=null,V(),y("notices.imported"),S(),h();return}if(a==="download-image"){const r=document.querySelector("[data-export-card]");if(!r)return;await bt(r,"specshowdown-card.png"),y("notices.imageReady"),f();return}if(a==="download-json"){const r=kt();if(!r)return;yt(r,"specshowdown-summary.json"),y("notices.jsonReady"),f();return}if(a==="download-text"){wt(G(),"specshowdown-summary.txt"),y("notices.textReady"),f();return}if(a==="copy-text"){try{const r=await re(G());y(r?"share.copiedText":"notices.copyFailed")}catch{y("notices.copyFailed")}f()}}),R.addEventListener("input",e=>{const t=e.target.closest("[data-field]");if(!t)return;const a=I();if(!a)return;const r=t.dataset.field,i=t.value;v.includes(r)?a.gear[r]=i:a[r]=i,T(),L(),$(),f(),h()}),R.addEventListener("change",e=>{const t=e.target.closest("[data-select]");if(t){t.dataset.select==="left"&&(n.compareLeftId=t.value),t.dataset.select==="right"&&(n.compareRightId=t.value),L(),$(),f(),h();return}const a=e.target.closest("[data-category-toggle]");if(a){const r=a.dataset.categoryToggle;a.checked?n.visibleCategories.includes(r)||n.visibleCategories.push(r):n.visibleCategories=n.visibleCategories.filter(i=>i!==r),$(),f(),h()}}))}function ve(){document.documentElement.lang=n.language,document.title=o("meta.title");const e=document.querySelector('meta[name="description"]');e&&e.setAttribute("content",o("meta.description")),R.innerHTML=`
    <header class="topbar">
      <div class="brandmark">
        <p class="brandmark__eyebrow">${o("brand.name")}</p>
        <h1 class="brandmark__title">${o("brand.tagline")}</h1>
      </div>
      <nav class="topbar__nav" aria-label="Primary">
        <a href="#workspace">${o("nav.workspace")}</a>
        <a href="#compare-stage">${o("nav.compare")}</a>
        <a href="#share-stage">${o("nav.share")}</a>
      </nav>
      <div class="language-switcher" aria-label="${o("nav.language")}">
        ${ge.map(t=>`
              <button
                type="button"
                class="${n.language===t?"is-active":""}"
                data-action="set-language"
                data-language="${t}"
                aria-pressed="${n.language===t}"
              >
                ${t.toUpperCase()}
              </button>
            `).join("")}
      </div>
    </header>

    <section class="hero">
      <div class="hero__copy">
        <p class="hero__eyebrow">${o("hero.eyebrow")}</p>
        <h2 class="hero__title">${Mt(o("hero.title"),o("hero.accent"))}</h2>
        <p class="hero__body">${o("hero.body")}</p>
        <div class="hero__actions">
          <a class="button button--primary" href="#workspace">${o("hero.primaryCta")}</a>
          <button class="button button--ghost" type="button" data-action="load-demo-data">${o("hero.secondaryCta")}</button>
        </div>
        <div class="hero__stats">
          <span>${o("hero.statOne")}</span>
          <span>${o("hero.statTwo")}</span>
          <span>${o("hero.statThree")}</span>
        </div>
      </div>
      <div class="hero__stage" id="hero-showcase"></div>
    </section>

    <main class="workspace-shell" id="workspace">
      <section class="workspace-intro">
        <p class="section-label">${o("workspace.title")}</p>
        <h2>${o("workspace.body")}</h2>
      </section>
      <div class="workspace-grid">
        <div class="workspace-stack">
          <aside class="panel panel--library" id="library-panel"></aside>
          <section class="panel panel--editor" id="editor-panel"></section>
        </div>
        <section class="panel panel--compare" id="compare-panel"></section>
      </div>
    </main>

    <section class="share-stage" id="share-stage">
      <div class="share-stage__header">
        <p class="section-label">${o("share.title")}</p>
        <h2>${o("share.body")}</h2>
      </div>
      <div class="share-stage__grid">
        <section class="panel panel--share" id="share-panel"></section>
        <section class="panel panel--export" id="export-panel"></section>
      </div>
    </section>
  `}function S(){L(),T(),$e(),$(),f()}function L(){const e=document.querySelector("#hero-showcase");if(!e)return;const{left:t,right:a,visibleCategories:r}=D(),i=r.slice(0,4).map(l=>{const c=t?.gear?.[l]||"—",d=a?.gear?.[l]||"—",u=c!=="—"&&c===d;return`
        <div class="mini-compare__row">
          <span>${o(`category.${l}`)}</span>
          <strong>${p(c)}</strong>
          <strong>${p(d)}</strong>
          <em>${u?o("compare.sameTag"):""}</em>
        </div>
      `}).join(""),s=[o("hero.helperOne"),o("hero.helperTwo"),o("hero.helperThree")].map(l=>`<li>${l}</li>`).join("");e.innerHTML=`
    <article class="poster">
      <div class="poster__glow"></div>
      <div class="poster__header">
        <p>${o("hero.helperTitle")}</p>
        <span>${o("share.generatedFrom")}</span>
      </div>
      <div class="poster__title">
        <h3>${t?.name||"SpecShowdown"}</h3>
        <p>${o("common.versus")}</p>
        <h3>${a?.name||o("common.secondSetup")}</h3>
      </div>
      <div class="mini-compare">
        <div class="mini-compare__row mini-compare__row--head">
          <span>${o("common.category")}</span>
          <strong>${t?.owner||t?.name||o("common.left")}</strong>
          <strong>${a?.owner||a?.name||o("common.right")}</strong>
          <em></em>
        </div>
        ${i}
      </div>
      <ul class="poster__list">${s}</ul>
    </article>
  `}function T(){const e=document.querySelector("#library-panel");if(!e)return;if(!n.profiles.length){e.innerHTML=`
      <div class="panel__header">
        <p class="section-label">${o("library.title")}</p>
        <h2>${o("library.emptyTitle")}</h2>
        <p>${o("library.emptyBody")}</p>
      </div>
      <div class="panel__actions">
        <button class="button button--primary" type="button" data-action="new-profile">${o("library.create")}</button>
        <button class="button button--ghost" type="button" data-action="load-demo-data">${o("library.useDemo")}</button>
      </div>
    `;return}const t=n.profiles.map(a=>{const r=v.filter(l=>a.gear[l]?.trim()).length,i=n.selectedProfileId===a.id,s=[n.compareLeftId===a.id?`<span class="slot-pill slot-pill--left">${o("library.leftSlot")}</span>`:"",n.compareRightId===a.id?`<span class="slot-pill slot-pill--right">${o("library.rightSlot")}</span>`:""].filter(Boolean).join("");return`
        <article class="library-item ${i?"is-selected":""}">
          <button class="library-item__body" type="button" data-action="select-profile" data-profile-id="${a.id}">
            <span class="library-item__status">${o(i?"library.selected":"library.selectForEdit")}</span>
            <h3>${p(a.name||o("editor.newProfileName"))}</h3>
            <p>${p(a.tagline||a.owner||"—")}</p>
            <div class="library-item__meta">
              <span>${o("library.filled",{count:r})}</span>
              ${s}
            </div>
          </button>
          <div class="library-item__actions">
            <button type="button" data-action="assign-left" data-profile-id="${a.id}">${o("library.leftSlot")}</button>
            <button type="button" data-action="assign-right" data-profile-id="${a.id}">${o("library.rightSlot")}</button>
            <button type="button" data-action="duplicate-profile" data-profile-id="${a.id}">${o("library.duplicate")}</button>
            <button type="button" data-action="delete-profile" data-profile-id="${a.id}">${o("library.delete")}</button>
          </div>
        </article>
      `}).join("");e.innerHTML=`
    <div class="panel__header">
      <p class="section-label">${o("library.title")}</p>
      <h2>${o("library.body")}</h2>
      <p class="panel__status">${o("library.localStatus")}</p>
    </div>
    <div class="panel__actions">
      <button class="button button--primary" type="button" data-action="new-profile">${o("library.create")}</button>
      <button class="button button--ghost" type="button" data-action="load-demo-data">${o("actions.loadDemo")}</button>
    </div>
    <p class="panel__hint">${o("library.hint")}</p>
    <div class="library-list">${t}</div>
  `}function $e(){const e=document.querySelector("#editor-panel");if(!e)return;const t=I();if(!t){e.innerHTML=`
      <div class="panel__header">
        <p class="section-label">${o("editor.title")}</p>
        <h2>${o("editor.emptyTitle")}</h2>
        <p>${o("editor.emptyBody")}</p>
      </div>
    `;return}const a=v.map(r=>`
        <label class="field">
          <span>${o(`category.${r}`)}</span>
          <input
            type="text"
            data-field="${r}"
            value="${p(t.gear[r]||"")}"
            placeholder="${o(`placeholder.${r}`)}"
          />
        </label>
      `).join("");e.innerHTML=`
    <div class="panel__header">
      <p class="section-label">${o("editor.title")}</p>
      <h2>${o("editor.body")}</h2>
      <p class="panel__hint">${o("editor.onboarding")}</p>
      ${n.lastSavedAt?`<p class="panel__status">${At(n.lastSavedAt)}</p>`:""}
    </div>
    <div class="editor-shortcuts">
      <button class="button button--ghost" type="button" data-action="assign-left" data-profile-id="${t.id}">${o("compare.useActiveLeft")}</button>
      <button class="button button--ghost" type="button" data-action="assign-right" data-profile-id="${t.id}">${o("compare.useActiveRight")}</button>
    </div>
    <form class="editor-form" autocomplete="off">
      <div class="form-block">
        <div class="form-block__title">
          <p class="section-label">${o("editor.identityTitle")}</p>
        </div>
        <div class="identity-grid">
          <label class="field">
            <span>${o("editor.name")}</span>
            <input type="text" data-field="name" value="${p(t.name||"")}" placeholder="${o("editor.namePlaceholder")}" />
          </label>
          <label class="field">
            <span>${o("editor.owner")}</span>
            <input type="text" data-field="owner" value="${p(t.owner||"")}" placeholder="${o("editor.ownerPlaceholder")}" />
          </label>
        </div>
        <label class="field">
          <span>${o("editor.tagline")}</span>
          <input type="text" data-field="tagline" value="${p(t.tagline||"")}" placeholder="${o("editor.taglinePlaceholder")}" />
        </label>
      </div>
      <div class="form-block">
        <div class="form-block__title">
          <p class="section-label">${o("editor.gearTitle")}</p>
        </div>
        <div class="gear-grid">${a}</div>
      </div>
      <div class="form-block">
        <div class="form-block__title">
          <p class="section-label">${o("editor.notesTitle")}</p>
        </div>
        <label class="field">
          <span>${o("editor.notes")}</span>
          <textarea rows="5" data-field="notes" placeholder="${o("editor.notesPlaceholder")}">${p(t.notes||"")}</textarea>
        </label>
      </div>
    </form>
  `}function $(){const e=document.querySelector("#compare-panel");if(!e)return;const{left:t,right:a,visibleCategories:r,isShared:i}=D();if(!t||!a){e.innerHTML=`
      <div class="panel__header">
        <p class="section-label">${o("compare.title")}</p>
        <h2>${o("compare.emptyTitle")}</h2>
        <p>${o("compare.emptyBody")}</p>
      </div>
      <button class="button button--ghost" type="button" data-action="load-demo-data">${o("compare.loadDemoCompare")}</button>
    `;return}const s=v.map(m=>`
        <label class="filter-chip">
          <input type="checkbox" data-category-toggle="${m}" ${r.includes(m)?"checked":""} />
          <span>${o(`category.${m}`)}</span>
        </label>
      `).join(""),l=r.length?r.map(m=>{const _=t.gear[m]||"—",j=a.gear[m]||"—",J=_!=="—"&&_===j;return`
            <div class="compare-row ${J?"is-shared":""}">
              <div class="compare-row__label">
                <span>${o(`category.${m}`)}</span>
                ${J?`<em>${o("compare.sameTag")}</em>`:""}
              </div>
              <div class="compare-row__cell"><strong>${p(_)}</strong></div>
              <div class="compare-row__cell"><strong>${p(j)}</strong></div>
            </div>
          `}).join(""):`<p class="empty-inline">${o("share.noCategories")}</p>`,c=I(),d=c?p(c.name):"-",u=i?`
      <div class="shared-toolbar">
        <div>
          <span>${o("compare.leftLabel")}</span>
          <strong>${p(t.name)}</strong>
        </div>
        <div>
          <span>${o("compare.rightLabel")}</span>
          <strong>${p(a.name)}</strong>
        </div>
      </div>
    `:`
      <div class="compare-toolbar">
        <label class="field field--compact">
          <span>${o("compare.leftLabel")}</span>
          <select data-select="left">${oe(n.compareLeftId)}</select>
        </label>
        <label class="field field--compact">
          <span>${o("compare.rightLabel")}</span>
          <select data-select="right">${oe(n.compareRightId)}</select>
        </label>
      </div>
    `;e.innerHTML=`
    <div class="panel__header" id="compare-stage">
      <p class="section-label">${o("compare.title")}</p>
      <h2>${o("compare.body")}</h2>
      ${i?`<div class="shared-banner"><strong>${o("compare.sharedTitle")}</strong><p>${o("compare.sharedBody")}</p></div>`:""}
      ${n.notice?`<p class="panel__status panel__status--accent">${Dt(n.notice)}</p>`:""}
    </div>
    ${i?"":`
      <div class="compare-shortcuts">
        <div class="compare-shortcuts__current">
          <span>${o("compare.activeProfile")}</span>
          <strong>${d}</strong>
        </div>
        <div class="compare-shortcuts__actions">
          <button class="button button--ghost" type="button" data-action="assign-left">${o("compare.useActiveLeft")}</button>
          <button class="button button--ghost" type="button" data-action="assign-right">${o("compare.useActiveRight")}</button>
          <button class="button button--ghost" type="button" data-action="swap-compare">${o("compare.swapProfiles")}</button>
        </div>
      </div>
    `}
    ${u}
    <div class="mode-toggle" role="tablist" aria-label="${o("compare.title")}">
      <button type="button" class="${n.viewMode==="minimal"?"is-active":""}" data-action="view-mode" data-mode="minimal">${o("compare.minimal")}</button>
      <button type="button" class="${n.viewMode==="full"?"is-active":""}" data-action="view-mode" data-mode="full">${o("compare.full")}</button>
    </div>
    <div class="filter-section">
      <div>
        <p class="section-label">${o("compare.filters")}</p>
        <p class="panel__hint">${o("compare.filtersHint")}</p>
      </div>
      <div class="filter-grid">${s}</div>
    </div>
    <article class="compare-board ${n.viewMode==="minimal"?"is-minimal":"is-full"}">
      <div class="compare-board__head">
        <div>
          <p>${p(t.owner||t.name)}</p>
          <h3>${p(t.name)}</h3>
          ${n.viewMode==="full"&&t.tagline?`<span>${p(t.tagline)}</span>`:""}
        </div>
        <div>
          <p>${p(a.owner||a.name)}</p>
          <h3>${p(a.name)}</h3>
          ${n.viewMode==="full"&&a.tagline?`<span>${p(a.tagline)}</span>`:""}
        </div>
      </div>
      <div class="compare-board__rows">${l}</div>
      ${n.viewMode==="full"?`
            <div class="compare-board__notes">
              <article>
                <p class="section-label">${o("compare.notesLabel")}</p>
                <p>${p(t.notes||"—")}</p>
              </article>
              <article>
                <p class="section-label">${o("compare.notesLabel")}</p>
                <p>${p(a.notes||"—")}</p>
              </article>
            </div>
          `:""}
    </article>
    <div class="panel__actions">
      <button class="button button--primary" type="button" data-action="copy-share-link">${o("compare.copyShare")}</button>
      ${i?`<button class="button button--ghost" type="button" data-action="import-shared">${o("compare.importShared")}</button>`:""}
      ${i?`<button class="button button--ghost" type="button" data-action="clear-shared-mode">${o("compare.clearShared")}</button>`:""}
    </div>
  `}function f(){const e=document.querySelector("#share-panel"),t=document.querySelector("#export-panel");if(!e||!t)return;const{left:a,right:r,visibleCategories:i}=D(),s=I(),l=n.shareMode==="compare"&&a&&r;if(!s&&!l){e.innerHTML="",t.innerHTML="";return}const c=l?Ft(a,r,i):jt(s,i),d=["editorial","specsheet","spotlight"].map(u=>`
        <button
          type="button"
          class="${n.cardStyle===u?"is-active":""}"
          data-action="set-card-style"
          data-style="${u}"
        >
          ${o(`share.style.${u}`)}
        </button>
      `).join("");e.innerHTML=`
    <div class="panel__header">
      <p class="section-label">${o("share.previewTitle")}</p>
      <h2>${o("share.previewBody")}</h2>
    </div>
    <div class="mode-toggle share-mode-toggle" role="tablist" aria-label="${o("share.title")}">
      <button type="button" class="${n.shareMode==="profile"?"is-active":""}" data-action="set-share-mode" data-mode="profile">${o("share.profileMode")}</button>
      <button type="button" class="${n.shareMode==="compare"?"is-active":""}" data-action="set-share-mode" data-mode="compare">${o("share.compareMode")}</button>
    </div>
    <div class="mode-toggle share-style-toggle" role="tablist" aria-label="${o("share.styleLabel")}">
      ${d}
    </div>
    <div class="share-card-preview">
      ${c}
    </div>
  `,t.innerHTML=`
    <div class="panel__header">
      <p class="section-label">${o("share.textPreview")}</p>
      <h2>${o("share.body")}</h2>
    </div>
    <div class="panel__actions panel__actions--stacked">
      <button class="button button--primary" type="button" data-action="download-image">${o("share.exportImage")}</button>
      <button class="button button--ghost" type="button" data-action="download-json">${o("share.exportJson")}</button>
      <button class="button button--ghost" type="button" data-action="download-text">${o("share.exportText")}</button>
      <button class="button button--ghost" type="button" data-action="copy-text">${o("share.copyText")}</button>
    </div>
    <pre class="text-preview">${p(G())}</pre>
  `}function oe(e){return n.profiles.map(t=>`
        <option value="${t.id}" ${t.id===e?"selected":""}>${p(t.name||o("editor.newProfileName"))}</option>
      `).join("")}function D(){return n.sharedCompare?{left:n.sharedCompare.left,right:n.sharedCompare.right,visibleCategories:n.visibleCategories,isShared:!0}:{left:O(n.compareLeftId),right:O(n.compareRightId),visibleCategories:n.visibleCategories,isShared:!1}}function Se(){const{left:e,right:t,visibleCategories:a}=D();return!e||!t?null:{left:structuredClone(e),right:structuredClone(t),visibleCategories:a,viewMode:n.viewMode}}function kt(){if(n.shareMode==="profile"){const t=I();return t?{mode:"profile",profile:structuredClone(t),visibleCategories:[...n.visibleCategories]}:null}const e=Se();return e?{mode:"compare",...e}:null}function G(){const{left:e,right:t,visibleCategories:a}=D(),r=I();if(n.shareMode==="profile"&&r){const s=[`${o("brand.name")} | ${r.name}`,r.owner||r.name,r.tagline||"",""];return a.forEach(l=>{s.push(`${o(`category.${l}`)}: ${r.gear[l]||"-"}`)}),s.push(""),s.push(`${o("compare.notesLabel")}: ${r.notes||"-"}`),s.join(`
`)}if(!e||!t)return"";const i=[`${o("brand.name")} | ${e.name} ${o("common.versus")} ${t.name}`,`${e.owner||e.name} <> ${t.owner||t.name}`,""];return a.forEach(s=>{i.push(`${o(`category.${s}`)}: ${e.gear[s]||"—"} | ${t.gear[s]||"—"}`)}),n.viewMode==="full"&&(i.push(""),i.push(`${e.name} ${o("compare.notesLabel")}: ${e.notes||"—"}`),i.push(`${t.name} ${o("compare.notesLabel")}: ${t.notes||"—"}`)),i.join(`
`)}function I(){return O(n.selectedProfileId)}function O(e){return n.profiles.find(t=>t.id===e)||null}function h(e=!0){e&&(n.lastSavedAt=Date.now()),Rt({language:n.language,profiles:n.profiles,selectedProfileId:n.selectedProfileId,compareLeftId:n.compareLeftId,compareRightId:n.compareRightId,shareMode:n.shareMode,cardStyle:n.cardStyle,visibleCategories:n.visibleCategories,viewMode:n.viewMode,lastSavedAt:n.lastSavedAt})}function y(e){n.notice=e,window.clearTimeout(y.timeout),y.timeout=window.setTimeout(()=>{n.notice=null,$()},2600)}function Mt(e,t){return e.replace(t,`<span class="hero__accent">${t}</span>`)}function At(e){const t=new Intl.DateTimeFormat(n.language==="es"?"es-ES":"en-US",{hour:"numeric",minute:"2-digit"});return`${o("notices.saved")} ${t.format(e)}`}function Dt(e){return e.includes(".")?o(e):e}function p(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function jt(e,t){const a=t.length?t.map(r=>`
            <div class="profile-line">
              <span>${o(`category.${r}`)}</span>
              <strong>${p(e.gear[r]||"-")}</strong>
            </div>
          `).join(""):`<p class="empty-inline">${o("share.noCategories")}</p>`;return`
    <div
      class="share-export-frame share-export-frame--${n.cardStyle}"
      data-export-card
      data-export-width="1200"
      data-export-height="675"
    >
      <article class="share-card share-card--landscape share-card--profile share-card--style-${n.cardStyle}">
        <div class="share-card__backdrop"></div>
        <div class="share-card__topline share-card__topline--profile">
          <span>${o("brand.name")}</span>
          <span>${o("share.profileLabel")}</span>
        </div>
        <div class="share-card__profile-layout">
          <section class="share-card__profile-copy">
            <p class="share-card__owner">${p(e.owner||e.name)}</p>
            <h3>${p(e.name)}</h3>
            <div class="share-card__divider"></div>
            <span class="share-card__tagline">${p(e.tagline||"")}</span>
            <div class="share-card__metrics">
              <span>${o("share.categoriesCount",{count:t.length})}</span>
              <span>${o("share.readyLabel")}</span>
            </div>
          </section>
          <section class="share-card__profile-grid">
            ${a}
          </section>
        </div>
        <div class="share-card__footer">
          <article class="share-card__note share-card__note--full">
            <span>${o("compare.notesLabel")}</span>
            <p>${p(e.notes||o("share.notesFallback"))}</p>
          </article>
        </div>
      </article>
    </div>
  `}function Ft(e,t,a){const r=a.length?a.map(d=>`
            <article class="share-spec">
              <span>${o(`category.${d}`)}</span>
              <strong>${p(e.gear[d]||"-")}</strong>
            </article>
          `).join(""):`<p class="empty-inline">${o("share.noCategories")}</p>`,i=a.length?a.map(d=>`
            <article class="share-spec share-spec--right">
              <span>${o(`category.${d}`)}</span>
              <strong>${p(t.gear[d]||"-")}</strong>
            </article>
          `).join(""):`<p class="empty-inline">${o("share.noCategories")}</p>`,s=a.filter(d=>{const u=e.gear[d]||"",m=t.gear[d]||"";return u.trim()&&u===m}).length,l=p(e.notes||e.tagline||o("share.notesFallback")),c=p(t.notes||t.tagline||o("share.notesFallback"));return`
    <div
      class="share-export-frame share-export-frame--${n.cardStyle}"
      data-export-card
      data-export-width="1200"
      data-export-height="675"
    >
      <article class="share-card share-card--landscape share-card--compare share-card--style-${n.cardStyle}">
        <div class="share-card__backdrop"></div>
        <div class="share-card__topline">
          <span>${o("brand.name")}</span>
          <span>${o("share.horizontalLabel")}</span>
        </div>
        <div class="share-card__matchup">
          <section class="share-card__side share-card__side--left">
            <p>${p(e.owner||e.name)}</p>
            <h3>${p(e.name)}</h3>
            <span>${p(e.tagline||"")}</span>
            <div class="share-card__gear">${r}</div>
          </section>
          <div class="share-card__center">
            <div class="share-card__versus">${o("common.versus")}</div>
            <p class="share-card__label">${o("share.compareLabel")}</p>
            <div class="share-card__metrics">
              <span>${o("share.categoriesCount",{count:a.length})}</span>
              <span>${o("share.sharedCount",{count:s})}</span>
              <span>${n.viewMode==="minimal"?o("compare.minimal"):o("compare.full")}</span>
            </div>
          </div>
          <section class="share-card__side share-card__side--right">
            <p>${p(t.owner||t.name)}</p>
            <h3>${p(t.name)}</h3>
            <span>${p(t.tagline||"")}</span>
            <div class="share-card__gear">${i}</div>
          </section>
        </div>
        <div class="share-card__footer">
          <article class="share-card__note">
            <span>${p(e.name)}</span>
            <p>${l}</p>
          </article>
          <article class="share-card__note">
            <span>${p(t.name)}</span>
            <p>${c}</p>
          </article>
        </div>
      </article>
    </div>
  `}function o(e,t){return $t(n.language)(e,t)}
