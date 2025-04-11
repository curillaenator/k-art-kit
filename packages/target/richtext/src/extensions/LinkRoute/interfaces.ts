interface LinkRouteAttributes {
  to: string;
}

interface LinkRouteOptions {
  navTo: ((to: string) => void) | null;
}

export type { LinkRouteAttributes, LinkRouteOptions };
