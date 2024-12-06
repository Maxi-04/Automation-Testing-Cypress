const {home} = require('../../support/pom/OrangeHRM') // POM
const {dashboard} = require('../../support/pom/OrangeDashboard') //POM
const {username, password, newPassword, licenseExpires, birthday} = Cypress.env('AdminUser') // Variables ENV
import { faker, Faker } from '@faker-js/faker' // Faker - Random Data

describe('OrangeHRM', ()=> {
    beforeEach('Ingresar a la pagina', ()=> {

        // Visitar la siguiente URL:
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

          // Realizar un Login:
          home.enterUsername(username)
          home.enterPassword(password)
          home.submitButton()

          // Validar que el login fue exitoso:
          cy.url().should('contains', 'dashboard/index')
          dashboard.elements.miCuenta().should('exist')
          
    });
    it('CP01: Validar que al ingresar data valida en la barra de busqueda haga matching correctamente', ()=> {

        // Ejecucion
        const opcionesParaEscribir = ['Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'My Info', 'Performance', 'Dashboard', 'Directory', 'Maintenance', 'Claim', 'Buzz']
        function selectRandomOption() {
            const randomOption = Cypress._.random(opcionesParaEscribir.length - 1)
            const opcionElegida = opcionesParaEscribir[randomOption]
            opcionesParaEscribir.splice(opcionElegida, 1)
            return opcionElegida
        }

        const opcionElegida = selectRandomOption()
        dashboard.elements.barraBusqueda().type(opcionElegida)
        // Assertion 
        dashboard.elements.itemsMenu().should('have.text', opcionElegida)
        cy.wait(1000)
        dashboard.borrarTexto()

        const opcionElegida2 = selectRandomOption()
        dashboard.elements.barraBusqueda().type(opcionElegida2)
        // Assertion 
        dashboard.elements.itemsMenu().should('have.text', opcionElegida2)
        cy.wait(1000)
        dashboard.borrarTexto()

        const opcionElegida3 = selectRandomOption()
        dashboard.elements.barraBusqueda().type(opcionElegida3)
        // Assertion 
        dashboard.elements.itemsMenu().should('have.text', opcionElegida3)
        cy.wait(1000)
        dashboard.borrarTexto()

        const opcionElegida4 = selectRandomOption()
        dashboard.elements.barraBusqueda().type(opcionElegida4)
        // Assertion 
        dashboard.elements.itemsMenu().should('have.text', opcionElegida4)
        cy.wait(1000)
        dashboard.borrarTexto()
    })
    it('CP02: Validar que se pueda ingresar datos de empleado en el Employee Information en la seccion PIM, completando todos los campos, y utilizando el boton SEARCH', function() {

        // Ir a la seccion PIM
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList')

        // Resultado de Empleados 
        dashboard.elements.empleados().invoke('text').as('primerTexto')

        // Completar los campos
        dashboard.typeEmployeeName('Peter Mac') // 1
        dashboard.selectEmployeeName()
        dashboard.typeEmployeeId('0213') // 2
        dashboard.typeSupervisorName('Ravi M') //3
        dashboard.selectSupervisorName()
        dashboard.clickMploymentStatus() // 4
        dashboard.selectMploymentStatus()
        dashboard.clickJobTitle() //5
        dashboard.selectJobTitle()
        dashboard.clickSubUnit() // 6
        dashboard.selectSubUnit()

        // Usar boton Search
        dashboard.clickSearchButton()
        
        // Resultado de Empleados
        dashboard.elements.empleados().invoke('text').as('segundoTexto').then(()=> {
            expect(this.primerTexto).not.eq(this.segundoTexto) // Validacion - Assertion
        })
        
    })
    it('CP03: Validar poder cambiar la contraseña exitosamente', ()=> {

        cy.url().should('contains', 'dashboard/index')

        // Cambiar Contraseña:
        dashboard.clickPerfil()
        dashboard.cambiarPass()
        cy.url().should('contain', 'updatePassword')
        dashboard.typePass(password)
        dashboard.typeNewPassword(newPassword)
        dashboard.confirmNewPass(newPassword)
        dashboard.clickSave()
        dashboard.elements.cartel().should('exist').and('be.visible').and('contain', 'Successfully Saved')

        // Realizar Un Logout:
        dashboard.clickPerfil()
        dashboard.hacerLogout()
        cy.url().should('contains', 'auth/login')

        // Logearse con la Nueva Contraseña:
        home.enterUsername(username)
        home.enterPassword(newPassword)
        home.submitButton()
        cy.wait(2000)

        // Validar que el cambio de contraseña realmente fue exitoso:
        dashboard.elements.alerta().should('not.exist')
        cy.url().should('contains', 'dashboard/index')

        // Fallo el Caso de Prueba
    })
    it('CP04: Validar poder cambiar los Datos Personales en la seccion My Info', ()=> {

        // Ir a la seccion My Info
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPersonalDetails/empNumber/7')

        // Variables
        const nacionalidades = parseInt(Math.random()*193)
        const randomNumber = parseInt(Math.random()*3)
        const primerNombre = faker.person.firstName()
        const segundoNombre = faker.person.middleName()
        const apellido = faker.person.lastName()
        const primerId = faker.string.numeric()
        const segundoId = faker.string.numeric()
        const numeroLicenciaConducir = faker.string.numeric()
        
        // Ejecucion
        dashboard.elements.firstNameInput().clear().type(primerNombre)
        dashboard.elements.middleNameInput().clear().type(segundoNombre)
        dashboard.elements.lastNameInput().clear().type(apellido)
        dashboard.elements.id().clear().type(primerId)
        dashboard.elements.id2().clear().type(segundoId)
        dashboard.elements.driverLicense().clear().type(numeroLicenciaConducir)
        dashboard.elements.licenseExpiryDate().clear().type(licenseExpires)
        dashboard.elements.cumpleaños().clear({force:true}).type(birthday)
        dashboard.elements.nacionalidad().click()
        dashboard.elements.opcionNacionalidad().eq(nacionalidades).click()
        dashboard.elements.estadoCivil().click()
        dashboard.elements.opcionEstadoCivil().eq(randomNumber).click()
        dashboard.elements.female().check({force:true})
        dashboard.elements.saveButton1().click()

        // Mensaje 
        dashboard.elements.cartel().should('exist').and('be.visible').and('contain', 'Successfully Updated')
    })
    it('CP05: Cositas Randoms', ()=> {

        // Realizar Un Logout:
        dashboard.clickPerfil()
        dashboard.hacerLogout()
        cy.url().should('contains', 'auth/login')

        //Validar que la URL sea exactamente igual a la que se espera
        cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

        // Validar atributos css, en este caso el color del boton Login
        home.elements.loginButton().should('have.css', 'background-color', 'rgb(255, 123, 29)')

        // Realizar un Login
        home.enterUsername(username)
        home.enterPassword(password)
        home.submitButton()

        // Validar que el login fue exitoso
        cy.url().should('contains', 'dashboard/index')
        dashboard.elements.miCuenta().should('exist')
        dashboard.elements.fotoPerfil().should('exist')
        
    })
})