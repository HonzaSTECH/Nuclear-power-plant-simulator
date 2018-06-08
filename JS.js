var help = confirm("Share your progress in my game in the comments ;-) \nDo you want to read help first? (recommended)");

if (help === true){
    alert("Welcome to our little power plant. Your job will be to make as much electricity as possible. But it's not as easy as it sounds. If the reaction in the reactor gets out of control, the core can meltdown catastophalicly and the power plant explode. The turbine that makes the energy can get overheaten and be destroyed, so you have to take care of it to. So let me teach you some basics about maintainig a nuclear powe plant.")
    alert("Our nuclear power plant consists of two main parts: a reactor and a turbine. In the reactor there are fuel rods that allow a heat-producing nuclear reaction. This heat is absorbed by the reactor water. You can increase the speed of the reaction by moving the control rods up and down. The lower the control bars, the slower the reaction takes place. When executed completely, the reaction stops. Reactor water is pumped to the heat exchanger by the pump. Here it cools and heats turbine water. You can also control the pump. The higher its wattage, the more heat is transferred from the reactor to the turbine. The amount of heat transferred also depends on the reactor water temperature. The warmer the reactor water, the faster the heat is transmitted. When the turbine water is heated, it rotates the turbine that produces electricity. The warmer the turbine water, the faster the turbine rotates and the more electricity is produced. It is therefore best to keep the turbine temperature at the highest possible safe level. If you make electricity, you earn money. You can buy different safety upgrades for your money or buy new fuel bars. Fuel is constantly being consumed and this slows down the speed the reactor is heated up. First, fuel is consumed quickly, but then consumption slows down. It means that it will never be compleatly empty, but at some point it will exceed the limit when the reactor spontaneously cool down faster then it´s heated up. \nI think you already know everything you need, so let's go!")
    }

