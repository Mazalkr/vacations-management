import appConfig from "./AppConfig";

function getAbsoluteImageSrc(src: string | undefined): string {

    if (!src) return '';
    
    const originalUrl = new URL(src); 
    return `${appConfig.baseUrl}${originalUrl.pathname}`;
}

export default getAbsoluteImageSrc;