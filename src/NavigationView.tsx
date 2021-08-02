import React, {
    FC, Children, ReactElement, ReactNode, ReactChild, DependencyList,
    CSSProperties, cloneElement, useState, useEffect
} from 'react'
import useNavigationStack, { NavigationPageStatus } from './useNavigationStack'
import useInjectNavigationViewCSS from './useInjectNavigationViewCSS'
import BackChevron from './BackChevron'

interface NavigationViewProps {
    backElement?: ReactChild
    defaultBackButtonTitle?: string
    navigationViewStyle?: CSSProperties
    navigationPagesStyle?: CSSProperties
    navigationPageStyle?: CSSProperties
    navigationBarStyle?: CSSProperties
    navigationItemStyle?: CSSProperties
    navigationLeftItemsStyle?: CSSProperties
    navigationTitleStyle?: CSSProperties
    navigationRightItemsStyle?: CSSProperties
    navigationViewClass?: string
    navigationPagesClass?: string
    navigationPageClass?: string
    navigationBarClass?: string
    navigationItemClass?: string
    navigationLeftItemsClass?: string
    navigationTitleClass?: string
    navigationRightItemsClass?: string
    children: ReactElement | ReactElement[]
}

export interface NavigationPageProps {
    useNavigationTitle(node: ReactNode, dependencies: DependencyList): void
    useLeftNavigationItems(node: ReactNode, dependencies: DependencyList): void
    useRightNavigationItems(node: ReactNode, dependencies: DependencyList): void
    pushStack(element: ReactElement): void
    popStack(element: string | number): void
}

