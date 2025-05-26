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
var users = [
    { id: 1, username: "john_doe", role: "member" },
    { id: 2, username: "jane_doe", role: "admin" },
    { id: 3, username: "guest_user", role: "contributor" },
    { id: 4, username: "charlie_brown", role: "member" },
];
var nextUserId = 1;
//users.length + 1, // simple way to generate a new ID
function fetchUserDetails(username) {
    var user = users.find(function (user) { return user.username === username; });
    if (!user) {
        throw new Error("User with username ".concat(username, " not found"));
    }
    return user;
}
// Find the user in the array by the id
// Use Object.assign to update the found user in place. 
// Check MDN if you need help with using Object.assign
// this is the same as using the spread operator 
function updateUser(id, updates) {
    var user = users.find(function (user) { return user.id === id; });
    if (!user) {
        throw new Error("User with ID ".concat(id, " not found"));
    }
    Object.assign(user, updates);
}
updateUser(2, { username: "new_john_doe" });
updateUser(4, { role: "contributor" });
// Create a new variable called `user`, add an `id` property to it
// and spread in all the properties of the `newUser` object. Think
// about how you should set the type for this `user` object.
// Push the new object to the `users` array, and return the object
// from the function at the end
function addNewUser(newUser) {
    var user = __assign({ id: nextUserId++ }, newUser // spread the properties of newUser into user
    );
    users.push(user);
    return user;
}
// example usage:
addNewUser({ username: "joe_schmoe", role: "member" });
console.log({ users: users });
// let value:any = 1
// // value.toLowerCase() // This will cause a TypeScript error because `value` is a number, not a string.
// value = "Hello"
// value.toLowerCase() // This is fine because we've changed `value` to a string.
