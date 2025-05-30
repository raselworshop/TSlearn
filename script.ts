type Pizza = {
    id: number
    name: string
    price: number
}

type Order = {
    id: number
    pizza: Pizza
    status: "ordered" | "completed" //string
}

let cashInRegister = 100
let nextOrderId = 1
let nextPizzaId = 1 //the value can be assign 8. This will be used to track the next pizza ID for new pizzas

const menu = [
    { id:nextPizzaId++, name: "Margherita", price: 8 },
    { id:nextPizzaId++, name: "Pepperoni", price: 10 },
    { id:nextPizzaId++, name: "Hawaiian", price: 10 },
    { id:nextPizzaId++, name: "Veggie", price: 9 },
]

const orderQueue: Order[] = []

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

function addNewPizza(pizzaObj: Omit<Pizza, "id">) : Pizza {
    const newPizza: Pizza = {id: nextPizzaId++, ...pizzaObj}
    // pizzaObj.id = nextPizzaId++ // Assign the nextPizzaId to the pizzaObj's id
    // menu.push(pizzaObj)
    menu.push(newPizza)
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


function placeOrder(pizzaName: string): Order | undefined {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`)
        return
    }
    cashInRegister += selectedPizza.price
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    return newOrder
}

/**
 * Challenge: add types our generic `addToArray` function. It should work
 * for adding new pizzas to the `menu` and adding new orders to the `orderQueue`
 */
function addToArray<Type>(array: Type[], item: Type): Type[]{
    array.push(item)
    return array;
}

addToArray<Pizza>(menu, { id: nextPizzaId++, name: "Chicken Becon rench", price: 10});
addToArray<Order>(orderQueue, { id: nextOrderId++, pizza: menu[1], status: "completed"})

function completeOrder(orderId: number) : Order | undefined {
    const order = orderQueue.find(order => order.id === orderId)
    if(!order){
        console.error(`Order with ID ${orderId} not found`)
        throw new Error()
    }
    order.status = "completed"
    return order
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

function getPizzaDetails( identifier: number | string): Pizza | undefined{
    if( typeof identifier === "string"){
        return menu.find(pizza => pizza.name === identifier)
    }else if( typeof identifier === "number"){
        return menu.find(pizza => pizza.id === identifier)
    }else{
        throw new TypeError("parameter `identifier` must be a string or  number")
    }
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)







































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