const NavigationView: FC<NavigationViewProps> = (props) => {
    const children = props.children
    const navigationViewStyle = props.navigationViewStyle
    const navigationPagesStyle = props.navigationPagesStyle
    const navigationPageStyle = props.navigationPageStyle
    const navigationBarStyle = props.navigationBarStyle
    const navigationItemStyle = props.navigationItemStyle
    const navigationLeftItemsStyle = props.navigationLeftItemsStyle
    const navigationTitleStyle = props.navigationTitleStyle
    const navigationRightItemsStyle = props.navigationRightItemsStyle
    const navigationViewClass = props.navigationViewClass
    const navigationPagesClass = props.navigationPagesClass
    const navigationPageClass = props.navigationPageClass
    const navigationBarClass = props.navigationBarClass
    const navigationItemClass = props.navigationItemClass
    const navigationLeftItemsClass = props.navigationLeftItemsClass
    const navigationTitleClass = props.navigationTitleClass
    const navigationRightItemsClass = props.navigationRightItemsClass
    const backElement = props.backElement
    const defaultBackButtonTitle = props.defaultBackButtonTitle ?? "Back"
    const passingProps: any = Object.assign({}, props)
    delete passingProps['children']
    delete passingProps['navigationViewStyle']
    delete passingProps['navigationPagesStyle']
    delete passingProps['navigationPageStyle']
    delete passingProps['navigationBarStyle']
    delete passingProps['navigationItemStyle']
    delete passingProps['navigationLeftItemsStyle']
    delete passingProps['navigationTitleStyle']
    delete passingProps['navigationRightItemsStyle']
    delete passingProps['navigationViewClass']
    delete passingProps['navigationPagesClass']
    delete passingProps['navigationPageClass']
    delete passingProps['navigationBarClass']
    delete passingProps['navigationItemClass']
    delete passingProps['navigationLeftItemsClass']
    delete passingProps['navigationTitleClass']
    delete passingProps['navigationRightItemsClass']
    delete passingProps['backElement']
    delete passingProps['defaultBackButtonTitle']
    useInjectNavigationViewCSS()
    const { stack, status, pushStack, popStack } = useNavigationStack(Children.toArray(children) as any)
    const animationClass = (val: number) => {
        switch (val) {
            case NavigationPageStatus.Enter: {
                return ' __rnv-enter'
            }
            case NavigationPageStatus.Leave: {
                return ' __rnv-leave'
            }
            case NavigationPageStatus.Static: {
                return ''
            }
            default: {
                return ''
            }
        }
    }
    const [titles, setTitles] = useState<ReactNode[]>([])
    const [leftItems, setLeftItems] = useState<ReactNode[]>([])
    const [rightItems, setRightItems] = useState<ReactNode[]>([])
    const mappedStack = Children.map(stack, (child, index) => {
        const useNavigationTitle = (node: ReactNode, dependencies: DependencyList) => {
            useEffect(() => {
                const newTitles = [...titles]
                newTitles[index] = node
                setTitles(newTitles)
            }, dependencies)
        }
        const useLeftNavigationItems = (node: ReactNode, dependencies: DependencyList) => {
            useEffect(() => {
                const newItems = [...leftItems]
                newItems[index] = node
                setLeftItems(newItems)
            }, dependencies)
        }
        const useRightNavigationItems = (node: ReactNode, dependencies: DependencyList) => {
            useEffect(() => {
                const newItems = [...rightItems]
                newItems[index] = node
                setRightItems(newItems)
            }, dependencies)
        }
        return cloneElement(child as React.ReactElement<NavigationPageProps>,
                            { useNavigationTitle,
                              useLeftNavigationItems,
                              useRightNavigationItems,
                              pushStack, popStack, key: index,
                              ...passingProps })
    })
    let activeIndex = status.findIndex((s) => s === NavigationPageStatus.Leave) - 1
    if (activeIndex < 0) {
        activeIndex = mappedStack.length - 1
    }
    return <div className={`__rnv-navigation-view${navigationViewClass ? ` ${navigationViewClass}` : ''}`} style={navigationViewStyle}>
        <div className={`__rnv-navigation-pages${navigationPagesClass ? ` ${navigationPagesClass}` : ''}`} style={navigationPagesStyle}>
            {mappedStack!.map((stackItem, index) => {
                let position: string
                if (index >= activeIndex) {
                    position = 'top'
                } else if (index === 0) {
                    position = 'bottom'
                } else {
                    position = 'middle'
                }
                return <div className={`__rnv-navigation-page __rnv-position-${position}` + animationClass(status[index]) + (navigationPageClass ? ` ${navigationPageClass}` : '')} key={index} style={navigationPageStyle}>
                    {stackItem}
                </div>
            })}
        </div>
        <div className={`__rnv-navigation-bar${navigationBarClass ? ` ${navigationBarClass}` : ''}`} style={navigationBarStyle}>
            {mappedStack!.map((child, index) => {
                let position: string
                if (index >= activeIndex) {
                    position = 'top'
                } else if (index === 0) {
                    position = 'bottom'
                } else {
                    position = 'middle'
                }
                return <div className={`__rnv-navigation-item __rnv-position-${position}` + animationClass(status[index]) + (navigationItemClass ? ` ${navigationItemClass}` : '')} key={index} style={navigationItemStyle}>
                    <div className={`__rnv-navigation-left-items${index === 0 ? '': ' __rnv-has-back-button'}${navigationLeftItemsClass ? ` ${navigationLeftItemsClass}` : ''}`} style={navigationLeftItemsStyle}>
                        {index == 0 ? null : (backElement ?? <div className="__rnv-navigation-back-button"
                                                                  onClick={() => {child.props.popStack(1)}}>
                            <BackChevron />{defaultBackButtonTitle}
                        </div>)}
                        {leftItems[index]}
                    </div>
                    <div className={`__rnv-navigation-title${navigationTitleClass ? ` ${navigationTitleClass}`: ''}`} style={navigationTitleStyle}>{titles[index]}</div>
                    <div className={`__rnv-navigation-right-items${navigationRightItemsClass ? ` ${navigationRightItemsClass}` : ''}`} style={navigationRightItemsStyle}>
                        {rightItems[index]}
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default NavigationView
