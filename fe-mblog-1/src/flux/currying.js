const repeatWidth = (character, count) => character.repeat(count);
console.log(repeatWidth("*", 5));

const repeatWidth2 = (character) => (count) => character.repeat(count);
//repeatStar는 함수이다. 왜냐하면 repeatWidth2가 커링함수이기 때문이다.
const repeatStar = repeatWidth2("*");
console.log(repeatStar(3));
