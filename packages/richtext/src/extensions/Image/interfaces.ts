interface ImageConfig {}

interface ImageAttributes {
  src: string | null;
  scale: number;
  pos: [number, number]; // x, y
  height: number;
}

export type { ImageConfig, ImageAttributes };
