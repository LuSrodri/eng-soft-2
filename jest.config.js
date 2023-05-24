require('dotenv').config()

const config = {
    "moduleFileExtensions": [
        "js",
        "json",
        "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
        "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    "reporters": [["github-actions", { "silent": false }], "summary"],
    "coverageThreshold": {
        "global": {
            "branches": process.env.TEST_BRANCHES_COVERAGE,
            "functions": process.env.TEST_FUNCTIONS_COVERAGE,
            "lines": process.env.TEST_LINES_COVERAGE,
            "statements": process.env.TEST_STATEMENTS_COVERAGE
        }
    }
};

module.exports = config;