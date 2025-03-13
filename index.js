import{a as p,S as h,i as a}from"./assets/vendor-D6sx4wc_.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const m="https://pixabay.com/api/",g="49208240-98906b06c81b1fd858a2b8a19";function y(i){return p.get(m,{params:{key:g,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(t=>t.data.hits.length===0?[]:t.data.hits).catch(t=>{throw console.error("Error fetching images:",t),t})}const u=document.querySelector(".gallery"),d=document.querySelector(".loader-wrapper");let f=new h(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,close:!0,nav:!0,animationSlide:!0,scrollZoom:!1});function v(i){const t=i.map(r=>{const n=r.tags.split(", ").slice(0,4).join(", ");return`<li class="gallery-item">
      <a class="gallery-link" href="${r.largeImageURL}">
          <img 
            class="gallery-image" 
            src= "${r.webformatURL}"
            alt= "${n}"
          />
      </a>
       <div class="image-info">
          <div class="info-titles">
          <h4>Likes</h4>
          <p>${r.likes}</p>
          </div>
          <div class="info-titles">
          <h4>Views</h4>
          <p>${r.views}</p>
          </div>
          <div class="info-titles">
          <h4>Comments</h4>
          <p>${r.comments}</p>
           </div>
          <div class="info-titles">
          <h4>Downloads</h4>
          <p>${r.downloads}</p>                 
          </div>
        </div>
  </li>`}).join("");u.insertAdjacentHTML("beforeend",t),f.refresh()}function L(){u.innerHTML=""}function w(){console.log("Лоадер показано"),d.style.display="block"}function c(){console.log("Лоадер приховано"),d.style.display="none"}const b=document.querySelector(".form");document.querySelector(".search-btn");const l=document.querySelector(".form-input");b.addEventListener("submit",i=>{i.preventDefault();const t=l.value.trim();if(t===""){a.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}L(),w(),y(t).then(r=>{if(c(),r.length===0){a.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),l.value="";return}v(r),f.refresh(),l.value=""}).catch(r=>{c(),a.error({title:"Error",message:"Something went wrong! Try again later.",position:"topRight"})})});
//# sourceMappingURL=index.js.map
