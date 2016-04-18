
let Root = null;

if (process.env.NODE_ENV === 'production') {
    Root = require('./root.prod').default;
} else {
    Root = require('./root.dev').default;
}

export default Root;
