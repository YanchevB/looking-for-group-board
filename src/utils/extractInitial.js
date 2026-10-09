// First letter of a username for avatars: "1Vantage" -> "V", "_dk92" -> "D".
// Falls back to "?" when there is no letter at all (e.g. "1234") or no username.
export function extractInitial(str) {
    const firstLetter = str?.match(/\p{L}/u);

    return firstLetter ? firstLetter[0].toUpperCase() : '?';
}