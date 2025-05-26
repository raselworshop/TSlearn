type UserRole = "contributor" | "member" | "admin"

type User = {
    id: number
    username: string
    role: UserRole
}

// this type is a subset of User and allows for partial updates. also it is a custom type
// type UpdateUserInfo = {
//     id?: number
//     username?: string
//     role?: UserRole
// } 
type UpdateUserInfo = Partial<User> //just like the built-in Partial type in TypeScript, this allows for any subset of User properties to be updated

const users: User[] = [
    {id:1, username: "john_doe", role: "member" },
    {id:2, username: "jane_doe", role: "admin" },
    {id:3, username: "guest_user", role: "contributor" },
    { id: 4, username: "charlie_brown", role: "member" },
];

let nextUserId = 1;
 //users.length + 1, // simple way to generate a new ID

function fetchUserDetails(username: string): User {
    const user = users.find(user => user.username === username)
    if (!user) {
        throw new Error(`User with username ${username} not found`)
    }
    return user
}
    // Find the user in the array by the id
    // Use Object.assign to update the found user in place. 
    // Check MDN if you need help with using Object.assign
    // this is the same as using the spread operator 
function updateUser(id: number, updates: UpdateUserInfo)  {
 const user = users.find(user => user.id === id)
 if (!user) {
     throw new Error(`User with ID ${id} not found`)
 }
 Object.assign(user, updates)
}
updateUser(2, { username: "new_john_doe" });
updateUser(4, { role: "contributor" });

// Create a new variable called `user`, add an `id` property to it
// and spread in all the properties of the `newUser` object. Think
// about how you should set the type for this `user` object.
// Push the new object to the `users` array, and return the object
// from the function at the end
function addNewUser(newUser: Omit<User, "id">): User {
    const user: User = {
        id: nextUserId++, // increment the nextUserId for the new user or users.length + 1, // simple way to generate a new ID
        ...newUser // spread the properties of newUser into user
    }
    users.push(user)
    return user;
}

// example usage:
addNewUser({ username: "joe_schmoe", role: "member" })
console.log({users})

// let value:any = 1
// // value.toLowerCase() // This will cause a TypeScript error because `value` is a number, not a string.
// value = "Hello"
// value.toLowerCase() // This is fine because we've changed `value` to a string.
