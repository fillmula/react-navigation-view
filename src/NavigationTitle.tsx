import React, { FunctionComponent } from 'react'


export interface NavigationTitleComponent extends FunctionComponent {
    isNavigationTitle: boolean
}

const NavigationTitle: NavigationTitleComponent = ({ children }) => {
    return <>{children}</>
}

NavigationTitle.isNavigationTitle = true

export default NavigationTitle
