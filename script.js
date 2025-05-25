"use strict";
const menu = [
    { name: "Margherita", price: 8 },
    { name: "Pepperoni", price: 10 },
    { name: "Hawaiian", price: 10 },
    { name: "Veggie", price: 9 },
];
let cashInRegister = 100;
let nextOrderId = 1;
const orderQueue = [];
function addNewPizza(pizzaObj) {
    menu.push(pizzaObj);
}
function placeOrder(pizzaName) {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName);
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`);
        return;
    }
    cashInRegister += selectedPizza.price;
    const newOrder = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" };
    orderQueue.push(newOrder);
    return newOrder;
}
function completeOrder(orderId) {
    const order = orderQueue.find(order => order.id === orderId);
    if (!order) {
        console.error(`Order with ID ${orderId} not found`);
        throw new Error();
    }
    order.status = "completed";
    return order;
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
