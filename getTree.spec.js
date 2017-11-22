const { expect } = require('chai')
const { mount } = require('enzyme')
const { Map, Set } = require('immutable')
const React = require('react')
const getNode = require('./getNode')
const getTree = require('./getTree')

describe('getTree()', function() {
    const Node = getNode(() => <div />)
    let options

    beforeEach(function() {
        options = {
            childParentMap: this.childParentMap,
            disabledNodes: new Set(),
            hiddenNodes: new Set(),
            nodePropsMap: new Map({
                a0: new Map({ name: 'A0' }),
                a1: new Map({ name: 'A1' }),
                b1: new Map({ name: 'B1' }),
                a2: new Map({ name: 'A2' }),
                b2: new Map({ name: 'B2' }),
                c2: new Map({ name: 'C2' }),
                d2: new Map({ name: 'D2' }),
                a3: new Map({ name: 'A3' }),
                b3: new Map({ name: 'B3' }),
            }),
            selectedNodes: new Set(),
            unselectableNodes: new Set(),
        }
    })

    it('should pass on the node props', function() {
        const Tree = getTree(Node)
        const wrapper = mount(<Tree {...options} />)
        const firstNodeWrapper = wrapper.find(Node).first()
        expect(firstNodeWrapper.prop('name')).to.equal('A0')
    })
})
