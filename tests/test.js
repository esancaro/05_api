const request = require("supertest");
const assert = require("assert");

describe("GET /employees", function () {
  it("responds with 200", function (done) {
    request("localhost:8000")
      .get("/api/employees")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET Devolverá los primeros 2 empleados. Del elemento 0 al elemento 1 del listado", function () {
  it("responds with 200", function () {
    return request("localhost:8000")
      .get("/api/employees?page=1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        assert(response.body.length === 2);
        assert(response.body[1].name === "Bob");
      });
  });
});

describe("GET Devolverá del elemento 2 al elemento 3 del listado", function () {
  it("responds with 200", function () {
    return request("localhost:8000")
      .get("/api/employees?page=2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        assert(response.body.length === 2);
        assert(response.body[1].name === "John");
      });
  });
});

describe("GET Devolverá del elemento (2 * (N - 1)) al (2 * (N - 1)) + 1.", function () {
  it("responds with 200", function () {
    return request("localhost:8000")
      .get("/api/employees?page=3")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        assert(response.body.length === 2);
        assert(response.body[1].name === "Martin");
      });
  });
});

describe("GET Devolverá el objeto individual correspondiente al empleado con más edad.", function () {
  it("responds with 200", function () {
    return request("localhost:8000")
      .get("/api/employees/oldest")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        assert(response.body.name === "Martin");
      });
  });
});

describe("GET Devolverá listado de employees con privileges == user", function () {
  it("responds with 200", function () {
    return request("localhost:8000")
      .get("/api/employees?user=true")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        assert(response.body.length > 0);
        assert(
          response.body.filter((x) => x.privileges !== "user").length === 0
        );
      });
  });
});

describe("POST Añadirá un elemento al listado en memoria del programa", function () {
  it("responds with 201", function (done) {
    request("localhost:8000")
      .post("/api/employees")
      .set("Accept", "application/json")
      .send({
        name: "Mary",
        age: 23,
        phone: {
          personal: "555-123-123",
        },
        privileges: "user",
      })
      .expect("Content-Type", /json/)
      .expect(
        201,
        {
          name: "Mary",
          age: 23,
          phone: {
            personal: "555-123-123",
          },
          privileges: "user",
        },
        done
      );
  });
});

describe("POST Añadirá un elemento. Si no cumpliera dicha validación, se devolverá status 400.", function () {
  it("responds with 400", function (done) {
    request("localhost:8000")
      .post("/api/employees")
      .set("Accept", "application/json")
      .send({
        name: "Mary",
      })
      .expect("Content-Type", /json/)
      .expect(400, { code: "bad_request" }, done);
  });
});

describe("GET Devolverá listado de employees que incluya black en el atributo badges", function () {
  it("responds with 200, 3 results", function () {
    return request("localhost:8000")
      .get("/api/employees?badges=black")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        assert(response.body.filter(x => x?.badges?.indexOf("black") > -1).length === 3)
      });
  });
});
