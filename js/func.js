function setRandomColors(targets, lockedArr, isInitial = false) {
    // const generateRandomColor = () => {
    //     const hexCodes = '0123456789ABCDEF';
    //     let color = '';
    //     for (let i = 0; i < 6; i++) {
    //         color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    //     }
    //
    //     return `#${color}`;
    // }
    const colors = isInitial ? getColorsFromHash(location.hash) : [];

    const setColor = (text, color) => {
        const luminance = chroma(color).luminance();
        if(Array.isArray(text)){
            text.forEach(item => {
                item.style.color = luminance > 0.5 ? 'black' : 'white';
            })
        } else {
            text.style.color = luminance > 0.5 ? 'black' : 'white';
        }
    }

    targets.forEach((target, index) => {
        const header = target.querySelector('.col-header');
        const button = target.querySelector('.col-lock-button');
        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random();

        const oldColorRGB = target.style.getPropertyValue('background');
        const oldColorHash = header.innerText;

        if(!~lockedArr.indexOf(oldColorRGB)){
            setColor([header, button], color);

            header.innerText = color;
            target.style.background = color;
        }

        if(!isInitial){
            if(!~lockedArr.indexOf(oldColorRGB)){
                colors.push(color)
            } else {
                colors.push(oldColorHash)
            }
        }
    })

    updateLocation(colors)
}

function onSpacePress(event, lockedArr) {
    if(event.code.toLowerCase() === 'space'){
        setRandomColors(cols, lockedArr);
    }
}

function copyColor(text) {
    return navigator.clipboard.writeText(text);
}

function updateLocation(colors = []) {
    colors = colors.map(color => {
        return color.toString().substring(1);
    })
    location.hash = colors.join('-');
}

function getColorsFromHash(hash) {
    if(hash.length > 1){
        hash = hash
            .substring(1)
            .split('-')
            .map(color => {
                return `#${color}`
            })

        return hash;
    }

    return [];
}
