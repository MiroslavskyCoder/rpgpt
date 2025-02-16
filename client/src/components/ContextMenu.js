// client/src/components/ContextMenu.js
import React, { useState, useRef, useEffect } from 'react';
import { Menu, MenuItem } from '@mui/material';

const ContextMenu = ({ xPos, yPos, menuItems, showMenu, setShowMenu }) => {
    const menuRef = useRef(null); // Create a ref for the menu

    // Handle clicks outside the menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setShowMenu]);

    const handleClose = () => {
        setShowMenu(false);
    };

    return (
        <Menu
            open={showMenu}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={{ top: yPos, left: xPos }}
            PaperProps={{
                style: {
                    width: 200, // Adjust width as needed
                    // Add more custom styles here, like background color, etc.
                },
            }}
        ref={menuRef} // Attach the ref to the Menu component
        >
            {menuItems.map((item) => (
                <MenuItem key={item.label} onClick={() => {
                    item.onClick();
                    handleClose();
                }}>
                    {item.shortcut ? <span style={{ marginRight: '10px', color: 'grey' }}>{item.shortcut}</span> : null}
                    {item.label}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default ContextMenu;