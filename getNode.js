const isEqual = require('lodash/isEqual')
const PropTypes = require('prop-types')
const React = require('react')
const ImmutablePropTypes = require('react-immutable-proptypes')

module.exports = function getNode(WrappedNode) {
    return class Node extends React.Component {
        static displayName = 'Node'
        static propTypes = {
            ancestors: ImmutablePropTypes.list.isRequired,
            descendents: ImmutablePropTypes.set.isRequired,
            descenders: ImmutablePropTypes.list.isRequired,
            disabledDescendents: ImmutablePropTypes.set.isRequired,
            hiddenDescendents: ImmutablePropTypes.set.isRequired,
            isDisabled: PropTypes.bool.isRequired,
            isSelected: PropTypes.bool.isRequired,
            isUnselectable: PropTypes.bool.isRequired,
            onEvent: PropTypes.func.isRequired,
            selectedDescendents: ImmutablePropTypes.set.isRequired,
            style: PropTypes.object,
        }

        onEvent = options => {
            this.props.onEvent({
                ...this.props,
                ...options,
            })
        }

        shouldComponentUpdate(nextProps) {
            return (
                nextProps.isDisabled !== this.props.isDisabled ||
                nextProps.isSelected !== this.props.isSelected ||
                nextProps.isUnselectable !== this.props.isUnselectable ||
                !nextProps.ancestors.equals(this.props.ancestors) ||
                !nextProps.descendents.equals(this.props.descendents) ||
                !nextProps.descenders.equals(this.props.descenders) ||
                !nextProps.disabledDescendents.equals(this.props.disabledDescendents) ||
                !nextProps.hiddenDescendents.equals(this.props.hiddenDescendents) ||
                !nextProps.selectedDescendents.equals(this.props.selectedDescendents) ||
                !isEqual(nextProps.style, this.props.style)
            )
        }

        render() {
            return <WrappedNode {...this.props} onEvent={this.onEvent} />
        }
    }
}
