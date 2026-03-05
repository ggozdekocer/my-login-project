describe('Login Formu Testleri', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    it('Başarılı form doldurulduğunda submit edebiliyorum ve success sayfasını açabiliyorum', () => {
        cy.get('#email').type("Ada_Kris76@hotmail.com").should('have.value', "Ada_Kris76@hotmail.com");
        cy.get('#password').type("dymGAAq14zO0fVV").should('have.value', "dymGAAq14zO0fVV");
        cy.get('#terms').check().should('be.checked');

        cy.get('button').contains('Sign In').should('not.be.disabled').click();

        cy.url().should('include', '/main');
    });

    it('Hatalı durumlarda beklenen hata mesajları görünüyor ve buton disabled kalıyor', () => {
        cy.get('#email').type('yanlis-email').blur();

        cy.get('#email')
            .parent()
            .find('.invalid-feedback')
            .should('be.visible')
            .and('contain', 'Geçerli bir email adresi giriniz.');

        cy.get('button').contains('Sign In').should('be.disabled');

        cy.get('#password').type('123').blur();

        cy.get('#password')
            .parent()
            .find('.invalid-feedback')
            .should('be.visible')
            .and('contain', 'Şifre en az 8 karakter');
    });
});