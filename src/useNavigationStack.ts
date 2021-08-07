import { useState, ReactElement, useRef } from 'react'
import { pushStateRecord, removeStateRecord } from 'react-backable'

export enum NavigationPageStatus {
    Static = 1,
    Enter = 2,
    Leave = 3
}

interface NavigationStackSet {
    stack: ReactElement[]
    status: NavigationPageStatus[]
    pushStack(element: ReactElement): void
    popStack(arg?: number | string): void
}

const useNavigationStack = (
    backableKey: string,
    initial: ReactElement | ReactElement[] = [],
    duration: number = 0.3,
): NavigationStackSet => {
    if (!Array.isArray(initial)) {
        initial = [initial]
    }
    const [stack, setStack] = useState(initial)
    const [status, setStatus] = useState<NavigationPageStatus[]>(Array(initial.length).fill(NavigationPageStatus.Static))
    const stackRef = useRef<ReactElement[]>()
    stackRef.current = stack
    const statusRef = useRef<NavigationPageStatus[]>()
    statusRef.current = status
    const pushStack = (element: ReactElement) => {
        setStatus([...statusRef.current!, NavigationPageStatus.Enter])
        setStack([...stackRef.current! as ReactElement[], element])
        pushStateRecord(`${backableKey}.${stackRef.current!.length}.pop`,
                        () => popStack())
        setTimeout(() => {
            const newStatus = [...statusRef.current!]
            newStatus.splice(newStatus.length - 1, 1)
            setStatus([...newStatus, NavigationPageStatus.Static])
        }, duration * 1000)
    }
    const popStack = (arg: string | number = 1) => {
        let index: number = -1
        if (typeof arg == 'string') {
            const item = stackRef.current!.find((item) => item.props.key == arg)
            if (item) {
                index = stackRef.current!.indexOf(item)
            }
        } else if (typeof arg == 'number') {
            index = stackRef.current!.length - 1 - arg
        }
        const newStatus = statusRef.current!.map((s, i) => {
            if (i > index) {
                removeStateRecord(`${backableKey}.${i}.pop`)
                return NavigationPageStatus.Leave
            } else {
                return s
            }
        })
        setStatus(newStatus)
        setTimeout(() => {
            setStatus(statusRef.current!.slice(0, index + 1))
            setStack(stackRef.current!.slice(0, index + 1))
        }, duration * 1000)
    }
    return { stack, status, pushStack, popStack }
}

export default useNavigationStack
