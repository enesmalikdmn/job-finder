describe("Login Page Tests", () => {
    beforeEach(() => {
        cy.visit('/login', { failOnStatusCode: false });
    });
  
    it("should render the login form", () => {
      cy.get("form").should("be.visible"); // Formun görünür olduğunu doğrula
      cy.get("input#email").should("exist"); // Email input'unun var olduğunu doğrula
      cy.get("input#password").should("exist"); // Password input'unun var olduğunu doğrula
      cy.get("button[type='submit']").should("exist"); // Login butonunun var olduğunu doğrula
    });
  
    it("should show error messages for invalid input", () => {
      cy.get("button[type='submit']").click(); // Submit'e tıklayın
      cy.get("div").contains("Email is required").should("be.visible"); // Hata mesajını doğrula
      cy.get("div").contains("Password is required").should("be.visible"); // Hata mesajını doğrula
    });
  
    it("should login successfully with valid credentials", () => {
      cy.intercept("POST", "/api/login", { statusCode: 200 }).as("loginRequest"); // API isteğini yakala
  
      cy.get("input#email").type("test@example.com"); // Email input'a yaz
      cy.get("input#password").type("password123"); // Password input'a yaz
      cy.get("button[type='submit']").click(); // Login butonuna tıkla
  
      cy.wait("@loginRequest"); // API isteğini bekle
      cy.url().should("include", "/job-listings"); // Login sonrası yönlendirme doğrula
    });
  
    it("should show error for invalid credentials", () => {
      cy.intercept("POST", "/api/login", { statusCode: 401 }).as("loginRequest");
  
      cy.get("input#email").type("invalid@example.com");
      cy.get("input#password").type("wrongpassword");
      cy.get("button[type='submit']").click();
  
      cy.wait("@loginRequest");
      cy.get("p").contains("Invalid email or password").should("be.visible"); // Hata mesajını doğrula
    });
  });
  