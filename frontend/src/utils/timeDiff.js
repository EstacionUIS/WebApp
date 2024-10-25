
export const getTimeDifference = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Approximate months
    const years = Math.floor(months / 12);

    if (years > 0) {
        return `${years} ${years > 1 ? 'years' : 'year'} ago`;
    } else if (months > 0) {
        return `${months} ${months > 1 ? 'months' : 'month'} ago`;
    } else if (days > 0) {
        return `${days} ${days > 1 ? 'days' : 'day'} ago`;
    } else if (hours > 0) {
        return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
    } else if (minutes > 0) {
        return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`;
    } else {
        return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`;
    }
};