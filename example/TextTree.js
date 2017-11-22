const React = require('react')
const getNode = require('../getNode')
const getExampleTree = require('./getExampleTree')

const colorPurple = '#c5a5c5'
const colorBlue = '#79b6f2'
const colorGreen = '#5fb3b3'
const colorWhite = '#fff'
const a = '├── '
const b = '└── '
const c = '│   '
const d = '    '
const Tree = getExampleTree(
    getNode(
        ({
            descendents,
            descenders,
            hiddenDescendents,
            isLastChild,
            isSelected,
            nodeId,
            onEvent,
            selectedDescendents,
            style,
        }) => {
            const hasVisibleDescendents = !hiddenDescendents.equals(descendents)
            return (
                <div style={style}>
                    <span>
                        {descenders
                            .map((hasDescender, i, list) => (
                                <span key={i} style={{ color: colorPurple }}>
                                    {(() => {
                                        if (hasDescender) {
                                            if (i === list.size - 1) {
                                                if (isLastChild) return b
                                                return a
                                            }
                                            return c
                                        }
                                        return d
                                    })()}
                                </span>
                            ))
                            .valueSeq()}
                    </span>
                    <span
                        style={{
                            fontFamily: 'Roboto Mono',
                            fontWeight: 500,
                        }}
                    >
                        {!descendents.isEmpty() ? (
                            <span>
                                <span
                                    onClick={() =>
                                        onEvent({
                                            type: hasVisibleDescendents
                                                ? 'hideDescendents'
                                                : 'showDescendents',
                                        })
                                    }
                                    style={{
                                        color: colorBlue,
                                        cursor: 'pointer',
                                    }}
                                >
                                    {hasVisibleDescendents ? '-' : '+'}
                                </span>{' '}
                            </span>
                        ) : (
                            <span style={{ color: colorPurple }}>{'- '}</span>
                        )}
                        <span
                            onClick={() =>
                                onEvent({
                                    type: isSelected ? 'deselectNode' : 'selectNode',
                                })
                            }
                            style={{
                                color: colorGreen,
                                cursor: 'pointer',
                            }}
                        >
                            [{(() => {
                                if (isSelected) return 'x'
                                if (!selectedDescendents.isEmpty()) return '-'
                                return ' '
                            })()}]{' '}
                        </span>
                        <span>{nodeId}</span>
                    </span>
                </div>
            )
        }
    )
)

module.exports = class MyTree extends React.PureComponent {
    static displayName = 'TextTree'

    render() {
        return (
            <pre
                style={{
                    backgroundColor: '#282c34',
                    color: colorWhite,
                    fontSize: '20px',
                    height: '100vh',
                    left: 0,
                    lineHeight: '1.5em',
                    margin: 0,
                    overflowY: 'auto',
                    position: 'absolute',
                    top: 0,
                    userSelect: 'none',
                    width: '100vw',
                }}
            >
                <Tree {...this.props} />
            </pre>
        )
    }
}
