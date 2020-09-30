# Sum API

## **sum(a,b)**

Returns the sum of two numbers. Numbers are passed to the function as parameters.

- if parameter is missing, throws an exception: `'parameter missing'`
- if parameters are not numbers, throws an exception: `'only numbers allowed'`

## Test cases

### function sum defined

### sums

#### integers

- sum(1,1) return 2
- sum(2,3) return 5
- sum(-2,-4) return -6
- sum(-2, 4) return 2
- sum(2, -4) return -2
- sum(0,0) returns 0
- sum(0,3) return 3
- sum(3,0) return 3
- sum(0,-3) return -3
- sum(-3,0) return -3

#### floating points

- sum(10, 11.5) return 21.5
- sum(2.5, 3) retuns 5.5
- sum(-2.5, -2.5) return -5
- sum(2.5,2.5) return 5
- sum(-2.5, 2.5) return 0
- sum(2.4, -2.5) return -0.1

### missing parameters

- sum() throws an exception `'parameter missing'`
- sum(1) throws an exception `'parameter missing'`
- sum('a') throws an exception `'parameter missing'`
- sum('') throws an exception `'parameter missing'`

### Parameters are not numbers

- sum('a',2) throws an exception `'only numbers allowed'`
- sum(1,'a') throws an exception `'only numbers allowed'`
- sum('a','b') throws an exception `'only numbers allowed'`
- sum('','') throws an exception `'only numbers allowed'`
