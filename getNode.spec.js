const { mount } = require('enzyme')
const { List, Set } = require('immutable')
const noop = require('lodash/noop')
const React = require('react')
const getNode = require('./getNode')

describe('getNode()', function() {
    let options

    beforeEach(function() {
        options = {
            ancestors: new List([]),
            descendents: new Set([]),
            descenders: new List([]),
            disabledDescendents: new Set([]),
            hiddenDescendents: new Set([]),
            isDisabled: false,
            isSelected: false,
            isUnselectable: false,
            onEvent: noop,
            selectedDescendents: new Set([]),
            style: {},
        }
    })

    it('should get the node', function() {
        const Node = getNode(() => <div />)
        mount(<Node {...options} />)
    })
})
