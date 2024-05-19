function adjustArrayLength(array, targetLength) {
    return Array.from({ length: targetLength }, (_, i) => array[i] || ['']);
}