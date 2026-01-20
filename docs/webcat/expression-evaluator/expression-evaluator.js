// expression-evaluator-1.js  2025-11-21  usp
//
// expression :== summand ( "+" | "-" ) summand 
// summand :== factor ( "*" | "/" | " ) factor
// factor :== number | function-call | variable-name
// number :  -?\d+(,\d+)*(\.\d+(e\d+)?)?
// symbol-name :== \b[a-zA-Z]\w*
// 