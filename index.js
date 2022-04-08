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
let objevenoJidlo = 0;
let cenaZaViceEnergie = 500;
AktualizujStaty();
mistnost=AktualizujMistnost();
let prestan=new Audio("HudbaDoPozadi.mp3");                         //PRESTAN JE HUDBA DO OPZADI.

if (projetychMistnosti>=2) {
    NactiSave();
    }

let savyZobrazeny=false;
document.getElementById("savy").style.display="none";
document.getElementById("saveDisketa").onclick = function() {       //Save disketa div zobrazení
    let saveDiv = document.getElementById("savy");
    if (savyZobrazeny==false) {
        saveDiv.style.display = "block";
        savyZobrazeny=true;
    }
    else if (savyZobrazeny==true) {
        saveDiv.style.display = "none";
        savyZobrazeny=false;
    }
}

document.getElementById("ulozit").onclick = function() {                    //To se stane když uložíš hru
    console.log("ukládají se údaje...");
    localStorage.setItem("projetychMistnosti",Number(projetychMistnosti));
    localStorage.setItem("vydelanychPenez",Number(vydelanychPenez));
    localStorage.setItem("mistnost",Number(mistnost));
    localStorage.setItem("zivoty",Number(zivoty));
    localStorage.setItem("energie",Number(energie));
    localStorage.setItem("penize",Number(penize));
    localStorage.setItem("odmenaZaDia",Number(odmenaZaDia));
    localStorage.setItem("spotrebaEnergie",Number(spotrebaEnergie));
    localStorage.setItem("polovicniSpotreba",Boolean(polovicniSpotreba));
    localStorage.setItem("maxEnergie",Number(maxEnergie));
    localStorage.setItem("maxZivoty",Number(maxZivoty));
    localStorage.setItem("upozorneniZombie",Boolean(upozorneniZombie));
    localStorage.setItem("upozorneniDia",Boolean(upozorneniDia));
    localStorage.setItem("alertByl",Boolean(alertByl));
    localStorage.setItem("trava",Boolean(trava));
    localStorage.setItem("objevenoJidlo",Boolean(objevenoJidlo));
    localStorage.setItem("cenaZaViceEnergie",Number(cenaZaViceEnergie));
    console.log("Údaje byly uloženy.");
}

document.getElementById("nahrat").onclick = function() {
    console.log("Načítá se save...");
    projetychMistnosti=Number(localStorage.getItem("projetychMistnosti"));
    vydelanychPenez=Number(localStorage.getItem("vydelanychPenez"));
    mistnost=Number(localStorage.getItem("mistnost"));
    zivoty=Number(localStorage.getItem("zivoty"));
    energie=Number(localStorage.getItem("energie"));
    penize=Number(localStorage.getItem("penize"));
    odmenaZaDia=Number(localStorage.getItem("odmenaZaDia"));
    spotrebaEnergie=Number(localStorage.getItem("spotrebaEnergie"));
    polovicniSpotreba=Boolean(localStorage.getItem("polovicniSpotreba")=="true");
    maxEnergie=Number(localStorage.getItem("maxEnergie"));
    maxZivoty=Number(localStorage.getItem("maxZivoty"));
    upozorneniZombie=Boolean(localStorage.getItem("upozorneniZombie") == "true");
    console.log(upozorneniZombie+" bylo načteno");
    upozorneniDia=Boolean(localStorage.getItem("upozorneniDia")=="true");
    console.log(upozorneniDia +" bylo načteno");
    alertByl=Boolean(localStorage.getItem("alertByl")== "true");
    trava=Boolean(localStorage.getItem("trava")== "true");
    objevenoJidlo=Boolean(localStorage.getItem("objevenoJidlo")== "true");
    cenaZaViceEnergie=Number(localStorage.getItem("cenaZaViceEnergie"));
    document.getElementById("mistnostPocet").innerHTML="Místnost č."+projetychMistnosti;
        document.getElementById("koupitViceEnergie").innerHTML="$"+cenaZaViceEnergie;
    console.log("poloviční spotřeba je:"+polovicniSpotreba);
    if (trava==true) {                                                  //Když máš trávu, tak se přehodí barvy a začne hrát muzik
        prestan.pause();
        prestan=new Audio("TravaHudbaLepsi.mp3");
        document.querySelector("html").style.filter = "hue-rotate(90deg)";
    }
    console.log("Save byl načat");
    AktualizujStaty();
    AktualizujMistnost();
}

