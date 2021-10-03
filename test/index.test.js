const battleship = require('../src/index');

// tests that ShipFactory creates object with correct keys/values
test('object should have correct number of hitpoints (array length)', () => {
  expect(battleship.ShipFactory('Carrier', 5)).toMatchObject({
    shipName: 'Carrier',
    hitpoints: [0,0,0,0,0],
    sunk: false
  });
});

const testShip = battleship.ShipFactory('Carrier', 5);
testShip.hitpoints = [1,1,1,1,1];

const testShip2 = battleship.ShipFactory('Carrier', 5);
testShip2.hitpoints = [1,0,0,0,0];

// tests that isSunk() method returns true
test('isSunk method should return true if all hitpoints equal 1', () => {
  expect(testShip.isSunk(testShip.hitpoints)).toBe(true);
});

// tests that isSunk() method returns false
test('isSunk method should return false if any hitpoints equal 0', () => {
  expect(testShip2.isSunk(testShip2.hitpoints)).toBe(false);
});

// tests the hit() method changes the value of hitpoints array position 
test('hit() method should set 0 index of hitpoints array to a 1', () => {
  expect(testShip.hit(0)).toBe(testShip.hitpoints[0] = 1);
});

// tests that gameboard() returns proper keys/values/methods
test('gameboard() should return correct gameboard object', () => {
  expect(JSON.stringify(battleship.gameboard())).toBe(JSON.stringify({
    createShip(ship, coords) {
      let newShip = {[`${ship.shipName}`]: coords};
      Object.assign(this.ships, newShip);
      return newShip;
    },
    ships: {},
  }));
});

const testCarrier = battleship.ShipFactory('Carrier', 5);
const testCoords = [[1,1], [1,2], [1,3], [1,4], [1,5]];

const testDestroyer = battleship.ShipFactory('Destroyer', 4);
const testCoords2 = [[2,1], [2,2], [2,3], [2,4]];


// tests that createShip method creates returns correct ship object
test("gameboard()'s createShip method should return ship object", () => {
  expect(battleship.gameboard().createShip(testCarrier, testCoords)).toMatchObject({
    Carrier: [[1,1], [1,2], [1,3], [1,4], [1,5]]
  });
});

const testBoard = battleship.gameboard();
testBoard.createShip(testCarrier, testCoords);
testBoard.createShip(testDestroyer, testCoords2)

const testAttack = [1,1];

// tests that receiveAttack method can correctly determine if coords are a hit
test("gameboard()'s receiveAttack method should return true on hit", () => {
  expect(testBoard.receiveAttack(testAttack)).toBe(true);
});