import useHeadStyleInjection from "react-use-head-style-injection"

const useInjectNavigationViewCSS = useHeadStyleInjection(
    '__react-navigation-view',
    `
    @keyframes __rnv-page-push-in {
        0% {
            transform: translate(100%, 0);
        }
        100% {
            transform: translate(0, 0);
        }
    }

    @keyframes __rnv-page-push-out {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(100%, 0);
        }
    }

    @keyframes __rnv-navigation-item-show {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes __rnv-navigation-item-hide {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes __rnv-title-right-in {
        0% {
            transform: translate(100%, 0);
        }
        100% {
            transform: translate(0, 0);
        }
    }

    @keyframes __rnv-title-right-out {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(100%, 0);
        }
    }

    @keyframes __rnv-title-left-in {
        0% {
            transform: translate(-100%, 0);
        }
        100% {
            transform: translate(0, 0);
        }
    }

    @keyframes __rnv-title-left-out {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(-100%, 0);
        }
    }

    .__rnv-navigation-view {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .__rnv-navigation-pages {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .__rnv-navigation-page {
        padding-top: 44px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgb(250, 250, 252);
        transition: transform 0.3s ease-in-out 0s;
    }

    .__rnv-navigation-page > * {
        min-height: 100%;
    }

    .__rnv-navigation-page.__rnv-position-top.__rnv-enter {
        animation: 0.3s ease-in-out 0s __rnv-page-push-in forwards;
    }

    .__rnv-navigation-page.__rnv-position-top.__rnv-leave {
        animation: 0.3s ease-in-out 0s __rnv-page-push-out forwards;
    }

    .__rnv-navigation-page.__rnv-position-top {
        transform: translate(0, 0);
    }

    .__rnv-navigation-page.__rnv-position-middle {
        pointer-events: none;
        transform: translate(-38.2%, 0);
    }

    .__rnv-navigation-page.__rnv-position-bottom {
        pointer-events: none;
        transform: translate(-38.2%, 0);
    }

    .__rnv-navigation-bar {
        position: absolute;
        background-color: white;
        height: 44px;
        left: 0;
        top: 0;
        right: 0;
        border-bottom: 0.5px solid #ccc;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
    }

    .__rnv-navigation-item {
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

    .__rnv-navigation-item.__rnv-position-top.__rnv-enter {
        animation: 0.3s ease-in-out 0s __rnv-navigation-item-show forwards;
    }

    .__rnv-navigation-item.__rnv-position-top.__rnv-leave {
        animation: 0.3s ease-in-out 0s __rnv-navigation-item-hide forwards;
    }

    .__rnv-navigation-item.__rnv-position-top.__rnv-enter .__rnv-navigation-title {
        animation: 0.3s ease-in-out 0s __rnv-title-right-in forwards;
    }

    .__rnv-navigation-item.__rnv-position-top.__rnv-leave .__rnv-navigation-title {
        animation: 0.3s ease-in-out 0s __rnv-title-right-out forwards;
    }

    .__rnv-navigation-item.__rnv-position-middle .__rnv-navigation-title {
        transform: translate(-50%, 0);
    }

    .__rnv-navigation-item.__rnv-position-bottom .__rnv-navigation-title {
        transform: translate(-50%, 0);
    }

    .__rnv-navigation-left-items {
        position: absolute;
        left: 8px;
        display: flex;
        flex-direction: row;
    }

    .__rnv-navigation-right-items {
        position: absolute;
        right: 8px;
        display: flex;
        flex-direction: row-reverse;
    }

    .__rnv-navigation-back-button {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 17px;
        color: #007aff;
    }

    .__rnv-navigation-title {
        width: 50%;
        text-align: center;
        font-size: 17px;
        font-weight: 500;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        transition: transform 0.3s ease-in-out 0s;
    }
    `)

export default useInjectNavigationViewCSS
