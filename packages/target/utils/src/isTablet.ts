import Bowser from 'bowser';

const browser = Bowser.getParser(window.navigator.userAgent);

export const isTablet = () => browser.getPlatformType(true) === 'tablet';
