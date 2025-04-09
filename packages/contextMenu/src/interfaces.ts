export interface IMenuItem {
  title: string;
  danger?: boolean;
  handler: () => void;
}

export interface ContextMenuProps {
  items: IMenuItem[];
  children: React.ReactElement;
}
