import React, { FC, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useUnit as UseEffectorUnit } from 'effector-react';
import { toPairs, keys } from 'lodash';
import cn from 'classnames';

import { $hierarchyStore, registerHierarchyItem, updateHierarchy } from '../../service/store';
import { useHierarchyContext } from '../../context';

import { getPathKey } from '../../utils/getPathKey';

import { Spinner } from '../Spinner';
import { DocumentLink } from '../DocumentLink';

// import { Actions } from '../Actions';
// import { useDragNDrop } from './hooks/useDragNDrop';

import CaretRightIcon from '../../assets/carretRight.svg';
import DotSmallIcon from '../../assets/dot.svg';

import { getHeight } from '../../utils/getHeight';

import styles from './styles.module.scss';

interface FoldableProps {
  code: string;
  path: string[];
}

export const Foldable: FC<FoldableProps> = (props) => {
  const { code: foldableCode, path } = props;

  const qc = useQueryClient();

  const pathKey = getPathKey([...path, foldableCode]);
  const store = UseEffectorUnit($hierarchyStore);
  const { queryKey: ITEMS_QUERY_KEY, getItemQuery, ItemLoader } = useHierarchyContext();

  const foldableElementStore = store[pathKey] || { isExpanded: false };
  const { isExpanded } = foldableElementStore;

  const [touched, setTouched] = useState<boolean>(false);

  // const [isActive, setActive] = useState(false);
  // const [isActionsOpened, setActionsOpened] = useState(false);
  // const [isHovered, setHovered] = useState(false);

  const { data: unitData, isLoading: isUnitLoading } = useQuery({
    queryKey: [ITEMS_QUERY_KEY, foldableCode],
    queryFn: () => getItemQuery(foldableCode),
    enabled: !!foldableCode,
  });

  useEffect(() => {
    if (!!unitData) registerHierarchyItem({ ...unitData, path });
  }, [unitData]);

  // const { liDropHandlers } = useDragNDrop(props);

  const hasChildren = !!keys(unitData?.hierarchy).length;

  return (
    <li
      // {...liDropHandlers}
      // draggable={isDraggable}
      className={styles.li}
    >
      <div
        data-element='trigger'
        data-code={foldableCode}
        className={cn(styles.trigger, {
          // [styles.trigger_isDrag]: itemState.isDrag,
          // [styles.trigger_isActive]: noteId === data.code,
        })}
        // onMouseLeave={() => {
        // if (!isActionsOpened) {
        //   setHovered(false);
        // }
        // }}
      >
        {isUnitLoading && (ItemLoader ? <ItemLoader /> : <Spinner />)}

        {!isUnitLoading && !hasChildren && <DotSmallIcon />}

        {!isUnitLoading && !!hasChildren && (
          <button
            type='button'
            className={styles.iconButton}
            onClick={() => {
              setTouched(true);
              updateHierarchy({
                path: [...path, foldableCode],
                serviceItem: { ...foldableElementStore, isExpanded: !foldableElementStore.isExpanded },
              });
            }}
          >
            <div className={cn(styles.carret, { [styles.carret_opened]: isExpanded })}>
              <CaretRightIcon />
            </div>
          </button>
        )}

        {unitData && (
          <DocumentLink
            item={unitData}
            // setHovered={setHovered} isHovered={isHovered} isActive={isActive}
          />
        )}

        {/* {!!actions?.length && && isHovered && (
          <Actions item={props} setActionsOpened={setActionsOpened} setHovered={setHovered} />
        )} */}
      </div>

      <ul
        id={pathKey}
        data-element={`child-list-${pathKey}`}
        className={cn(styles.ulList, {
          [styles.ulList_folded]: !isExpanded,
          // [styles.list_isDrag]: itemState.isDrag,
        })}
        style={
          {
            '--list-foldable-mah':
              unitData && isExpanded ? `${getHeight({ qc, ITEMS_QUERY_KEY, code: foldableCode, path })}px` : 0,
          } as React.CSSProperties
        }
      >
        {(touched || isExpanded) &&
          unitData?.hierarchy &&
          toPairs(unitData.hierarchy)
            .toSorted(([_a, orderA], [_b, orderB]) => orderA - orderB) // eslint-disable-line @typescript-eslint/no-unused-vars
            .map(([childCode]) => <Foldable key={childCode} code={childCode} path={[...path, foldableCode]} />)}
      </ul>
    </li>
  );
};
