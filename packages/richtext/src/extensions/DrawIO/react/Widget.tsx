import React, { FC, useMemo } from 'react';
import cn from 'classnames';
import { NodeViewWrapper } from '@tiptap/react';

import { useWidget } from './hooks/useWidget';
import { WithActions } from './components';
import { $drawioContext as Context } from './context';

import { WidgetDrawioIcon } from './icons/WidgetDrawioIcon';

import type { UiWidgetProps } from './interfaces';
import styles from './widget.module.scss';
import editorCssv from '../../../styles.module.scss';

const UIWidget: FC<UiWidgetProps> = (props) => {
  const { extension, node } = props;
  const { attrs: widgetAttrs } = node;

  const { toggleDrawIo } = useWidget(props);

  const ctx = useMemo(() => ({ ...props, toggleDrawIo }), [props, toggleDrawIo]);

  return (
    <Context.Provider value={ctx}>
      <NodeViewWrapper className={cn(styles.widget, editorCssv._theme_eds)}>
        <WithActions isDrawioEditorAvailable={!!extension.options.drawIoLink} hasPreview={!!widgetAttrs.xmlpng}>
          {widgetAttrs.xmlpng ? (
            <img data-drawio-image src={widgetAttrs.xmlpng} className={styles.image} />
          ) : (
            <div className={styles.badge} data-is-drawio-xmlpng-empty>
              <WidgetDrawioIcon />
              <span>Unpablished drawio</span>
            </div>
          )}
        </WithActions>
      </NodeViewWrapper>
    </Context.Provider>
  );
};

export { UIWidget };
