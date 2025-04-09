import { useState, useEffect, useCallback } from 'react';

import { createDrawIoEmbed } from './utils';

import {
  DRAWIO_EVENTS,
  DICT,
  // AVIOD_FILENAME_SYMBOLS, DEFAULT_FILE_NAME,
} from '../constants';

import type { DrawIoAttributes, DrawIoEvent, DrawIoMessage, UiWidgetProps, DrawIoPostPata } from '../interfaces';

export const useWidget = (props: UiWidgetProps) => {
  const {
    extension: { options },
    node: { attrs },
    updateAttributes,
  } = props;

  // const [src, setSrc] = useState<string | null>(null);
  // const [isSrcLoading, setIsSrcLoading] = useState(false);

  const toggleDrawIo = useCallback(() =>
    // targetSrc?: string
    {
      if (!options.drawIoLink) return;

      const { dialog, iframe, iframeDomain } = createDrawIoEmbed(options.drawIoLink);

      const onDrawioUploadEnd = (nextAttrs: DrawIoAttributes) => {
        updateAttributes(nextAttrs);

        iframe.contentWindow?.postMessage(
          JSON.stringify({ action: 'spinner', show: false, message: '' }),
          iframeDomain,
        );

        iframe.contentWindow?.postMessage(JSON.stringify({ action: 'exit' }), iframeDomain);
      };

      // const onDrawioUploadError = (err: { message: string }) => {
      //   iframe.contentWindow?.postMessage(
      //     JSON.stringify({ action: 'spinner', show: false }),

      //     iframeDomain,
      //   );

      //   iframe.contentWindow?.postMessage(
      //     JSON.stringify({ action: 'dialog', title: DICT.error, message: err.message, button: DICT.ok }),
      //     iframeDomain,
      //   );
      // };

      const onMessageReceive = (event: DrawIoEvent) => {
        if (typeof event?.data !== 'string' || !event?.data?.length) return null;

        const msg = JSON.parse(event.data) as DrawIoMessage;

        if (!msg.event || !DRAWIO_EVENTS.includes(msg.event)) return null;

        switch (msg.event) {
          case 'init':
            if (!attrs.xmlpng) {
              iframe.contentWindow?.postMessage(JSON.stringify({ action: 'template' }), iframeDomain);
              break;
            }

            const onLoadData: DrawIoPostPata = {
              action: 'load',
              autosave: 0,
              title: 'DrawIO',
              xmlpng: attrs.xmlpng,
            };

            iframe.contentWindow?.postMessage(JSON.stringify(onLoadData), iframeDomain);
            break;

          case 'autosave':
            // autosave need to be turned on, here is autosave logic
            break;

          case 'save':
            iframe.contentWindow?.postMessage(
              JSON.stringify({ action: 'export', format: 'xmlpng', spinKey: 'saving' }),
              iframeDomain,
            );

            break;

          case 'export':
            onDrawioUploadEnd({ ...attrs, xmlpng: msg.data || null });
            // if (attrs.drawIoCode) {
            //   iframe.contentWindow?.postMessage(
            //     JSON.stringify({ action: 'spinner', show: true, message: 'Uploading' }),
            //     iframeDomain,
            //   );

            //   updateFile(attrs, prepareFile(attrs.drawIoName as string, msg.data!)).then(onDrawioUploadEnd);
            // } else {
            //   iframe.contentWindow?.postMessage(
            //     JSON.stringify({
            //       action: 'prompt',
            //       data: msg.data,
            //       title: DICT.setFilename,
            //       ok: DICT.save,
            //       defaultValue: DEFAULT_FILE_NAME,
            //     }),
            //     iframeDomain,
            //   );
            // }

            break;

          // case 'prompt':
          //   const fileName = msg.value;
          //   const fileData = msg.message?.data;

          //   if (!fileName) {
          //     iframe.contentWindow?.postMessage(
          //       JSON.stringify({
          //         action: 'dialog',
          //         title: DICT.error,
          //         message: DICT.emptyFilename,
          //         button: DICT.ok,
          //       }),
          //       iframeDomain,
          //     );

          //     break;
          //   }

          //   if (AVIOD_FILENAME_SYMBOLS.test(fileName)) {
          //     iframe.contentWindow?.postMessage(
          //       JSON.stringify({
          //         action: 'dialog',
          //         title: DICT.error,
          //         message: DICT.avoidSymbols,
          //         button: DICT.ok,
          //       }),
          //       iframeDomain,
          //     );

          //     break;
          //   }

          //   if (!fileData) {
          //     iframe.contentWindow?.postMessage(
          //       JSON.stringify({
          //         action: 'dialog',
          //         title: DICT.error,
          //         message: DICT.somethingWrong,
          //         button: DICT.ok,
          //       }),
          //       iframeDomain,
          //     );

          //     break;
          //   }

          //   iframe.contentWindow?.postMessage(
          //     JSON.stringify({ action: 'spinner', show: true, message: 'Uploading' }),
          //     iframeDomain,
          //   );

          //   uploadFile(prepareFile(fileName, fileData)).then(onDrawioUploadEnd).catch(onDrawioUploadError);
          //   break;

          case 'exit':
            dialog.close();
            window.removeEventListener('message', onMessageReceive);
            document.body.removeChild(dialog);

            break;
        }
      };

      window.addEventListener('message', onMessageReceive);
    }, [attrs, options, updateAttributes]);

  return { toggleDrawIo };
};
