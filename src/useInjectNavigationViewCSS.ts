import useHeadStyleInjection from "./useHeadStyleInjection"

const useInjectNavigationViewCSS = useHeadStyleInjection(
    '__react-use-navigation-stack',
    `
    @keyframes __runs-page-push-in {
        0% {
            opacity: 0;
            transform: translate(100%, 0);
        }
        100% {
            opacity: 1;
            transform: translate(0, 0);
        }
    }

    .__runs-navigation-view {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .__runs-navigation-pages {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .__runs-navigation-page {
        padding-top: 44px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgb(250, 250, 252);
        transition: transform 0.3s ease-in-out 0s;
    }

    .__runs-navigation-page > * {
        min-height: 100%;
    }

    .__runs-navigation-page.__runs-position-top-only {
        transform: translate(0, 0);
    }

    .__runs-navigation-page.__runs-position-top {
        animation: 0.3s ease-in-out 0s __runs-page-push-in forwards;
        transform: translate(0, 0);
    }

    .__runs-navigation-page.__runs-position-middle {
        pointer-events: none;
        transform: translate(-38.2%, 0);
    }

    .__runs-navigation-page.__runs-position-bottom {
        pointer-events: none;
        transform: translate(-38.2%, 0);
    }

    .__runs-navigation-bar {
        position: absolute;
        background-color: white;
        height: 44px;
        left: 0;
        top: 0;
        right: 0;
        border-bottom: 0.5px solid #ccc;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
    }

    .__runs-navigation-item {
        position: absolute;
        background-color: white;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .__runs-navigation-back-button {
        position: absolute;
        display: flex;
        align-items: center;
        left: 8px;
        cursor: pointer;
        font-size: 17px;
        color: #007aff;
    }

    .__runs-navigation-title {
        font-size: 17px;
        font-weight: 500;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    `)

export default useInjectNavigationViewCSS
