import React, { FunctionComponent } from 'react'


export interface NavigationItemComponent extends FunctionComponent {
    isNavigationItem: boolean
}

const NavigationItem: NavigationItemComponent = ({ children }) => {
    return <>{children}</>
}

NavigationItem.isNavigationItem = true

export default NavigationItem
