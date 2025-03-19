const decorationContainer = document.querySelector('.decoration-container');
const initialWidth = decorationContainer.offsetWidth;
let resizeEvent = false;
let resizeTimer;

async function dotimeout(seconds){
    return new Promise((resolve) => {
        setTimeout(() => {resolve()}, seconds * 1000)
    })
}

async function doInterval(fn, seconds){
    return new Promise((resolve) => {
        setInterval(fn(resolve), seconds * 1000)
    })
}

async function populateDecorationContainer(){
    decorationContainer.innerHTML = ''
    const maxWidth = decorationContainer.offsetWidth;
    let currentLeft = -250;

    while(currentLeft < (maxWidth + 280)){
        await dotimeout(0.1)
        if(resizeEvent === true) return;
        const decorationBox = document.createElement("div");
        decorationBox.classList.add('decoration-box')
        decorationBox.style.left = `${currentLeft}px`;
        decorationContainer.appendChild(decorationBox);
        currentLeft += 250;
    }
}

function removeUnshownBoxes(){
    const decorationBoxes = [...document.querySelectorAll('.decoration-box')];
    const containerWidth = decorationContainer.offsetWidth;
    console.log(decorationBoxes)
    for(let i = 0; i < decorationBoxes.length; i++){
        let box = decorationBoxes[i]
        let size = box.style.left
        size = Number(size.split('px')[0])

        if(size > containerWidth){
            console.log(box)
            box.remove()
        }
    }
}


populateDecorationContainer()

window.addEventListener('resize', () => {
    const currentMaxWidth = decorationContainer.offsetWidth;
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
        populateDecorationContainer()
    }, 250)

})