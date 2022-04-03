//1 - 5 KOPAT
//6 - ZABÍT
//7 - SEBRAT
document.getElementById("divCheaty").style.display="none";
document.getElementById("Obchod").style.display="none";
document.getElementById("vratitSe").style.display="none";
let projetychMistnosti = 1;
let vydelanychPenez=0;

let mistnost = 1;
let zivoty = 2;
let energie = 100;
let penize = 50;

let odmenaZaDia=50;
let spotrebaEnergie=5;
let polovicniSpotreba = false;
let maxEnergie=100;
let maxZivoty=2;
let upozorneniZombie = false;
let upozorneniDia = false;

let pauza = true;
let hudbaHraje = false;

let alertByl =false;
let trava=false;

AktualizujStaty();
mistnost=AktualizujMistnost();
let prestan=new Audio("HudbaDoPozadi.mp3");

document.getElementById("pocitac").onclick = function() {
    document.getElementById("dulezitaOtazka").style.display="none";
}
document.getElementById("mobil").onclick = function() {
    document.getElementById("dulezitaOtazka").style.display="none";
    document.getElementById("styl").href="style2.css";
    document.getElementById("koupitJidloLabel").innerHTML = "Jídlo";
    document.getElementById("koupitLekarnickuLabel").innerHTML = "Lékarnička";
    document.getElementById("koupitTravuLabel").innerHTML = "Tráva";
    document.getElementById("koupitViceEnergieLabel").innerHTML = "+50 Energie";
    document.getElementById("koupitViceZivotuLabel").innerHTML = "+1 Život";
    document.getElementById("koupitPolovinaEnergieLabel").innerHTML = "Poloviční spotřeba energie";
    document.getElementById("koupitVicePenezLabel").innerHTML = "+50 za Diamant";
    document.getElementById("koupitUpozorneniZombieLabel").innerHTML = "Upozornění Zombie";
    document.getElementById("koupitUpozorneniDiaLabel").innerHTML = "Upozornění Diamanty";
}

document.getElementById("kopat").onclick = function() {         //KOPAT
    if (mistnost>= 1 && mistnost<=5) {
        energie-=spotrebaEnergie;
        console.log("Vybral jste \"Kopat\" na \"Prázdná místnost\"");
    }
    else if (mistnost==6) {
        console.log("Vybral jste \"Kopat\" na \"Zombie\"");
        zivoty-=1;
        energie-=spotrebaEnergie*4;
    }
    else if (mistnost>=7) {
        console.log("Vybral jste \"Kopat\" na \"Diamant\"");
        energie-=spotrebaEnergie*2;
    }
    AktualizujStaty();
    mistnost=AktualizujMistnost();
    Upozorneni();
    KontrolaStatu();
    projetychMistnosti+=1;
    document.getElementById("mistnostPocet").innerHTML="Místnost č."+projetychMistnosti;
}

document.getElementById("sebrat").onclick = function() {            //SEBRAT
    if (mistnost>= 1 && mistnost<=5) {
        energie-=spotrebaEnergie*4;
        console.log("Vybral jste \"Sebrat\" na \"Prázdná místnost\"");
    }
    else if (mistnost==6) {
        console.log("Vybral jste \"Sebrat\" na \"Zombie\"");
        zivoty-=1;
        energie-=spotrebaEnergie*4;
    }
    else if (mistnost>=7) {
        console.log("Vybral jste \"Sebrat\" na \"Diamant\"");
        penize+=odmenaZaDia;
        vydelanychPenez+=odmenaZaDia;
        energie-=spotrebaEnergie;
    }
    AktualizujStaty();
    mistnost=AktualizujMistnost();
    Upozorneni();
    KontrolaStatu();
    projetychMistnosti+=1;
    document.getElementById("mistnostPocet").innerHTML="Místnost č."+projetychMistnosti;
}

