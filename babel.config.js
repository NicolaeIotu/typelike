const presets = [
    [
        "@babel/env",
        {
            // 2015
            targets: {
                edge: "17",
                firefox: "35",
                chrome: "40",
                safari: "9",
            },
            useBuiltIns: "usage",
            "corejs": "3.6.5",
        },
    ],
];

module.exports = { presets };
