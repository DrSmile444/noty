const form = document.querySelector('[form]');
const formTextArea = form.querySelector('[form-textarea]');
const formButton = form.querySelector('[form-button]');

formButton.addEventListener('click', handleButtonClick);

function handleButtonClick() {
    let text = formTextArea.value.trim();
    text = removeExtraSymbols(text);

    if (text.length) {
        cutMessage(text)
            .forEach(createNoty);

        formTextArea.value = '';
    }
}


function createNoty(body) {
    Noty.showNotification('', { body });
}

function cutMessage(message, maxLength = 164) {
    let result = [];

    while (message.length) {
        result.push(message.slice(0, maxLength));
        message = message.slice(maxLength, message.length);
    }

    return result.reverse();
}

function removeExtraSymbols(string) {
    return string.replace(/\n/g, ' ');
}
