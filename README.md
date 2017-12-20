# react-tree-list

A higher-order React Component for developing tree list UIs. The API is composable and extensible.
Renders are performant up to 1000s of nodes.

## Demo

:point_right: [christophercliff.com/react-tree-list/](https://christophercliff.com/react-tree-list/)

## Usage

```jsx
const { Map } = require('immutable')
const getTree = require('react-tree-list/getTree')
const getNode = require('react-tree-list/getNode')

const Tree = getTree(getNode(({ nodeId, onEvent }) => <div onClick={onEvent}>{nodeId}</div>))
class MyTree extends React.Component {
    render() {
        return (
            <Tree
                childParentMap={
                    new Map({
                        a: undefined,
                        b: 'a',
                        c: 'b',
                    })
                }
                onEvent={({ nodeId }) => console.log(`clicked: ${nodeId}`)}
            />
        )
    }
}
```

## Example

See https://github.com/christophercliff/react-tree-list/tree/master/example. Run locally with `make
webd`.
