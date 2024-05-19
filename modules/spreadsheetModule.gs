
function setOutput(values, range, sheetName) {
    const sheet = SHEET.getSheetByName(sheetName);
    const targetRange = sheet.getRange(range);
    const targetRangeLength = targetRange.getValues().length;
  
    // Ensure the values array has the same length as the target range
    const adjustedValues = adjustArrayLength(values, targetRangeLength);
    
    targetRange.clearContent();
    targetRange.setValues(adjustedValues);
}

// function setOutput(arr, range, sheet) {
//     const sr = SHEET.getSheetByName(sheet).getRange(range);
//     const cLength = arr.length;
//     const srLength = sr.getValues().length;
  
//     // Clear content and set values
//     const newArray = cLength >= srLength 
//       ? arr.slice(0, srLength) 
//       : arr.concat(Array(srLength - cLength).fill(['']));
    
//     sr.clearContent();
//     sr.setValues(createArray(newArray));
// }

// function setOutput(values, range, sheetName) {
//     const sheet = SHEET.getSheetByName(sheetName);
//     const targetRange = sheet.getRange(range);
//     const targetRangeLength = targetRange.getValues().length;
  
//     // Ensure the values array has the same length as the target range
//     const adjustedValues = adjustArrayLength(values, targetRangeLength);
    
//     targetRange.clearContent();
//     targetRange.setValues(adjustedValues);
// }

// function adjustArrayLength(array, targetLength) {
//     const arrayLength = array.length;

//     if (arrayLength >= targetLength) {
//         return array.slice(0, targetLength);
//     } else {
//         const filler = Array(targetLength - arrayLength).fill(['']);
//         return array.concat(filler);
//     }
// }