document.getElementById("restart").onclick = function() {               //RESET HRY
projetychMistnosti = 1;
vydelanychPenez=0;

mistnost = 1;
zivoty = 2;
energie = 100;
penize = 50;

odmenaZaDia=50;
spotrebaEnergie=5;
polovicniSpotreba = false;
maxEnergie=100;
maxZivoty=2;
upozorneniZombie = false;
upozorneniDia = false;

pauza = true;
hudbaHraje = false;

alertByl =false;
trava=false;
objevenoJidlo = 0;
cenaZaViceEnergie = 500;
document.querySelector("html").style.filter = "hue-rotate(0deg)";               //TOTO TU NAPSAL PAPOŠ POZOR!
document.getElementById("mistnostPocet").innerHTML = "Místnost č."+mistnost;
AktualizujStaty();
AktualizujMistnost();
prestan.pause();
prestan=currentTime=0;
prestan = new Audio("HudbaDoPozadi.mp3");
if (pauza==false) prestan.play();
}

document.getElementById("pocitac").onclick = function() {                       //KDYŽ HRAJEŠ NA KOMPU ZMIZNE DŮLEŽITÁ OTÁZKA
    document.getElementById("dulezitaOtazka").style.display="none";
}
document.getElementById("mobil").onclick = function() {                         //ZMIZNE OTÁZKA A PŘEPÍŠE SE OBCHOD A CSS
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
    if (mistnost>= 1 && mistnost<=5) {                          //KOPAT > PRÁZDNÁ MÍSTNOST
        energie-=spotrebaEnergie;
        console.log("Vybral jste \"Kopat\" na \"Prázdná místnost\"");
    }
    else if (mistnost==6) {                                     //KOPAT > ZOMBIE
        console.log("Vybral jste \"Kopat\" na \"Zombie\"");
        zivoty-=1;
        energie-=spotrebaEnergie*4;
    }
    else if (mistnost==7) {                                     //KOPAT > DIAMANT
        console.log("Vybral jste \"Kopat\" na \"Diamant\"");
        energie-=spotrebaEnergie*2;
    }
    else if (mistnost==8) {                                     //KOPAT > JÍDLO
        console.log("Vybral jste \"Kopat\" na \"Jídlo\"");
        energie-=spotrebaEnergie;
    }
    AktualizujStaty();
    mistnost=AktualizujMistnost();
    Upozorneni();
    KontrolaStatu();
    projetychMistnosti+=1;
    document.getElementById("mistnostPocet").innerHTML="Místnost č."+projetychMistnosti;
}

document.getElementById("sebrat").onclick = function() {            //SEBRAT
    if (mistnost>= 1 && mistnost<=5) {                              //SEBRAT > PRÁZDNÁ MÍSTNOST
        energie-=spotrebaEnergie*4;
        console.log("Vybral jste \"Sebrat\" na \"Prázdná místnost\"");
    }
    else if (mistnost==6) {                                         //SEBRAT > ZOMBIE
        console.log("Vybral jste \"Sebrat\" na \"Zombie\"");
        zivoty-=1;
        energie-=spotrebaEnergie*4;
    }
    else if (mistnost==7) {                                         //SEBRAT > DIAMANT
        console.log("Vybral jste \"Sebrat\" na \"Diamant\"");
        penize+=odmenaZaDia;
        if (trava==true) {
            penize+=10;
        }
        vydelanychPenez+=odmenaZaDia;                               
        energie-=spotrebaEnergie*0;
    }
    else if (mistnost==8) {
        console.log("Vybral jste \"Sebrat\" na \"Jídlo\"");         //SEBRAT > JÍDLO
        energie=100;
    }
    AktualizujStaty();
    mistnost=AktualizujMistnost();
    Upozorneni();
    KontrolaStatu();
    projetychMistnosti+=1;
    document.getElementById("mistnostPocet").innerHTML="Místnost č."+projetychMistnosti;
}

document.getElementById("zabit").onclick = function() {             //ZABÍT
    if (mistnost>= 1 && mistnost<=5) {                              //ZABÍT > PRÁZDNÁ MÍSTNOST
        energie-=spotrebaEnergie*4;
        console.log("Vybral jste \"Zabít\" na \"Prázdná místnost\"");
    }
    else if (mistnost==6) {                                         //ZABÍT > ZOMBIE
        console.log("Vybral jste \"Zabít\" na \"Zombie\"");
        energie-=spotrebaEnergie*2;
        var randomCislo=VygenerujRandomCislo(2);
        console.log(randomCislo);
        if (randomCislo==2) {                                       //POKUD RANDOM ČÍSLO == 2, TAK DOSTANEŠ NĚJAKE LOVE
            let penizeUZombika = VygenerujRandomCislo(15);          //DOSTANEŠ AŽ $15
            penize+=penizeUZombika;
            vydelanychPenez+=penizeUZombika;
            console.log("Zabil jste zombíka, který u sebe měl $"+penizeUZombika);
        }
    }
    else if (mistnost==7) {
        console.log("Vybral jste \"Zabít\" na \"Diamant\"");        //ZABÍT > DIAMANT
        energie-=spotrebaEnergie*4;
    }
    else if (mistnost==8) {
        console.log("Vybral jste \"Zabít\" na \"Jídlo\"");          //ZABÍT > JÍDLO
        energie-=spotrebaEnergie;
    }
    AktualizujStaty();
    mistnost=AktualizujMistnost();
    Upozorneni();
    KontrolaStatu();
    projetychMistnosti+=1;
    document.getElementById("mistnostPocet").innerHTML="Místnost č."+projetychMistnosti;
}