window.onload = function (){
    /*Variable decralations*/{
    var reactorBar = 0;
    var turbineBar = 0;
    var radioactivityBar = 0;
    var fuelBar = 330;
    var rodsLevel = 0;
    var pumpWattage = 0;
	var timeBar = 30000; //Time in (seconds * 100) = centiseconds		1 minute = 6000 centiseconds
	var energyBar = 5000; // = total money to make;
    var money = 500;
    var moneyDisplayValue = 0;
    var buyPrompt;
    var incident = 1;
    var powerFailure = false;
    var incidentTimer;
    var incidentDuration;
    
	var timeConst = timeBar;
	var energyConst = energyBar;
	energyBar = 0;
	
    var body = document.body;
    var space = document.getElementById("space");
    
    var reactor = document.getElementById("bar1");
    var turbine = document.getElementById("bar2");
    var radioactivity = document.getElementById("bar3");
    var fuel = document.getElementById("bar4");
	var time = document.getElementById("bar5");
	var totalEnergy = document.getElementById("bar6");
    var rodsLevelDisplay = document.getElementById("rodsLevel");
    var pumpWattageDisplay = document.getElementById("pumpWattage");
    var moneyDisplay = document.getElementById("money");
    var rodsDown = document.getElementById("rodsDown");
    var rodsUp = document.getElementById("rodsUp");
    var pumpDown = document.getElementById("pumpDown");
    var pumpUp = document.getElementById("pumpUp");
    var upgrade1 = document.getElementById("upgrade1");
    var upgrade2 = document.getElementById("upgrade2");
    var upgrade3 = document.getElementById("upgrade3");
    var upgrade4 = document.getElementById("upgrade4");
    var upgrade5 = document.getElementById("upgrade5");
    var upgrade6 = document.getElementById("upgrade6");
    var cheats = document.getElementById("cheats");
    var incidentDisplay = document.getElementById("incidentTime");
    
    var upgrades = new Array(false, false, false, false, false);
    
    var controlRodsDrop = document.createElement("button");
    var controlRodsDropText = document.createTextNode("Drop control rods");
    
    controlRodsDrop.appendChild(controlRodsDropText);
    controlRodsDrop.style.width = 150 + "px";
    controlRodsDrop.style.height = 20 + "px";
    controlRodsDrop.style.position = "absolute";
    controlRodsDrop.style.top = 120 + "px";
    controlRodsDrop.style.left = 315 + "px";
    
    var pumpShutDown = document.createElement("button");
    var pumpShutDownText = document.createTextNode("Shut down the pump");
    
    pumpShutDown.appendChild(pumpShutDownText);
    pumpShutDown.style.width = 150 + "px";
    pumpShutDown.style.height = 20 + "px";
    pumpShutDown.style.position = "absolute";
    pumpShutDown.style.top = 140 + "px";
    pumpShutDown.style.left = 315 + "px";
	/*
    var repairTurbine = document.createElement("button");
    var repairTurbineText = document.createTextNode("Repair turbine $2.500");
    
    repairTurbine.appendChild(repairTurbineText);
    repairTurbine.style.width = 150 + "px";
    repairTurbine.style.height = 20 + "px";
    repairTurbine.style.position = "absolute";
    repairTurbine.style.top = 40 + "px";
    repairTurbine.style.left = 260 + "px";
    repairTurbine.style.display = "none";
    space.appendChild(repairTurbine);
    */
    var GOexplosion = document.getElementById("explosion");
    var GOturbineexplosion = document.getElementById("turbineExplosion");
    var GOradioactivity = document.getElementById("radioactivity");
/*
        var valueR = document.getElementById("value1");
        var valueT = document.getElementById("value2");
        var valueRa = document.getElementById("value3");
        var valueF = document.getElementById("value4");
*/
    var timer = setInterval(update, 10);
    }
    rodsDown.onclick = function rodsDown(){
        if (rodsLevel > 0 && (powerFailure == false || upgrades[4] == true)){
        rodsLevel = (rodsLevel - 1);}
    }
    rodsUp.onclick = function rodsUp(){
        if (rodsLevel < 10 && (powerFailure == false || upgrades[4] == true)){
        rodsLevel = (rodsLevel + 1);}
    }
    pumpDown.onclick = function pumpDown(){
        if (pumpWattage > 0 && (powerFailure == false || upgrades[4] == true)){
        pumpWattage = (pumpWattage - 1);}
    }
    pumpUp.onclick = function pumpUp(){
        if (pumpWattage < 10 && (powerFailure == false || upgrades[4] == true)){
        pumpWattage = (pumpWattage + 1);}
    }
    controlRodsDrop.onclick = function rodsDrop(){
        if(powerFailure == false || upgrades[4] == true){rodsLevel = 0;}
    }
    pumpShutDown.onclick = function pumpShutDown(){
        if(powerFailure == false || upgrades[4] == true){pumpWattage = 0;}
    }
    repairTurbine.onclick = function repairTurbine(){
        if (money >= 2500){
			let repairTurbin = document.getElementById("repairTurbine");
			money -= 2500;
            turbineBar = 0;
			
            repairTurbin.style.display = "none";
        }
    }
    upgrade1.onclick = function buy1(){
        if (money >= 1000){
            buyPrompt=confirm("Loads new fuel bars into the reactor. Increasing level of radioactivity");
            if (buyPrompt === true){
                money -= 1000;
                fuelBar = 330;
                radioactivityBar += (25 + (Math.random() * 25));    //Radioactivity is raised by random value between 25 and 50 including
            }
        }
    }
    upgrade2.onclick = function buy2(){
        if (money >= 5000){
            buyPrompt=confirm("When the reactor is near its temperature limit, radioactive steam is relased to balance pressuare. Increasing radioactivity, but prevents nuclear explosion.");
            if (buyPrompt === true){
                money -= 5000;
                upgrades[0] = true;
                upgrade2.parentNode.removeChild(upgrade2);
            }
        }
    }
    upgrade3.onclick = function buy3(){
        if (money >= 10000){
            buyPrompt=confirm("The turbine gets savety fuse that decommission it in case of overheating. You will have to pay to repair the turbine, but it will not cause an explosion.");
            if (buyPrompt === true){
                money -= 10000;
                upgrades[1] = true;
                upgrade3.parentNode.removeChild(upgrade3);
            }
        }
    }
    upgrade4.onclick = function buy4(){
        if (money >= 3000){
            buyPrompt=confirm("You will be able to drop the control rods to level 0 with one click. Useful when you need to stop the reactor from overheating in a second.");
            if (buyPrompt === true){
                money -= 3000;
                upgrades[2] = true;
                upgrade4.parentNode.removeChild(upgrade4);
                space.appendChild(controlRodsDrop);
            }
        }    
    }
    upgrade5.onclick = function buy5(){
        if (money >= 2000){
            buyPrompt=confirm("You will be able to shut down the pump with one click. Useful when you need to stop the turbine from overheating in a second.");
            if (buyPrompt === true){
                money -= 2000;
                upgrades[3] = true;
                upgrade5.parentNode.removeChild(upgrade5);
                space.appendChild(pumpShutDown);
            }
        }    
    }
    upgrade6.onclick = function buy6(){
        if (money >= 20000){
            buyPrompt=confirm("During a power failure, you can use an emergency power source to maintain the power plant and preventing nuclear disaster.");
            if (buyPrompt === true){
                money -= 20000;
                upgrades[4] = true;
                upgrade6.parentNode.removeChild(upgrade6);
            }
        }
    }
    cheats.onclick = function cheats(){
        var cheatCode=prompt("\x45\x6E\x74\x65\x72\x20\x63\x68\x65\x61\x74\x20\x63\x6F\x64\x65");
        switch(cheatCode)
        {
            case "\x31\x30":
                reactorBar= 300;
                break;
            case "\x31\x31":
                reactorBar= 0;
                break;
            case "\x31\x32":
                if(reactorBar< 230){reactorBar+= 100;}
                else {reactorBar= 330;}
                break;
            case "\x31\x33":
                if(reactorBar> 100){reactorBar-= 100;}
                else{reactorBar= 0;}
                break;
            case "\x32\x30":
                turbineBar= 300;
                break;
            case "\x32\x31":
                turbineBar= 0;
                break;
            case "\x32\x32":
                if(turbineBar< 230){turbineBar+= 100;}
                else{turbineBar= 330;}
                break;
            case "\x32\x33":
                if(turbineBar> 100){turbineBar-= 100;}
                else {turbineBar= 0;}
                break;
            case "\x33\x30":
                radioactivityBar= 300;
                break;
            case "\x33\x31":
                radioactivityBar= 0;
                break;
            case "\x33\x32":
                if(radioactivityBar< 230){radioactivityBar+= 100;}
                else {radioactivityBar= 330;}
                break;
            case "\x33\x33":
                if(radioactivityBar> 100){radioactivityBar-= 100;}
                else {radioactivityBar= 0;}
                break;
            case "\x34\x30":
                fuelBar= 330;
                break;
            case "\x34\x31":
                fuelBar= 3;
                break;
            case "\x34\x32":
                if(fuelBar< 230){fuelBar+= 100;}
                else {fuelBar= 330;}
                break;
            case "\x34\x33":
                if(fuelBar> 100){fuelBar-= 100;}
                else {fuelBar= 1;}
                break;
            case "\x35\x30":
                money+= 10000;
                break;
            case "\x35\x31":
                if(money>= 10000){money-= 10000;}
                else {money = 0;}
                break;
            case "\x35\x32":
                money+= 50000;
                break;
            case "\x35\x33":
                if(money>= 50000){money-= 50000;}
                else {money = 0;}
                break;
            case "\x35\x34":
                money+= 100000;
                break;
            case "\x35\x35":
                if(money >= 100000){money-= 100000;}
                else {money = 0;}
                break;
            case "\x36\x30":
                incidentDuration= 1;
                countdown();
                break;
            case "\x36\x31":
                if(powerFailure== false)
                {
                powerFailure= true;
                incidentDuration= Math["\x66\x6C\x6F\x6F\x72"](6+ (Math["\x72\x61\x6E\x64\x6F\x6D"]()* 14));
                alert("Eletricity delivery fot the control panel has broken down. Hold on untill we repair it. "+incidentDuration+" seconds");
                incidentTimer= setInterval(countdown,1000);
                }
                break;
            case "\x37\x30":
                if(upgrades[0]== true)
                {
                    space.appendChild(upgrade2);
                    upgrades[0]= false
                }
                if(upgrades[1]== true)
                {
                    space.appendChild(upgrade3);
                    upgrades[1]= false
                }
                if(upgrades[2]== true)
                {
                    space.appendChild(upgrade4);
                    upgrades[2]= false;
                    controlRodsDrop.parentNode.removeChild(controlRodsDrop)
                }
                if(upgrades[3]== true)
                {
                    space.appendChild(upgrade5);
                    upgrades[3]= false;
                    pumpShutDown.parentNode.removeChild(pumpShutDown)
                }
                if(upgrades[4]== true)
                {
                    space.appendChild(upgrade6);
                    upgrades[4]= false
                }
                break;
            case "\x37\x31":
                upgrades[0]= false;
                space.appendChild(upgrade2);
                break;
            case "\x37\x32":
                upgrades[1]= false;
                space.appendChild(upgrade3);
                break;
            case "\x37\x33":
                upgrades[2]= false;
                space.appendChild(upgrade4);
                controlRodsDrop.parentNode.removeChild(controlRodsDrop);
                break;
            case "\x37\x34":
                upgrades[3]= false;
                space.appendChild(upgrade5);
                pumpShutDown.parentNode.removeChild(pumpShutDown);
                break;
            case "\x37\x35":
                upgrades[4]= false;
                space.appendChild(upgrade6);
                break;
            case "\x38\x31":
                reactorBar= 331;
                break;
            case "\x38\x32":
                turbineBar= 331;
                break;
            case "\x38\x33":
                radioactivityBar= 331;
                break;
            case "\x39\x30":
                GOexplosion.style.display="none";
                GOturbineexplosion.style.display="none";
                GOradioactivity.style.display="none";
                space.style.display= "block";
                timer= setInterval(update,10);
                reactorBar= 0;
                turbineBar= 0;
                radioactivityBar= 0;
                fuelBar= 330;
                rodsLevel= 0;
                pumpWattage= 0;
                if(powerFailure== true)
                {
                    incidentDuration= 1;
                    countdown();
                }
                break;
            default:
                alert("Code " + cheatCode + " has not been recognized.")
        }
    }
    function update(){
        if(powerFailure == false){incident = Math.floor(Math.random()*4000);}
        if(incident == 0){
            incidentDuration = Math.floor(6+(Math.random()*14));
            powerFailure = true;
            incident = 1;
            alert("Eletricity delivery fot the control panel has broken down. Hold on untill we repair it. "+incidentDuration+" seconds");
            incidentDisplay.innerHTML = "Power failure " + incidentDuration + " s";
            incidentTimer = setInterval(countdown, 1000);
        }
        
        reactorBar = (reactorBar + ((rodsLevel / 3400) * fuelBar));//1700                                //Calculations
        if(turbineBar != -1){turbineBar = (turbineBar + (reactorBar * (pumpWattage / 6800)));}
        if(turbineBar != -1){reactorBar = (reactorBar - (reactorBar * (pumpWattage / 6800)));}
        
		energyBar = (energyBar + (turbineBar / 100));
        fuelBar = (fuelBar - (fuelBar / 10000));                //Kvadratic fuel decresing
        
        if(reactorBar > 0){reactorBar = (reactorBar - 0.025);}           //Spontal cooling
        if(reactorBar < 0){reactorBar = 0;}
        if(turbineBar > 0){turbineBar = (turbineBar - 0.0375);}
        if(turbineBar < 0 && turbineBar != -1){turbineBar = 0;}
        if(radioactivityBar > 0){radioactivityBar = (radioactivityBar - 0.0025);}    //Spontal radiation falling
        if(radioactivityBar < 0){radioactivityBar = 0;}
		if(timeBar > 0){timeBar = (timeBar - 1);} 					//Time decreasing
    
        if(turbineBar != -1){money = (money + (turbineBar/100))}
            moneyDisplayValue = Math.round(money);                    //Money collecting
//            console.log(money);
        
        if (reactorBar > 300 && upgrades[0] == true){        //Reactor upgrade save
            radioactivityBar += (reactorBar - 300);
            reactorBar = 300;
        }
        
        if (turbineBar > 330 && upgrades [1] == true){        //Turbine upgrade save
        turbineBar = -1;
        turbine.style.width = 0;
        repairTurbine.style.display = "block";
        }
        
        reactor.style.width = reactorBar + "px";                        //Displaying results
        turbine.style.width = turbineBar + "px";
        radioactivity.style.width = radioactivityBar + "px";
        fuel.style.width = fuelBar + "px";
        rodsLevelDisplay.innerHTML = rodsLevel;
        pumpWattageDisplay.innerHTML = pumpWattage;
        moneyDisplay.innerHTML = moneyDisplayValue;
		time.style.width = ((445 / timeConst) * timeBar) + "px";
		totalEnergy.style.width = ((445 / energyConst) * energyBar) + "px";
/*
            valueR.innerHTML = reactorBar;
            valueT.innerHTML = turbineBar;
            valueRa.innerHTML = money;
            valueF.innerHTML = fuelBar;
*/        
        if (reactorBar > 330 && upgrades[0] == false){                    //Game over testing
            GOexplosion.style.display = "block";
            space.style.display = "none";
            alert("The power plant blew up.");
            clearInterval(timer);
        }
        if (turbineBar > 330 && upgrades[1] == false){
            GOturbineexplosion.style.display = "block";
            space.style.display = "none";
            alert("The turbine was destroyed.");
            clearInterval(timer);
        }
        if (radioactivityBar > 330){
            GOradioactivity.style.display = "block";
            space.style.display = "none";
            alert("Workers in the powerplant died bacause of high radiation and unmaintained power plant exploded.")
            clearInterval(timer);
        }
    }
    function countdown(){
        incidentDuration--;
        if(incidentDuration == 0){
            powerFailure = false;
            incidentDisplay.innerHTML = "";
            clearInterval(incidentTimer);
            }
        else{
            incidentDisplay.innerHTML = "Power failure " + incidentDuration + " s";
        }
    }
}