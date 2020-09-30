## **divide**

Returns the result of division a/b. Numbers are passed to the function as parameters.

- if parameter is missing, throws an exception: `'parameter missing'`
- if parameters are not numbers, throws an exception: `'only numbers allowed'`

problems:
0/0 => NaN
2/0 => Infinity
-2/0 => -Infinity
Infinity/Infinity => NaN
-Infinity/-Infinity => NaN
-Infinity/Infinity => NaN
Infinity/-Infinity => NaN

## Test cases

### common cases

[ 1, 2, 0.5],
[ 4, 2, 2],
[-4, 2, -2],
[4, -2, -2],
[-4, -2, 2],
[3, 3, 1],
[2.5, 3.5, 2.5/3.5]
[2.5, 3, 0.83]

### special cases

[0, 0, Number.NaN],
[2, 0, Number.POSITIVE_INFINITY],
[-2, 0, Number.NEGATIVE_INFINITY]
[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY, Number.NaN]
[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY, Number.NaN]
[Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY, Number.NaN]
[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY, Number.NaN]

### Missing parameters

- divide() throws an exception `'parameter missing'`
- divide(1) throws an exception `'parameter missing'`
- divide('a') throws an exception `'parameter missing'`
- divide('') throws an exception `'parameter missing'`

### Parameters are not numbers

- divide('a',2) throws an exception `'only numbers allowed'`
- divide(1,'a') throws an exception `'only numbers allowed'`
- divide('a','b') throws an exception `'only numbers allowed'`
- divide('','') throws an exception `'only numbers allowed'`
- divide(null, 1) throws an exception `'parameter missing'`
- divide(undefined, 1) throws an exception `'parameter missing'`
