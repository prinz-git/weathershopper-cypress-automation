import 'cypress-iframe';

describe('template spec', () => {
  it('Purchase based on weather successfully', () => {
    cy.visit('http://127.0.0.1:6464/')
    cy.get("h2").contains("Current temperature")
    cy.get('#temperature').invoke('text').then((temp) => {
      const temperature = temp.match(/\d+/)[0];
    cy.log('The temperature is: ' + temperature)
    if (temperature <= 19) {
      cy.log('Shop for moisturizers')
      cy.get('button.btn.btn-primary').contains('Buy moisturizers').click()
      cy.get("h2").contains("Moisturizers")
      getCheapestAloe();
      getCheapestAlmond();
      cy.get('button.thin-text.nav-link').contains('Cart').click();
      cy.get('button.stripe-button-el').contains('Pay with Card').click();
      cy.fixture('paymentData').then((paymentData) => {
        cardPayment(paymentData);
      });
    }
    else if (temperature >= 34) {
      cy.log('Shop for suncreens')
      cy.get('button.btn.btn-primary').contains('Buy sunscreens').click()
      cy.get("h2").contains("Sunscreens")
      getCheapestSPF50();
      getCheapestSPF30();
      cy.get('button.thin-text.nav-link').contains('Cart').click();
      cy.get('button.stripe-button-el').contains('Pay with Card').click();
      cy.fixture('paymentData').then((paymentData) => {
        cardPayment(paymentData);
      });
    }
    })
  })
})
function getCheapestAloe(){
  let cheapestItemName = Infinity;
  let cheapestPrice = Infinity;
  let cheapestItem = null;
  cy.get('p').each((item) => {
    const items = item.text().toLowerCase();
    if (items.includes('aloe')) {
      const Aloeprice = parseFloat(item.next().text().match(/\d+/)[0]);
      if (Aloeprice < cheapestPrice) {
        cheapestItemName = item.text()
        cheapestPrice = Aloeprice;
        cheapestItem = item.next();
      }
  }
  }).
  then(() => {
    if (cheapestItem) {
    cy.log('Found ' +cheapestItemName +' ,and the price is ' + cheapestPrice);
    cy.wrap(cheapestItem).next().contains('Add').should('be.visible').click();
    cy.log('Added cheapest Aloe moisturizer to cart.');
    }
  });
}

function getCheapestAlmond() {
let cheapestItemName = Infinity;
  let cheapestPrice = Infinity;
  let cheapestItem = null;
  cy.get('p').each((item) => {
    const items = item.text().toLowerCase();
    if (items.includes('almond')) {
      const Almondprice = parseFloat(item.next().text().match(/\d+/)[0]);
      if (Almondprice < cheapestPrice) {
        cheapestItemName = item.text()
        cheapestPrice = Almondprice;
        cheapestItem = item.next();
      }
  }
  }).
  then(() => {
    if (cheapestItem) {
    cy.log('Found ' +cheapestItemName +' ,and the price is ' + cheapestPrice);
    cy.wrap(cheapestItem).next().contains('Add').should('be.visible').click();
    cy.log('Added cheapest Almond moisturizer to cart.');
    }
  });
}

function getCheapestSPF50() {
  let cheapestItemName = Infinity;
  let cheapestPrice = Infinity;
  let cheapestItem = null;

  cy.get('p').each((item) => {
    const items = item.text().toLowerCase();
    if (items.includes('spf-50')) {
      const Aloeprice = parseFloat(item.next().text().match(/\d+/)[0]);
      if (Aloeprice < cheapestPrice) {
        cheapestItemName = item.text();
        cheapestPrice = Aloeprice;
        cheapestItem = item.next();
      }
    }
  }).then(() => {
    if (cheapestItem) {
      cy.log(`Found ${cheapestItemName} ,and the price is ${cheapestPrice}`);
      cy.wrap(cheapestItem).next().contains('Add').should('be.visible').click();
      cy.log('Added cheapest SPF-50 sunscreen to cart.');
    }
  });
}

function getCheapestSPF30() {
  let cheapestItemName = Infinity;
  let cheapestPrice = Infinity;
  let cheapestItem = null;

  cy.get('p').each((item) => {
    const items = item.text().toLowerCase();
    if (items.includes('spf-30')) {
      const Almondprice = parseFloat(item.next().text().match(/\d+/)[0]);
      if (Almondprice < cheapestPrice) {
        cheapestItemName = item.text();
        cheapestPrice = Almondprice;
        cheapestItem = item.next();
      }
    }
  }).then(() => {
    if (cheapestItem) {
      cy.log(`Found ${cheapestItemName} ,and the price is ${cheapestPrice}`);
      cy.wrap(cheapestItem).next().contains('Add').should('be.visible').click();
      cy.log('Added cheapest SPF-30 sunscreen to cart.');
    }
  });
}
function cardPayment(data) {
  cy.frameLoaded('iframe[name="stripe_checkout_app"]');
  cy.iframe().within(() => {
    cy.get('input[name="email"]').type(data.email);
    cy.get('input[name="cardnumber"]').type(data.cardNumber);
    cy.get('input[name="exp-date"]').type(data.expiryDate);
    cy.get('input[name="cvc"]').type(data.cvc);
    cy.get('button[type="submit"]').click();
  });
}