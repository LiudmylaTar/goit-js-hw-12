import{a as S,S as q,i as a}from"./assets/vendor-BBPOLzfb.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const p of o.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const E="https://pixabay.com/api/",R="49208240-98906b06c81b1fd858a2b8a19";async function y(i,r=1,e=15){try{return(await S.get(E,{params:{key:R,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:e}})).data}catch(s){throw console.error("Error fetching images:",s),s}}const m=document.querySelector(".gallery"),v=document.querySelector(".loader"),l=document.querySelector(".load-btn");let g=new q(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,close:!0,nav:!0,animationSlide:!0,scrollZoom:!1});function w(i){const r=i.map(e=>{const s=e.tags.split(", ").slice(0,4).join(", ");return`<li class="gallery-item">
      <a class="gallery-link" href="${e.largeImageURL}">
          <img 
            class="gallery-image" 
            src= "${e.webformatURL}"
            alt= "${s}"
          />
      </a>
       <div class="image-info">
          <div class="info-titles">
          <h4>Likes</h4>
          <p>${e.likes}</p>
          </div>
          <div class="info-titles">
          <h4>Views</h4>
          <p>${e.views}</p>
          </div>
          <div class="info-titles">
          <h4>Comments</h4>
          <p>${e.comments}</p>
           </div>
          <div class="info-titles">
          <h4>Downloads</h4>
          <p>${e.downloads}</p>                 
          </div>
        </div>
  </li>`}).join("");m.insertAdjacentHTML("beforeend",r),g.refresh()}function P(){m.innerHTML=""}function L(){v.style.display="block"}function c(){v.style.display="none"}function b(){l.classList.add("active")}function d(){l.classList.remove("active")}const O=document.querySelector(".form"),f=document.querySelector(".form-input");let n=1;const u=15;let h="";O.addEventListener("submit",async i=>{i.preventDefault();const r=f.value.trim();if(r===""){a.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}P(),L(),h=r,n=1;try{const e=await y(h,n,u);if(c(),e.hits.length===0){a.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),f.value="",d();return}w(e.hits),g.refresh(),f.value="",n+=1,n<=Math.ceil(e.totalHits/u)?b():d()}catch{c(),a.error({title:"Error",message:"Something went wrong! Try again later.",position:"topRight"})}});l.addEventListener("click",async()=>{d(),L();try{const i=await y(h,n,u);w(i.hits),g.refresh(),n+=1;const{height:r}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"}),n*u<i.totalHits?b():(d(),a.info({title:"End of results",message:"You have reached the end of the collection.",position:"topRight"}))}catch{c(),a.error({title:"Error",message:"Something went wrong! Try again later.",position:"topRight"}),l.style.display="block"}finally{c()}});
//# sourceMappingURL=index.js.map
