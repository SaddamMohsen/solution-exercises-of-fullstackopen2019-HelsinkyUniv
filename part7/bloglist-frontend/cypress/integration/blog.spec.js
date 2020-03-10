/*describe("Note ", function() {
  it("front page can be opened", function() {
    cy.visit("http://localhost:3000");
    cy.contains("Blog List Application");
  });
  it("login form can be opened", function() {
    cy.visit("http://localhost:3000/login");
    cy.contains("Log In").click();
    cy.get("input:first").type("saddam");
    cy.get("input:last").type("12345");
    cy.contains("login").click();
    cy.contains("Signed in as: !Saddam Mohsen");
    cy.visit("http://localhost:3000/users");
    setTimeout(()=>
        cy.contains("Sign out").click()
    ,5000)
    
  });
});*/
describe("Blog  app", function() {
  before(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "saddam hussein",
      username: "saddam",
      password: "12345"
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function() {
    cy.contains("Blog List Application");
  });
  it("login form can be opened", function() {
    cy.visit("http://localhost:3000/login");
    cy.contains("Log In").click();
    cy.get("input:first").type("saddam");
    cy.get("input:last").type("12345");
    cy.contains("login").click();
    cy.contains("Signed in as: !saddam hussein");

    //
    //}, 3000);
  });
});
describe("Interacting with Blog", function() {
  before(function() {
    cy.visit("http://localhost:3000/blogs");
    cy.contains("Log In").click();
    cy.get("input:first").type("saddam");
    cy.get("input:last").type("12345");
    cy.contains("login").click();
    cy.contains("Signed in as: !saddam hussein");

    cy.log("greate you are here ");
    cy.get("[data-cy=create]").click();
    cy.get("#title").type("first blog from Cypress");
    cy.get("#author").type("saddam Mohsen");
    cy.get("#url").type("http://localhost:3000/blogs");
    //
    cy.get("[data-cy=submit]").click();
    cy.contains("first blog from Cypress").click();
  });
  it("blog Successfully Added", function() {
    //
  });
  it("Add Comment", function() {
    cy.get(".sm-4").type("Comments From Cypress test");
    cy.get(".badge > .btn").click();
  });
  it("Like Button Success", function() {
    // setTimeout(() => {
    Cypress.Promise.delay(5).then(() => {
      cy.contains("first blog from Cypress").click();
    });
    //await cy.contains("first blog from Cypress").click();
    cy.contains("Like").click();
    //cy.get(".card-body > :nth-child(6)").click();
    cy.get(".card-header > .badge").should("contain", "1");
    //}, 5000);
  });
});
