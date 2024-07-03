let isAnimating = false;
let pullDeltaX = 0; //distancia que la card se esta moviendo

function startDrag (event) {
    if (isAnimating) return;

    //? get the first article element
    const actualCard = event.target.closest('article');

    //? get initial position of mouse or finger
    const starX = event.pageX ?? event.touches[0].pageX;
    
    // listen the mouse and touche movements
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onEnd)

    document.addEventListener('touchmove', onMove, {passive: true});
    document.addEventListener('touchend', onMove, {passive: true});
}

function onMove(event){

}

function onEnd(event){
    
}

document.addEventListener('mousedown', startDrag);
document.addEventListener('touchstart', startDrag,{passive:true});