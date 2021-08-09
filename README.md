# React Navigation View

React navigation stack UI for the web. This is inspired by SwiftUI's `NavigationView`.

# Example

# Usage

## Wrap your component into `NavigationView`

```tsx
<NavigationView>
    <YourCustomPageComponent />
</NavigationView>
```

## Declare wrapped component like this

```tsx
import { NavigationPageProps } from 'react-navigation-view'

interface MyCustomComponentProps extends Partial<NavigationPageProps> { }

const MyCustomComponent: FC<MyCustomComponentProps> = ({
    useNavigationTitle,
    useLeftNavigationItems,
    useRightNavigationItems,
    pushStack,
    popStack
}) => {
    useNavigationTitle("My Custom Component", [])
    return <>...</>
}
```

## Documentation

### Navigation Page

```tsx
export interface NavigationPageProps {
    useNavigationTitle(node: ReactNode, dependencies: DependencyList): void;
    useLeftNavigationItems(node: ReactNode, dependencies: DependencyList): void;
    useRightNavigationItems(node: ReactNode, dependencies: DependencyList): void;
    pushStack(element: ReactElement): void;
    popStack(element: string | number): void;
}
```

### Navigation View

React navigation view is quite simple and self described.

```tsx
interface NavigationViewProps {
    backElement?: ReactChild;
    backElementActionName?: string;
    defaultBackButtonTitle?: string;
    navigationViewStyle?: CSSProperties;
    navigationPagesStyle?: CSSProperties;
    navigationPageStyle?: CSSProperties;
    navigationBarStyle?: CSSProperties;
    navigationItemStyle?: CSSProperties;
    navigationLeftItemsStyle?: CSSProperties;
    navigationTitleStyle?: CSSProperties;
    navigationRightItemsStyle?: CSSProperties;
    navigationViewClass?: string;
    navigationPagesClass?: string;
    navigationPageClass?: string;
    navigationBarClass?: string;
    navigationItemClass?: string;
    navigationLeftItemsClass?: string;
    navigationTitleClass?: string;
    navigationRightItemsClass?: string;
    children: ReactElement | ReactElement[];
}
```

## Install

Install with `npm`.

```sh
npm i react-navigation-view
```

## Author

React Navigation View is authored by Victor Teo.

## License

MIT License

Copyright (c) 2021 Fillmula Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
