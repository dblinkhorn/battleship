const index = require('../src/index');

// tests that ShipFactory creates object with correct keys/values
test('object should have correct number of hitpoints (array length)', () => {
  expect(index.ShipFactory(5)).toMatchObject({
    hitpoints: [0,0,0,0,0],
    sunk: false
  });
});

const testShip = index.ShipFactory(5);
testShip.hitpoints = [1,1,1,1,1];
const testShip2 = index.ShipFactory(5);
testShip2.hitpoints = [1,0,0,0,0];

// tests that isSunk() method returns true
test('isSunk method should return true if all hitpoints equal 1', () => {
  expect(testShip.isSunk(testShip.hitpoints)).toBe(true);
});

// test that isSunk() method returns false
test('isSunk method should return false if any hitpoints equal 0', () => {
  expect(testShip2.isSunk(testShip2.hitpoints)).toBe(false);
});

// test the hit() method changes the value of hitpoints array position 
test('hit() method should set 0 index of hitpoints array to a 1', () => {
  expect(testShip.hit(0)).toBe(testShip.hitpoints[0] = 1);
});

const testCoords = [(1,1), (1,2), (1,3), (1,4), (1,5)];

// test that gameboard can place ship at specific coords
test.skip('gameboard should return coords based on ship length', () => {
  expect(index.gameboard([(1,1), (1,2), (1,3), (1,4), (1,5)], index.ShipFactory(5), 'carrier')).toMatchObject({
    ships: {
      carrier: [(1,1), (1,2), (1,3), (1,4), (1,5)]
    }
  });
});