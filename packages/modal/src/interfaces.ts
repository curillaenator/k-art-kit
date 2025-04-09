import type { CornerProps } from "@k-art/shape";

interface ModalProps {
  portalId: string;
  open: boolean;
  onClose: () => void;
  borderRadius?: CornerProps["borderRadius"];
}

export type { ModalProps };
