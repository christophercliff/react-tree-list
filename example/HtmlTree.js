const extend = require('lodash/extend')
const omit = require('lodash/omit')
const PropTypes = require('prop-types')
const React = require('react')
const getExampleTree = require('./getExampleTree')
const getNode = require('../getNode')

class Checkbox extends React.Component {
    static propTypes = {
        indeterminate: PropTypes.bool,
    }

    componentDidMount() {
        this.el.indeterminate = this.props.indeterminate
    }

    componentDidUpdate(prevProps) {
        if (prevProps.indeterminate !== this.props.indeterminate) {
            this.el.indeterminate = this.props.indeterminate
        }
    }

    render() {
        return (
            <input
                {...omit(this.props, 'indeterminate')}
                ref={el => (this.el = el)}
                type="checkbox"
            />
        )
    }
}

const Tree = getExampleTree(
    getNode(
        ({
            ancestors,
            descendents,
            hiddenDescendents,
            isSelected,
            nodeId,
            onEvent,
            selectedDescendents,
            style,
        }) => {
            const hasVisibleDescendents = !hiddenDescendents.equals(descendents)
            return (
                <div
                    style={extend(
                        {
                            borderBottom: 'solid 1px #efefef',
                            marginLeft: `${(ancestors.size + 1) * 2}em`,
                        },
                        style
                    )}
                >
                    <button
                        disabled={descendents.isEmpty()}
                        onClick={() =>
                            onEvent({
                                type: hasVisibleDescendents ? 'hideDescendents' : 'showDescendents',
                            })
                        }
                        style={{
                            fontFamily: 'inherit',
                            marginLeft: '-2.0em',
                            width: '2.0em',
                        }}
                    >
                        {descendents.isEmpty() ? ' ' : hasVisibleDescendents ? '-' : '+'}
                    </button>
                    <Checkbox
                        checked={isSelected}
                        indeterminate={!isSelected && !selectedDescendents.isEmpty()}
                        onChange={() =>
                            onEvent({
                                type: isSelected ? 'deselectNode' : 'selectNode',
                            })
                        }
                        style={{
                            display: 'inline-block',
                            fontSize: 'inherit',
                            marginLeft: '0.50em',
                        }}
                    />
                    <span
                        style={{
                            display: 'inline-block',
                            marginLeft: '0.50em',
                        }}
                    >
                        {nodeId}
                    </span>
                </div>
            )
        }
    )
)

module.exports = class MyTree extends React.PureComponent {
    static displayName = 'HtmlTree'

    render() {
        return (
            <div
                style={{
                    color: '#282c34',
                    fontFamily: 'Source Sans Pro',
                    fontSize: '20px',
                    fontWeight: 600,
                    height: '100vh',
                    left: 0,
                    lineHeight: '29px',
                    margin: 0,
                    overflowY: 'auto',
                    position: 'absolute',
                    top: 0,
                    userSelect: 'none',
                    width: '100vw',
                }}
            >
                <Tree {...this.props} />
            </div>
        )
    }
}
