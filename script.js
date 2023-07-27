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
let APM
let audio = document.getElementById('myAudio')
audio.hidden=true;

const inSec = ()=>{
    const DateNow = new Date();
    const H = DateNow.getHours();
    const M = DateNow.getMinutes();
    const S = DateNow.getSeconds();
    CorrentTimeInSecond = ((H * 60 * 60) + (M * 60) + S)
    //console.log(CorrentTimeInSecond)
    return CorrentTimeInSecond
}

const DateLogic = () =>{
let H_1=0; 
const DateNow = new Date();
const H = DateNow.getHours();
const M = DateNow.getMinutes();
const S = DateNow.getSeconds();
APM = H>=12? 'PM' : 'AM';
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
        return s;
    }else{
        s = s + (h*60 *60) + (m*60);
        return s;
    }
}

const setAlarmLogic =()=>{
    let C_T = inSec()
    //console.log("Actual Time: "+C_T) 
    let A_T = alarm()
    //console.log("Alarm Time: " + A_T)
    //APM = 'PM'
    //console.log("Current AM / PM: " + APM + " Selected : " + ampm.value)
    if(APM=='AM' && ampm.value=='PM') //IF Current Time Is AM and Alarm if for PM
    {
        let A_S = A_T - C_T
        //console.log("AT will bigger")
        //console.log(A_S)
        return (A_S)
    } else if (APM == 'AM' && ampm.value == 'AM') {//IF Current Time Is AM and Alarm if for AM
        if (A_T > C_T) {//IF Current Time Is AM and Alarm if for AM but Alarm Time is Bigger than Current Time
            let A_S = A_T - C_T
            //console.log("AT will bigger")
            //console.log(A_S)
            return (A_S)
        }else{
            let A_S = ((24 * 60 * 60) - C_T) + A_T //IF Current Time Is AM and Alarm if for AM but Alarm Time is lesser than Current Time
            //console.log("AT will Smaller")
            //console.log(A_S)
            return (A_S)
        }  
    } else if (APM == 'PM' && ampm.value == 'AM'){
        let A_S = ((24 * 60 * 60) - C_T) + A_T
        //console.log("AT will Smaller")
        //console.log(A_S)
        return (A_S)
    } else if (APM == 'PM' && ampm.value == 'PM'){
        if (A_T > C_T) {
            let A_S = A_T - C_T
            //console.log("AT will bigger")
            //console.log(A_S)
            return (A_S)
        }else{
            let A_S = ((24 * 60 * 60) - C_T)+A_T
            //console.log(A_S)
            return (A_S)
        }

    }else{
        alert("Something Went Wrong!")
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

