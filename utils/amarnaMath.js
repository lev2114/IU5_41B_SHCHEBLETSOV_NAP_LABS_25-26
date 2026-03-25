export function sumOfSquares(arr) {

    let sum = 0
    let i = 0

    do {

        sum += arr[i] * arr[i]

        i++

    } while (i < arr.length)

    return sum
}

export function isEqualObj(obj1, obj2) {

    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) {
        return false
    }

    for (let key of keys1) {

        if (obj1[key] !== obj2[key]) {
            return false
        }

    }

    return true
}

export function removeValues(arr, ...values) {

    const result = []

    for (let item of arr) {

        if (!values.includes(item)) {
            result.push(item)
        }

    }

    return result
}

export function merge(...objects) {

    const result = {}

    for (let obj of objects) {

        for (let key in obj) {

            if (!(key in result)) {
                result[key] = obj[key]
            }

        }

    }

    return result
}
