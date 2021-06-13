export function toQueryString(obj) {
    new URLSearchParams(obj).toString();
}