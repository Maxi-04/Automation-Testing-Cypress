class Dashboard {
    elements = {
        // Cuenta
        miCuenta: ()=> cy.get('.oxd-userdropdown-tab'),
        fotoPerfil: ()=> cy.get('[alt="profile picture"]'),
        logoutButton: ()=> cy.get('.oxd-userdropdown-link').contains('Logout'),
        changePassword: ()=> cy.get('.oxd-userdropdown-link').contains('Change Password'),

        // Cambiar Contraseña
        currentPassword: ()=> cy.get('[type="password"]').eq(0),
        newPassword: ()=> cy.get('[type="password"]').eq(1),
        confirmNewPassword: ()=> cy.get('[type="password"]').eq(2),
        saveButton: ()=> cy.get('[type="submit"]'),
        cartel: ()=> cy.get('#oxd-toaster_1'), // Logo
        alerta: ()=> cy.get('[role="alert"]'),

        // Menu
        barraBusqueda: ()=> cy.get('[placeholder="Search"]'),
        menu: ()=> cy.get('.oxd-main-menu'),
        itemsMenu: ()=> cy.get('.oxd-main-menu-item-wrapper'),

        // PIM
        employeeName: ()=> cy.get('.oxd-autocomplete-wrapper').eq(0).find('input'),
        employeeName2: ()=> cy.get('.oxd-autocomplete-option').contains('Peter Mac Anderson'),

        employeeId: ()=> cy.get('.oxd-input.oxd-input--active').last(),

        supervisorName: ()=> cy.get('.oxd-autocomplete-wrapper').eq(1).find('input'),
        supervisorName2: ()=> cy.get('.oxd-autocomplete-option').contains('Ravi M B'),

        mploymentStatus: ()=> cy.get('.oxd-select-text.oxd-select-text--active').eq(0),
        mploymentStatus2: ()=> cy.get('.oxd-select-option').contains('Freelance'),

        jobTitle: ()=> cy.get('.oxd-select-text.oxd-select-text--active').eq(2),
        jobTitle2: ()=> cy.get('.oxd-select-option').contains('Software Engineer'),

        subUnit: ()=> cy.get('.oxd-select-text.oxd-select-text--active').eq(3),
        subUnit2: ()=> cy.get('.oxd-select-option.--indent-3').contains('Quality Assurance'),

        empleados: ()=> cy.get('.orangehrm-horizontal-padding.orangehrm-vertical-padding'),
        searchButton: ()=> cy.get('[type="submit"]'),

        // My Info
        firstNameInput: ()=> cy.get ('[name="firstName"]'),
        middleNameInput: ()=> cy.get('[name="middleName"]'),
        lastNameInput: ()=> cy.get('[name="lastName"]'),
        id: ()=> cy.get('[class="oxd-input oxd-input--active"]').eq(1),
        id2: ()=> cy.get('[class="oxd-input-group oxd-input-field-bottom-space"]').eq(4).find('input'),
        driverLicense: ()=> cy.get('[class="oxd-input-group oxd-input-field-bottom-space"]').eq(5).find('input'),
        licenseExpiryDate: ()=> cy.get('[placeholder="yyyy-dd-mm"]').eq(0),
        nacionalidad: ()=> cy.get('.oxd-select-text.oxd-select-text--active').eq(0),
        opcionNacionalidad: ()=> cy.get('[role="option"]'),
        estadoCivil: ()=> cy.get('.oxd-select-text.oxd-select-text--active').eq(1),
        opcionEstadoCivil: ()=> cy.get('[class="oxd-select-option"]'),
        cumpleaños: ()=> cy.get('[placeholder="yyyy-dd-mm"]').eq(1),
        female: ()=> cy.get('[value="2"]'),
        saveButton1: ()=> cy.get('[type="submit"]').eq(0),
        saveButton2: ()=> cy.get('[type="submit"]').eq(1),

    }
    // Acciones
    escribirBarra(data){
        this.elements.barraBusqueda().type(data)
    }
    clickPerfil(){
        this.elements.fotoPerfil().click()
    }
    hacerLogout(){
        this.elements.logoutButton().click()
    }
    // Cambiar Contraseña
    cambiarPass(){
        this.elements.changePassword().click()
    }
    typePass(data){
        this.elements.currentPassword().type(data)
    }
    typeNewPassword(data){
        this.elements.newPassword().type(data)
    }
    confirmNewPass(data){
        this.elements.confirmNewPassword().type(data)
    }
    clickSave(){
        this.elements.saveButton().click()
    }
    borrarTexto(){
        this.elements.barraBusqueda().clear()
    }
    // PIM TYPE
    typeEmployeeName(data){
        this.elements.employeeName().type(data)
    }
    selectEmployeeName(){
        this.elements.employeeName2().click() // 1
    }
    typeEmployeeId(data){
        this.elements.employeeId().type(data) // 2
    }
    typeSupervisorName(data){
        this.elements.supervisorName().type(data)
    }
    selectSupervisorName(){
        this.elements.supervisorName2().click() // 3
    }
    // PIM CLICK
    clickMploymentStatus(){
        this.elements.mploymentStatus().click()
    }
    selectMploymentStatus(){
        this.elements.mploymentStatus2().click() // 4
    }
    clickJobTitle(){
        this.elements.jobTitle().click()
    }
    selectJobTitle(){
        this.elements.jobTitle2().click()
    }
    clickSubUnit(){
        this.elements.subUnit().click()
    }
    selectSubUnit(){
        this.elements.subUnit2().click()
    }
    clickSearchButton(){
        this.elements.searchButton().click()
    }
}

export const dashboard = new Dashboard