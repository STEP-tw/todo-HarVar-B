describe('TODO app',()=>{
  describe('loginPage', function () {
    it('should redirect to homePage, for an authorised username', function () {
      cy.visit('localhost:8444');
      cy.title().should('include', 'login');
      cy.get('#username').type('harshab');
      cy.get('#submitbutton').click();
      cy.title().should('include', 'TODO app');
    });
    it('should redirect to loginPage with logInFailed cookie, for invalid username',function(){
      cy.visit('localhost:8444');
      cy.title().should('include', 'login');
      cy.get('#username').type('harshaBoorla');
      cy.get('#submitbutton').click();
      cy.getCookie('logInFailed')
        .should('have.property', 'value', 'true')
    });
  });
  describe('homePage',function(){
    it('should have logout option which takes to loginPage and clears cookies',function(){
      cy.visit('localhost:8444');
      cy.title().should('include', 'login');
      cy.get('#username').type('harshab');
      cy.get('#submitbutton').click();
      cy.title().should('include', 'TODO app');
      cy.get('#logout').click();
      cy.title().should('include','login');
    });
    it('should let user to create a new todo, in a new page',function(){
      cy.visit('localhost:8444');
      cy.title().should('include', 'login');
      cy.get('#username').type('harshab');
      cy.get('#submitbutton').click();
      cy.title().should('include', 'TODO app');
      cy.get('#createTodo').click();
      cy.title().should('include','Add Todo');
      cy.get('#todoTitle').type('testing cypress');
      cy.get('#todoDescription').type('how to automate tests');
      cy.get('#addMoreItemButton').click();
      cy.get('#addMoreItemButton').click();
      cy.get('#item0content').type('item0');
      cy.get('#item1content').type('item1');
      cy.get('#newTodoDetailsSubmitButton').click();
      cy.title().should('include','TODO app');
      cy.get('#viewTodos').click();
      cy.get('#titles').children().contains('cypress').dblclick();
    });
  });
});
