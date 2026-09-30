
// Emails that receive every pledge
const TO="abdulrafiu.badru@matrixenergygroup.com", CC="femioyewole4@yahoo.com";
const CATS=[["Platinum Sponsor","₦10,000,000 and above"],["Gold Sponsor","₦5,000,000 to ₦9,990,000"],["Silver Sponsor","₦2,000,000 to ₦4,990,000"],["Bronze Sponsor","₦1,000,000 to ₦1,990,000"],["Super Supporter","₦500,000 to ₦999,000"],["Superior Friends","₦250,000 to ₦499,000"],["Friends of Victory College","Below ₦249,000"]];
const TABLES=[["Premium Table","₦1,000,000","10 seats"],["Gold Table","₦500,000","6 seats"],["Standard Table","₦250,000","4 seats"]];
const ASPECTS=["Venue","Catering","Event branding and decoration","Photography and videography","Printing and programme materials","Souvenirs and gift items","Publicity and media","Transportation and logistics","Audio visual and technical support"];
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const set=(s,v)=>{const e=document.querySelector(s);if(e)e.innerHTML=v};
const opt=(v,t,s)=>`<label class="opt"><span>${t}${s?`<small>${s}</small>`:""}</span><input type="radio" name="category" value="${v}"><i></i></label>`;
$$("[data-cats]").forEach(e=>e.innerHTML=CATS.map(c=>`<div><b>${c[0]}</b><span>${c[1]}</span></div>`).join(""));
set("[data-table]",CATS.map(c=>`<div><b>${c[0]}</b><span>${c[1].replace("Below","Below")}</span></div>`).join(""));
set("[data-tables]",TABLES.map(t=>`<div class="card"><h3 style="font-size:22px">${t[0]}</h3>${t[1]} · ${t[2]}</div>`).join(""));
set("[data-pills]",ASPECTS.map(a=>`<span>${a}</span>`).join(""));
set('[data-opts=cats]',CATS.map(c=>opt(c[0]+" ("+c[1]+")",c[0],c[1])).join(""));
set('[data-opts=tables]',TABLES.map(t=>opt(t[0]+" ("+t[1]+", "+t[2]+")",t[0],t[1]+" · "+t[2])).join(""));
set('[data-opts=aspects]',ASPECTS.map(a=>opt("Underwrite: "+a,a)).join(""));


// calendar
const pad=n=>String(n).padStart(2,"0");
// 12:00 noon Lagos (WAT, UTC+1) = 11:00 UTC
const S="20261108T110000Z",E="20261108T140000Z",LOC="White Stone Event Centre, Oregun, Ikeja, Lagos",T="Victory College, Ikare Akoko 80th Anniversary Luncheon";
$$("[data-gcal]").forEach(a=>a.href="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(T)+"&dates="+S+"/"+E+"&location="+encodeURIComponent(LOC)+"&details="+encodeURIComponent("80 Years of Legacy. One Future."));
$$("[data-ics]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();
const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:VC80","BEGIN:VEVENT","UID:vc80luncheon@victorycollege","DTSTAMP:20260930T000000Z","DTSTART:"+S,"DTEND:"+E,"SUMMARY:"+T,"LOCATION:"+LOC,"BEGIN:VALARM","TRIGGER:-P1D","ACTION:DISPLAY","DESCRIPTION:Luncheon tomorrow","END:VALARM","END:VEVENT","END:VCALENDAR"].join("\r\n");
const l=document.createElement("a");l.href=URL.createObjectURL(new Blob([ics],{type:"text/calendar"}));l.download="VC80 Luncheon.ics";l.click()}));

$("#copyBank")&&($("#copyBank").onclick=e=>{navigator.clipboard&&navigator.clipboard.writeText($(".bank").innerText);e.target.textContent="Copied"});

// submit pledge to both emails through FormSubmit
$("#pledge")&&$("#pledge").addEventListener("submit",async e=>{e.preventDefault();
const f=e.target,m=$("#msg"),b=$("#go");m.className="";m.style.display="none";
if(!f.category.value||!f.name.value.trim()||!f.phone.value.trim()){m.className="bad";m.textContent="Please choose a category and fill in your full name and phone number.";return}
const d=new FormData(f);d.set("category",f.category.value);
d.append("_subject","New pledge: "+f.name.value.trim()+" | "+f.category.value);
d.append("_cc",CC);d.append("_template","table");d.append("_captcha","false");
if(f.email.value)d.append("_replyto",f.email.value);
b.disabled=true;b.textContent="Sending";
try{const r=await fetch("https://formsubmit.co/ajax/"+TO,{method:"POST",body:d,headers:{Accept:"application/json"}});
const j=await r.json();if(!r.ok||j.success==="false")throw 0;
m.className="ok";m.textContent="Thank you, "+f.name.value.trim()+". Your pledge has been sent. The committee will contact you to confirm.";f.reset()}
catch(x){m.className="bad";m.textContent="We could not send your pledge. Please try again or call +234 803 462 1025."}
b.disabled=false;b.textContent="Submit pledge"});
