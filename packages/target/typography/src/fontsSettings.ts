import { css } from 'styled-components';

// Правила написания названий стилей шрифтов
// 1. Название должно быть буквенным, написанным через CamelCase
// 2. Если стиль используется для скругленного шрифта, то название должно начинаться со слова Rounded
// 3. Заканчиваться название должно цифрой, обозначающей размер шрифта

// Почему это важно - по названиям автоматически подтягивается нужный шрифт (rounded или нет) и
// генерируются html теги, отображаемые типографией в DOM (h1, h3, p и тд)

// Примеры корректных названий - RoundedRegular16, TextBold14, RoundedHeavy36

export const fontStyles = {
  RoundedHeavy56: css`
    font-style: normal;
    font-variation-settings:
      'GRAD' 400,
      'wght' 770;
    font-size: 56px;
    line-height: 64px;
    /* letter-spacing: -0.016em; */
    font-feature-settings:
      'pnum' on,
      'lnum' on,
      'case' on,
      'liga' off,
      'calt' off;
    margin-block-start: 0em;
    margin-block-end: 0em;
  `,

  RoundedHeavy52: css`
    font-style: normal;
    font-variation-settings:
      'GRAD' 400,
      'wght' 800;
    font-size: 52px;
    line-height: 64px;
    /* letter-spacing: -0.026em; */
  `,

  RoundedHeavy48: css`
    font-style: normal;
    font-variation-settings:
      'GRAD' 400,
      'wght' 800;
    font-size: 48px;
    line-height: 64px;
    /* letter-spacing: -0.021em; */
  `,
  RoundedHeavy36: css`
    font-style: normal;
    font-variation-settings:
      'GRAD' 400,
      'wght' 800;
    /* font-weight: 800; */
    font-size: 36px;
    line-height: 48px;
    /* letter-spacing: -0.021em; */
  `,

  RoundedHeavy24: css`
    font-style: normal;
    font-variation-settings:
      'GRAD' 400,
      'wght' 720;
    font-size: 24px;
    line-height: 32px;
    /* letter-spacing: -0.012em; */
  `,

  RoundedBold20: css`
    font-style: normal;
    font-variation-settings:
      'GRAD' 400,
      'wght' 640;
    font-size: 20px;
    line-height: 24px;
    /* letter-spacing: -0.0054em; */
  `,

  RoundedBold16: css`
    font-style: normal;
    font-variation-settings:
      'GRAD' 400,
      'wght' 700;
    font-size: 16px;
    line-height: 24px;
    /* letter-spacing: 0.03em; */
  `,

  RoundedMedium16: css`
    font-style: normal;
    font-variation-settings:
      'GRAD' 400,
      'wght' 500;
    font-size: 16px;
    line-height: 24px;
    /* letter-spacing: 0.025em; */
  `,

  TextRegular16: css`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    /* letter-spacing: -0.0011em; */
  `,

  TextMedium16: css`
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    /* letter-spacing: -0.0011em; */
  `,

  RoundedBold14: css`
    font-style: normal;
    font-variation-settings:
      'GRAD' 400,
      'wght' 580;
    font-size: 14px;
    line-height: 22px;
    /* letter-spacing: 0.004em; */
  `,

  TextRegular14: css`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    /* letter-spacing: -0.006em; */
  `,

  TextSemiBold14: css`
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    /* letter-spacing: -0.006em; */
  `,

  TextBold12: css`
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    /* letter-spacing: -0.03em; */
  `,

  TextRegular12: css`
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
  `,

  TextRegular11: css`
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 16px;
    /* letter-spacing: 0.005em; */
  `,
};

export const fonts = {
  // common: 'Roboto, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  sfRounded: 'system-ui-rounded, ui-rounded, "SF Pro Rounded", "SanFrancisco", "Roboto", sans-serif',
  // sfPro: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text"',
};
