/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = ["/"];

/**
 * An array of routes that are accessible to the public
 * These routes will redirect logged in users to /admin
 * @type {string[]}
 */

export const authRoutes: string[] = ["/signin", "/signup"];

/**
 * The default redirect for logged in users
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard";
