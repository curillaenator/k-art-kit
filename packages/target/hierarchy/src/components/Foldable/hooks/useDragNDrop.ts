// import type { PathedHierarchyItem } from '../../../interfaces';
// import { CURRENT_DRAG_ITEM } from '../../../constants';
// import { useHierarchyContext } from '../../../context';

// export const useDragNDrop = (itemProps: PathedHierarchyItem) => {
//   const { api } = useHierarchyContext();

//   return {
//     liDropHandlers: {
//       onDragStart: (e: React.DragEvent<HTMLLIElement>) => {
//         e.stopPropagation();

//         e.dataTransfer?.setData(CURRENT_DRAG_ITEM, JSON.stringify(itemProps));
//         api.toggleDrag(itemProps.id, true);
//       },

//       onDragEnd: () => {
//         api.toggleDrag(itemProps.id, false);
//       },

//       onDragOver: (e: React.DragEvent<HTMLLIElement>) => {
//         e.preventDefault();
//         e.dataTransfer.effectAllowed = 'move';
//       },

//       onDrop: (e: React.DragEvent<HTMLLIElement>) => {
//         e.preventDefault();
//         e.stopPropagation();

//         if (!e.dataTransfer) return;

//         const data = e.dataTransfer.getData(CURRENT_DRAG_ITEM);

//         if (!data) return;

//         const draggingData = JSON.parse(data);

//         console.table(draggingData);
//       },
//     },
//   };
// };
