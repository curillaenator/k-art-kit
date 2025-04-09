import type { DrawIoMessage } from './interfaces';

const DRAWIO_EXTENSION_NAME = 'drawio';

// const DRAWIO_DUMMY_IMG = 'https://jobtech.jp/wp-content/uploads/draw-io.png';

// const DRAWIO_FILE_TYPE = 'text/plain';
const DRAWIO_EVENTS: DrawIoMessage['event'][] = ['init', 'save', 'export', 'exit', 'autosave', 'prompt'];

// const DEFAULT_FILE_NAME = 'Схема123';

// const AVIOD_FILENAME_SYMBOLS = /[!@#$%^&*\\|,.?{}\[\]:;]/; // ok symbols  ()_+-

const DICT = {
  // setFilename: 'Укажите название файла',

  // avoidSymbols: 'Не используйте спец-символы в названиях',
  // emptyFilename: 'Название не может быть пустым',
  somethingWrong: 'Something went wrong... :(',

  error: 'Error',
  ok: 'Ok',
  save: 'Save',
};

export {
  DICT,
  DRAWIO_EVENTS,
  // AVIOD_FILENAME_SYMBOLS,
  DRAWIO_EXTENSION_NAME,
  // DRAWIO_FILE_TYPE,
  // DRAWIO_DUMMY_IMG,
};
