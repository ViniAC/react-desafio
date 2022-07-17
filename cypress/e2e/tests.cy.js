

describe('register user', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register')
  })

  it('add new user', () => {
    const user = {
      username: "user",
      password: "password"
    }

    cy.get('#input-username').type(`${user.username}`)
    cy.get('#input-password').type(`${user.password}`)
    cy.get('#input-confirm-password').type(`${user.password}`)
    cy.get('button').click();

    cy.get('.list-group div')
      .should('have.text', user.username)

  })

  it('block add new user when password and confirm password not equal', () => {

    const user = {
      username: "user",
      password: "password",
      confirmPassword: "password1"
    }

    cy.get('#input-username').type(`${user.username}`)
    cy.get('#input-password').type(`${user.password}`)
    cy.get('#input-confirm-password').type(`${user.confirmPassword}`)
    cy.get('button').click();
    cy.get('.list-group-item')
      .should('not.exist');
  })

  it('add new user and log in', () => {
    const user = {
      username: "user",
      password: "password"
    }

    cy.get('#input-username').type(`${user.username}`)
    cy.get('#input-password').type(`${user.password}`)
    cy.get('#input-confirm-password').type(`${user.password}`)
    cy.get('button').click();

    cy.get('#to-login').click();

    cy.get('#input-username').type(`${user.username}`)
    cy.get('#input-password').type(`${user.password}`)
    cy.get('#login').click();

    cy.get('.alert ')
      .should('have.text', "Usuário logado!")
  })

  it('error when log in with noexistent user', () => {
    const user = {
      username: "user",
      password: "password"
    }

    cy.get('#to-login').click();
    cy.get('#input-username').type(`${user.username}`)
    cy.get('#input-password').type(`${user.password}`)
    cy.get('#login').click();

    cy.get('.alert ')
      .should('have.text', "Usuário não existe!")

  })

})
