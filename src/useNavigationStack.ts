import { useState, ReactElement } from 'react'

export enum NavigationPageStatus {
    Static = 1,
    Enter = 2,
    Leave = 3
}

interface NavigationStackSet {
    stack: ReactElement | ReactElement[]
    status: NavigationPageStatus[]
    pushStack(element: ReactElement): void
    popStack(arg?: number | string): void
}

const useNavigationStack = (
    initial: ReactElement | ReactElement[] = [],
    duration: number = 0.3
): NavigationStackSet => {
    if (!Array.isArray(initial)) {
        initial = [initial]
    }
    const [stack, setStack] = useState(initial)
    const [status, setStatus] = useState<NavigationPageStatus[]>(Array(initial.length).fill(NavigationPageStatus.Static))
    const pushStack = (element: ReactElement) => {
        setStatus([...status, NavigationPageStatus.Enter])
        setStack([...stack as ReactElement[], element])
        setTimeout(() => {
            setStatus([...status, NavigationPageStatus.Static])
        }, duration * 1000)
    }
    const popStack = (arg: string | number = 1) => {
        let index: number = -1
        if (typeof arg == 'string') {
            const item = stack.find((item) => item.props.key == arg)
            if (item) {
                index = stack.indexOf(item)
            }
        } else if (typeof arg == 'number') {
            index = stack.length - 1 - arg
        }
        const newStatus = status.map((s, i) => {
            if (i > index) {
                return NavigationPageStatus.Leave
            } else {
                return s
            }
        })
        setStatus(newStatus)
        setTimeout(() => {
            setStatus(status.slice(0, index + 1))
            setStack(stack.slice(0, index + 1))
        }, duration * 1000)
    }
    return { stack, status, pushStack, popStack }
}

export default useNavigationStack
