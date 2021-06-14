export function setInputValueToState(event, setState) {
    setState(event.target.value);
}

export function preventDefault(event) {
    event.preventDefault();
}
