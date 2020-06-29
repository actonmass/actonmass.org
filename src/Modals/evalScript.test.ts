const { evalScripts } = require("./evalScripts");

test("No interpolation", () => {
  const interp = evalScripts({ test: "Coucou" }, {});
  expect(interp.test).toBe("Coucou");
});

test("Interpolation from one entity", () => {
  const interp = evalScripts({ test: "Hey {leg.name} {leg.surname}" }, { leg: { name: "Barack", surname: "Obama" } });
  expect(interp.test).toBe("Hey Barack Obama");
});

test("Interpolation from several entity", () => {
  const interp = evalScripts(
    { test: "Hey {leg.name} {leg.surname}, please vote for the {bill.title}" },
    { leg: { name: "Barack", surname: "Obama" }, bill: { title: "Safe communities act" } }
  );
  expect(interp.test).toBe("Hey Barack Obama, please vote for the Safe communities act");
});
