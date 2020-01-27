import addPawn from './addPawn.logic';

describe('addPawn', function() {
  it('should add a yellow pawn to column 6 when gameboard is empty', function() {
    var gameboard = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '']
    ];

    expect(addPawn(gameboard, 6, 'Y')).toEqual({
      gameboard: [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', 'Y']
      ],
      rowPlayed: 5
    });
  });

  it('should add a yellow pawn to row 0 column 0 when gameboard is empty', function() {
    var gameboard = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '']
    ];

    expect(addPawn(gameboard, 0, 'Y')).toEqual({
      gameboard: [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['Y', '', '', '', '', '', '']
      ],
      rowPlayed: 5
    });
  });

  it('should add a red pawn to row 4 column 0 when column 0 is full', function() {
    var gameboard = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['Y', '', '', '', '', '', '']
    ];

    expect(addPawn(gameboard, 0, 'R')).toEqual({
      gameboard: [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['R', '', '', '', '', '', ''],
        ['Y', '', '', '', '', '', '']
      ],
      rowPlayed: 4
    });
  });

  it('should add a yellow pawn to row 3 column 0 when column 0 is full', function() {
    var gameboard = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['R', '', '', '', '', '', ''],
      ['Y', '', '', '', '', '', '']
    ];

    expect(addPawn(gameboard, 0, 'Y')).toEqual({
      gameboard: [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['Y', '', '', '', '', '', ''],
        ['R', '', '', '', '', '', ''],
        ['Y', '', '', '', '', '', '']
      ],
      rowPlayed: 3
    });
  });

  it('should fill the column with a red pawn', function() {
    var gameboard = [
      ['', '', '', '', '', '', ''],
      ['Y', '', '', '', '', '', ''],
      ['R', '', '', '', '', '', ''],
      ['Y', '', '', '', '', '', ''],
      ['R', '', '', '', '', '', ''],
      ['Y', '', '', '', '', '', '']
    ];

    expect(addPawn(gameboard, 0, 'R')).toEqual({
      gameboard: [
        ['R', '', '', '', '', '', ''],
        ['Y', '', '', '', '', '', ''],
        ['R', '', '', '', '', '', ''],
        ['Y', '', '', '', '', '', ''],
        ['R', '', '', '', '', '', ''],
        ['Y', '', '', '', '', '', '']
      ],
      rowPlayed: 0
    });
  });

  it('should throw the column is full', function() {
    var gameboard = [
      ['R', '', '', '', '', '', ''],
      ['Y', '', '', '', '', '', ''],
      ['R', '', '', '', '', '', ''],
      ['Y', '', '', '', '', '', ''],
      ['R', '', '', '', '', '', ''],
      ['Y', '', '', '', '', '', '']
    ];
    expect(function() {
      addPawn(gameboard, 0);
    }).toThrow('The column is full');
  });

  it('should return a error message when the gameboard is full', function() {
    var gameboard = [
      ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
      ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
      ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
      ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
      ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
      ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y']
    ];
    expect(function() {
      addPawn(gameboard, 2, 'R');
    }).toThrow('The gameboard is full');
  });

  it('should be yellow player turn', function() {
    var gameboard = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '']
    ];
    expect(addPawn(gameboard, 2, 'Y')).toEqual({
      gameboard: [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', 'Y', '', '', '', '']
      ],
      rowPlayed: 5
    });
  });

  it('should be red player turn', function() {
    var gameboard = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', 'Y', '', '', '', '']
    ];
    expect(addPawn(gameboard, 2, 'R')).toEqual({
      gameboard: [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', 'R', '', '', '', ''],
        ['', '', 'Y', '', '', '', '']
      ],
      rowPlayed: 4
    });
  });
});
