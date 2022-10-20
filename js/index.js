const cols = document.querySelectorAll('.col');
const lockButtons = document.querySelectorAll('.col-lock-button');
const colHeaders = document.querySelectorAll('.col-header');
const changeButton = document.querySelector('.change-button');

const lockedColors = [];


document.addEventListener('keypress', (event) => onSpacePress(event, lockedColors));
changeButton.addEventListener('click', () => setRandomColors(cols, lockedColors));

lockButtons.forEach(lockButton => {
    lockButton.addEventListener('click', (event) => {
        const buttonIcon = event.currentTarget.querySelector('.lock-icon');
        const parentCol = event.currentTarget.parentElement;
        const color = parentCol.style.getPropertyValue('background');

        const indexColor = lockedColors.indexOf(color);

        if(~indexColor){
            lockedColors.splice(indexColor, 1);
        } else {
            lockedColors.push(color);
        }

        buttonIcon.classList.toggle('fa-lock-open');
        buttonIcon.classList.toggle('fa-lock');
    })

})

colHeaders.forEach(colHeader => {
    colHeader.addEventListener('click', (event) => {
        const text = event.currentTarget.innerText;
        copyColor(text);
    })
})


setRandomColors(cols, lockedColors, true);
