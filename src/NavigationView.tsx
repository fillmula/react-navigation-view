import React, {
    Children,
    FunctionComponent,
    isValidElement,
    ReactChild
} from 'react'
import { NavigationItemComponent } from './NavigationItem'


const NavigationView: FunctionComponent = ({ children }) => {
    const childrenArray = Children.toArray(children)
    const pages: ReactChild[] = []
    const items: ReactChild[] = []
    childrenArray.forEach((item) => {
        if (!isValidElement(item)) return
        const itemChildrenArray = Children.toArray(item.props.children)
        const newItemChildren: ReactChild[] = []
        itemChildrenArray.forEach((itemChild) => {
            if (!isValidElement(itemChild)) return
            const itemChildType = itemChild.type as NavigationItemComponent
            if (itemChildType.isNavigationItem) {
                items.push(itemChild)
            } else {
                newItemChildren.push(itemChild)
            }
        })
        let newProps = item.props
        newProps.children = newItemChildren
        pages.push({ type: item.type, props: newProps, key: item.key })
    })
    return <div className="navigation-view">
        <div className="navigation-pages">
            {pages}
        </div>
        <div className="navigation-bar">
            {items}
        </div>
        {Children.map(children, (child, index) => {
            childrenArray
            return <div className="navigation-pages"></div>
        })}
    </div>
}

export default NavigationView
