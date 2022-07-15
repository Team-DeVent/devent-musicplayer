var handle;(()=>{"use strict";var e={d:(t,a)=>{for(var l in a)e.o(a,l)&&!e.o(t,l)&&Object.defineProperty(t,l,{enumerable:!0,get:a[l]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Album:()=>l,Music:()=>i,albumFunc:()=>n,musicFunc:()=>u});class a extends HTMLElement{connectedCallback(){let e=this.getElementsByTagName("card-album-title"),t=this.getElementsByTagName("card-album-text"),a=this.getAttribute("image-src"),l=this.getAttribute("album-idx"),i=document.createElement("div"),n=document.createElement("img"),u=document.createElement("h5"),o=document.createElement("p");for(this.classList.add("col-6"),i.classList.add("card","card-border-none","mb-3"),i.setAttribute("onclick",`render('/page/album/${l}')`),n.classList.add("card-img-square"),u.classList.add("card-title","mt-2"),o.classList.add("card-text"),n.setAttribute("src",a),n.setAttribute("onerror","this.src='/static/image/album.jpg'"),u.innerText=e[0].innerText,o.innerText=t[0].innerText;this.firstChild;)this.removeChild(this.firstChild);i.appendChild(n),i.appendChild(u),i.appendChild(o),this.appendChild(i)}}class l{constructor(){}async create(e){return(await fetch("/api/album",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:`album_title=${e.album_title}&album_text=${e.album_text}&album_image=${e.album_image}`})).json()}async read(e){let t="all"==e.album_idx?"":e.album_idx;return(await fetch(`/api/album/${t}`,{method:"GET"})).json()}async delete(e){return(await fetch(`/api/album/${e.album_idx}`,{method:"DELETE"})).json()}}class i{constructor(){}async upload(e){return(await fetch("/api/music",{method:"POST",body:e})).json()}async get(e){return(await fetch(`/api/music/${e}`,{method:"GET"})).json()}}const n={addAlbum:async function(){let e=new handle.Album,t={album_title:document.querySelector("#form_album_title").value,album_text:document.querySelector("#form_album_text").value,album_image:document.querySelector("#form_album_image").value};await e.create(t)},deleteAlbum:async function(){let e=new handle.Album,t={album_idx:location.pathname.split("/")[3]},a=await e.delete(t);console.log(a)},loadAlbum:async function(e="all"){let t=new handle.Album,a=document.querySelector("#list_album"),l={album_idx:e};(await t.read(l)).result.forEach((e=>{let t=document.createElement("card-album"),l=document.createElement("card-album-title"),i=document.createElement("card-album-text");t.setAttribute("image-src",e.album_image),t.setAttribute("album-idx",e.idx),l.innerText=e.album_title,i.innerText=e.album_text,t.appendChild(l),t.appendChild(i),a.insertAdjacentElement("beforeend",t)}))},loadAlbumSelect:async function(){let e=new handle.Album,t=document.querySelector("#form_music_albums");(await e.read({album_idx:"all"})).result.forEach((e=>{let a=document.createElement("option");a.setAttribute("value",e.idx),a.innerText=e.album_title,t.insertAdjacentElement("beforeend",a)}))}},u={object:{audio:new Audio,currentAudioUrl:"",existAudio:!1},modal:{player:new bootstrap.Modal(document.getElementById("player_music"),{keyboard:!1})},uploadMusic:async function(){let e=new handle.Music,t=document.querySelector("#form_music_file").files[0]||"",a=document.querySelector("#form_music_albums").selectedIndex,l={album_idx:document.querySelector("#form_music_albums").options[a].value,music_title:document.querySelector("#form_music_title").value};if(""!=t){const a=new FormData;a.append("body",JSON.stringify(l)),a.append("file",t),1==(await e.upload(a)).status?dds.toast({content:"성공적으로 업로드 했어요"}):dds.toast({content:"문제 발새애애앵"})}},getMusicFromAlbum:async function(e){let t=new handle.Music,a=document.querySelector("#list_music"),l=await t.get(e),i=0;l.result.forEach((e=>{let t=document.createElement("tr"),l=document.createElement("th"),n=document.createElement("td");i+=1,t.setAttribute("onclick",`handle.musicFunc.playMusic('/uploads/${e.music_filename}')`),l.innerText=i,n.innerText=e.music_title,t.appendChild(l),t.appendChild(n),a.insertAdjacentElement("beforeend",t)}))},playMusic:async function(e){this.object.currentAudioUrl!=e&&(console.log("change"),this.object.audio.pause(),this.object.audio=""),1==this.object.existAudio&&this.object.currentAudioUrl==e?(this.object.audio.play(),this.modal.player.show()):(this.object.currentAudioUrl=e,this.object.audio=new Audio(e),this.object.audio.play(),this.object.existAudio=!0,this.modal.player.show(),document.querySelector("#player_btn_play").setAttribute("onclick",`handle.musicFunc.playMusic('${e}')`)),setInterval((()=>{document.querySelector("#player_range").value=this.object.audio.currentTime/this.object.audio.duration*100}),600),this.showMusicControllerButton("player_btn_pause")},pauseMusic:async function(){this.object.existAudio&&this.object.audio.pause(),this.showMusicControllerButton("player_btn_play")},setCurrentTime:async function(){let e=document.querySelector("#player_range").value;this.object.audio.currentTime=e*this.object.audio.duration/100},showMusicControllerButton:async function(e){let t=["player_btn_play","player_btn_pause"];for(let e=0;e<t.length;e++)document.querySelector(`#${t[e]}`).classList.add("div-hide");document.querySelector(`#${e}`).classList.remove("div-hide")}};customElements.define("card-album",a),handle=t})();