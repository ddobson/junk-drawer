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
        "func-names": 0,
        "react/prefer-stateless-function": 1,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    }
};
