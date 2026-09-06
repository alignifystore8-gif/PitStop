(() => {
"use strict";

/* PITSTOP FAST DATA LAYER
   Embedded fallback renders immediately when the initial view is in its seeded local region. Live OpenStreetMap refresh happens after paint and follows the user/map location anywhere in the world.
   Fallback records are real named Maple Ridge-area amenities sourced from City/EV listings;
   their map coordinates are approximate and are intentionally labeled as "community fallback".
*/
const FALLBACK = [
 {id:"fallback-mrp-wash",name:"Maple Ridge Park — Washrooms",category:"washroom",icon:"⌁",lat:49.2456,lng:-122.5716,address:"13180 232 Street / 23280 132 Avenue, Maple Ridge",detail:"City park washrooms",sourceUrl:"https://www.mapleridge.ca/art-parks-rec/recreation-facilities/maple-ridge-park"},
 {id:"fallback-mrp-water",name:"Maple Ridge Park — Drinking Water",category:"water",icon:"♒",lat:49.2456,lng:-122.5716,address:"13180 232 Street / 23280 132 Avenue, Maple Ridge",detail:"Drinking water / spray park area",sourceUrl:"https://www.mapleridge.ca/art-parks-rec/recreation-facilities/maple-ridge-park"},
 {id:"fallback-mrp-parking",name:"Maple Ridge Park — Parking",category:"parking",icon:"P",lat:49.2456,lng:-122.5716,address:"13180 232 Street / 23280 132 Avenue, Maple Ridge",detail:"Park parking; construction/overflow conditions may change",sourceUrl:"https://www.mapleridge.ca/art-parks-rec/recreation-facilities/maple-ridge-park"},
 {id:"fallback-albion-wash",name:"Albion Sports Complex — Washrooms",category:"washroom",icon:"⌁",lat:49.1925,lng:-122.5520,address:"23778 104 Avenue, Maple Ridge",detail:"Washroom / pit toilets",sourceUrl:"https://cityofmapleridge.perfectmind.com/23724/Clients/BookMe4LandingPages/Facility?arrivalDate=2025-06-10T00:00:01.352Z&calendarId=f2bf926c-4502-449e-8268-b39e9f0a573c&facilityId=b5428c9c-16c8-44ce-be47-ee88da8282e9&landingPageBackUrl=https%3A%2F%2Fcityofmapleridge.perfectmind.com%2F23724%2FClients%2FBookMe4FacilityList%2FList%3FwidgetId%3Dcbc267ee-a0de-485f-8aba-2d92644be526%26calendarId%3Df2bf926c-4502-449e-8268-b39e9f0a573c&widgetId=cbc267ee-a0de-485f-8aba-2d92644be526"},
 {id:"fallback-albion-water",name:"Albion Sports Complex — Water",category:"water",icon:"♒",lat:49.1925,lng:-122.5520,address:"23778 104 Avenue, Maple Ridge",detail:"Water bottle fill station / drinking fountain",sourceUrl:"https://cityofmapleridge.perfectmind.com/23724/Clients/BookMe4LandingPages/Facility?arrivalDate=2025-06-10T00:00:01.352Z&calendarId=f2bf926c-4502-449e-8268-b39e9f0a573c&facilityId=b5428c9c-16c8-44ce-be47-ee88da8282e9&landingPageBackUrl=https%3A%2F%2Fcityofmapleridge.perfectmind.com%2F23724%2FClients%2FBookMe4FacilityList%2FList%3FwidgetId%3Dcbc267ee-a0de-485f-8aba-2d92644be526%26calendarId%3Df2bf926c-4502-449e-8268-b39e9f0a573c&widgetId=cbc267ee-a0de-485f-8aba-2d92644be526"},
 {id:"fallback-albion-parking",name:"Albion Sports Complex — Parking",category:"parking",icon:"P",lat:49.1925,lng:-122.5520,address:"23778 104 Avenue, Maple Ridge",detail:"Large gravel parking lot",sourceUrl:"https://cityofmapleridge.perfectmind.com/23724/Clients/BookMe4LandingPages/Facility?arrivalDate=2025-06-10T00:00:01.352Z&calendarId=f2bf926c-4502-449e-8268-b39e9f0a573c&facilityId=b5428c9c-16c8-44ce-be47-ee88da8282e9&landingPageBackUrl=https%3A%2F%2Fcityofmapleridge.perfectmind.com%2F23724%2FClients%2FBookMe4FacilityList%2FList%3FwidgetId%3Dcbc267ee-a0de-485f-8aba-2d92644be526%26calendarId%3Df2bf926c-4502-449e-8268-b39e9f0a573c&widgetId=cbc267ee-a0de-485f-8aba-2d92644be526"},
 {id:"fallback-kanaka-wash",name:"Kanaka Creek Regional Park — Washrooms",category:"washroom",icon:"⌁",lat:49.2188,lng:-122.5369,address:"23150 River Road, Maple Ridge",detail:"Accessible washrooms at Fraser Riverfront / pit toilets in park",sourceUrl:"https://www.mapleridge.ca/art-parks-rec/recreation-facilities/kanaka-creek-regional-park"},
 {id:"fallback-kanaka-water",name:"Kanaka Creek Regional Park — Drinking Water",category:"water",icon:"♒",lat:49.2188,lng:-122.5369,address:"23150 River Road, Maple Ridge",detail:"Drinking water listed among park amenities",sourceUrl:"https://www.mapleridge.ca/art-parks-rec/recreation-facilities/kanaka-creek-regional-park"},
 {id:"fallback-kanaka-parking",name:"Kanaka Creek Regional Park — Parking",category:"parking",icon:"P",lat:49.2188,lng:-122.5369,address:"23150 River Road, Maple Ridge",detail:"Parking listed among park amenities",sourceUrl:"https://www.mapleridge.ca/art-parks-rec/recreation-facilities/kanaka-creek-regional-park"},
 {id:"fallback-haney-ev",name:"BC Hydro EV — Haney Place Mall",category:"ev",icon:"⚡",lat:49.2191,lng:-122.6017,address:"11900 Haney Place, Maple Ridge",detail:"Public DC fast charging; current availability can change",sourceUrl:"https://chargehub.com/en/ev-charging-stations/canada/british-columbia/maple-ridge/bc-hydro-maple-ridge-haney-place-mall/electric-car-stations-near-me?locId=165686"},
 {id:"fallback-22470-ev",name:"ChargePoint EV — 22470 Dewdney Trunk Road",category:"ev",icon:"⚡",lat:49.2195,lng:-122.6042,address:"22470 Dewdney Trunk Road, Maple Ridge",detail:"Public Level 2 charging; availability can change",sourceUrl:"https://chargehub.com/en/ev-charging-stations/canada/british-columbia/maple-ridge/22470-haney-place/electric-car-stations-near-me?locId=80271"},
 {id:"fallback-supercharger",name:"Tesla Supercharger — Dewdney Trunk Road",category:"ev",icon:"⚡",lat:49.2190,lng:-122.6080,address:"22441 Dewdney Trunk Road, Maple Ridge",detail:"Public EV charging location",sourceUrl:"https://chargehub.com/en/ev-charging-stations/canada/british-columbia/maple-ridge/bc-hydro-maple-ridge-haney-place-mall/electric-car-stations-near-me?locId=165686"}
];

const DEFAULT={lat:20,lng:0};
const ICON={washroom:"⌁",ev:"⚡",water:"♒",parking:"P",gas:"⛽"};
const LABEL={washroom:"WASHROOM",ev:"EV CHARGING",water:"WATER",parking:"PARKING",gas:"GAS"};
const OVERPASS=[
 "https://overpass-api.de/api/interpreter",
 "https://overpass.private.coffee/api/interpreter"
];
let map,markerLayer,userMarker,userLocation=null,places=FALLBACK.slice(),category="all",radius=5,query="";
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
function dist(a,b,c,d){const R=6371,p=Math.PI/180,x=Math.sin((c-a)*p/2)**2+Math.cos(a*p)*Math.cos(c*p)*Math.sin((d-b)*p/2)**2;return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x))}
function fmt(k){return k<.1?Math.round(k*1000)+" m":k.toFixed(1)+" km"}
function center(){return userLocation||DEFAULT}

