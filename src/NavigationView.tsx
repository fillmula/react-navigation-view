import React, { Children, FC, cloneElement, isValidElement, useState, useEffect, DependencyList, ReactElement, JSXElementConstructor } from 'react'
import useNavigationStack from './useNavigationStack'
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
    const { stack, pushStack, popStack } = useNavigationStack(Children.toArray(children) as any)
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
    return <div className="__runs-navigation-view">
        <div className="__runs-navigation-pages">
            {mappedStack!.map((stackItem, index) => {
                let position: string
                if (index === mappedStack.length - 1) {
                    position = 'top'
                    if (index === 0) {
                        position += '-only'
                    }
                } else if (index === 0) {
                    position = 'bottom'
                } else {
                    position = 'middle'
                }
                return <div className={`__runs-navigation-page __runs-position-${position}`} key={index}>
                    {stackItem}
                </div>
            })}
        </div>
        <div className="__runs-navigation-bar">
            {mappedStack!.map((child, index) => {

                return <div className="__runs-navigation-item" key={index}>
                    {index == 0 ? null : <div className="__runs-navigation-back-button"
                                              onClick={() => {child.props.popStack(1)}}>
                        <BackChevron />{defaultBackButtonTitle}
                    </div>}
                    <div className="__runs-navigation-title">{titles[index]}</div>
                </div>
            })}
        </div>
    </div>
}

export default NavigationView
