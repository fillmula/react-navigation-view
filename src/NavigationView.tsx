import React, { Children, FC, cloneElement, isValidElement, useState, useEffect, DependencyList, ReactElement, JSXElementConstructor } from 'react'
import useNavigationStack from './useNavigationStack'

interface NavigationViewProps {
    children: ReactElement | ReactElement[]
}

export interface NavigationPageProps {
    useNavigationTitle(node: ReactElement, dependencies: DependencyList): void
    pushStack(element: ReactElement): void
    popStack(element: string | number): void
}

const NavigationView: FC<NavigationViewProps> = ({ children }) => {
    const { stack, pushStack, popStack } = useNavigationStack(Children.toArray(children) as any)
    //const [titles, setTitles] = useState<ReactElement[]>([])
    const mappedStack = Children.map(stack, (child, index) => {
        const useNavigationTitle = (node: ReactElement, dependencies: DependencyList) => {
            useEffect(() => {
                //const newTitles = [...titles]
                //newTitles[index] = node
                //setTitles(newTitles)
            }, dependencies)
        }
        return cloneElement(child as React.ReactElement<NavigationPageProps>,
                            { useNavigationTitle, pushStack, popStack })
    })
    return <div className="navigation-view">
        <div className="navigation-pages">
            {mappedStack}
        </div>
        <div className="navigation-bar">
            {mappedStack!.map((_, index) => {
                return <div className="navigation-item">
                    {index == 0 ? null : <div className="navigation-back-button">
                        Back
                    </div>}
                    <div className="navigation-title">Title</div>
                    {/* <div className="navigation-title">{titles[index]}</div> */}
                </div>
            })}
        </div>
    </div>
}

export default NavigationView
