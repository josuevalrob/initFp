
/**
 * @param {function} x 
 * @returns a monad which wrap the execution of the
 * function provided with his correspondient value
 */
const Right = x => ({
    map: f => Right(f(x)),
    chain: f => f(x),
    fold: (l, r) => r(x), //will call the provided function
    toString: `Right(${x})`,
});
/**
 * @param {function} x 
 * @returns a monad which wrap the provided value
 */
const Left = x => ({
    map: f => Left(x),
    chain: f => Left(x), //thanks but no...
    fold: (l, r) => l(x), //will call other function
    toString: `Left(${x})`,
})
/**
 * @param {any} x 
 * @returns if the provided value is not null it will be wrapped
 * inside the Right box for it execution. Otherwise it will be wrapped
 * inside Left box with an empty return.
 */
const fromNullable = x => x!= null ? Right(x) : Left()

const logger = x => {
    console.log('💃',x)
    return x;
}
/**
 * @param {function} f 
 * @returns try to execute the provided function.
 * If is successful will return a Right monad, if not will return
 * an Left monad with the error inside
 */
const tryCatch = f => {
    try {
        return Right(f())
    } catch (error) {
        return Left(error)
    }
}

module.exports = {
    Right, Left, fromNullable, tryCatch, logger
} 
