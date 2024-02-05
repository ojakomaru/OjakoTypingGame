import React, { useState } from 'react';
import { List, Divider, Collapse } from '@mui/material';
import { RouteItem } from './RouteItem';
import { routes } from '../../../Config';
import { Route } from '../../../@types/Route';

export const Routes = () => {
  const [routesState, setRoutesStage] = useState<Route[]>(routes.filter((route) => !!route.isEnabled));

  const handleMenuClick = (route: Route) => {
    const items = routesState.map((item) => {
      const routeItem = item;
      if (item.key === route.key) {
        routeItem.expanded = !item.expanded;
      }
      return routeItem;
    });
    setRoutesStage(items);
  };

  return (
    <React.Fragment>
      <List component="nav" sx={{ height: '100%' }}>
        {routesState.map((route: Route) => (
          <div key={route.key}>
            {route.subRoutes ? (
              <>
                <RouteItem key={`${route.key}`} route={route} hasChildren handleMenuClick={handleMenuClick} />
                <Collapse in={route.expanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {route.subRoutes.map((sRoute: Route) => (
                      <RouteItem key={`${sRoute.key}`} route={sRoute} nested />
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <RouteItem key={route.key} route={route} nested={false} />
            )}
            {route.appendDivider && <Divider />}
          </div>
        ))}
      </List>
    </React.Fragment>
  );
};
