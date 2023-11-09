describe('CryptoCurrency Table', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should show information about cryptocurrencies', () => {
        cy.get('thead th').should('have.length', 6);
        cy.get('thead th').eq(0).should('contain', 'Symbol');
        cy.get('thead th').eq(1).should('contain', 'Logo');
        cy.get('thead th').eq(2).should('contain', 'Price (USD)');
        cy.get('thead th').eq(3).should('contain', 'Market Cap (USD)');
        cy.get('thead th').eq(4).should('contain', 'Change (24h), %');
        cy.get('thead th').eq(5).should('contain', 'Action');
        cy.get('tbody tr').should('have.length.gt', 0);
        cy.screenshot();
    });

    it('should filter data when searching', () => {
        cy.get('input[type="text"]').type('Bitcoin');
        cy.get('tr').should('have.length.greaterThan', 1);
        cy.screenshot();
    });

    it('should show paginated data', () => {
        cy.get('#pagination').should('exist');
        cy.get('#pagination span').should('have.text', '1');
        cy.get('#pagination button').contains('Next').click();
        cy.get('#pagination span').should('have.text', '2');
        cy.get('#pagination button').contains('Previous').click();
        cy.screenshot();
    });

    it('should sort cryptocurrencies by "Price (USD)"', () => {
        cy.contains('Price (USD)').click();
        cy.get('td:nth-child(3)').then(($column) => {
            const values = [...$column].map((el) => parseFloat(el.textContent));
            const sortedValues = [...values].sort((a, b) => a - b);
            expect(values).to.deep.equal(sortedValues);
        });
        cy.contains('Price (USD)').click();
        cy.get('td:nth-child(3)').then(($column) => {
            const values = [...$column].map((el) => parseFloat(el.textContent));
            const sortedValues = [...values].sort((a, b) => b - a);
            expect(values).to.deep.equal(sortedValues);
        });
        cy.screenshot();
    });

    it('should sort cryptocurrencies by "Market Cap (USD)"', () => {
        cy.contains('Market Cap (USD)').click();
        cy.get('td:nth-child(4)').then(($column) => {
            const values = [...$column].map((el) =>
                parseFloat(el.textContent.replace(/[^0-9.-]+/g, '')),
            );
            const sortedValues = [...values].sort((a, b) => a - b);
            expect(values).to.deep.equal(sortedValues);
        });

        cy.contains('Market Cap (USD)').click();
        cy.get('td:nth-child(4)').then(($column) => {
            const values = [...$column].map((el) =>
                parseFloat(el.textContent.replace(/[^0-9.-]+/g, '')),
            );
            const sortedValues = [...values].sort((a, b) => b - a);
            expect(values).to.deep.equal(sortedValues);
        });
        cy.screenshot();
    });

    it('should sort cryptocurrencies by "Change (24h), %"', () => {
        cy.contains('Change (24h), %').click();
        cy.get('td:nth-child(5)').then(($column) => {
            const values = [...$column].map((el) => parseFloat(el.textContent));
            const sortedValues = [...values].sort((a, b) => a - b);
            expect(values).to.deep.equal(sortedValues);
        });
        cy.contains('Change (24h), %').click();
        cy.get('td:nth-child(5)').then(($column) => {
            const values = [...$column].map((el) => parseFloat(el.textContent));
            const sortedValues = [...values].sort((a, b) => b - a);
            expect(values).to.deep.equal(sortedValues);
        });
        cy.screenshot();
    });

    it('does not contain null results', () => {
        cy.visit('/');
        cy.get('tbody td').each(($cell) => {
            cy.wrap($cell).should('not.have.text', '0');
            cy.wrap($cell).should('not.have.text', '0.00$');
            cy.wrap($cell).should('not.have.text', '-$');
        });
    });

    it('should add cryptocurrency in portfolio from table and remove it', () => {
        cy.contains('tr', 'BTC').find('button').click();
        cy.get('#modal').should('exist');
        cy.get('#modal input').type('1');
        cy.get('#modal button').contains('Purchase').click();
        cy.screenshot();
        cy.get('#portfolio').click();
        cy.get('#portfolioList ul li').contains('BTC').should('exist');
        cy.get('#portfolioList ul li').contains('11').should('exist');
        cy.screenshot();
        cy.get('#portfolioList button')
            .contains('Remove')
            .should('exist')
            .click();
        cy.get('#portfolioList ul li').should('not.exist');
        cy.screenshot();
    });

    it('should redirect to cryptocurrency info page', () => {
        cy.get('tbody tr').eq(0).click();
        cy.get('#cryptInfoContainer').should('be.visible');
        cy.screenshot();
    });

    it('navbar should contains top-3 cryptocurrencies', () => {
        cy.get('strong').contains('BTC').should('exist');
        cy.get('strong').contains('ETH').should('exist');
        cy.get('strong').contains('USDT').should('exist');
        cy.screenshot();
    });

    it('should be protected from incorrect data entry ', () => {
        cy.contains('tr', 'BTC').find('button').click();
        cy.get('#modal').should('exist');
        cy.get('#modal input').clear();
        cy.get('#modal input').type('0.5');
        cy.get('#modal button').contains('Purchase').click();
        cy.get('#modal #error').should('exist');
        cy.screenshot();
        cy.get('#modal input').clear();
        cy.get('#modal input').type('9999999999999');
        cy.get('#modal button').contains('Purchase').click();
        cy.get('#modal #error').should('exist');
        cy.screenshot();
    });
});

