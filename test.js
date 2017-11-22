const chai = require('chai')
const chaiImmutable = require('chai-immutable')
const { matchSnapshot } = require('chai-karma-snapshot')
const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const { Map } = require('immutable')
const getParentChildrenMap = require('./getParentChildrenMap')
const testsContext = require.context('.', false, /\.spec\.js$/)
testsContext.keys().forEach(testsContext)

enzyme.configure({ adapter: new Adapter() })
chai.use(chaiImmutable)
chai.use(matchSnapshot)
chai.config.truncateThreshold = 0

beforeEach(function() {
    // a0
    // ├── a1
    // │   ├── a2
    // │   └── b2
    // │       ├── a3
    // │       └── b3
    // └── b1
    //     ├── c2
    //     └── d2
    this.childParentMap = new Map({
        a0: undefined,
        a1: 'a0',
        b1: 'a0',
        a2: 'a1',
        b2: 'a1',
        c2: 'b1',
        d2: 'b1',
        a3: 'b2',
        b3: 'b2',
    })
    this.parentChildrenMap = getParentChildrenMap(this.childParentMap)
})
