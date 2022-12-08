console.log('start');

const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', event =>{
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

// обрабатывает клик по замку
document.addEventListener('click', event=>{
    // console.log(event.target.dataset)
    const type = event.target.dataset.type

    if (type === 'lock') {
        // console.log('click on lock')
       const node = event.target.tagName.toLowerCase() === 'i'
       ? event.target
       :event.target.children[0]
    //    console.log(node)
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClickboard(event.target.textContent)
    }

})

// функция не используется, оставил для примера, используется встроеный метод chroma
function generateRandomColor() {
    // RGB
    // #FF0000
    // #00FF00
    // #0000FF

    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i =0; i < 6; i++){
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color;

}

function copyToClickboard(text){
  return navigator.clipboard.writeText(text)
}



function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []

    cols.forEach((col, index)=>{
        const isLocked = col.querySelector('i').classList.contains('fa-lock') // проверяем класс на предмед блокирования
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        // const color = generateRandomColor()
        
        // прерываем итерацию если isLocked === false
        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial 
            ? colors[index] 
             ? colors[index] 
             : chroma.random() 
            : chroma.random()
        
        if (!isInitial) {
            colors.push(color)
        }

        text.textContent = color
        col.style.background = color

        setTextColor(text, color)
        setTextColor(button, color)

    })

    updateLocationHashColors(colors)
};

function setTextColor(text,color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}


function updateLocationHashColors(colors = []) {
    document.location.hash = colors.map(col => {
        return col.toString().substring(1)
    }).join('-')
}

function getColorsFromHash(){
    if(document.location.hash.length > 1) {
    return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return []
}


setRandomColors(true);