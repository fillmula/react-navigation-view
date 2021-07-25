import { useEffect } from "react"

const useHeadStyleInjection = (id: string, content: string) => {
    return function() {
        useEffect(() => {
            let style = document.head.querySelector(`style${id}`)
            if (style) return
            style = document.createElement("style")
            style.id = id
            style.innerHTML = content
            document.head.appendChild(style)
        }, [])
    }
}

export default useHeadStyleInjection
