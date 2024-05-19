// Create function to update inputted range with MPA
function setMPAToComp() {
    const newArray = Object.values(COMP).map(({ char, role }) => getMedianPerformanceAverage(char, role));
    setOutput(newArray, 'H2:H', 'COMP');
}