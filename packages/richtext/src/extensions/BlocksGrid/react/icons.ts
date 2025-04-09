import toPairs from 'lodash/toPairs.js';

class ToolbarIcons {
  private svgAttrs = {
    width: '32',
    height: '32',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  };

  private pathAttrs = {
    stroke: 'currentColor',
    'stroke-width': '1.2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  };

  constructor() {
    return this;
  }

  private createIcon(paths: string[]) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svg.setAttributeNS(svg.namespaceURI, 'viewBox', '0 0 32 32');
    toPairs(this.svgAttrs).forEach(([atr, val]) => svg.setAttribute(atr, val));

    const path = document.createElementNS(svg.namespaceURI, 'path');
    toPairs(this.pathAttrs).forEach(([atr, val]) => path.setAttribute(atr, val));
    paths.forEach((d) => path.setAttribute('d', d));

    svg.style.setProperty('flex-shrink', '0');
    svg.append(path);

    return svg;
  }

  get addIcon() {
    return this.createIcon([
      'M14.2718 13.1667V10.875C14.2718 9.83947 15.1113 9 16.1468 9H21.1468C22.1823 9 23.0218 9.83947 23.0218 10.875V22.125C23.0218 23.1605 22.1823 24 21.1468 24H16.1468C15.1113 24 14.2718 23.1605 14.2718 22.125V19.8333M9 16.5H14M11.5 14V19',
    ]);
  }

  get deleteIcon() {
    return this.createIcon([
      'M18.5278 13.2308L18.2083 21.5385M13.7881 21.5385L13.4686 13.2308M22.6699 10.2682C22.9855 10.3159 23.3001 10.3669 23.6136 10.4212M22.6699 10.2682L21.6842 23.0824C21.6009 24.1644 20.6986 25 19.6134 25H12.383C11.2978 25 10.3955 24.1644 10.3122 23.0824L9.32652 10.2682M22.6699 10.2682C21.6116 10.1084 20.5411 9.98602 19.4597 9.90245M8.38281 10.4212C8.69627 10.3669 9.01085 10.3159 9.32652 10.2682M9.32652 10.2682C10.3848 10.1084 11.4553 9.98602 12.5367 9.90245M19.4597 9.90245V9.05679C19.4597 7.96815 18.6191 7.05929 17.531 7.02448C17.0221 7.0082 16.5111 7 15.9982 7C15.4853 7 14.9743 7.0082 14.4653 7.02448C13.3773 7.05929 12.5367 7.96815 12.5367 9.05679V9.90245M19.4597 9.90245C18.3175 9.81418 17.1631 9.76923 15.9982 9.76923C14.8333 9.76923 13.6789 9.81418 12.5367 9.90245',
    ]);
  }

  get carretRight() {
    return this.createIcon(['M13 10L19 16L13 22']);
  }

  get carretLeft() {
    return this.createIcon(['M19 22L13 16L19 10']);
  }

  get expandIcon() {
    return this.createIcon([
      'M4.33274 15.6673L7.51472 12.4853M4.33274 15.6673L7.51472 18.8492M4.33274 15.6673H11.7574M27.6673 15.6673L24.4853 12.4853M27.6673 15.6673L24.4853 18.8492M27.6673 15.6673L20.2426 15.6673',
    ]);
  }

  get collapseIcon() {
    return this.createIcon([
      'M11.7515 15.6673L8.56952 12.4853M11.7515 15.6673L8.56952 18.8492M11.7515 15.6673H4.32688M20.2368 15.6673L23.4188 12.4853M20.2368 15.6673L23.4188 18.8492M20.2368 15.6673L27.6614 15.6673',
    ]);
  }
}

export { ToolbarIcons };
