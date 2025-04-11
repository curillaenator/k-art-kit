import React, { useState, useRef, useEffect, FC, type MouseEventHandler } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from '@k-art/button';
import { compose } from './utils';
import type { ContextMenuProps } from './interfaces';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const MenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.5rem;
  background-color: ${({ theme }) => theme.backgrounds.base};
  border-radius: 16px;
  animation: ${fadeIn} 2ms;
  z-index: 500;
  filter: drop-shadow(${({ theme }) => theme.shadows.base});

  .menuitem {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 56px;
    border-bottom: 1px solid ${({ theme }) => theme.backgrounds.light};

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const ContextMenu: FC<ContextMenuProps> = ({ children, items }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [location, setLocation] = useState({ x: 0, y: 0 });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);

  const onClickOff = (event: MouseEvent) => {
    if (!menuRef.current?.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  const onContextMenu: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();

    setLocation({ x: event.pageX, y: event.pageY });
    setOpen(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOff);

    return () => document.removeEventListener('mousedown', onClickOff);
  }, []);

  return (
    <div ref={menuRef} onContextMenu={onContextMenu}>
      {open && (
        <MenuStyled style={{ position: 'absolute', left: location.x, top: location.y }}>
          {items.map((item) => (
            <div className='menuitem' key={item.title}>
              <Button {...item} onClick={() => compose([handleOpen, item.handler])} />
            </div>
          ))}
        </MenuStyled>
      )}
      {children}
    </div>
  );
};
