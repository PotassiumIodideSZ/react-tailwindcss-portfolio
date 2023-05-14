import React, { useState, useEffect, useRef } from 'react';
import monsterImg from './assets/monster.png';
import gameframeImg from './assets/frameRdy.png';
import gamebgImg1 from './assets/game_bg.png';
import gamebgImg2 from './assets/game_bg2.png';
import ability1Btn from './assets/ability1Btn.png';
import ability2Btn from './assets/ability2Btn.png';
import ability1BtnShadow from './assets/ability1BtnShadow.png';
import ability2BtnShadow from './assets/abilityLockBtn.png';
import abilityLockBtn from './assets/abilityLockBtn.png';
import healthBar from './assets/healthBar.png';
import timerBar from './assets/timerBar.png';
import fightBtn from './assets/fightBtn.png';
import Armor from './assets/Armor.png';
import Damage from './assets/Damage.png';
import Skills from './assets/Skills.png';
import shieldBtn from './assets/shieldBtn.png';
import swordBtn from './assets/swordBtn.png';
import magicBtn from './assets/magicBtn.png';
import monster1 from './assets/monster.png';
import monster2 from './assets/monster2.png';
import upgradeButton from './assets/upgradeButton.png';
import coinsIcon from './assets/coins.png';
import crystalsIcon from './assets/crystals.png';
import healthBarBack from './assets/healthBarBack.png';
import AbilityLockTime from './assets/AbilityLockTime.png';

const gamebgImgList = [gamebgImg1,gamebgImg2]
const monsterList = [monster1,monster2]


