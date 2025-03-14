import{a as b,S,i as c}from"./assets/vendor-BBPOLzfb.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const q="https://pixabay.com/api/",E="49208240-98906b06c81b1fd858a2b8a19";async function m(o,s=1,e=15){try{return(await b.get(q,{params:{key:E,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:e}})).data}catch(i){throw console.error("Error fetching images:",i),i}}const g=document.querySelector(".gallery"),v=document.querySelector(".loader-wrapper"),n=document.querySelector(".load-btn");let h=new S(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,close:!0,nav:!0,animationSlide:!0,scrollZoom:!1});function w(o){const s=o.map(e=>{const i=e.tags.split(", ").slice(0,4).join(", ");return`<li class="gallery-item">
      <a class="gallery-link" href="${e.largeImageURL}">
          <img 
            class="gallery-image" 
            src= "${e.webformatURL}"
            alt= "${i}"
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
  </li>`}).join("");g.insertAdjacentHTML("beforeend",s),h.refresh()}function P(){g.innerHTML=""}function L(){v.style.display="block"}function l(){v.style.display="none"}function O(){n.classList.add("active")}function f(){n.classList.remove("active")}const R=document.querySelector(".form"),p=document.querySelector(".form-input");let a=1;const d=15;let y="";R.addEventListener("submit",async o=>{o.preventDefault();const s=p.value.trim();if(s===""){c.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}P(),L(),y=s,a=1;try{const e=await m(y,a,d);if(l(),e.hits.length===0){c.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),p.value="",f();return}w(e.hits),h.refresh(),p.value="",a+=1,a<=Math.ceil(e.totalHits/d)?O():f()}catch{l(),c.error({title:"Error",message:"Something went wrong! Try again later.",position:"topRight"})}});n.addEventListener("click",async()=>{n.style.display="none",L();try{const o=await m(y,a,d);l(),w(o.hits),h.refresh(),a+=1,a>Math.ceil(o.totalHits/d)?f():n.style.display="block"}catch{l(),c.error({title:"Error",message:"Something went wrong! Try again later.",position:"topRight"}),n.style.display="block"}finally{l()}});
//# sourceMappingURL=index.js.map
