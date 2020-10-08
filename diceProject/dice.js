'use strict';

module.exports = class Dice{
    constructor(upperBound=6) {
        // if(upperBound === undefined){
        //     this.upperbound=6
        // }
        if(!Number.isInteger(upperBound)) {
            throw new Error('Upper bound must be an integer');
        }
        else if(upperBound>20) {
            throw new Error('Upper bound too big');
        }
        else if(upperBound<1) {
            throw new Error('Upper bound too small');
        }
        else {
            this.upperBound = upperBound;
        }
       
        // this.lowerBound=1; //could be done with getter only
        this.dotCount=0;
    }

    get minimumValue(){
        // return this.lowerBound;
        return 1;
    }

    get maximumValue() {
        return this.upperBound;
    }

    get dots() {
        return this.dotCount;
    }

    roll() {
        this.dotCount=Math.ceil(Math.random()*this.upperBound);
    }

    toString() {
        return this.dotCount === 0 ? 'Not rolled yet' : `${this.dots}`;
        // if(this.dotCount===0) {
        //     return 'Not rolled yet';
        // }
        // return `${this.dots}`;
    }
}


// const upperBounds = new Array(20).fill(1).map((value, ind) => [value + ind]);
// console.log(upperBounds)