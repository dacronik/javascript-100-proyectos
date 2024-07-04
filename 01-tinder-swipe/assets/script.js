const DECISIONN_THRESHOLD = 75;
let isAnimating = false;
let pullDeltaX = 0; //distancia que la card se esta moviendo

function startDrag (event) {
    if (isAnimating) return;

    //? get the first article element
    const actualCard = event.target.closest('article');
    if(!actualCard) return

    //? get initial position of mouse or finger
    const starX = event.pageX ?? event.touches[0].pageX;
    
    // listen the mouse and touche movements
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onEnd)

    document.addEventListener('touchmove', onMove, {passive: true});
    document.addEventListener('touchend', onEnd, {passive: true});

    function onMove(event){
        // current position
        const currentX = event.pageX ?? event.touches[0].pageX;
        // the distance between the initial and current position
        pullDeltaX = currentX - starX

        // no hay distancia recorrida no se hace nada
        if(pullDeltaX === 0) return;

        // change the flag to indicate we are animating
        isAnimating = true;
        // calculate the rotation of the card using the distance
        const deg = pullDeltaX / 14

        // Apply the transformation card
        actualCard.style.transform = `translate(${pullDeltaX}px) rotate(${deg}deg)`
        // change the cursor to grabbing
        actualCard.style.cursor = 'grabbing'

        // change opacity of the choise info
        const opacity = Math.abs(pullDeltaX) / 100;
        const isRight = pullDeltaX > 0;

        const choiseEl = isRight  
        ? actualCard.querySelector('.choice.like') 
        : actualCard.querySelector('.choice.nope')

        choiseEl.style.opacity = opacity
    }

    function onEnd(event){
        // Remove the event listeners

        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);

        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);


        // TODO : TO REMOVE AS WE´RE DOING THIS OTHER WAY
        // saber si el usuario ttomo una decision 
        const decisionMade = Math.abs(pullDeltaX) >= DECISIONN_THRESHOLD;

        if (decisionMade) {
            const goRight = pullDeltaX >=0
            const goLeft = !goRight

            // add class acording to teh desicion
            actualCard.classList.add(goRight ? 'go-right' : 'go-left');
            actualCard.addEventListener('transitionend', ()=>{
                actualCard.remove()
            }, {once: true});
        }else{
            actualCard.classList.add('reset');
            actualCard.classList.remove('go-right', 'go-left');
            actualCard.querySelectorAll('.choice').forEach(el => el.style.opacity = 0);
        }

        // reset the variables
        actualCard.addEventListener('transitionend', ()=>{
            actualCard.removeAttribute('style');
            actualCard.classList.remove('reset');

            pullDeltaX = 0
            isAnimating = false
        })
    }
}





document.addEventListener('mousedown', startDrag);
document.addEventListener('touchstart', startDrag,{passive:true});