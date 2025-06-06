var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var cashInRegister = 100;
var nextOrderId = 1;
var nextPizzaId = 1; //the value can be assign 8. This will be used to track the next pizza ID for new pizzas
var menu = [
    { id: nextPizzaId++, name: "Margherita", price: 8 },
    { id: nextPizzaId++, name: "Pepperoni", price: 10 },
    { id: nextPizzaId++, name: "Hawaiian", price: 10 },
    { id: nextPizzaId++, name: "Veggie", price: 9 },
];
var orderQueue = [];
/**
 * Challenge part 1.5: Try to move the logic for adding an ID to the pizza objects
 * inside the addNewPizza function, so that we can call addNewPizza with no id, and
 * the function will handle that part for us.
 *
 * NOTE: you will run into TS warnings that we'll address soon, but the code should
 * still run.
 */
/**
 * Challenge:
 * Fix the addNewPizza function using the Omit utility type. This might
 * require more than just changing the "Pizza" typed `pizzaObj` parameter.
 * Return the new pizza object (with the id added) from the function.
 */
function addNewPizza(pizzaObj) {
    var newPizza = __assign({ id: nextPizzaId++ }, pizzaObj);
    // pizzaObj.id = nextPizzaId++ // Assign the nextPizzaId to the pizzaObj's id
    // menu.push(pizzaObj)
    menu.push(newPizza);
    return newPizza;
}
// function addNewPizza(pizzaObj: Omit<Pizza, "id">) : void {
//     const newPizza: Pizza = { id: nextPizzaId++, ...pizzaObj} 
//     menu.push(newPizza)
// }
/**
 * Challenge part 1: Make it so we can use a global variable to track the nextPizzaId
 * and use the same trick we use with `nextOrderId++` when you're calling addNewPizza.
 * Update the menu items to use this as well so we don't have to manually enter ids 1-4
 * like we're currently doing
 */
function placeOrder(pizzaName) {
    var selectedPizza = menu.find(function (pizzaObj) { return pizzaObj.name === pizzaName; });
    if (!selectedPizza) {
        console.error("".concat(pizzaName, " does not exist in the menu"));
        return;
    }
    cashInRegister += selectedPizza.price;
    var newOrder = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" };
    orderQueue.push(newOrder);
    return newOrder;
}
/**
 * Challenge: add types our generic `addToArray` function. It should work
 * for adding new pizzas to the `menu` and adding new orders to the `orderQueue`
 */
function addToArray(array, item) {
    array.push(item);
    return array;
}
addToArray(menu, { id: nextPizzaId++, name: "Chicken Becon rench", price: 10 });
addToArray(orderQueue, { id: nextOrderId++, pizza: menu[1], status: "ordered" });
function completeOrder(orderId) {
    var order = orderQueue.find(function (order) { return order.id === orderId; });
    if (!order) {
        console.error("Order with ID ".concat(orderId, " not found"));
        throw new Error();
    }
    order.status = "completed";
    return order;
}
/**
 * Challenge (part 1): add a return type to the getPizzaDetail function.
 *
 * NOTE: you're very likely going to get a big TS warning once you do this 😅
 * Don't fret, we'll address this warning next!
 */
/**
 * Challenge (part 2): explicitly type the return value of this function
 * to tell TypeScript it could either be a Pizza object or undefined
 * as the return value.
 */
function getPizzaDetails(identifier) {
    if (typeof identifier === "string") {
        return menu.find(function (pizza) { return pizza.name === identifier; });
    }
    else if (typeof identifier === "number") {
        return menu.find(function (pizza) { return pizza.id === identifier; });
    }
    else {
        throw new TypeError("parameter `identifier` must be a string or  number");
    }
}
addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 11 });
placeOrder("Chicken Bacon Ranch");
completeOrder(1);
console.log("Menu:", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", orderQueue);
// // let userName: string = "John Doe";
// // let userAge: number = 30;
// // console.log(`User Name: ${userName}, User Age: ${userAge}`);
// const nameInput = document.getElementById("nameInput") as HTMLInputElement;
// const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
// function handleSubimit() : void{
//     const name = nameInput.value;
//     console.log(`User Name: ${name}`);
//     console.log(typeof name);
// }
// // function greetUser(name: string) : string{
// //     return `Hello, ${name}!`;
// // }
// submitBtn.addEventListener("click", handleSubimit)
// // let greeting: string = greetUser(nameInput.value);
// // console.log(greeting);
