export const quadraticEquation = (a: number, b: number, c: number) => {
  var rootPart = Math.sqrt( (b * b) - (4 * a * c) );
  var denom = 2 * a;
  
  var firstRoot = (-b + rootPart)/denom;
  var secondRoot = (-b - rootPart)/denom;
  
  return [firstRoot, secondRoot].sort((a, b) => a - b);
};