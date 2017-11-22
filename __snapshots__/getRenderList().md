# `getRenderList()`

#### `should get the render list`

```
Immutable.List [
  Immutable.Map {
    ancestors: Immutable.List [
    ],
    descendents: Immutable.Set [
      "a1",
      "a2",
      "b2",
      "a3",
      "b3",
      "b1",
      "c2",
      "d2",
    ],
    descenders: Immutable.List [
    ],
    disabledDescendents: Immutable.Set [
    ],
    hiddenDescendents: Immutable.Set [
    ],
    isLastChild: true,
    nodeId: "a0",
    selectedDescendents: Immutable.Set [
    ],
  },
  Immutable.Map {
    ancestors: Immutable.List [
      "a0",
    ],
    descendents: Immutable.Set [
      "a2",
      "b2",
      "a3",
      "b3",
    ],
    descenders: Immutable.List [
      true,
    ],
    disabledDescendents: Immutable.Set [
    ],
    hiddenDescendents: Immutable.Set [
    ],
    isLastChild: false,
    nodeId: "a1",
    selectedDescendents: Immutable.Set [
    ],
  },
  Immutable.Map {
    ancestors: Immutable.List [
      "a1",
      "a0",
    ],
    descendents: Immutable.Set [
    ],
    descenders: Immutable.List [
      true,
      true,
    ],
    disabledDescendents: Immutable.Set [
    ],
    hiddenDescendents: Immutable.Set [
    ],
    isLastChild: false,
    nodeId: "a2",
    selectedDescendents: Immutable.Set [
    ],
  },
  Immutable.Map {
    ancestors: Immutable.List [
      "a1",
      "a0",
    ],
    descendents: Immutable.Set [
      "a3",
      "b3",
    ],
    descenders: Immutable.List [
      true,
      true,
    ],
    disabledDescendents: Immutable.Set [
    ],
    hiddenDescendents: Immutable.Set [
    ],
    isLastChild: true,
    nodeId: "b2",
    selectedDescendents: Immutable.Set [
    ],
  },
  Immutable.Map {
    ancestors: Immutable.List [
      "b2",
      "a1",
      "a0",
    ],
    descendents: Immutable.Set [
    ],
    descenders: Immutable.List [
      true,
      false,
      true,
    ],
    disabledDescendents: Immutable.Set [
    ],
    hiddenDescendents: Immutable.Set [
    ],
    isLastChild: false,
    nodeId: "a3",
    selectedDescendents: Immutable.Set [
    ],
  },
  Immutable.Map {
    ancestors: Immutable.List [
      "b2",
      "a1",
      "a0",
    ],
    descendents: Immutable.Set [
    ],
    descenders: Immutable.List [
      true,
      false,
      true,
    ],
    disabledDescendents: Immutable.Set [
    ],
    hiddenDescendents: Immutable.Set [
    ],
    isLastChild: true,
    nodeId: "b3",
    selectedDescendents: Immutable.Set [
    ],
  },
  Immutable.Map {
    ancestors: Immutable.List [
      "a0",
    ],
    descendents: Immutable.Set [
      "c2",
      "d2",
    ],
    descenders: Immutable.List [
      true,
    ],
    disabledDescendents: Immutable.Set [
    ],
    hiddenDescendents: Immutable.Set [
    ],
    isLastChild: true,
    nodeId: "b1",
    selectedDescendents: Immutable.Set [
    ],
  },
  Immutable.Map {
    ancestors: Immutable.List [
      "b1",
      "a0",
    ],
    descendents: Immutable.Set [
    ],
    descenders: Immutable.List [
      false,
      true,
    ],
    disabledDescendents: Immutable.Set [
    ],
    hiddenDescendents: Immutable.Set [
    ],
    isLastChild: false,
    nodeId: "c2",
    selectedDescendents: Immutable.Set [
    ],
  },
  Immutable.Map {
    ancestors: Immutable.List [
      "b1",
      "a0",
    ],
    descendents: Immutable.Set [
    ],
    descenders: Immutable.List [
      false,
      true,
    ],
    disabledDescendents: Immutable.Set [
    ],
    hiddenDescendents: Immutable.Set [
    ],
    isLastChild: true,
    nodeId: "d2",
    selectedDescendents: Immutable.Set [
    ],
  },
]
```

