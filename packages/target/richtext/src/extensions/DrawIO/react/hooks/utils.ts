import styles from '../widget.module.scss';

const resolveIFrameDomain = (link: string) => {
  try {
    const url = new URL(link);
    return `${url.protocol}//${url.host}`;
  } catch (error) {
    console.error('Drawio error via URL:', link, error);
    return '*'; // фолбек для дроайо-экшенов на любые доменные имена, но так как дроайо сервис тут уже недоступен, такой фолбек ни на что не влияет
  }
};

const createDrawIoEmbed = (drawIoEmbedLink: string) => {
  const dialog = document.createElement('dialog');
  dialog.classList.add(styles.dialog);

  const iframe = document.createElement('iframe');
  iframe.classList.add(styles.iframe);
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('src', drawIoEmbedLink);

  dialog.appendChild(iframe);
  document.body.appendChild(dialog);

  dialog.showModal();

  return {
    iframe,
    dialog,
    iframeDomain: resolveIFrameDomain(drawIoEmbedLink),
  };
};

export { createDrawIoEmbed };
