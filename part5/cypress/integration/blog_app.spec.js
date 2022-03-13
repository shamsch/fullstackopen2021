describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Remon",
      username: "remon",
      password: "123456",
    };
    const altUser = {
      name: "Not Remon",
      username: "notremon",
      password: "123456",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login to the application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("remon");
      cy.get("#password").type("123456");
      cy.get("#login-button").click();
      cy.contains("remon logged in");
    });

    it("fails with wrong credentials and error in red", function () {
      cy.get("#username").type("notremon");
      cy.get("#password").type("123456");
      cy.get("#login-button").click();
      cy.contains("Login credential invalid");

      //error color check
      cy.get("#notification").should(
        "have.css",
        "background-color",
        "rgb(255, 0, 0)"
      );
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("remon");
      cy.get("#password").type("123456");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.get("#newblog").click();
      cy.get(".title").type("test blog");
      cy.get(".author").type("by test blogger");
      cy.get(".url").type("https://www.google.com/");
      cy.get(".create").click();
      cy.contains("test blog");
    });
  });

  describe("After a blog is created", function () {
    beforeEach(function () {
      cy.get("#username").type("remon");
      cy.get("#password").type("123456");
      cy.get("#login-button").click();
      cy.get("#newblog").click();
      cy.get(".title").type("test blog");
      cy.get(".author").type("by test blogger");
      cy.get(".url").type("https://www.google.com/");
      cy.get(".create").click();
    });

    it("The blog can be liked", function () {
      cy.get(".view").click();
      cy.get(".like").click();
    });

    it("Blog can be deleted", function () {
      cy.get("#remove").click();
      cy.on("window:confirm", () => true);
      cy.on("window:alert", (str) => {
        expect(str).to.equal("Blog removed");
      });
    });
  });

  describe("Several blog with different like is created", function () {
    beforeEach(function () {
      cy.get("#username").type("remon");
      cy.get("#password").type("123456");
      cy.get("#login-button").click();

      cy.contains("remon logged in").then(() => {
        const user = JSON.parse(window.localStorage.getItem("user"));

        cy.createBlog({
          title: "this blog has 1 like",
          author: "test author 1",
          url: "http://localhost:3000",
          likes: 1,
          user: user,
        });

        cy.createBlog({
          title: "this blog has 10 like",
          author: "test author 2",
          url: "http://localhost:3000",
          likes: 10,
          user: user,
        });

        cy.createBlog({
          title: "this blog has 25 like",
          author: "test author 3",
          url: "http://localhost:3000",
          likes: 25,
          user: user,
        })

        cy.visit("http://localhost:3000")
      })
    });

    it("Blogs are sorted based on likes", function () {
      cy.get(".blogs>.blogBody>.title").then((blogs)=>{
        //sorted in terms of higher likes  
        expect(blogs[0]).to.have.text("this blog has 25 like ")
        expect(blogs[1]).to.have.text("this blog has 10 like ")
        expect(blogs[2]).to.have.text("this blog has 1 like ")
      })
    });
  });
});
