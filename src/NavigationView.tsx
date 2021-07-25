import React, { Children, FC, cloneElement, useState, useEffect, DependencyList, ReactElement, JSXElementConstructor } from 'react'
import useNavigationStack, { NavigationPageStatus } from './useNavigationStack'
import useInjectNavigationViewCSS from './useInjectNavigationViewCSS'
import BackChevron from './BackChevron'

interface NavigationViewProps {
    defaultBackButtonTitle?: string
    children: ReactElement | ReactElement[]
}

export interface NavigationPageProps {
    useNavigationTitle(node: ReactElement, dependencies: DependencyList): void
    pushStack(element: ReactElement): void
    popStack(element: string | number): void
}

const NavigationView: FC<NavigationViewProps> = ({
    children, defaultBackButtonTitle = "Back"
}) => {
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
    const [titles, setTitles] = useState<ReactElement[]>([])
    const mappedStack = Children.map(stack, (child, index) => {
        const useNavigationTitle = (node: ReactElement, dependencies: DependencyList) => {
            useEffect(() => {
                const newTitles = [...titles]
                newTitles[index] = node
                setTitles(newTitles)
            }, dependencies)
        }
        return cloneElement(child as React.ReactElement<NavigationPageProps>,
                            { useNavigationTitle, pushStack, popStack, key: index })
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
                return <div className={`__rnv-navigation-page __rnv-position-${position}` + animationClass(status[index])} key={index}>
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
                    {index == 0 ? null : <div className="__rnv-navigation-back-button"
                                              onClick={() => {child.props.popStack(1)}}>
                        <BackChevron />{defaultBackButtonTitle}
                    </div>}
                    <div className="__rnv-navigation-title">{titles[index]}</div>
                </div>
            })}
        </div>
    </div>
}

export default NavigationView
