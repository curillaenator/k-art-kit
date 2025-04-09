interface Location {
  pathname: string;
  search: string;
  state: unknown;
  hash: string;
  key?: string;
}

type LocationDescriptor =
  | string
  | {
      pathname?: string;
      search?: string;
      state?: unknown;
      hash?: string;
      key?: string;
    };

export const isRouterLink = (to: LocationDescriptor | ((location: Location) => LocationDescriptor)): boolean => {
  /*
  Примеры ссылок для которых должен редериться тег <a>, таких как:
  'https://www.google.com' - внешняя ссылка с протоколом https,
  'http://www.google.com' - внешняя ссылка с протоколом http,
  'ftp://ftpdata' - внешняя ссылка с протоколом ftp,
  '//google.com' - внешняя ссылка без протокола,
  '//www.google.com' - внешняя ссылка без протокола c www,
  'tel:000000000' - ссылка для вызова телефона (тоже нужент тег <a>),
  'mailto:test'- ссылка для вызова почтовой программы (тоже нужент тег <a>),
  '#anchor' - якорная ссылка с первым символом # (тоже нужент тег <a>),

  Примеры ссылок для которых должен рендерится <Link>:
  '/test' - внутренняя ссылка,
  '/static/media/packages/ui/Link/img.png' - внутренняя ссылка на ресурсы,
 */
  const regExp = /^((http(s?)|ftp):\/\/)|^((tel|mailto):)|^(\/\/|#)/;
  return !(typeof to === 'string' && regExp.test(to));
};
