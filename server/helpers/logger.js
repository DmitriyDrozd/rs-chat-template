module.exports = {
    info: (...args) => console.log('[server] i:', args.join(' ')),
    error: (...args) => console.log('[server] e:', args.join(' ')),
};
