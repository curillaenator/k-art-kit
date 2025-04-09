import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import { Hint } from '@sbt_swtr/kit-tracker.hint';
import cn from 'classnames';

import { useHierarchyContext } from '../../context';

import type { HierarchyItem } from '../../interfaces';
import styles from './DocumentLink.module.scss';

interface DocumentLinkProps {
  item: HierarchyItem;
  // isHovered?: boolean;
  // isActive?: boolean;
  // setHovered: (data: boolean) => void;
}

export const DocumentLink: FC<DocumentLinkProps> = (props) => {
  const { item } = props;
  const { linkPattern } = useHierarchyContext();

  const { noteId } = useParams<{ noteId: string }>();

  // const hasActions = !!actions?.length;
  // const isDisabled = (disableRestricted && restricted) || matchDisabledItem?.(item);

  // const captionRef = useRef<HTMLSpanElement>(null);
  // const lengthRef = useRef<HTMLSpanElement>(null);

  // const [hasHint, setHasHint] = useState<boolean>(false);

  // проверка нужен ли Хинт кепшену с указанием польного тайтла (summary) документа
  // useLayoutEffect(() => {
  //   setHasHint((lengthRef.current?.clientWidth || 0) > (captionRef.current?.clientWidth || 0));
  // });

  const classNames = cn(styles.button, {
    [styles.button_active]: item.code === noteId,
    // [styles.button_actioned]: hasActions && isHovered,
    // [styles.button_disabled]: isDisabled,
  });

  const children = (
    <>
      <span className={styles.captionContainer}>
        <span
          // ref={captionRef}
          className={styles.caption}
        >
          {item?.name}
        </span>
      </span>

      <span
        // ref={lengthRef}
        data-description={`${item?.code}-ruller`}
        className={styles.lengthRef}
      >
        {item?.name}
      </span>

      {/* Hint предоставляется как абсолютно спозиционированный элемент кнопки и принимает ее размеры
          Кепшн нельзя завернуть напрямую в хинт из за механизма определения наличия самого хинта */}
      {/* {hasHint && (
        <Hint
          trigger="mouseenter focus"
          delay={700}
          offset={[0, 4]}
          id={`${item.id}-hint`}
          appendToId={uniqueId}
          content={
            <span onClick={(e) => e.stopPropagation()} className={styles.content}>
              {title}
            </span>
          }
          borderRadius="s"
          maxWidth={384}
          padding="s"
          color="neutral-100"
          dropShadow
          placement="top-right"
          className={styles.hint}
          openNodeClassName={styles.openNodeClassName}
          popperOptions={{
            modifiers: [
              {
                name: 'flip',
                enabled: true,
              },
              {
                name: 'preventOverflow',
                options: { mainAxis: false },
              },
            ],
          }}
        >
          <Fragment />
        </Hint>
      )} */}
    </>
  );

  return (
    <Link
      className={classNames}
      type='button'
      to={linkPattern(item)}
      // onMouseEnter={() => setHovered(true)}
    >
      {children}
    </Link>
  );

  // return linkPattern ? (
  //   <Link className={classNames} type='button' to={linkPattern(item)} onMouseEnter={() => setHovered(true)}>
  //     {children}
  //   </Link>
  // ) : (
  //   <button className={classNames} type='button' onMouseEnter={() => setHovered(true)}>
  //     {children}
  //   </button>
  // );
};
