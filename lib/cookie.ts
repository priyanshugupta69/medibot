import { getCookie, setCookie } from 'cookies-next';

export const setCookieCustom = (name: string, data: any) => {
    // console.log(name, data);
    const stringify = JSON.stringify(data);    
    setCookie(name, stringify, {});
}

export const getCookieCustom = (name: string) => {
    return getCookie(name);
}