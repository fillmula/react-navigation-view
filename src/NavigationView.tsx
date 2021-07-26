import React, {
    FC, Children, ReactElement, ReactNode, DependencyList,
    cloneElement, useState, useEffect
} from 'react'
import useNavigationStack, { NavigationPageStatus } from './useNavigationStack'
import useInjectNavigationViewCSS from './useInjectNavigationViewCSS'
import BackChevron from './BackChevron'

interface NavigationViewProps {
    defaultBackButtonTitle?: string
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
    const defaultBackButtonTitle = props.defaultBackButtonTitle ?? "Back"
    const passingProps: any = Object.assign({}, props)
    delete passingProps['children']
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
                              pushStack, popStack, key: index })
    })
    let activeIndex = status.findIndex((s) => s === NavigationPageStatus.Leave) - 1
    if (activeIndex < 0) {
        activeIndex = mappedStack.length - 1
    }
    return <div className="__rnv-navigation-view">
        <div className="__rnv-navigation-pages">
            {mappedStack!.map((stackItem, index) => {
                let position: string
                if (index >= activeIndex) {
                    position = 'top'
                } else if (index === 0) {
                    position = 'bottom'
                } else {
                    position = 'middle'
                }
                return <div className={`__rnv-navigation-page __rnv-position-${position}` + animationClass(status[index])} key={index} {...passingProps}>
                    {stackItem}
                </div>
            })}
        </div>
        <div className="__rnv-navigation-bar">
            {mappedStack!.map((child, index) => {
                let position: string
                if (index >= activeIndex) {
                    position = 'top'
                } else if (index === 0) {
                    position = 'bottom'
                } else {
                    position = 'middle'
                }
                return <div className={`__rnv-navigation-item __rnv-position-${position}` + animationClass(status[index])} key={index}>
                    <div className={`__rnv-navigation-left-items${index > 0 ? '': ' __rnv-has-back-button'}`}>
                        {index == 0 ? null : <div className="__rnv-navigation-back-button"
                                                  onClick={() => {child.props.popStack(1)}}>
                            <BackChevron />{defaultBackButtonTitle}
                        </div>}
                        {leftItems[index]}
                    </div>
                    <div className="__rnv-navigation-title">{titles[index]}</div>
                    <div className="__rnv-navigation-right-items">
                        {rightItems[index]}
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default NavigationView
