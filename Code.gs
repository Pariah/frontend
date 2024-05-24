// Create function to update inputted range with MPA
function setMPAToComp() {
    const newArray = Object.keys(COMP).map(char => getMedianPerformanceAverage(char, COMP[char].role));
    setOutput(newArray, 'H2:H', 'COMP');
}

function setMPAToRoster() {
    const newArray = Object.keys(ROSTER).map(char => getMedianPerformanceAverage(char, ROSTER[char].role));
    setOutput(newArray, 'J2:J', 'ROSTER');
}