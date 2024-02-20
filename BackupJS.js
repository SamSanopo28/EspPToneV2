let particles = document.querySelectorAll("particle")
let bigParticles = document.querySelectorAll("bigParticle")
const mainSpace = document.getElementById("mainSpace")

let limit = 300
let bigLimit = 0
let delaySpawn = 600
let opacitySpeed = 10

function genRandomBetween(min, max)
{
    let random = Math.ceil(Math.random() * max) + min;
    return random;
}



spawnParticle()
function spawnParticle() {
    let newParticle = document.createElement("particle")
    particles = document.querySelectorAll("particle")




    let darkerVal = genRandomBetween(30, 100);
    let size = genRandomBetween(20, 30);

    newParticle.style.filter = 'brightness(' + darkerVal + '%)'
    newParticle.style.width = size + 'px'
    newParticle.style.height = size + 'px'

    if (particles.length >= limit) {
        reachedLimit()
        return;
    }
    console.time('spawn')


    moveParticle(newParticle)
    console.timeEnd('spawn')

    requestAnimationFrame(function(){
        setTimeout(spawnParticle, Math.random() * delaySpawn)
    })


}


//spawnBigParticles()
/*function spawnBigParticles() {
    
    let newParticle = document.createElement("bigParticle")
    bigParticles = document.querySelectorAll("bigParticle")


    let darkerVal = genRandomBetween(10, 100);
    let size = genRandomBetween(150, 300);

    newParticle.style.filter = `brightness(${darkerVal}%) blur(${size/2}px)`
    newParticle.style.width = size + 'px'
    newParticle.style.height = size + 'px'

    if (bigParticles.length >= bigLimit) {
        bigParticlesReachedLimit()
        return;
    }
    
    moveParticle(newParticle, 1)
    requestAnimationFrame(function () {
        setTimeout(spawnBigParticles, Math.random() * delaySpawn)
    })

}

function bigParticlesReachedLimit() {
    console.log("reached big limit")

    if (bigParticles.length < bigLimit) {
        spawnBigParticles()
        return;
    }
    setTimeout(reachedLimit, 5000)

}*/

function reachedLimit() {
    console.log("reached limit")
    if (particles.length < limit) {
        spawnParticle()
        return;
    }

    setTimeout(reachedLimit, 2000)
}




function moveParticle(singleParticle, typeOfParticle = 0) {

    mainSpace.appendChild(singleParticle);
   
    let xPosition = 0;
    let yPosition = 0;
    let opacity = 1;
    let subtractOpacity = -(Math.random()*opacitySpeed);
    xPosition = genRandomBetween(100, 900)   //Uses CSS property left
    yPosition = genRandomBetween(0, 250)   //Uses CSS property top
    opacity = 1



        singleParticle.style.top = yPosition/10 + 'vh'
        singleParticle.style.left = xPosition/10 + 'vw'

        requestAnimationFrame(recurseMovement)

        
        let xDirection = 1 - (Math.random()*2)
        let yDirection = -2;

        if (typeOfParticle === 1) {
            xDirection /= 2
            subtractOpacity /= 2
            yDirection /= 2
        }
        else  {
            singleParticle.addEventListener("click", function () {
                whenParticleClicked(singleParticle);
            });

        }
      
         function whenParticleClicked(singleParticle) {
            singleParticle.style.filter = `brightness(100%) drop-shadow(0 6.25px 10px red)`
            
             opacity = 900

        }
        function recurseMovement() {
        //    console.time('looper')
            singleParticle.style.left = xPosition / 10 + 'vw'
            singleParticle.style.top = yPosition / 10 + 'vh'

            xPosition += xDirection
            yPosition -= yDirection

           /* if (directionXPositive) {
                xDirection += Math.random()
            }
            else if{
                xDirection -= Math.random()
            }

            if (directionYPositive) {
                yDirection += Math.random()
            }
            else {
                yDirection -= Math.random()
            }

            xPosition += xDirection / speedSlowDown
            yPosition += yDirection / speedSlowDown


            if (xDirection > limitx+1) {
                directionXPositive = false;
                let limitx = Math.ceil(Math.random() * 10)

            }
            else if (xDirection < -limitx) {
                directionXPositive = true;
                let limitx = Math.ceil(Math.random() * 10)

            }
            else if (yDirection > limitx) {
                directionYPositive = false;
                let limitx = Math.ceil(Math.random() * 10)

            }
            else if (yDirection < -limit) {
                directionYPositive = true;
                let limitx = Math.ceil(Math.random() * 10)

            }*/                   //OLD MOVEMENT CODE

            opacity -= subtractOpacity
            singleParticle.style.opacity = opacity / 1000

            if (opacity > 1200) {
                subtractOpacity = Math.random()*opacitySpeed
            }


            if (yPosition/10 > 110)
            {
                opacity = 0

            }
            
            else if (xPosition /10 < -10 || xPosition/10 > 110)
            {
                opacity = 0

            }
            if (opacity > 0) { 

                requestAnimationFrame(recurseMovement)
          //      console.timeEnd('looper')
                return;
            }
            mainSpace.removeChild(singleParticle);

            if (typeOfParticle === 1) {
                bigParticles = document.querySelectorAll("bigParticle")
            //    console.timeEnd('looper')

                return;
            }
            particles = document.querySelectorAll("particle")
         //   console.timeEnd('looper')

            return;


        }

   
}