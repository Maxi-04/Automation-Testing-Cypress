/// <reference types="cypress" />

class Home {
    // Elementos
    elements = {
        imagenPrincipal: ()=> cy.get('[alt="company-branding"]'),
        usernameInput: ()=> cy.get('[name="username"]'),
        passwordInput: ()=> cy.get('[name="password"]'),
        loginButton: ()=> cy.get('[type="submit"]'),
        forgotLink: ()=> cy.get('[class*="login-forgot"] p')
    }
    // Acciones / Funciones
    enterUsername(name){
        this.elements.usernameInput().type(name)
    }
    enterPassword(pass){
        this.elements.passwordInput().type(pass)
    }
    submitButton(){
        this.elements.loginButton().click()
    }
} 

export const home = new Home