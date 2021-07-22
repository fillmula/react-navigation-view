import { useState } from 'react'

interface NavigationPageDescriptor {
    key: string
    component: string
    props?: {[key: string]: any}
}

interface NavigationStackSet {
    stack: NavigationPageDescriptor[]
    pushStack(pageDescriptor: NavigationPageDescriptor): void
    popStack(arg?: number | string): void
}

const useNavigationStack = (
    initial: NavigationPageDescriptor[] = []
): NavigationStackSet => {
    const [stack, setStack] = useState(initial)
    const pushStack = (pageDescriptor: NavigationPageDescriptor) => {
        setStack([...initial, pageDescriptor])
    }
    const popStack = (arg: number | string = 1) => {
        if (typeof arg == 'string') {
            const item = stack.find((item) => item.key == arg)
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
