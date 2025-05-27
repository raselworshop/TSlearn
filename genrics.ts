const gameScore = [12, 15, 20, 25, 30];
const favoriteThings = ["Pizza", "Ice Cream", "Chocolate", "Movies", "Books"];

const voters = [{name: "Alice", age: 30}, {name: "Bob", age: 25}, {name: "Charlie", age: 35}];

function getLastItem<PlaceHolderType>(array: PlaceHolderType[]): PlaceHolderType{
    return array[array.length - 1];
}

console.log(getLastItem(gameScore)); // 30
console.log(getLastItem(favoriteThings)); // "Books"    
console.log(getLastItem(voters)); // {name: "Charlie", age: 35}
console.log(getLastItem([true, false, true])); // true