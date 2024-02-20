let particles = document.querySelectorAll("particle")
let bigParticles = document.querySelectorAll("bigParticle")
const mainSpace = document.getElementById("mainSpace")
let nameText = document.getElementById('nameSpan');
let nameTextHitbox = document.getElementById('hitbox');
let limit = 200
let delaySpawn = 500
let opacityAccelarator = 1;
const transitSpeed = 19

let conditionSpeedChanger = 1

nameTextHitbox.addEventListener("click", textClicked)
function textClicked(third = 0, redC = 0, secPhaseEffect = false, redA=0, redS = 255, accelerate = true) {

    if (accelerate)
    {
        opacityAccelarator = 5
        console.log(opacityAccelarator)

        setTimeout(function () {
            opacityAccelarator = 1
            console.log(opacityAccelarator)
        }, 100
        )
    }

    nameTextHitbox.removeEventListener("click", textClicked)

    if (third === 1) {
        console.log('reached')

        nameText.style.backgroundImage = `linear-gradient(rgb(${redS}, 0, 1), rgb(${redS}, 0, 0 )`
        nameText.style.filter = `drop-shadow(0 ${(redS / 255) * 8}px ${(redS / 255) * 12}px red)`

        redS -= transitSpeed / 2

        if (redS > 0) {
            requestAnimationFrame(function () { textClicked(1, redC, false, redA, redS, false) })
            return;
        }
       
        setTimeout(function () {

            nameTextHitbox.addEventListener("click", textClicked)
        }, 200);
        return;
    }
    if (secPhaseEffect === true) {
       
        nameText.style.backgroundImage = `linear-gradient(rgba(${redC}, 0, 1), rgba(${redA}, 0, 0, ${(redA/255)} )`
        redA+=transitSpeed/2

        if (redA > 255) {
            secPhaseEffect = false;
            requestAnimationFrame(function () { textClicked(1, redC, false, redA, 255, false) })
            return;
        }
        requestAnimationFrame(function () { textClicked(0, redC, true, redA, 255, false) })

        return;
    }

    if (redC < 255) {
        

        nameText.style.backgroundImage = `linear-gradient(rgba(${redC}, 0, 0, ${redC / 255}), rgba(${255 - redC}, 0, 0, ${(255-redC)/255}) )`
        nameText.style.filter = `drop-shadow(0 ${(redC / 255) * 8}px ${(redC / 255) * 12}px red)`
        redC += transitSpeed / 3
        requestAnimationFrame(function () { textClicked(0, redC) })
        return;
    }
   

    requestAnimationFrame(function () { textClicked(0, redC, true, 0, 0, false)})

}





function genRandomBetween(min, max)
{
    let random = Math.ceil(Math.random() * max) + min;
    return random;
}



spawnParticle()
function spawnParticle() {

    conditionSpeedChanger = 1
    if (particles.length > limit / 2) {
        conditionSpeedChanger = 2
    }
    if (particles.length >= limit) {
        reachedLimit()
        return;
    }

    let newParticle = document.createElement("particle")
    particles = document.querySelectorAll("particle")
    let darkerVal = genRandomBetween(30, 100);
    let size = genRandomBetween(20, 30);

    newParticle.style.filter = 'brightness(' + darkerVal + '%) drop-shadow(0 12px 20px black) hue-rotate(' + genRandomBetween(0, 360) + 'deg)'

    newParticle.style.width = size/8 + 0.2 +'vw'
    newParticle.style.height = size/8 + 0.2 +'vw'


    if (Math.random() < 0.5) { newParticle.style.zIndex = '3'; }

    moveParticle(newParticle)

    requestAnimationFrame(function(){
        setTimeout(spawnParticle, Math.random() * delaySpawn)
    })


}


function reachedLimit() {
    console.log("reached limit")
    if (particles.length < limit) {
        spawnParticle()
        return;
    }

    setTimeout(reachedLimit, 10000)
}




function moveParticle(singleParticle) {

    mainSpace.appendChild(singleParticle);

    let xPosition = 0;
    let yPosition = 0;
    let opacitySpeed = genRandomBetween(12, 20)
    let opacity = 1;
    let subtractOpacity = -(Math.random() * opacitySpeed);
    xPosition = genRandomBetween(100, 900)   //Uses CSS property left
    yPosition = genRandomBetween(-20, 1000)   //Uses CSS property top



    singleParticle.style.top = yPosition / 10 + 'vh'
    singleParticle.style.left = xPosition / 10 + 'vw'

    requestAnimationFrame(recurseMovement)


    let xDirection = 1 - (Math.random() * 2)
    let yDirection = -2;

    if (yPosition >= 500)
    {
        yDirection = Math.abs(yDirection)
    }

   

    singleParticle.addEventListener("click", whenParticleClicked)



    function whenParticleClicked() {
        singleParticle.style.filter = `brightness(100%) drop-shadow(0 6.25px 10px red)`
        opacity = 2000

    }
    function recurseMovement() {

        singleParticle.style.left = xPosition / 10 + 'vw'
        singleParticle.style.top = yPosition / 10 + 'vh'

        xPosition += xDirection 
        yPosition -= yDirection


        opacity -= subtractOpacity * opacityAccelarator * conditionSpeedChanger
        singleParticle.style.opacity = opacity / 1000

        if (opacity > 1000) {
            subtractOpacity = Math.random() * opacitySpeed * 1.5
        }


        if (yPosition / 10 > 110) {
            opacity = 0

        }

        else if (xPosition / 10 < -10 || xPosition / 10 > 110) {
            opacity = 0

        }
        if (opacity > 0) {
            requestAnimationFrame(recurseMovement)

            return;
        }
        mainSpace.removeChild(singleParticle);
        particles = document.querySelectorAll("particle")

        return;


    }



}