const { Map, Set } = require('immutable')
const get = require('lodash/get')
const isEmpty = require('lodash/isEmpty')
const keyBy = require('lodash/keyBy')
const map = require('lodash/map')
const random = require('lodash/random')
const range = require('lodash/range')
const shuffle = require('lodash/shuffle')
const React = require('react')
const HtmlTree = require('./HtmlTree')
const TextTree = require('./TextTree')

const nodeCounts = [50, 100, 500, 1000, 5000]
const modes = keyBy(['text', 'html'])

module.exports = class MyTree extends React.PureComponent {
    static displayName = 'App'
    constructor(props) {
        super(props)
        const nodeCount = get(nodeCounts, 3)
        this.state = {
            childParentMap: getRandomChildParentMap(nodeCount),
            hiddenNodes: new Set(),
            mode: modes.text,
            nodeCount,
            selectedNodes: new Set(),
        }
    }

    onChangeMode = mode => {
        this.setState({ mode })
    }

    onChangeNodeCount = nodeCount => {
        this.setState({
            childParentMap: getRandomChildParentMap(nodeCount),
            hiddenNodes: new Set(),
            nodeCount,
            selectedNodes: new Set(),
        })
    }

    onChangeTree = ({ hiddenNodes, selectedNodes }) => {
        this.setState({
            hiddenNodes: hiddenNodes ? hiddenNodes : this.state.hiddenNodes,
            selectedNodes: selectedNodes ? selectedNodes : this.state.selectedNodes,
        })
    }

    render() {
        return (
            <div>
                {this.state.mode === modes.text ? (
                    <TextTree
                        childParentMap={this.state.childParentMap}
                        hiddenNodes={this.state.hiddenNodes}
                        onChange={this.onChangeTree}
                        selectedNodes={this.state.selectedNodes}
                    />
                ) : (
                    <HtmlTree
                        childParentMap={this.state.childParentMap}
                        hiddenNodes={this.state.hiddenNodes}
                        onChange={this.onChangeTree}
                        selectedNodes={this.state.selectedNodes}
                    />
                )}
                <div
                    style={{
                        fontFamily: 'Roboto Mono',
                        fontWeight: 500,
                        left: '50%',
                        position: 'fixed',
                        top: 10,
                        transform: 'translateX(-50%)',
                    }}
                >
                    {map(modes, mode => (
                        <button
                            disabled={mode === this.state.mode}
                            key={mode}
                            onClick={() => this.onChangeMode(mode)}
                            style={{ fontFamily: 'inherit' }}
                        >
                            {mode}
                        </button>
                    ))}
                    {'  '}
                    {map(nodeCounts, nodeCount => (
                        <button
                            disabled={nodeCount === this.state.nodeCount}
                            key={nodeCount}
                            onClick={() => this.onChangeNodeCount(nodeCount)}
                            style={{ fontFamily: 'inherit' }}
                        >
                            {nodeCount}
                        </button>
                    ))}{' '}
                    <a
                        href="https://github.com/christophercliff/react-tree-list"
                        style={{ color: '#79b6f2' }}
                    >
                        GitHub
                    </a>
                </div>
            </div>
        )
    }
}

function getRandomChildParentMap(n) {
    const dst = shuffle(range(n))
    const src = []
    let childParentMap = new Map()
    let a
    let b
    src.push(dst.pop())
    childParentMap = childParentMap.set(src[0].toString())
    while (!isEmpty(dst)) {
        a = src[random(src.length - 1)]
        b = dst.pop()
        childParentMap = childParentMap.set(b.toString(), a.toString())
        src.push(b)
    }
    return childParentMap
}
