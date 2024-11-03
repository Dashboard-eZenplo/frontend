import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface SidebarListItemProps {
  itemName: string;
  selectedItems: string[];
  handleItemChange: (itemName: string) => void;
}

export default function SidebarListItem({
  itemName,
  selectedItems,
  handleItemChange
}: SidebarListItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton role={undefined} dense onClick={() => handleItemChange(itemName)}>
        <ListItemIcon sx={{ minWidth: '2rem' }}>
          <Checkbox
            edge="start"
            checked={selectedItems.includes(itemName)}
            tabIndex={-1}
            disableRipple
            size="small"
          />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }} primary={itemName} />
      </ListItemButton>
    </ListItem>
  );
}
