class CookieUtils {
    public static setSessionCookie(token: string, expiration: Date) {
        document.cookie = `token=${token}; expires=${expiration.toUTCString()}; path=/`;
    }
}
