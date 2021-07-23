import { useState, ReactElement } from 'react'


interface NavigationStackSet {
    stack: ReactElement | ReactElement[]
    pushStack(element: ReactElement): void
    popStack(arg?: number | string): void
}

const useNavigationStack = (
    initial: ReactElement | ReactElement[] = []
): NavigationStackSet => {
    if (!Array.isArray(initial)) {
        initial = [initial]
    }
    const [stack, setStack] = useState(initial)
    const pushStack = (element: ReactElement) => {
        setStack([...initial as ReactElement[], element])
    }
    const popStack = (arg: number = 1) => {
        if (typeof arg == 'string') {
            const item = stack.find((item) => item.props.key == arg)
            if (item) {
                const index = stack.indexOf(item)
                setStack(stack.slice(0, index + 1))
            }
        } else if (typeof arg == 'number') {
            setStack(stack.slice(0, stack.length - 1))
        }
    }
    return { stack, pushStack, popStack }
}

export default useNavigationStack
