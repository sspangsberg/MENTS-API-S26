import { test, expect } from "@playwright/test";

export default function userTestCollection() {

    test("Valid user registration info (Joi)", async ({ request }) => {

        //test.setTimeout(10_000);

        // Arrange
        const user = {
            name: "Lars Larsen",
            email: "mail@larsen.com",
            password: "12345678"
        }

        // Act
        const response = await request.post("/api/user/register", { data: user });
        const json = await response.json();

        // Asserts
        expect(response.status()).toBe(200);
        expect(json.error).toEqual(null);
    });


    test("Invalid password entry (Joi)", async ({ request }) => {

        // AAA pattern:

        // Arrange
        const user = {
            name: "Lars Larsen",
            email: "mail@larsen.com",
            password: "1234" //Faulty password - Joi/validation should catch this...
        }

        // Act
        const response = await request.post("/api/user/register", { data: user });
        const json = await response.json();


        // Asserts
        //console.log(json.error); // output actual error message from the API
        expect(response.status()).toBe(400);
        expect(json.error).toEqual("\"password\" length must be at least 6 characters long");
    });

test("Duplicate email registration", async ({ request }) => {
 
    // Arrange
    const user = {
    name: "Lars Larsen",
    email: "mail@larsen.com", // Already registered in a previous test
    password: "12345678"
    };

    // Act
    let response = await request.post("/api/user/register", { data: user });
    let json = await response.json();

    response = await request.post("/api/user/register", { data: user });
    json = await response.json();

    // Assert
    expect(response.status()).toBe(409);
    expect(json.error).toEqual("Email already exists."); // optional
});


test("Test missing JWT", async ({ request }) => {

    const expectedProduct =
    {
    "name": "Mr. Burns statue",
    "description": "The best and most precious",
    "imageURL": "https://picsum.photos/500/500",
    "price": 100.96,
    "stock": 15,
    "discount": true,
    "discountPct": 25,
    "isHidden": false,
    "_createdBy": ""
    }

    const response = await request.post("/api/products/", {
    data: expectedProduct,
    });

    const json = await response.json();
    expect(response.status()).toBe(401);
    expect(json.error).toEqual("Access Denied.");
    });



test("Test invalid JWT", async ({ request }) => {

const expectedProduct =
{
"name": "Mr. Burns statue",
"description": "The best and most precious",
"imageURL": "https://picsum.photos/500/500",
"price": 100.96,
"stock": 15,
"discount": true,
"discountPct": 25,
"isHidden": false,
"_createdBy": ""
}

const response = await request.post("/api/products/", {
data: expectedProduct,
headers: {
"auth-token": "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
}
});

const json = await response.json();
expect(response.status()).toBe(401);
expect(json.error).toEqual("Invalid Token.");
 
});


};