function initMap(){
 map=L.map("map",{zoomControl:false,preferCanvas:true,attributionControl:false}).setView([DEFAULT.lat,DEFAULT.lng],2);
 L.control.zoom({position:"bottomright"}).addTo(map);
 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap contributors",updateWhenIdle:true,keepBuffer:2}).addTo(map);
 markerLayer=L.layerGroup().addTo(map);
 requestAnimationFrame(()=>render());
 // Location runs after first paint, never blocks initial UI.
 setTimeout(()=>requestLocation(),180);
 setTimeout(()=>refreshLiveData(),450);
}

function queryText(lat,lng,r){
 const m=r*1000;
 return `[out:json][timeout:12];(nwr(around:${m},${lat},${lng})["amenity"~"toilets|drinking_water|parking|charging_station|fuel"];nwr(around:${m},${lat},${lng})["shop"="fuel"];);out center tags;`;
}
function classify(t){if(t.amenity==="toilets")return"washroom";if(t.amenity==="drinking_water")return"water";if(t.amenity==="parking")return"parking";if(t.amenity==="charging_station")return"ev";if(t.amenity==="fuel"||t.shop==="fuel")return"gas";return null}
function normalize(e){
 const t=e.tags||{},cat=classify(t),lat=e.lat??e.center?.lat,lng=e.lon??e.center?.lon;
 if(!cat||typeof lat!=="number"||typeof lng!=="number")return null;
 return {id:`osm-${e.type}-${e.id}`,name:t.name||({washroom:"Public washroom",water:"Drinking water",parking:"Parking",ev:"EV charging station",gas:"Fuel station"}[cat]),category:cat,icon:ICON[cat],lat,lng,address:[t["addr:housenumber"],t["addr:street"],t["addr:city"]].filter(Boolean).join(" ")||"Address not listed",detail:t.opening_hours||t.fee||"OpenStreetMap mapped amenity",source:"OpenStreetMap",sourceUrl:"https://www.openstreetmap.org/"};
}
async function refreshLiveData(){
 const c=center();
 for(const endpoint of OVERPASS){
  try{
   const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),9000);
   const res=await fetch(endpoint,{method:"POST",body:queryText(c.lat,c.lng,radius),signal:ctl.signal,headers:{"Content-Type":"text/plain;charset=UTF-8"}});
   clearTimeout(timer);if(!res.ok)throw Error(res.status);
   const json=await res.json(),live=json.elements.map(normalize).filter(Boolean);
   // Keep fallback + live data, de-dupe close matches.
   const merged=[...FALLBACK,...live];
   const unique=[];
   for(const p of merged){
    if(!unique.some(q=>q.category===p.category&&dist(p.lat,p.lng,q.lat,q.lng)<.035&&(p.name===q.name||p.name.includes(q.name)||q.name.includes(p.name))))unique.push(p);
   }
   places=unique;try{localStorage.setItem("pitstop-live-cache",JSON.stringify({time:Date.now(),places}));}catch{}
   render();return;
  }catch(e){}
 }
}
function filtered(){
 const c=center();
 return places.map(p=>({...p,distance:dist(c.lat,c.lng,p.lat,p.lng)}))
 .filter(p=>(category==="all"||p.category===category)&&p.distance<=radius&&(!query||`${p.name} ${p.address} ${LABEL[p.category]}`.toLowerCase().includes(query)))
 .sort((a,b)=>a.distance-b.distance);
}
function marker(p){
 return L.marker([p.lat,p.lng],{icon:L.divIcon({className:"",html:`<div class="marker marker-${p.category}">${p.icon}</div>`,iconSize:[42,42],iconAnchor:[21,21]}),keyboard:true});
}
function render(){
 if(!map)return;
 const list=filtered();markerLayer.clearLayers();
 const fragment=document.createDocumentFragment();
 list.forEach(p=>marker(p).on("click",()=>openModal(p)).addTo(markerLayer));
 $("#count").textContent=list.length;
 if(!list.length)$("#results").innerHTML=`<div class="result empty"><b>No matching places</b><span>Try another category or expand your radius.</span></div>`;
 else $("#results").innerHTML=list.map(p=>`<button class="result" data-id="${esc(p.id)}"><span class="result-line"><b>${esc(p.name)}</b><em>${fmt(p.distance)}</em></span><span>${esc(p.address)}</span></button>`).join("");
 $$(".result[data-id]").forEach(x=>x.onclick=()=>{const p=places.find(y=>y.id===x.dataset.id);if(p){map.flyTo([p.lat,p.lng],16,{duration:.45});openModal(p)}});
 if(userLocation){
  if(!userMarker)userMarker=L.marker([userLocation.lat,userLocation.lng],{icon:L.divIcon({className:"",html:"<div class='user-marker'></div>",iconSize:[18,18],iconAnchor:[9,9]}),zIndexOffset:2000}).addTo(map);
  else userMarker.setLatLng([userLocation.lat,userLocation.lng]);
 }
}
function requestLocation(){
 if(!navigator.geolocation){$("#locationText").textContent="Location unavailable. Search for a place.";return;}
 navigator.geolocation.getCurrentPosition(pos=>{
  userLocation={lat:pos.coords.latitude,lng:pos.coords.longitude};
  $("#locationText").textContent="Using your current location.";
  map.flyTo([userLocation.lat,userLocation.lng],14,{duration:.5});
  render();refreshLiveData();
 },()=>{$("#locationText").textContent="Showing the world. Allow location access or search a place.";},{enableHighAccuracy:false,timeout:4500,maximumAge:300000});
}
function openModal(p){
 const d=dist(center().lat,center().lng,p.lat,p.lng);
 $("#modalCat").textContent=LABEL[p.category];
 $("#modalTitle").textContent=p.name;
 $("#modalAddress").textContent=p.address;
 $("#modalHours").textContent=p.detail||"Details not listed";
 $("#modalDistance").textContent=fmt(d)+" away";
 $("#modalStatus").innerHTML=`<i></i><span>${p.source==="OpenStreetMap"?"OpenStreetMap mapped":"Community fallback"}</span>`;
 $("#directions").href=`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;
 const src=$("#sourceLink");if(src){src.href=p.sourceUrl||"https://www.openstreetmap.org/";src.hidden=false}
 $("#modal").classList.add("open");document.body.classList.add("modal-open");
}
function closeModal(){$("#modal")?.classList.remove("open");document.body.classList.remove("modal-open")}

$$(".chip").forEach(b=>b.onclick=()=>{$$(".chip").forEach(x=>x.classList.remove("active"));b.classList.add("active");category=b.dataset.cat;render()});
$$(".radius button").forEach(b=>b.onclick=()=>{$$(".radius button").forEach(x=>x.classList.remove("active"));b.classList.add("active");radius=+b.dataset.radius;render();refreshLiveData()});
$("#search")?.addEventListener("input",e=>{query=e.target.value.toLowerCase().trim();render()});
$("#search")?.addEventListener("keydown",async e=>{
 if(e.key!=="Enter")return;
 const q=e.currentTarget.value.trim(); if(!q)return;
 $("#locationText").textContent="Searching worldwide…";
 try{
  const res=await fetch("https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q="+encodeURIComponent(q),{headers:{"Accept-Language":"en"}});
  const hits=await res.json();
  if(!hits.length){$("#locationText").textContent="Place not found. Try a city, address or landmark.";return;}
  const h=hits[0],lat=+h.lat,lng=+h.lon;
  userLocation={lat,lng};
  map.flyTo([lat,lng],13,{duration:.6});
  $("#locationText").textContent=h.display_name;
  category="all";$$(".chip").forEach(x=>x.classList.toggle("active",x.dataset.cat==="all"));
  query="";
  $("#search").value="";
  render();refreshLiveData();
 }catch(err){$("#locationText").textContent="Place search is temporarily unavailable.";}
});
$("#clearSearch")?.addEventListener("click",()=>{$("#search").value="";query="";render()});
$("#locateBtn")?.addEventListener("click",requestLocation);
$("#heroLocate")?.addEventListener("click",()=>{document.querySelector("#explore")?.scrollIntoView({behavior:"smooth"});setTimeout(requestLocation,450)});
$("#recenter")?.addEventListener("click",()=>{const c=center();map.flyTo([c.lat,c.lng],userLocation?14:13,{duration:.4})});
$("#modalClose")?.addEventListener("click",closeModal);
$("#modal")?.addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
$("#menuBtn")?.addEventListener("click",()=>$("#mobileNav")?.classList.toggle("open"));

/* Global lightweight 3D scroll system. */
let raf=false;
function scrollFX(){
 const y=scrollY;
 document.documentElement.style.setProperty("--scroll-y",y+"px");
 $$(".depth").forEach(el=>{const r=el.getBoundingClientRect(),mid=innerHeight/2,delta=(r.top+r.height/2-mid)/innerHeight;el.style.transform=`translate3d(0,${delta*-14}px,0) rotateX(${delta*1.5}deg)`});
 const grid=$("#heroGrid");if(grid)grid.style.transform=`perspective(680px) rotateX(${64-Math.min(y*.012,12)}deg) rotateZ(${-8+Math.min(y*.004,5)}deg) translate3d(0,${Math.min(y*.35,180)}px,0) scale(${1.3+y*.00025})`;
 raf=false;
}
addEventListener("scroll",()=>{if(!raf){raf=true;requestAnimationFrame(scrollFX)}},{passive:true});
$$(".tilt").forEach(card=>{card.addEventListener("pointermove",e=>{if(innerWidth<760)return;const r=card.getBoundingClientRect(),x=e.clientX/r.width-r.left/r.width-.5,y=e.clientY/r.height-r.top/r.height-.5;card.style.transform=`perspective(700px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(8px)`});card.addEventListener("pointerleave",()=>card.style.transform="")});
$$(".faq-q").forEach(q=>q.onclick=()=>q.parentElement.classList.toggle("open"));

$("#contactForm")?.addEventListener("submit",e=>{
 e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget));const arr=JSON.parse(localStorage.getItem("pitstop-suggestions")||"[]");arr.push({...d,created:new Date().toISOString()});localStorage.setItem("pitstop-suggestions",JSON.stringify(arr));
 $("#formNotice").textContent="Saved on this device. Copy it below to send your suggestion.";
 $("#copySuggestion").hidden=false;$("#copySuggestion").onclick=()=>navigator.clipboard?.writeText(`PitStop suggestion\nName: ${d.name}\nEmail: ${d.email}\nType: ${d.category}\nLocation: ${d.location}\nDetails: ${d.message}`).then(()=>$("#formNotice").textContent="Copied to clipboard.");
});

if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
document.addEventListener("DOMContentLoaded",()=>{if($("#map"))initMap();else scrollFX()});
})();