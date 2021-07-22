import { AppBar, Box, Tab, Tabs, TabsProps } from '@material-ui/core';
import React from 'react';
import TabPanel from '../tab-panel/TabPanel';

export interface ThemeTabItem {
  tabTitle: string;
  tabComponent: JSX.Element;
}

/* eslint-disable-next-line */
export interface ThemeTabsProps {
  tabItems: ThemeTabItem[];
  color?: 'primary' | 'secondary';
  tabVariant?: TabsProps['variant'];
}

export function ThemeTabs({
  tabItems,
  color = 'primary',
  tabVariant = 'fullWidth',
  ...props
}: ThemeTabsProps) {
  const [state, setState] = React.useState(0);

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          width: 550,
          '& .MuiTab-root': {
            color: (theme) => `${theme.palette[color].contrastText} !important`,
          },
        }}
      >
        <AppBar
          sx={{
            bgcolor: (theme) => theme.palette[color].main,
          }}
          position="static"
        >
          <Tabs
            value={state}
            onChange={(event, newValue) => setState(newValue)}
            variant={tabVariant}
            indicatorColor={color === 'primary' ? 'secondary' : 'primary'}
          >
            {tabItems.map(({ tabComponent, tabTitle }, index) => {
              return (
                <Tab
                  sx={{ color: (theme) => theme.palette[color].contrastText }}
                  label={tabTitle}
                  key={index}
                />
              );
            })}
          </Tabs>
        </AppBar>
      </Box>
      {tabItems.map(({ tabComponent, tabTitle }, index) => {
        return (
          <TabPanel value={state} index={index}>
            {tabComponent}
          </TabPanel>
        );
      })}
    </Box>
  );
}

export default ThemeTabs;