const ClickerGame = () => {
    const [gold, setGold] = useState(0);
    const [crystals, setCrystals] = useState(0);
    const [clicks, setClicks] = useState(0);
    const [damage, setDamage] = useState(30);
    const [armor, setArmor] = useState(10);
    const [critChance, setCritChance] = useState(5);
    const [critDamage, setCritDamage] = useState(1.5);
    const [monHealth, setmonHealth] = useState(100);
    const [monMaxHealth, setMonMaxHealth] = useState(100);
    const [monArmor, setmonArmor] = useState(10);
    const [isArmorVisible, setIsArmorVisible] = useState(false);
    const [isDamageVisible, setIsDamageVisible] = useState(true);
    const [isSkillVisible, setIsSkillVisible] = useState(false);
    const [isCoinsVisible, setIsCoinsVisible] = useState(true);
    const [priceColor, setPriceColor] = useState(true);
    const [pickedStat,setPickedStat] = useState('damage');
    const [price,setPrice] = useState(11);
    const [skill1, setSkill1] = useState(false);
    const [skill2, setSkill2] = useState(false);
    const [isSkill1shadVisible, setIsSkill1shadVisible] = useState(true);
    const [isSkill2shadVisible, setIsSkill2shadVisible] = useState(true);
    const [isFightStart, setIsFightStart] = useState(false);
    const [isSkill1CdVisible, setIsSkill1CdVisible] = useState(false);
    const [isSkill2CdVisible, setIsSkill2CdVisible] = useState(false);
    const [kills, setKills] = useState(0);
    const [gamebgImg, setgamebgImg] = useState(gamebgImgList[0]);
    const [monster, setmonster] = useState(monsterList[0]);

    const baseDuration = 1; // base duration in milliseconds
    const armorFactor = 0.1; // additional duration per armor point in milliseconds
    const growthRate = 1.01; // rate at which the duration increases as armor becomes higher

    let duration;
    let basePrice = 10; // The base price of the upgrade
    let priceMultiplier = 1.01; // The multiplier for the price increase
    const isFightStartRef = useRef(isFightStart);

    let mHealthPerc = 0
    useEffect(() => {
        const pictures = [monsterImg, gameframeImg, gamebgImg1, gamebgImg2, ability1Btn, ability2Btn, ability1BtnShadow, ability2BtnShadow, abilityLockBtn, healthBar, timerBar, fightBtn, Armor, Damage, Skills, shieldBtn, swordBtn, magicBtn, monster1, monster2, upgradeButton, coinsIcon, crystalsIcon, healthBarBack, AbilityLockTime];
        pictures.forEach((picture) => {
          const img = new Image();
          img.src = picture;
        });
      }, []);
    
    function getDamageUpgradePrice() {
        return Math.floor(basePrice * Math.pow(priceMultiplier, damage));
    }

    function getArmorUpgradePrice() {
        return Math.floor(basePrice * Math.pow(priceMultiplier, armor));
    }
    function getSkillUpgradePrice() {
        if (skill1 == false){
            setPrice(100)
        }
        else if (skill2 == false){
            setPrice(200)
        }
        else {
            setPrice(0)
        }
    }

    function handleGold(appliedDamage) {
        setGold(gold => gold + appliedDamage);
    }
  
    function handleClicks() {
        setClicks(clicks + 1);
        let appliedDamage = damage;
        // Apply random variance to damage
        appliedDamage *= 1 + (Math.random() * 0.2 - 0.1);
        // Apply critical hit
        if (Math.random() < critChance / 100) {
          appliedDamage *= critDamage;
        }
        appliedDamage = Math.round(appliedDamage);
        if (isFightStartRef.current == true) {
          setmonHealth(monHealth => monHealth - Math.max(appliedDamage - armor, 0));
        } else {
          handleGold(appliedDamage);
        }
    }

    function handleAbility1Btn(event){
        event.target.classList.add("abilityPressed");
        setIsSkill1shadVisible(false);
        event.target.style.pointerEvents = ('none');

    }
    function handleUnAbility1Btn(event){
        if (event.target.classList.contains("abilityPressed")){
            additionalDamage = damage * 4;
            let curDamage = damage;
            setDamage(damage+additionalDamage);
            setTimeout(() => {
                setDamage(curDamage);
                
            }, 15000);
            setTimeout(() => {
                setIsSkill1CdVisible(false);
                event.target.style.pointerEvents = ('auto');
                
            }, 30000);
            setTimeout(() => {
                event.target.classList.remove("abilityPressed");
                setIsSkill1shadVisible(true);
                setIsSkill1CdVisible(true);
            }, 80);

        }

    }

    function handleAbility2Btn(event){
        event.target.classList.add("abilityPressed");
        setIsSkill2shadVisible(false);

    }
    function handleUnAbility2Btn(event){
        if (event.target.classList.contains("abilityPressed")){
            let count = 0;
            let interval = setInterval(function() {
                monsterClickSkill();
                count++;
                if (count >= 100) {
                    clearInterval(interval);
                }
            }, 100);
            setTimeout(() => {
                event.target.classList.remove("abilityPressed");
                setIsSkill2shadVisible(true);
                setIsSkill2CdVisible(true);
            }, 80);
            setTimeout(() => {
                setIsSkill2CdVisible(false);
            }, 20000);

        }
    }

    function btnPressed(event) {
        event.target.classList.add("pressed");
    }
    
    function fightUnPressed(event) {
        if (isFightStart == true) event.target.style.pointerEvents = "none";
        
        setTimeout(() => {
            event.target.classList.remove("pressed");
        }, 100);
    }
    function btnUnPressed(event) {
        setTimeout(() => {
            event.target.classList.remove("pressed");
        }, 20);
    }

    const myTimeouts = useRef([]);

    function handleAssault(event){
        const healthBarImg = document.getElementById('healthBar');
        if (isFightStart == false) {
            btnPressed(event);
            setIsFightStart(isFightStart => true);
            duration = baseDuration + armorFactor * Math.pow(armor, growthRate)
            const barobject = document.getElementById('timerBar');
            barobject.style.visibility = 'visible';
            barobject.style.animationDuration = duration+'s';
            barobject.classList.add("clock-appearing");
            let fightStartTimer = setTimeout(() => {
                barobject.classList.remove("clock-appearing");
                barobject.style.visibility = 'hidden';
                event.target.style.pointerEvents = "auto";
                if (isFightStartRef.current == true){
                    healthBarImg.style.clipPath = 'inset(0px 0px 0px 0px)';
                    setmonHealth(monMaxHealth);
                    setIsFightStart(isFightStart => false);
                }
            }, duration*1000);
            myTimeouts.current.push(fightStartTimer);
        }
       
    }
    

    useEffect(() => {
        if (pickedStat == 'damage' ) setPrice(getDamageUpgradePrice);
        
    }, [damage]);


    useEffect(() => {
        if (pickedStat == 'armor' ) setPrice(getArmorUpgradePrice);
    }, [armor]);
    useEffect(() => {
        if (pickedStat == 'skill' ) setPrice(getSkillUpgradePrice);
    }, [skill1, skill2]);

    useEffect(() => {
        isFightStartRef.current = isFightStart;
    }, [isFightStart]);
    

    useEffect(() => {
        const healthBarImg = document.getElementById('healthBar');
        if (monHealth <= 0){
            const barobject = document.getElementById('timerBar');
            barobject.classList.remove("clock-appearing");
            barobject.style.visibility = 'hidden';
            healthBarImg.style.clipPath = 'inset(0px 0px 0px 0px)';
            setmonHealth(monMaxHealth*10);
            setMonMaxHealth(monMaxHealth*10);
            setCrystals(crystals+75);
            setGold(monMaxHealth*100);
            setIsFightStart(isFightStart => false);
            setmonArmor(monArmor * 1.1);
            let newkills = kills + 1;
            
            setgamebgImg(gamebgImgList[newkills%2]);
            setmonster(monsterList[newkills%2]);
            setKills(newkills);

            document.getElementById('fightBtnId').style.pointerEvents = "auto";
            for (let fightStartTimer of myTimeouts.current) {
                clearTimeout(fightStartTimer);
            }
            myTimeouts.current = [];
        }
        else{
            mHealthPerc = 99 - (monHealth/monMaxHealth)*99;
            healthBarImg.style.clipPath = 'inset(0px 0px '+ mHealthPerc +'px 0px)';
            
        } 
    }, [monHealth]);



    function formatNumber(num) {
        if (num === undefined) {
          return 'N/A';
        }
        const units = ['k', 'm', 'b', 't', 'q', 'a', 'b', 'c', 'd', 'e', 'f', 'g'];
        let unitIndex = 0;
        while (num >= 1000 && unitIndex < units.length) {
          num /= 1000;
          unitIndex++;
        }
        const formattedNum = num.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
        return formattedNum + (unitIndex > 0 ? units[unitIndex - 1] : '');
      }

      function formatDamage(damage) {
        const minDamage = Math.floor(damage * 0.9);
        const maxDamage = Math.floor(damage * 1.1);
        const formattedMinDamage = formatNumber(minDamage);
        const formattedMaxDamage = formatNumber(maxDamage);
        return `${formattedMinDamage}-${formattedMaxDamage}`;
      }



    function handleDamageUp(){
        setDamage(Math.round(damage * 1.1 + 1));
        setCritChance(Number((critChance + 0.5).toFixed(2)));
        setCritDamage(Number((critDamage + 0.05).toFixed(2)));
    }
    function handleArmorUp(){
        setArmor(Math.round(armor * 1.1 + 1) );
    }
    function handleSkillUp(){
        if(skill1 == false){
            setSkill1(true)
            unlockSkill1();
        }
        else if(skill2 == false){
            setSkill2(true)
            unlockSkill2();
        }
        setPrice(getSkillUpgradePrice);
    }

    let additionalDamage = 0;

    function unlockSkill1(){
        const barobject = document.getElementById('ability1Lock');
        barobject.style.display = 'none';

    }
    
    function unlockSkill2(){
        const barobject = document.getElementById('ability2Lock');
        barobject.style.display = 'none';

    }
    
    function pickDamageStat(event){
        btnPressed(event);
        setIsDamageVisible(true);
        setIsArmorVisible(false);
        setIsSkillVisible(false);
        setPickedStat('damage');
        setPrice(getDamageUpgradePrice);
        setPriceColor(true);
        setIsCoinsVisible(true);
    }
    
    function pickArmorStat(event){
        btnPressed(event);
        setIsDamageVisible(false);
        setIsArmorVisible(true);
        setIsSkillVisible(false);
        setPickedStat('armor');
        setPrice(getArmorUpgradePrice);
        setPriceColor(true);
        setIsCoinsVisible(true);

    }
    
    function pickSkillStat(event){
        btnPressed(event);
        setIsDamageVisible(false);
        setIsArmorVisible(false);
        setIsSkillVisible(true);
        setPickedStat('skill');
        setPrice(getSkillUpgradePrice);
        setPriceColor(false);
        setIsCoinsVisible(false);

    }

    function monsterClick(event){
        handleClicks();
        event.target.classList.add("hitten");
        setTimeout(() => {
            event.target.classList.remove("hitten");
        }, 300);

    }
    
    function monsterClickSkill(){
        handleClicks();
        let monsterId = document.getElementById('monsterId')
        monsterId.classList.add("hitten");
        setTimeout(() => {
            monsterId.classList.remove("hitten");
        }, 300);

    }



  
    function handleUpgrade(event){
        btnPressed(event);
        if (pickedStat == 'damage' && gold>=price){
            handleDamageUp();
            setGold(gold-price);
        }
        if (pickedStat == 'armor' && gold>=price){
            handleArmorUp();
            setGold(gold-price);
        }
        if (pickedStat == 'skill' && crystals>=price){
            handleSkillUp();
            setCrystals(crystals-price);
        }
    }
  
    return (
        <div style={{justifyContent: 'center',paddingLeft: 24, paddingRight: 24 }}>
            <div style={{ width:702, height: 724, userSelect:'none', position: 'relative', margin: 'auto', fontFamily: '"Almendra", serif'}}>
                
                <div style={{ backgroundImage: `url(${gamebgImg})`, width: '100%', height: '100%', position: 'absolute', backgroundRepeat:'no-repeat'}} />  
                <div className='mainContainer' style={{ backgroundImage: `url(${gameframeImg})`, width: '100%', height:'100%', padding: '80px 40px 0px 40px', backgroundRepeat:'no-repeat', position: 'absolute'}}>
                    <div  style={{ display: 'flex', height: 612, zIndex: 1}}>
                        <div style={{ width: '65%', display: 'flex', flexDirection: 'column', }}>
                            <div style={{ height: '65%' }}>
                                <div style={{ paddingLeft: 58, paddingTop: 63, width: 38, color:"#deb738", fontSize: 17 }}>
                                    <div>{monHealth}</div>
                                    <div style={{ marginTop: -2 }}>{monArmor.toFixed(0)}</div>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <img
                                        draggable='false'
                                        id='monsterId'
                                        src={monster}
                                        style={{ position: 'absolute',left: 33, top: -103, width: 350}}
                                        alt="monster"
                                        onMouseDown={monsterClick}
                                    />

                                </div>
                            </div>
                            <div style={{ height: '35%', display: 'flex' }}>
                                <span style={{ width: '50%', display: 'flex' }}>
                                    <span style={{ paddingLeft: 28 }}>
                                        <span style={{  position: 'relative', top: 76, display: 'block', width: 100}} >
                                            <img
                                                draggable='false'
                                                src={ability1BtnShadow}
                                                style={{ position: 'absolute', paddingBottom: isSkill1shadVisible ? 0 : 4}}
                                                alt="ability1BtnShadow"
                                            />
                                            <img
                                                draggable='false'
                                                src={ability1Btn}
                                                style={{  position: 'absolute', right: 22, zIndex: 1}}
                                                alt="ability1Btn"
                                                onMouseDown={handleAbility1Btn}
                                                onMouseUp={handleUnAbility1Btn}
                                                onMouseOut={handleUnAbility1Btn}
                                            />
                                            <img
                                                id='ability1Lock'
                                                draggable='false'
                                                src={abilityLockBtn}
                                                style={{  position: 'absolute', right: 22, zIndex: 2}}
                                                alt="abilityLockBtn"
                                            />
                                            <img
                                                id='ability1LockCd'
                                                draggable='false'
                                                src={AbilityLockTime}
                                                style={{  position: 'absolute', right: 22, zIndex: 2, visibility: isSkill1CdVisible ? 'visible' : 'hidden'}}
                                                alt="ability1LockBtnCd"
                                            />
                                        </span>
                                        <span style={{  position: 'relative', top: 76, right: -86, display: 'block', width: 100}} >
                                            <img
                                                draggable='false'
                                                src={ability2BtnShadow}
                                                style={{ position: 'absolute',left: 0, paddingBottom: isSkill2shadVisible ? 0 : 4}}
                                                alt="ability2BtnShadow"
                                            />
                                            <img
                                                draggable='false'
                                                src={ability2Btn}
                                                style={{ position: 'absolute',left: -2, zIndex: 1}}
                                                alt="ability2Btn"
                                                onMouseDown={handleAbility2Btn}
                                                onMouseUp={handleUnAbility2Btn}
                                                onMouseOut={handleUnAbility2Btn}
                                            />
                                            <img
                                                id='ability2Lock'
                                                draggable='false'
                                                src={abilityLockBtn}
                                                style={{  position: 'absolute', left: 0, zIndex: 2}}
                                                alt="ability2LockBtn"
                                            />
                                            <img
                                                id='ability2LockCd'
                                                draggable='false'
                                                src={AbilityLockTime}
                                                style={{  position: 'absolute', left: 0, zIndex: 2, visibility: isSkill2CdVisible ? 'visible' : 'hidden'}}
                                                alt="ability2LockCd"
                                            />
                                        </span>
                                    </span>
                                </span>
                                <span style={{ width: '50%', display: 'flex' }}>
                                    <span style={{  position: 'relative',left: -202, top: 71, display: 'block', width: '100%'}} >
                                        <img
                                            draggable='false'
                                            id='healthBarBack'
                                            src={healthBarBack}
                                            style={{position: 'absolute', left: 270, top: -20, transform: "rotate(180deg)"}}
                                            alt="healthBarBack"
                                        />
                                        <img
                                            draggable='false'
                                            id='healthBar'
                                            src={healthBar}
                                            style={{position: 'absolute', left: 270, top: -20, transform: "rotate(180deg)"}}
                                            alt="healthBar"
                                        />
                                        <img
                                            draggable='false'
                                            id='timerBar'
                                            src={timerBar}
                                            style={{position: 'absolute', left: 270, top: -20, visibility: 'hidden'}}
                                            alt="timerBar"
                                        />
                                        <img
                                            draggable='false'
                                            id='fightBtnId'
                                            src={fightBtn}
                                            style={{position: 'absolute', left: 226, top: 103, width: 168, zIndex: 5}}
                                            alt="fightBtn"
                                            onMouseDown={handleAssault}
                                            onMouseUp={fightUnPressed}
                                            onMouseOut={fightUnPressed}
                                        />
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div style={{ width: '35%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '15%', display: 'flex', paddingLeft: 26, paddingTop: 3 }}>
                                
                                <div style={{ display: 'flex', height: 30, borderRadius: 14, width: 68, marginRight: 10, paddingTop: 7, paddingLeft: 30 }}>
                                    <span style={{ width: '100%', textAlign:'right', fontSize: 13, paddingTop: 1, color: '#deb738' }}>{formatNumber(gold)}</span>
                                </div>
                                
                                <div style={{ display: 'flex', height: 30, borderRadius: 14, width: 68, marginRight: 10, paddingTop: 7, paddingLeft: 30 }}>
                                    <span style={{ width: '100%', textAlign:'right', fontSize: 13, paddingTop: 1, color: '#87d927' }}>{formatNumber(crystals)}</span>
                                </div>

                            </div>
                            <div style={{ height: '85%' }}>
                                <div style={{ height: '65%' }}>
                                    <div style={{position: 'relative', paddingLeft: 56, paddingTop: 18, width: '100%'}}>
                                        <img
                                            draggable='false'
                                            id='SkillsImg'
                                            src={Skills}
                                            style={{position: 'absolute', visibility: isSkillVisible ? 'visible' : 'hidden'}}
                                            alt="Skills"
                                        />
                                        <img
                                            draggable='false'
                                            id='ArmorImg'
                                            src={Armor}
                                            style={{position: 'absolute', visibility: isArmorVisible ? 'visible' : 'hidden'}}
                                            alt="Armor"
                                        />
                                        <img
                                            draggable='false'
                                            id='DamageImg'
                                            src={Damage}
                                            style={{position: 'absolute', visibility: isDamageVisible ? 'visible' : 'hidden'}}
                                            alt="Damage"
                                        />
                                    </div>
                                    <div style={{ padding: 30}}>
                                        <div 
                                            style={{fontFamily: '"Almendra", serif', color: '#6a6351', textAlign: 'center', fontSize: 17, position: 'relative'}}
                                        >
                                            <span style={{visibility: isDamageVisible ? 'visible' : 'hidden', position: 'absolute', left: 0}}>
                                                Upgrade your damage to deal more harm to your enemies and overcome the toughest challenges.
                                            </span>
                                            <span style={{visibility: isArmorVisible ? 'visible' : 'hidden', position: 'absolute', left: 0}}>
                                                Upgrade your armor to protect yourself from the dangers of the world and survive the most epic battles.
                                            </span>
                                            <span style={{visibility: isSkillVisible ? 'visible' : 'hidden', position: 'absolute', left: 0}}>
                                                Unlock your skills to unleash your full potential and master the art of combat.
                                            </span>
                                            
                                        </div>
                                    </div>
                                    <div style={{position: 'relative', paddingLeft: 56, paddingTop: 139, width: '100%', zIndex: 1}}>
                                        <img
                                            draggable='false'
                                            id='crystalsIconPrice'
                                            src={crystalsIcon}
                                            style={{position: 'absolute', left: 85, width: 14, zIndex: 1,top: 119, visibility: isCoinsVisible ? 'hidden' : 'visible'}}
                                            alt="crystalsIconPrice"
                                        />
                                        <img
                                            draggable='false'
                                            id='coinIconPrice'
                                            src={coinsIcon}
                                            style={{position: 'absolute', left: 85, width: 16, zIndex: 1,top: 122, visibility: isCoinsVisible ? 'visible' : 'hidden'}}
                                            alt="coinIconPrice"
                                        />
                                        <span  style={{position: 'absolute', left: 104, width: 32, textAlign: 'end' , zIndex: 1, top: 117, fontSize: 13, color: priceColor ? 'rgb(222, 183, 56)' : 'rgb(135, 217, 39)'}}>{formatNumber(price)}</span>
                                        <img
                                            draggable='false'
                                            id='swordBtn'
                                            src={swordBtn}
                                            style={{position: 'absolute', left: 78, width: 62, zIndex: 1}}
                                            alt="swordBtn"
                                            stat="damage"
                                            onMouseDown={pickDamageStat}
                                            onMouseUp={btnUnPressed}
                                            onMouseOut={btnUnPressed}
                                        />
                                        <img
                                            draggable='false'
                                            id='shieldBtn'
                                            src={shieldBtn}
                                            style={{position: 'absolute', left: 22, width: 55, bottom: -34}}
                                            alt="shieldBtn"
                                            stat="armor"
                                            onMouseDown={pickArmorStat}
                                            onMouseUp={btnUnPressed}
                                            onMouseOut={btnUnPressed}
                                        />
                                        <img
                                            draggable='false'
                                            id='magicBtn'
                                            src={magicBtn}
                                            style={{position: 'absolute', left: 139, width: 55, bottom: -36}}
                                            alt="magicBtn"
                                            stat="skill"
                                            onMouseDown={pickSkillStat}
                                            onMouseUp={btnUnPressed}
                                            onMouseOut={btnUnPressed}
                                        />

                                    </div>
                                    <div style={{position: 'relative'}}>
                                        <img style={{position: 'absolute', paddingTop: 56, paddingLeft: 15, width: 190 }}
                                            draggable='false'
                                            id='upgradeButton'
                                            src={upgradeButton}
                                            alt="upgradeButton"
                                            onMouseDown={handleUpgrade}
                                            onMouseUp={btnUnPressed}
                                            onMouseOut={btnUnPressed}
                                        />

                                    </div>

                                </div>
                                <div style={{ height: '35%' }}>
                                    <div style={{ paddingLeft: 110, paddingTop: 58, color:"#391e12", fontSize: 14,paddingRight: 24, overflow: 'hidden' }}>
                                        <div style={{ marginTop: -2, overflow: 'hidden' }}>{formatDamage(damage)}</div>
                                        <div style={{ marginTop: 7, overflow: 'hidden' }}>{armor}</div>
                                        <div style={{ marginTop: 7, overflow: 'hidden' }}>{critDamage}</div>
                                        <div style={{ marginTop: 7, overflow: 'hidden' }}>{critChance}</div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
};


export default ClickerGame;