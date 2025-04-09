import "@k-art/types";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    toc: {
      insertToc: (range?: { minLevel: number; maxLevel: number }) => ReturnType;
    };

    drawIo: {
      insertDrawIo: (fileAttrs?: DrawIoAttributes | null) => ReturnType;
    };

    plantuml: {
      insertPlantUML: () => ReturnType;
    };

    blocksGrid: {
      insertBlocksGrid: (
        columnsCnt: number,
        fatBlockIdx?: number
      ) => ReturnType;
      deleteBlocksGrid: (onDelete: () => void) => ReturnType;
    };

    coreTable: {
      colorFill: (color: string) => ReturnType;
    };

    emoji: {
      setEmoji: (emojiAttrs: { shortName: string }) => ReturnType;
    };

    image: {
      setImage: (options: { src: string | null }) => ReturnType;
    };

    // fileLink: {
    //   insertFileLink: (attrs: FileListItem) => ReturnType;
    //   updateFileLinkSize: (size: 'small' | 'medium' | 'large') => ReturnType;
    //   deleteFileLink: () => ReturnType;
    // };

    // indent: {
    //   indent: () => ReturnType;
    //   outdent: () => ReturnType;
    // };
  }
}