describe('CryptoCurrency Info', () => {
    beforeEach(() => {
        cy.visit('/bitcoin');
    });

    it('should have information about cryptocurrency', () => {
        cy.get('#loader').should('exist');
        cy.screenshot();
        cy.get('#cryptInfoContainer img').should('exist');

        cy.get('#cryptInfoContainer p').eq(0).should('contain', 'Rank: ');
        cy.get('#cryptInfoContainer p').eq(1).should('contain', 'Price: $');
        cy.get('#cryptInfoContainer p').eq(2).should('contain', 'Supply: ');
        cy.get('#cryptInfoContainer p')
            .eq(3)
            .should('contain', 'MarketCapUSD: $');
        cy.get('#cryptInfoContainer p').eq(4).should('contain', 'MaxSupply: ');

        cy.get('#cryptInfoContainer button').contains('Add').should('exist');
        cy.get('#cryptInfoContainer button').contains('Back').should('exist');
        cy.screenshot();
    });

    it('should redirect to cryptocurrency table', () => {
        cy.get('#cryptInfoContainer button').contains('Back').click();
        cy.get('table').should('exist');
        cy.screenshot();
    });

    it('should add cryptocurrency in portfolio', () => {
        cy.get('#cryptInfoContainer input')
            .type('5')
            .should('have.value', '15');
        cy.screenshot();
        cy.get('#cryptInfoContainer button').contains('Add').click();
        cy.get('#cryptInfoContainer #modal').should('exist');
        cy.screenshot();
        cy.get('#modal button').contains('X').click();
        cy.get('#cryptInfoContainer button').contains('Back').click();
        cy.get('#portfolio').click();
        cy.get('#portfolioList ul li').contains('BTC').should('exist');
        cy.get('#portfolioList ul li').contains('15').should('exist');
        cy.screenshot();
    });

    it('should show the cryptocurrency price chart', () => {
        cy.get('#chart').should('exist');
        cy.get('#chartContainer select').select('1');
        cy.get('#chart canvas').should('exist');
        cy.screenshot();
        cy.get('#chartContainer select').select('7');
        cy.get('#chart canvas').should('exist');
        cy.screenshot();
        cy.get('#chartContainer select').select('30');
        cy.get('#chart canvas').should('exist');
        cy.screenshot();
    });
});
