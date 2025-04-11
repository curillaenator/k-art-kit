import IconEllipsis from '../svg/ellipsis.svg';
import type { DropdownProps, DropdownItemProps } from '../interfaces';

export const resolveOpenNodeIcon = (props: DropdownProps, selectedItem: DropdownItemProps | null) => {
  const { value: selectedId, items, icon = null, selectedItems } = props;

  if (icon) return icon;

  // отображение иконки: при синглвелью дропдауне
  if (!selectedItems) return !!selectedId ? selectedItem?.Icon || icon : icon;

  // при мультивелью дропдауне
  const multi = Object.entries(selectedItems);
  const multiDryed = multi.filter(([_, v]) => !!v); // eslint-disable-line @typescript-eslint/no-unused-vars

  // будет отображена иконка элемента, если выбран 1 элемент
  if (multiDryed.length === 1) return items?.flat().find((item) => item.id === multiDryed[0][0])?.Icon || null;

  // будет отображена иконка Ellipsis, если выбрано больше 1ого элемента
  return multiDryed.length > 1 ? IconEllipsis : icon;
};