document.getElementById("zabit").onclick = function() {             //ZABÍT
    if (mistnost>= 1 && mistnost<=5) {
        energie-=spotrebaEnergie*4;
        console.log("Vybral jste \"Zabít\" na \"Prázdná místnost\"");
    }
    else if (mistnost==6) {
        console.log("Vybral jste \"Zabít\" na \"Zombie\"");
        energie-=spotrebaEnergie*2;
    }
    else if (mistnost>=7) {
        console.log("Vybral jste \"Zabít\" na \"Diamant\"");
        energie-=spotrebaEnergie*4;
    }
    AktualizujStaty();
    mistnost=AktualizujMistnost();
    Upozorneni();
    KontrolaStatu();
    projetychMistnosti+=1;
    document.getElementById("mistnostPocet").innerHTML="Místnost č."+projetychMistnosti;
}

document.getElementById("koupitJidlo").onclick = function() {       //KOUPIT JÍDLO $100
    if (penize>=100) {
        penize-=100;
        energie=maxEnergie;
        AktualizujStaty();
        Koupeno();
    }
}

document.getElementById("koupitLekarnicku").onclick = function() {  //KOUPIT LÉKARNIČKU $200
    if (penize>=200) {
        penize-=200;
        zivoty=maxZivoty;
        AktualizujStaty();
        Koupeno();
    }
}

document.getElementById("koupitTravu").onclick = function() {       //KOUPIT TRÁVU $300
    if (penize>=300) {
        penize-=300;
        document.body.style.filter="hue-rotate(180deg)";
        trava=true;
        AktualizujStaty();
        Koupeno();
        prestan.pause();
        prestan = new Audio("TravaHudba.mp3");
        if (pauza!=true) {
        prestan.play();
        prestan.volume=0.4;
        prestan.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        }
    }
}

document.getElementById("koupitViceEnergie").onclick = function() {  //KOUPIT +50 ENERGIE $500
    if (penize>=500) {
        penize-=500;
        maxEnergie+=50;
        energie=maxEnergie;
        AktualizujStaty();
        Koupeno();
    }
}

document.getElementById("koupitViceZivotu").onclick = function() {  //KOUPIT +50 ŽIVOTŮ $750
    if (penize>=750) {
        penize-=750;
        maxZivoty+=1;
        zivoty=maxZivoty;
        AktualizujStaty();
        Koupeno();
    }
}

document.getElementById("koupitPolovinaEnergie").onclick = function() {  //KOUPIT POLOVIČNÍ SPOTŘEBU ENERGIE $1000
    if (penize>=1000 && polovicniSpotreba==false) {
        penize-=1000;
        polovicniSpotreba=true;
        spotrebaEnergie=2.5;
        AktualizujStaty();
        Koupeno();
    }
}

document.getElementById("koupitVicePenez").onclick = function() {  //KOUPIT VÍCE PENĚZ $2000
    if (penize>=2000) {
        penize-=2000;
        odmenaZaDia+=50;
        AktualizujStaty();
        Koupeno();
    }
}
document.getElementById("koupitUpozorneniZombie").onclick = function() {  //UPOZORNIT NA ZOMBIE $3000
    if (penize>=3000 && upozorneniZombie==false) {
        penize-=3000;
        upozorneniZombie=true;
        AktualizujStaty();
        Koupeno();
    }
}
document.getElementById("koupitUpozorneniDia").onclick = function() {  //UPOZORNIT NA DIA $4000
    if (penize>=4000 && upozorneniDia==false) {
        penize-=4000;
        upozorneniDia=true;
        AktualizujStaty();
        Koupeno();
    }
}

document.getElementById("spustitHudbu").onclick = function() {
    let muzik = document.getElementById("spustitHudbu");
    if (pauza==true) {
        prestan.play();
        prestan.volume=0.3;
        muzik.innerHTML = "⏸";
        pauza=false;
        prestan.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        console.log("Hudba byla spuštěna");
    }
    else {
        prestan.pause();
        prestan.currentTime=0;
        pauza=true;
        muzik.innerHTML= "▶";
        console.log("Hudba byla pauznuta");
    }

}

document.getElementById("cheatyButton").onclick = function() {
    let textCheaty = document.getElementById("cheaty").value;
    console.log(textCheaty);
    if (textCheaty=="HESOYAM") {
        penize+=250000;
        console.log("dostals nejvic love");
    }
    else if (textCheaty=="AEZAKMI") {
        zivoty+=4869;
    }
    AktualizujStaty();
}

