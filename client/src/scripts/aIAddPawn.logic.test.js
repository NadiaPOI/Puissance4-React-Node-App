import aIAddPawn from './aIAddPawn.logic';
import findEmptyColumn from './findEmptyColumns.logic';

describe('aIAddPawn', function() {
  it('should add a red pawn to a random column when column is empty', function() {
    var gameboard = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', 'Y', '', '', '', '', '']
    ];

    var randomFunction = () => 0;
    var randomColumn = findEmptyColumn(gameboard, randomFunction);

    expect(aIAddPawn(gameboard, randomColumn)).toEqual({
      gameboard: [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['R', 'Y', '', '', '', '', '']
      ],
      rowPlayed: 5
    });
  });

  it('should add a red pawn to another row when column is full', function() {
    var gameboard = [
      ['Y', '', '', '', '', '', ''],
      ['R', '', '', '', '', '', ''],
      ['Y', '', '', '', '', '', ''],
      ['R', '', '', '', '', '', ''],
      ['R', '', 'R', '', '', '', ''],
      ['Y', '', 'Y', 'Y', '', '', '']
    ];

    var randomFunction = () => 0;
    var randomColumn = findEmptyColumn(gameboard, randomFunction);

    expect(aIAddPawn(gameboard, randomColumn)).toEqual({
      gameboard: [
        ['Y', '', '', '', '', '', ''],
        ['R', '', '', '', '', '', ''],
        ['Y', '', '', '', '', '', ''],
        ['R', '', '', '', '', '', ''],
        ['R', '', 'R', '', '', '', ''],
        ['Y', 'R', 'Y', 'Y', '', '', '']
      ],
      rowPlayed: 5
    });
  });

  it('should add a pawn to another column when column is full', function() {
    var gameboard = [
      ['', 'Y', '', '', '', '', ''],
      ['', 'R', '', '', '', '', ''],
      ['', 'Y', '', '', '', '', ''],
      ['', 'R', '', '', '', '', ''],
      ['', 'R', 'R', '', '', '', ''],
      ['', 'Y', 'Y', 'Y', '', '', '']
    ];

    var randomFunction = () => 1;
    var randomColumn = findEmptyColumn(gameboard, randomFunction);

    expect(aIAddPawn(gameboard, randomColumn)).toEqual({
      gameboard: [
        ['', 'Y', '', '', '', '', ''],
        ['', 'R', '', '', '', '', ''],
        ['', 'Y', '', '', '', '', ''],
        ['', 'R', '', '', '', '', ''],
        ['', 'R', 'R', '', '', '', ''],
        ['', 'Y', 'Y', 'Y', '', '', 'R']
      ],
      rowPlayed: 5
    });
  });

  it('should add a red pawn to random colum when column is empty', function() {
    var gameboard = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['R', '', 'Y', 'Y', '', '', '']
    ];

    var randomFunction = () => 1;
    var randomColumn = findEmptyColumn(gameboard, randomFunction);

    expect(aIAddPawn(gameboard, randomColumn)).toEqual({
      gameboard: [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['R', '', 'Y', 'Y', '', '', 'R']
      ],
      rowPlayed: 5
    });
  });
});
