const HH = document.getElementById('HH')
const MM = document.getElementById('MM')
const SS = document.getElementById('SS')
const AMPM = document.getElementById('AMPM')
const setAlm = document.getElementById('setAlm')
const ampm = document.getElementById('ampm');
const am = document.getElementById('am')
const pm = document.getElementById('pm')
const h_alm = document.getElementById('h_alm')
const m_alm = document.getElementById('m_alm')
const s_alm = document.getElementById('s_alm')
let CorrentTimeInSecond=0;

let audio = document.getElementById('myAudio')
audio.hidden=true;

const inSec = ()=>{
    const DateNow = new Date();
    const H = DateNow.getHours();
    const M = DateNow.getMinutes();
    const S = DateNow.getSeconds();
    CorrentTimeInSecond = ((H * 60 * 60) + (M * 60) + S)
    console.log(CorrentTimeInSecond)
    return CorrentTimeInSecond
}

const DateLogic = () =>{
let H_1=0; 
const DateNow = new Date();
const H = DateNow.getHours();
const M = DateNow.getMinutes();
const S = DateNow.getSeconds();
let APM = H>=12? 'PM' : 'AM';
if (H == 24) {
    H_1 = 12;
    APM = 'AM';
}
else if(H>12){
    H_1=H%12;
}
else{
    H_1=H;
}
HH.innerHTML=`${H_1}`;
MM.innerHTML = `${M}`;
SS.innerHTML = `${S}`;
AMPM.innerHTML = `${APM}`;
}

setInterval(()=>{
    DateLogic();
},1000)


am.addEventListener('click',()=>{
    ampm.value="AM";
    ampm.style.fontWeight = 'bold';
    ampm.disabled=true;
    console.log(ampm.value)
})
pm.addEventListener('click', () => {
    ampm.value = "PM";
    ampm.disabled = true;
    console.log(ampm.value)
})

setAlm.addEventListener('click',()=>{
    console.log(h_alm.value,m_alm.value,s_alm.value, ampm.value)
    setAlarmMain()
})

const alarm =() =>{
    let h = parseInt(h_alm.value)
    let m = parseInt(m_alm.value)
    let s = parseInt(s_alm.value)
    let ap = ampm.value
    if(ap=='PM'){
        h=h+12;
        s = s + (h*60*60) +(m*60);
        console.log(s)
        return s;
    }else{
        s = s + (h*60 *60) + (m*60);
        console.log(s)
        return s;
    }
}

const setAlarmLogic =()=>{
    let C_T = inSec()
    let A_T = alarm()
    let A_S = A_T - C_T
    if (A_S<0)
    {
        A_S += (24*60*60)
        return(A_S)
    }
    else{
        return (A_S)
    }  
}

const setAlarmMain=()=>{
    const X = setAlarmLogic();
    setTimeout(()=>{
        audio.hidden = false;
        audio.play()
        setTimeout(()=>{
            audio.pause()
            audio.hidden = true;
        },15000)
    },1000*X)
}

