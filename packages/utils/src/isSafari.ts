import Bowser from 'bowser';

const browser = Bowser.getParser(window.navigator.userAgent);

export const isSafari = () => browser.getPlatformType(true) === 'Safari';
