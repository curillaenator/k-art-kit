// import { useState } from 'react';

// import type { TocAsideConfig, TocAsideView } from '../components/TocAside/interfaces';

// interface TocUseTocConfigOptions extends Pick<TocAsideConfig, 'title' | 'updateTocOnChange' | 'scrollContainerId'> {
//   canBeShown?: boolean;
// }

/**
 * Хук для управления оглавлением (ToC) в редакторе.
 * @param {TocUseTocConfigOptions} [options]
 *
 * - `title` {string} – Оглавление для компонента `TocAside`.
 *
 * - `scrollContainerId` {string} – ID контейнера с прокручивающимся контентом,
 *   в котором должен произойти скролл при нажатии на элемент ТоС,
 *   используется и в TocNode и в TocAside
 *
 * - `updateTocOnChange` {EditorTocAsideConfig['updateTocOnChange']} –
 *    Набор зависимостей для useEffect для сценариев обновления ТоС,
 *    когда ни сам документ, ни его структура не обновляются, например при навигации по юнитам
 *
 * - `canBeShown` {boolean} - если true, tocView всегда 'disabled'
 *
 * @returns {TocAsideConfig} Конфигурация для работы с оглавлением
 */
// const useEditorToc = (options?: TocUseTocConfigOptions) => {
// const { canBeShown, title, scrollContainerId, updateTocOnChange } = options || {};

// const [tocView, setTocView] = useState<TocAsideView>('disabled');

// return {
//   title,
//   scrollContainerId,
//   view: canBeShown ? tocView : 'disabled',
//   setView: setTocView,
//   updateTocOnChange,
// } as TocAsideConfig;
// };

// export { useEditorToc };
