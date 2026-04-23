/* ============================================================
   STATE v3
   ============================================================ */
const STATE_KEY='aiml_academy_v3';
const defaultState={xp:0,weeks:{},solved:{},activityLog:[],timerSessions:[],heatmap:{},achievements:{}};
let STATE={...defaultState};

function loadState(){
  try{const raw=localStorage.getItem(STATE_KEY);if(raw)STATE={...defaultState,...JSON.parse(raw)};}
  catch(e){}
}

function saveState(){
  try{localStorage.setItem(STATE_KEY,JSON.stringify(STATE));}catch(e){}
}

function addXP(amount,label){
  STATE.xp+=amount;
  const now=new Date();
  const entry={text:label,time:now.toLocaleTimeString(),xp:amount,date:now.toISOString().split('T')[0]};
  STATE.activityLog.unshift(entry);
  if(STATE.activityLog.length>100)STATE.activityLog.pop();
  STATE.heatmap=STATE.heatmap||{};
  STATE.heatmap[entry.date]=(STATE.heatmap[entry.date]||0)+1;
  saveState();
  updateXPDisplay();
  showXPFlash(amount);
  checkAchievements();
  renderHomeProgress&&renderHomeProgress();
}

function updateXPDisplay(){
  const el=document.getElementById('xpDisplay');
  if(el)el.textContent=`${STATE.xp} XP`;
}

function showXPFlash(amount){
  const el=document.createElement('div');
  el.className='xp-flash';el.textContent=`+${amount} XP`;
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),1700);
}

function checkAchievements(){
  ACHIEVEMENTS.forEach(a=>{
    if(!STATE.achievements[a.id]&&a.condition(STATE)){
      STATE.achievements[a.id]=true;saveState();
      toast(`🏆 ACHIEVEMENT: ${a.name} — ${a.desc}`,'amber');
    }
  });
}

function resetState(){STATE={...defaultState};saveState();location.reload();}
loadState();
