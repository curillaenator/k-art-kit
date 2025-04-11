import { toPairs } from 'lodash';

class JSIcon {
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

  get expandIcon() {
    return this.createIcon([
      'M4.33274 15.6673L7.51472 12.4853M4.33274 15.6673L7.51472 18.8492M4.33274 15.6673H11.7574M27.6673 15.6673L24.4853 12.4853M27.6673 15.6673L24.4853 18.8492M27.6673 15.6673L20.2426 15.6673',
    ]);
  }
}

export { JSIcon };
