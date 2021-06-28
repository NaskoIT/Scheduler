export function setInputValueToState(event, setState) {
    setState(event.target.value);
}

export function preventDefault(event) {
    event.preventDefault();
}

export function trimSeconds(time) {
    if (time && time.length > 5) {
        return time.substring(0, 5);
    }

    return time;
}
