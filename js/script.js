const BOX = document.querySelector(".box");


const gameResultAnimation = {
    win: () => {
        let winTimeLine = gsap.timeline();
        winTimeLine
        .set(".band", {
            background: "#51ff1d"
        })
        .to(".band", {
            left: 0,
            stagger: {
                amount: .5,
            }
        })
        .to(".you__win", {
            left: "calc(50% - 120px)",
            duration: 2,
            ease: "elastic.out(1, 0.3)",
        }, "+=1")
        .to(".you__win", {
            skewX: 0,
            duration: 1, 
            ease: "elastic.out(1, 0.3)"
        }, "-=1.2")
    },
    loose: () => {
        let looseTimeLine = gsap.timeline();
        looseTimeLine
        .set(".band", {
            background: "#ff470b"
        })
        .to(".band", {
            left: 0,
            stagger: {
                amount: .5,
            }
        })
        .to(".you__loose", {
            left: "calc(50% - 120px)",
            duration: 2,
            ease: "elastic.out(1, 0.3)",
        }, "+=1")
        .to(".you__loose", {
            skewX: 0,
            duration: 1, 
            ease: "elastic.out(1, 0.3)"
        }, "-=1.2")
    }
}

var pageTimeLine = gsap.exportRoot(), currentPosition, windowWidth, windowHeight, wallPosition, prizePosition, wallWidth = 50, ballWidth = 50, prizeWidth = 50, jumpValue = 10;

let xMove = gsap.quickSetter(".box", "x", "px"),
    yMove = gsap.quickSetter(".box", "y", "px");

function setBaseValue(){
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    currentPosition = {
        x: Math.round(windowWidth / 100 * 10),
        y: Math.round(windowHeight / 2 - 25)
    };
    wallPosition = [
        {
            width:  {
                start: givePercent(windowWidth, 30),
                end: givePercent(windowWidth, 30) + wallWidth
            },
            height: {
                start: givePercent(windowHeight, 0),
                end: givePercent(windowHeight, 50)
            },
        },
        {
            width:  {
                start: givePercent(windowWidth, 50),
                end: givePercent(windowWidth, 50) + wallWidth
            },
            height: {
                start: givePercent(windowHeight, 40),
                end: givePercent(windowHeight, 100)
            },
        },
        {
            width:  {
                start: givePercent(windowWidth, 65),
                end: givePercent(windowWidth, 65) + wallWidth
            },
            height: {
                start: givePercent(windowHeight, 30),
                end: givePercent(windowHeight, 90)
            },
        },
        {
            width:  {
                start: givePercent(windowWidth, 85),
                end: givePercent(windowWidth, 85) + wallWidth
            },
            height: {
                start: givePercent(windowHeight, 0),
                end: givePercent(windowHeight, 90)
            },
        }
    ];
    prizePosition = {
        height:{
            start: 0,
            end: prizeWidth
        },
        width:{
            start: windowWidth - prizeWidth - 10,
            end: windowWidth
        }
    };
}

function putWallInPosition() {
    for(let i = 0; i < wallPosition.length; i++){
        gsap.set(`.wall${i}`, {
            x: wallPosition[i].width.start,
            y: wallPosition[i].height.start,
        })
    }
}

function putPrizeInPosition() {
    gsap.set(".prize__box", {
        x: prizePosition.width.start,
        y: prizePosition.height.start
    })
    console.log(prizePosition.width.start)
}

window.addEventListener("load", () => {
    setBaseValue();

    gsap.set(BOX, {
        x: currentPosition.x,
        y: currentPosition.y
    })

    putWallInPosition();
    putPrizeInPosition();
})

window.addEventListener("resize", () => {
    setBaseValue();

    gsap.set(BOX, {
        x: currentPosition.x,
        y: currentPosition.y
    })

    putWallInPosition();
    putPrizeInPosition();
})

window.addEventListener('keydown', (key) => {
    refreshCurrentValue(key);
    checkPosition();
    moveBox();
})  

function checkPosition(){
    for(let i = 0; i < wallPosition.length; i++){
        if(currentPosition.x >= wallPosition[i].width.start - wallWidth &&
           currentPosition.x <= wallPosition[i].width.end){
            if(currentPosition.y >= wallPosition[i].height.start - wallWidth &&
               currentPosition.y <= wallPosition[i].height.end){
                playerLoosed()
            } 
        }
    }

    if(currentPosition.x >= prizePosition.width.start - prizeWidth &&
       currentPosition.x <= prizePosition.width.end){
        if(currentPosition.y >= prizePosition.height.start - prizeWidth &&
            currentPosition.y <= prizePosition.height.end){
                playerWon()
        } 
    }
}

function refreshCurrentValue(key){
    switch (key.code){
        case "ArrowRight":
            currentPosition.x = (currentPosition.x + jumpValue) > (windowWidth - ballWidth) ? windowWidth - ballWidth : (currentPosition.x + jumpValue);
        break;
        case "ArrowUp":
            currentPosition.y = (currentPosition.y - jumpValue) < 0 ? 0 : (currentPosition.y - jumpValue);
        break;
        case "ArrowLeft":
            currentPosition.x = (currentPosition.x - jumpValue) < 0 ? 0 : (currentPosition.x - jumpValue);
        break;
        case "ArrowDown":
            currentPosition.y = (currentPosition.y + jumpValue) > (windowHeight - ballWidth) ? windowHeight - ballWidth : (currentPosition.y + jumpValue);
        break;
    }
}

function moveBox() {
    xMove(currentPosition.x);
    yMove(currentPosition.y);
}

function givePercent(num, percentValue) {
    return Math.round(num / 100 * percentValue)
}

function playerLoosed() {
    pageTimeLine.pause();
    gameResultAnimation.loose();
}

function playerWon() {
    pageTimeLine.pause();
    gameResultAnimation.win();
}