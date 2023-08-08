export const deleteCookie = (cookieName: string): void => {
    document.cookie = `${cookieName}=; Max-Age=-9999999`;
};