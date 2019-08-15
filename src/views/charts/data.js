export default {
  nodes: [
    {
      data: {
        id: "master",
        name: "master"
      },
      renderedPosition: { x: 200, y: 200 }
    },
    {
      data: {
        id: "child-1-1",
        name: "child-1-1"
      }
    },
    {
      data: {
        id: "child-1-2",
        name: "child-1-2"
      }
    },
    {
      data: {
        id: "child-1-3",
        name: "child-1-3"
      }
    },
    {
      data: {
        id: "child-1-4",
        name: "child-1-4"
      }
    },
    {
      data: {
        id: "child-2-1",
        name: "child-2-1"
      }
    },
    {
      data: {
        id: "child-2-2",
        name: "child-2-2"
      }
    },
    {
      data: {
        id: "child-2-3",
        name: "child-2-3"
      }
    },
    {
      data: {
        id: "child-2-4",
        name: "child-2-4"
      }
    },
    {
      data: {
        id: "child-3-1",
        name: "child-3-1"
      }
    },
    {
      data: {
        id: "child-3-2",
        name: "child-3-2"
      }
    },
    {
      data: {
        id: "child-3-3",
        name: "child-3-3"
      }
    },

    {
      data: {
        id: "child-3-4",
        name: "child-3-4",
        ip: "10.13.32.223",
        extra: "其他信息"
      }
    },
    {
      data: {
        id: "child-3-5",
        name: "child-3-5"
      }
    },
    {
      data: {
        id: "child-3-6",
        name: "child-3-6"
      }
    }
  ],
  edges: [
    {
      data: {
        id: "1",
        source: "master",
        target: "child-1-1",
        parent: "master"
      }
    },
    {
      data: {
        id: "2",
        source: "master",
        target: "child-1-2"
      }
    },
    {
      data: {
        id: "3",
        source: "master",
        target: "child-1-3"
      }
    },
    {
      data: {
        id: "4",
        source: "master",
        target: "child-1-4"
      }
    },
    // second level
    {
      data: {
        id: "5",
        source: "child-1-1",
        target: "child-2-1"
      }
    },
    {
      data: {
        id: "20",
        source: "child-1-1",
        target: "child-2-2"
      }
    },
    {
      data: {
        id: "21",
        source: "child-1-1",
        target: "child-2-3"
      }
    },
    {
      data: {
        id: "22",
        source: "child-1-1",
        target: "child-2-4"
      }
    },

    {
      data: {
        id: "23",
        source: "child-1-2",
        target: "child-2-1"
      }
    },
    {
      data: {
        id: "24",
        source: "child-1-2",
        target: "child-2-2"
      }
    },
    {
      data: {
        id: "25",
        source: "child-1-2",
        target: "child-2-3"
      }
    },
    {
      data: {
        id: "26",
        source: "child-1-2",
        target: "child-2-4"
      }
    },

    {
      data: {
        id: "27",
        source: "child-1-3",
        target: "child-2-1"
      }
    },
    {
      data: {
        id: "28",
        source: "child-1-3",
        target: "child-2-2"
      }
    },
    {
      data: {
        id: "29",
        source: "child-1-3",
        target: "child-2-3"
      }
    },
    {
      data: {
        id: "30",
        source: "child-1-3",
        target: "child-2-4"
      }
    },

    {
      data: {
        id: "31",
        source: "child-1-4",
        target: "child-2-1"
      }
    },
    {
      data: {
        id: "32",
        source: "child-1-4",
        target: "child-2-2"
      }
    },
    {
      data: {
        id: "33",
        source: "child-1-4",
        target: "child-2-3"
      }
    },
    {
      data: {
        id: "34",
        source: "child-1-4",
        target: "child-2-4"
      }
    },

    {
      data: {
        id: "6",
        source: "child-1-2",
        target: "child-2-2"
      }
    },
    {
      data: {
        id: "7",
        source: "child-1-3",
        target: "child-2-3"
      }
    },
    {
      data: {
        id: "8",
        source: "child-1-4",
        target: "child-2-4"
      }
    },
    // forth
    {
      data: {
        id: "9",
        source: "child-2-1",
        target: "child-3-1"
      }
    },
    {
      data: {
        id: "10",
        source: "child-2-1",
        target: "child-3-2"
      }
    },
    {
      data: {
        id: "11",
        source: "child-2-1",
        target: "child-3-3"
      }
    },

    {
      data: {
        id: "12",
        source: "child-2-4",
        target: "child-3-4"
      }
    },
    {
      data: {
        id: "13",
        source: "child-2-4",
        target: "child-3-5"
      }
    },
    {
      data: {
        id: "14",
        source: "child-2-4",
        target: "child-3-6"
      }
    }
  ]
};
