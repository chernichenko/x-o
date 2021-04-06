export const isArrayIncludesAnotherArray = (array1, array2) => {
    return array2.every(val => array1.includes(val));
}
