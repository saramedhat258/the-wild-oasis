import { auth } from "./app/_lib/auth";

export const middleware = auth

/*to spesify which routes is protected and when to run middleware function
 redirect user to signin route from nextauth */
export const config = {
    matcher: ['/account']
}