document.getElementById("koupitJidlo").onclick = function() {       //KOUPIT JÍDLO $100
    if (penize>=100 && energie!=maxEnergie) {
        penize-=100;
        energie+=100;
        if(energie>=maxEnergie) energie=maxEnergie;
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
        trava=true;
        AktualizujStaty();
        Koupeno();
        prestan.pause();
        prestan = new Audio("TravaHudbaLepsi.mp3");
        document.querySelector("html").style.filter = "hue-rotate(90deg)";
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
    if (penize>=cenaZaViceEnergie) {
        penize-=cenaZaViceEnergie;
        cenaZaViceEnergie+=250;
        maxEnergie+=50;
        document.getElementById("koupitViceEnergie").innerHTML = "$"+cenaZaViceEnergie;
        energie=maxEnergie;
        AktualizujStaty();
        Koupeno();
    }
}

document.getElementById("koupitViceZivotu").onclick = function() {  //KOUPIT +1 ŽIVOT $750
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

document.getElementById("spustitHudbu").onclick = function() {          //TLAČÍTKO HUDBA
    let muzik = document.getElementById("spustitHudbu");                //DO PROMĚNNÉ muzik SE ULOŽÍ TLAČÍTKO
    if (pauza==true) {                                                  //POKUD JE PAUZA, HUDBA SE PUSTÍ
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
    else {                                                                //POKUD HUDBA HRAJE, PAUZNE SE
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

document.getElementById("jitDoObchodu").onclick = function() {          //TOTO SE STANE KDYŽ JDEŠ DO OBCHODU
    if (trava!=true) {prestan.pause(); prestan = new Audio("HudbaObchodLepsi.mp3"); prestan.currentTime=0; prestan.volume=0.6}      //POKUD SI TRÁVA JE TRUE, TAK ZAČNE HRÁT WEED HUDBA
    document.body.style.backgroundColor="#EBC09B";
    document.getElementById("Hra").style.display = "none";
    document.getElementById("Obchod").style.display = "block";
    document.getElementById("vratitSe").style.display="Block";
    document.getElementById("savy").style.display="none";               //SAVY SE SCHOVAJ
    savyZobrazeny=false;                                                
    document.body.backgroundColor="#EBC09B";
    if (pauza!=true && trava!=true) {                                   //TOTO MOC NECHAPU, ALE ASI POKUD JE NENI PAUZA ANI TRAVA TAK HRAJE NEJAKA HUDBA ASI
    prestan.play();
    prestan.volume=0.4;
    prestan.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    }
}

document.getElementById("vratitSe").onclick = function() {              //TOTO SE STANE KDYŽ SE VRÁTÍŠ Z OBCHODU DO DOLU
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

function AktualizujStaty() {                                            //AKTUALIZACE STATŮ DO HTML
    document.getElementById("energieLabel").innerHTML = energie;
    document.getElementById("zivotyLabel").innerHTML = zivoty;
    document.getElementById("penizeLabel").innerHTML = penize;
}

function AktualizujMistnost() {                                         //MĚNĚNÍ MÍSTNOSTÍ
    console.log("\n\n\nDalší TAH");
    mistnost=VygenerujRandomCislo(7);                                   
    let hlavniObrazek = document.getElementById("obrazek");             //DO PROMĚNNÉ SE NAHRAJE OBRÁZEK

    if (energie<=15 && penize<100 && objevenoJidlo<2) {                 //POKUD MAŠ MALO ENERGIE, MALO PENĚZ, A MÉNĚ NEŽ 2X SI OBJEVIL JÍDLO, TAK DOSTANEŠ JIDLO
        mistnost=8;
        console.log("Objevilo se jídlo.")
        hlavniObrazek.src="/Nová Grafika/Maso_01.png";
        objevenoJidlo+=1;
    }
    var randomCislo = VygenerujRandomCislo(3);  
    console.log("Program vygeneroval místnost č."+mistnost);
    if (mistnost<=5) {                                                  //PRÁZDNÁ MÍSTNOST, VÝBĚR TYPU MÍSTNOSTI
        if (randomCislo==1) hlavniObrazek.src="/Nová Grafika/PrázdnáMístnost_01.png";
        else if (randomCislo==2) hlavniObrazek.src="/Nová Grafika/PrázdnáMístnost_02.png";
        else if (randomCislo==3) hlavniObrazek.src="/Nová Grafika/PrázdnáMístnost_03.png";
        console.log("Objevila se prázdná místnost");
    }
    else if (mistnost==6) {                                             //ZOMBIE, VÝBĚR TYPU MÍSTNOSTI
        if (trava!=true) {                                              //POKUD NENÍ TRÁVA, NORMALNI ZOMBCI
        if (randomCislo==1) hlavniObrazek.src="/Nová Grafika/Zombie_01.png";
        else if (randomCislo==2) hlavniObrazek.src="/Nová Grafika/Zombie_02.png";
        else if (randomCislo==3) hlavniObrazek.src="/Nová Grafika/Zombie_03.png";
        }
        if(trava==true) {                                               //POKUD TRÁVA JE TAK TRÁVA ZOMBÍCI
            if (randomCislo==1) hlavniObrazek.src="/Nová Grafika/ZombieTráva_01.png";
            else if (randomCislo==2) hlavniObrazek.src="/Nová Grafika/ZombieTráva_02.png";
            else if (randomCislo==3) hlavniObrazek.src="/Nová Grafika/ZombieTráva_03.png";
        }
        console.log("Objevil se Zombie");
    }
    else if (mistnost==7){                                              //DIAMANT
        if (trava!=true) {                                              //POKUD NENI TRAVA, NORMALNI DIAMANT
        if (randomCislo==1) hlavniObrazek.src="/Nová Grafika/Diamant_01.png";
        else if (randomCislo==2) hlavniObrazek.src="/Nová Grafika/Diamant_02.png";
        else if (randomCislo==3) hlavniObrazek.src="/Nová Grafika/Diamant_03.png";
        }
        if(trava==true) {                                               //POKUD SI SJETEJ, TAK DOBRY DIAMANT
            if (randomCislo==1) hlavniObrazek.src="/Nová Grafika/DiamantTráva_01.png";
            else if (randomCislo==2) hlavniObrazek.src="/Nová Grafika/DiamantTráva_02.png";
            else if (randomCislo==3) hlavniObrazek.src="/Nová Grafika/DiamantTráva_03.png";
        }
        console.log("Objevil se Diamant");
    }

    return mistnost;
}

function VygenerujRandomCislo(DoKolika) {                               //TOTO GENERUJE RANDOM ČISLO
    GenerujRandomCislo = Math.floor((Math.random()*DoKolika)+1);
    return GenerujRandomCislo;
}

function KontrolaStatu() {                                               //CHECKNUTÍ TOHO JESTLIS NECHCÍP

    if (zivoty<=0) 
    {
        Konec();
         document.getElementById("zivotyLabel").innerHTML = 0;          //DOŠLY ŽIVOTY
         document.getElementById("kopat").style.visibility="hidden";
         document.getElementById("sebrat").style.visibility="hidden";
         document.getElementById("zabit").style.visibility="hidden";
         document.getElementById("obrazek").src="end.png";
         window.alert("Přišel jste o životy\n\tHra skončila\nCelkový počet projetých místností: "+projetychMistnosti+"\nCelkem zarobených love: "+vydelanychPenez+"\nRestartujte hru");
         alertByl=true;
    }
    else if (energie<=0 && alertByl==false)                              //DOŠLA ENERGIE
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

function Upozorneni() {                                                 //POZOR!! UPOZORNĚNÍ
    if (upozorneniZombie==true && mistnost==6) {                        //AN ZOMBIE
        let audio = new Audio("Upozorneni Zombie.mp3");
        audio.volume=0.2;
        audio.play();
        document.body.style.backgroundColor = "#FF6133";
    }
    else if (upozorneniDia==true && mistnost==7) {                      //NA DIAM
        let audio = new Audio("Upozorneni Dia.mp3");
        audio.volume=0.2;
        audio.play();
        document.body.style.backgroundColor = "#33A8FF";
    }
    else {                                                              //POKUD SE NIC NEDĚJE TAK SE ZMĚNÍ BARVA POZADÍ NA KLASIK
        document.body.style.backgroundColor="#C3C3C3";
    }
}

function Koupeno() {                                                    //ZVUK POKLADNY
    let audio = new Audio("Pokladna.mp3");
    audio.volume=0.6;
    audio.play();
}

function HudbaDoPozadi() {                                              //HUDBA DO OPZADÉ HRAJE
    let audio = new Audio("HudbaDoPozadi.mp3");
    audio.volume=0.3;
    audio.play();
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    return audio;
}
    
function Konec() {                                                      //FIN
    let audio = new Audio("konec.mp3");
    audio.volume=1;
    audio.play();
    document.getElementById("jitDoObchodu").style.display="none";
}
