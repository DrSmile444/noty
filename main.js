const form = document.querySelector('[form]');
const formTextArea = form.querySelector('[form-textarea]');
const formButton= form.querySelector('[form-button]');

Notification.requestPermission();

function handleButtonClick() {
    const text = formTextArea.value.trim();
    let timeoutTime = 0;
    if (text.length) {
        cutMessage(text)
            .forEach((part) => {
                setTimeout(() => {
                    console.log(part);
                    createNoty(part)
                }, timeoutTime);
                timeoutTime += 1000;
            });
    }

}

function createNoty(text) {
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            new Notification(text);
        }
    });
}

function cutMessage(message, maxLength = 120) {
    let result = [];
    let tempMessage = message;
    let iteration = 1;

    for (let slice = 0; slice < message.length; slice += maxLength) {
        const sliceTo = maxLength * iteration;
        result.push(tempMessage.slice(slice, sliceTo));
        iteration++;
    }

    return result;
}