document.getElementById("jitDoObchodu").onclick = function() {
    if (trava!=true) {prestan.pause(); prestan = new Audio("hudbaObchod.mp3"); prestan.currentTime=0;}
    document.body.style.backgroundColor="#EBC09B";
    document.getElementById("Hra").style.display = "none";
    document.getElementById("Obchod").style.display = "block";
    document.getElementById("vratitSe").style.display="Block";
    document.body.backgroundColor="#EBC09B";
    if (pauza!=true && trava!=true) {
    prestan.play();
    prestan.volume=0.4;
    prestan.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    }
}

document.getElementById("vratitSe").onclick = function() {
    if (trava!=true) {prestan.pause(); prestan = new Audio("HudbaDoPozadi.mp3");prestan.currentTime=0;}
    document.body.style.backgroundColor="#C3C3C3";
    document.getElementById("Hra").style.display = "block";
    document.getElementById("Obchod").style.display = "none";
    document.getElementById("vratitSe").style.display="none";
    if (pauza!=true && trava!=true) {
    prestan.pause();
    prestan.currentTime=0;
    prestan.play();
    prestan.volume=0.4;
    prestan.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    }
}

function AktualizujStaty() {
    document.getElementById("energieLabel").innerHTML = energie;
    document.getElementById("zivotyLabel").innerHTML = zivoty;
    document.getElementById("penizeLabel").innerHTML = penize;
}

function AktualizujMistnost() {
    console.log("\n\n\nDalší TAH");
    mistnost=Math.floor(Math.random()*8)+1;
    console.log("Program vygeneroval místnost č."+mistnost);
    if (mistnost<=5) {
        document.getElementById("obrazek").src="/kopat.png";
        console.log("Objevila se prázdná místnost");
    }
    else if (mistnost==6) {
        document.getElementById("obrazek").src="/zabit.png";
        console.log("Objevil se Zombie");
    }
    else if (mistnost==7){
        document.getElementById("obrazek").src="/sebrat.png";
        console.log("Objevil se Diamant");
    }
    return mistnost;
}

function KontrolaStatu() {

    if (zivoty<=0) 
    {
        Konec();
        document.getElementById("zivotyLabel").innerHTML = 0;
         document.getElementById("kopat").style.visibility="hidden";
         document.getElementById("sebrat").style.visibility="hidden";
         document.getElementById("zabit").style.visibility="hidden";
         document.getElementById("obrazek").src="end.png";
         window.alert("Přišel jste o životy\n\tHra skončila\nCelkový počet projetých místností: "+projetychMistnosti+"\nCelkem zarobených love: "+vydelanychPenez+"\nRestartujte hru");
         alertByl=true;
    }
    else if (energie<=0 && alertByl==false) 
    {
        Konec();
        document.getElementById("energieLabel").innerHTML = 0;
        document.getElementById("kopat").style.visibility="hidden";
        document.getElementById("sebrat").style.visibility="hidden";
        document.getElementById("zabit").style.visibility="hidden";
        document.getElementById("obrazek").src="end.png";
        window.alert("Přišel jste o veškerou energii\n\tHra skončila\nCelkový počet projetých místností: "+projetychMistnosti+"\nCelkem zarobených love: "+vydelanychPenez+"\nRestartujte hru");
        alertByl=true;
    }
}

function Upozorneni() {
    if (upozorneniZombie==true && mistnost==6) {
        let audio = new Audio("Upozorneni Zombie.mp3");
        audio.volume=0.2;
        audio.play();
        document.body.style.backgroundColor = "#FF6133";
    }
    else if (upozorneniDia==true && mistnost==7) {
        let audio = new Audio("Upozorneni Dia.mp3");
        audio.volume=0.2;
        audio.play();
        document.body.style.backgroundColor = "#33A8FF";
    }
    else {
        document.body.style.backgroundColor="#C3C3C3";
    }
}

function Koupeno() {
    let audio = new Audio("Pokladna.mp3");
    audio.volume=0.6;
    audio.play();
}

function HudbaDoPozadi() {
    let audio = new Audio("HudbaDoPozadi.mp3");
    audio.volume=0.3;
    audio.play();
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    return audio;
}

function Konec() {
    let audio = new Audio("konec.mp3");
    audio.volume=1;
    audio.play();
    document.getElementById("jitDoObchodu").style.display="none";
}