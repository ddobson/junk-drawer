module.exports = {
    "env": {
        "node": true,
        "es6": true,
        "browser": true,
        "jest": true,
    },
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "consistent-return": 0,
        "func-names": 0,
        "no-shadow": 0,
        "space-before-function-paren": 0,
        "react/prefer-stateless-function": 1,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    }
};
