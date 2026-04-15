process.env.NODE_ENV = 'test';

import { test } from '@playwright/test';

// Test Collections
import userTestCollection from './user.test';
import productTestCollection from './product.test';
import health from './health.test';

// Project imports
import { userModel } from "../src/models/userModel";
import { productModel } from "../src/models/productModel";
import { connect, disconnect } from '../src/repository/database';

import dotenvFlow from "dotenv-flow";
dotenvFlow.config();

test.setTimeout(10_000); // Increase test timeout due to MongoDB Atlas being slow at times.

function setup() {
    test.beforeEach(async () => {

        try {
            await connect();
            await userModel.deleteMany({});
            await productModel.deleteMany({});
        }
        finally {
            await disconnect();
        }
    });

    test.afterAll(async () => {
        try {
            await connect();
            await userModel.deleteMany({});
            await productModel.deleteMany({});
        }
        finally {
            await disconnect();
        }
    });
}

setup();

// Run tests sequentially
test.describe("Health check @lowPriority", health);
test.describe("User test suite, @highPriority", userTestCollection);
test.describe("Product test suite @mediumPriority", productTestCollection);