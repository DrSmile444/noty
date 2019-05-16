const form = document.querySelector('[form]');
const formTextArea = form.querySelector('[form-textarea]');
const formButton = form.querySelector('[form-button]');
const formDelayed = form.querySelector('[form-delayed]');
const formSymbolCount = form.querySelector('[form-symbol-count]');

formButton.addEventListener('click', handleButtonClick);
formSymbolCount.value = 164; // default value

function handleButtonClick(event) {
    event.preventDefault();
    let delayed = formDelayed.checked;
    let text = formTextArea.value.trim();
    text = removeExtraSymbols(text);

    if (text.length) {

        if (delayed) {
            disableForm();

            setTimeout(() => {
                processButtonClick(text);
                enableForm();
            }, 2000);

            return;
        }

        processButtonClick(text);
    }
}

function processButtonClick(text) {
    cutMessage(text, formSymbolCount.value)
        .forEach(createNoty);

    formTextArea.value = '';
}

function disableForm() {
    form.setAttribute('disabled', 'true');
    formButton.setAttribute('disabled', 'true');
    formTextArea.setAttribute('disabled', 'true');
    formDelayed.setAttribute('disabled', 'true');
    formSymbolCount.setAttribute('disabled', 'true');

}

function enableForm() {
    form.removeAttribute('disabled');
    formButton.removeAttribute('disabled');
    formTextArea.removeAttribute('disabled');
    formDelayed.removeAttribute('disabled');
    formSymbolCount.removeAttribute('disabled');
}

function createNoty(body) {
    Noty.showNotification('', { body }).then(() => {
        Noty.getNotifications().then(notifications => {
            notifications.forEach(noty => {
                noty.close();
            });
        });
    });
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
