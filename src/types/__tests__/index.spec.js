import * as types from "../../types";

describe("action type format checking", () => {
  for (let type in types) {
    let startsWith = types[type].substring(0, 2);
    it("all types should start with @@", () => {
      expect(startsWith).toEqual("@@");
    });
    it("all types should contain /", () => {
      expect(types[type]).toContain("/");
    });
  }
});
