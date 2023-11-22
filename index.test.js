const request = require("supertest")
const app = require("./src/app")
const User = require('./models/User');

jest.mock("./models/User.js", () => ({ create: jest.fn() }));

describe("User routes", () => {
    describe("CREATE controller", () => {
      it("should create a user and return the username", async () => {
        const userData = {
          id: 'mockedId',
          name: "testuser",
          age: 28,
        };
        // mock a successful User create
        User.create.mockResolvedValue(userData);
        // console.log(userData)
  
        const response = await request(app).post("/users").send(userData);
        // write assertions
        expect(response.status).toBe(200);
        expect(response.body.name).toEqual("testuser")
      });
  
      it("should return 500 if user creation fails", async () => {
        const error = new Error("User creation failed");
        // mock a failed User create
        User.create.mockRejectedValue(error);
        const response = await request(app).post("/users");
  
        // write assertions
        expect(response.status).toBe(500);
        expect(response.text).toContain('User creation failed')
      });
    });
  });

