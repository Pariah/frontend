const SHEET = SpreadsheetApp.getActiveSpreadsheet();

const SHEET_ID = SHEET.getSheetByName('ID');
const SHEET_ROSTER = SHEET.getSheetByName('ROSTER');
const SHEET_COMP = SHEET.getSheetByName('COMP');

const RANGE_ID = SHEET_ID.getRange(2, 1, SHEET_ID.getLastRow() - 1, 2).getValues();
const RANGE_ROSTER = SHEET_ROSTER.getRange(2, 1, SHEET_ROSTER.getLastRow() - 1, 8).getValues();
const RANGE_COMP = SHEET_COMP.getRange(2, 1, SHEET_COMP.getLastRow() - 1, 7).getValues();

const ID = RANGE_ID
    .map(([id, nick]) => ({ id, nick }))
    .reduce((acc, { id, nick }) => ({ ...acc, [nick]: id }), {});

const ROSTER = RANGE_ROSTER
    .map(([id, nick, char, class_, spec, role, classID, specID]) => ({ id, nick, char, class_, spec, role, classID, specID }))
    .reduce((acc, { id, nick, char, class_, spec, role, classID, specID }) => ({ ...acc, [char]: { id, nick, class_, spec, role, classID, specID } }), {});

const COMP = RANGE_COMP
    .map(([id, nick, char, class_, spec, specID, role]) => ({ id, nick, char, class_, spec, specID, role }))
    .reduce((acc, { id, nick, char, class_, spec, specID, role }) => ({ ...acc, [char]: { id, nick, class_, spec, specID, role } }), {});