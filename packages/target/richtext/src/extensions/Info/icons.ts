import { colorsLib } from "@k-art/theme";

import type { InfoAttributes } from "./interfaces";

const INFO_ICONS: Record<InfoAttributes["infoType"], string> = {
  info: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="9" stroke="${colorsLib.ultra[500]}" stroke-width="2"/>
<path d="M12.5 7.5C12.5 7.77614 12.2761 8 12 8C11.7239 8 11.5 7.77614 11.5 7.5C11.5 7.22386 11.7239 7 12 7C12.2761 7 12.5 7.22386 12.5 7.5Z" fill="${colorsLib.ultra[500]}" stroke="${colorsLib.ultra[500]}"/>
<path d="M12 17V10" stroke="${colorsLib.ultra[500]}" stroke-width="2"/>
</svg>`,
  warn: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="9" stroke="${colorsLib.orange[500]}" stroke-width="2"/>
<path d="M12.5 7.5C12.5 7.77614 12.2761 8 12 8C11.7239 8 11.5 7.77614 11.5 7.5C11.5 7.22386 11.7239 7 12 7C12.2761 7 12.5 7.22386 12.5 7.5Z" fill="${colorsLib.orange[500]}" stroke="${colorsLib.orange[500]}"/>
<path d="M12 17V10" stroke="${colorsLib.orange[500]}" stroke-width="2"/>
</svg>`,
  success: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21C14.0822 21 16.1 20.278 17.7095 18.9571C19.3191 17.6362 20.4209 15.798 20.8271 13.7558C21.2333 11.7136 20.9188 9.59376 19.9373 7.75743C18.9558 5.9211 17.3679 4.48191 15.4442 3.68508C13.5205 2.88826 11.38 2.78311 9.38744 3.38754C7.3949 3.99197 5.67358 5.26858 4.51677 6.99987C3.35997 8.73115 2.83925 10.81 3.04334 12.8822C3.24743 14.9543 4.1637 16.8916 5.63604 18.364" stroke="${colorsLib.nika[500]}" stroke-width="2" stroke-linecap="round"/>
<path d="M16 10L12.402 14.3175C11.7465 15.1042 11.4187 15.4976 10.9781 15.5176C10.5375 15.5375 10.1755 15.1755 9.45139 14.4514L8 13" stroke="${colorsLib.nika[500]}" stroke-width="2" stroke-linecap="round"/>
</svg>`,
  error: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="9" stroke="${colorsLib.danger[500]}" stroke-width="2"/>
<path d="M18 18L6 6" stroke="${colorsLib.danger[500]}" stroke-width="2"/>
</svg>`,
};

export { INFO_ICONS };
