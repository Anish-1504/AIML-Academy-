/* ============================================================
   UTILS v3
   ============================================================ */
let toastTimer=null;
function toast(msg,color='primary'){
  const el=document.getElementById('toast');
  const colors={primary:'var(--primary)',cyan:'var(--cyan)',amber:'var(--amber)',red:'var(--red)',green:'var(--green)',violet:'var(--violet)'};
  const c=colors[color]||colors.primary;
  el.textContent=`> ${msg}`;
  el.style.borderColor=c;el.style.color=c;el.style.boxShadow=`0 0 14px ${c}40`;
  el.classList.add('show');
  if(toastTimer)clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('show'),4000);
}

function showModal(title,body,onConfirm){
  document.getElementById('modalHeader').textContent=title;
  document.getElementById('modalBody').innerHTML=body;
  document.getElementById('modalBackdrop').classList.remove('hidden');
  document.getElementById('modalOk').onclick=()=>{closeModal();onConfirm&&onConfirm();};
  document.getElementById('modalClose').onclick=closeModal;
}
function closeModal(){document.getElementById('modalBackdrop').classList.add('hidden');}

function qs(sel,p=document){return p.querySelector(sel);}
function qsa(sel,p=document){return[...p.querySelectorAll(sel)];}
function escHtml(str){return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function today(){return new Date().toISOString().split('T')[0];}
function problemsSolved(){return Object.keys(STATE.solved).filter(k=>!k.startsWith('proj_')).length;}
function weeksCompleted(){return Object.keys(STATE.weeks).length;}
function renderProgBar(pct,color=''){return`<div class="prog-track"><div class="prog-fill ${color}" style="width:${pct}%"></div></div>`;}
