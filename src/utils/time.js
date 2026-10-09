const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const UNITS = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['week', 60 * 60 * 24 * 7],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
];

// Turns a timestamp (e.g. Supabase's created_at) into "5 minutes ago", "yesterday", etc.
export function timeAgo(timestamp) {
    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000);

    if (secondsAgo < 60) {
        return 'just now';
    }

    for (const [unit, secondsInUnit] of UNITS) {
        if (secondsAgo >= secondsInUnit) {
            return rtf.format(-Math.floor(secondsAgo / secondsInUnit), unit);
        }
    }
}
