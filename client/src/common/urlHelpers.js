export function toQueryString(obj) {
    return '?' +  new URLSearchParams(obj).toString();
}