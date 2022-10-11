import generator from "../pages/api/generator";
import { createMocks } from "node-mocks-http";

describe("api/generator", () => {
  test("returns a data url with a fuckin comic", async () => {
    const { req, res } = createMocks({
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        value: "unit tests",
        sfw: false,
      },
    });

    await generator(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        image: expect.any(String),
      })
    );
  });
});

describe("api/generator", () => {
  test("returns a data url with a freakin comic", async () => {
    const { req, res } = createMocks({
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        value: "unit tests",
        sfw: true,
      },
    });

    await generator(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        image: expect.any(String),
      })
    );
  });
});

describe("api/generator", () => {
  test("returns an error for a request with invalid value", async () => {
    const { req, res } = createMocks({
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        value:
          "this is a really long string that should not pass the test because it's too many characters long and that's a big problem",
      },
    });

    await generator(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});
