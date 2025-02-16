// client/src/components/MainMenu.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, Box } from '@mui/material';

const MainMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);

    const handleMenuClick = (event, menuName) => {
        setAnchorEl(event.currentTarget);
        setSelectedMenu(menuName);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedMenu(null);
    };

    const menuItems = {
        File: [
            {
                label: 'Save Settings',
                shortcut: 'Ctrl+S', 
                clicked: () => { 
                    console.log('New File clicked');
                }
            }
        ],
        Edit: [
            { label: 'Undo', shortcut: 'Ctrl+Z', clicked: () => console.log('Undo clicked') },
            { label: 'Redo', shortcut: 'Ctrl+Y', clicked: () => console.log('Redo clicked') },
            { label: 'Cut', shortcut: 'Ctrl+X', clicked: () => console.log('Cut clicked') },
            { label: 'Copy', shortcut: 'Ctrl+C', clicked: () => console.log('Copy clicked') },
            { label: 'Paste', shortcut: 'Ctrl+V', clicked: () => console.log('Paste clicked') },
        ],
        Selection: [
            { label: 'Select All', shortcut: 'Ctrl+A', clicked: () => console.log('Select All clicked') },
            { label: 'Select Line', shortcut: 'Ctrl+L', clicked: () => console.log('Select Line clicked') },
            { label: 'Select Word', shortcut: 'Ctrl+Shift+W', clicked: () => console.log('Select Word clicked') },
        ],
        View: [
            { label: 'Appearance', shortcut: '', clicked: () => console.log('Appearance clicked') },
            { label: 'Editor Layout', shortcut: '', clicked: () => console.log('Editor Layout clicked') },
            { label: 'Zoom', shortcut: '', clicked: () => console.log('Zoom clicked') },
        ],
        Go: [
            { label: 'Go to File', shortcut: 'Ctrl+P', clicked: () => console.log('Go to File clicked') },
            { label: 'Go to Symbol', shortcut: 'Ctrl+Shift+O', clicked: () => console.log('Go to Symbol clicked') },
            { label: 'Go to Line', shortcut: 'Ctrl+G', clicked: () => console.log('Go to Line clicked') },
        ],
        Run: [
            { label: 'Run Without Debugging', shortcut: 'F5', clicked: () => console.log('Run Without Debugging clicked') },
            { label: 'Start Debugging', shortcut: 'F5', clicked: () => console.log('Start Debugging clicked') },
        ],
        Terminal: [
            { label: 'New Terminal', shortcut: 'Ctrl+Shift+', clicked: () => console.log('New Terminal clicked') },
            { label: 'Split Terminal', shortcut: 'Ctrl+Shift+"', clicked: () => console.log('Split Terminal clicked') },
            { label: 'Close Terminal', shortcut: 'Ctrl+Shift+W', clicked: () => console.log('Close Terminal clicked') },
        ],
        Help: [
            { label: 'Welcome', shortcut: '', clicked: () => console.log('Welcome clicked') },
            { label: 'Documentation', shortcut: '', clicked: () => console.log('Documentation clicked') },
            { label: 'Report Issue', shortcut: '', clicked: () => console.log('Report Issue clicked') },
        ],
    };

    return (
        <AppBar position="static" sx={{ marginTop: 0 }}>
            <Toolbar variant="dense">
                {Object.keys(menuItems).map((menuName) => (
                    <Button
                        key={menuName}
                        color="inherit"
                        onClick={(event) => handleMenuClick(event, menuName)}
                        sx={{ textTransform: 'none' }}
                    >
                        {menuName}
                    </Button>
                ))}
            </Toolbar>

            {selectedMenu && (
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{ dense: true }}
                >
                    {menuItems[selectedMenu].map((item) => (
                        <MenuItem key={item.label} onClick={item.clicked}>
                            {item.shortcut && <span style={{ marginRight: 8 }}>{item.shortcut}</span>}
                            {item.label}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </AppBar>
    );
};

export default MainMenu;
