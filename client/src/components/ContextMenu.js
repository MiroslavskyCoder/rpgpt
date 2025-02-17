// client/src/components/ContextMenu.js
import React from 'react';
import { Menu, MenuItem } from '@mui/material';

function ContextMenu({ xPos, yPos, menuItems, showMenu, setShowMenu }) {
    const handleClose = () => {
        setShowMenu(false);
    };

    return (
        <Menu
            open={showMenu}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
                showMenu
                    ? { top: yPos, left: xPos }
                    : undefined
            }
        >
            {menuItems.map((item, index) => (
                <MenuItem key={index} onClick={item.onClick}>
                    {item.label}
                </MenuItem>
            ))}
        </Menu>
    );
}

export default ContextMenu;