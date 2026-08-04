/**
 * Capitalize the first letter of each word in a string
 * @param str - The string to capitalize
 * @returns The string with first letter of each word capitalized, or empty string if falsy
 */
export const capitalizeWords = (str: string | null | undefined): string => {
    if (!str) return '';
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};
