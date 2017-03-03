// scope 0 (global);

`1.Дан неупорядоченный массив целых чисел. Написать функцию, которая находит максимальное произведение, 
полученное путем умножения трех чисел в массиве.
Способы обработки пустых массивов и массивов с количеством элементов меньше трех - на ваше усмотрение.
Пример массива на вход: [99, 11, 42, -17, 27, 78, -16]`;

module.exports.maxThreeNumbersComposition = function (arr) {
    if(!arr.length || arr.length < 3) {
        return null;
    }

    arr.sort(function (a, b) {
        return a - b;
    });

    return arr[arr.length-1] * arr[arr.length-2] * arr[arr.length-3];
};

`2.Даны два неупорядоченных массива целых чисел. Написать функцию, которая возвращает массив элементов, 
которые присутствуют в обоих массивах (это называется “пересечение двух массивов”). 
В результирующем массиве элементы должны быть уникальными.
Решение должно иметь оценку сложности O(n)
Пример входных/выходных данных:
первый массив = [2, 2, 4, 1]
второй массив = [1, 2, 0, 2]
Результат = [2, 1]`;

module.exports.identical = function (one, two) { // scope 1
    if(!Array.isArray(one) || !Array.isArray(two)) {
        return null;
    }

    if(!one.length && !two.length) return null;

    if(!one.length && two.length) return two;
    if(!two.length && one.length) return one;

    let result  = [];

    for (let i = 0; i < one.length; i++) {
        if(two.includes(one[i]) && !result.includes(one[i])) {
            result.push(one[i]);
        }
    }

    return result;
};

`3. Напишите функцию, которая оценивает, является ли порядок скобок во входной строке правильным 
(строка состоит только из фигурных скобок {}) . Использовать стек (обычный массив с операциями .push() .pop()).
Пример:
Для строки ‘{{}}{}{}’ результат будет true
Для строки ‘{}{{}’ результат будет false`;

module.exports.brackets = function(str) {
    if(typeof str !== 'string') return null;

    if(str.length%2 || str[0] === '}') return false;

    let left = [];

    for(let i=0; i<str.length; i++) {
        if(str[i] === '}') {
            if(str.length-1 === i && left.length !== 1) {
                return false;
            }

            if (!left.length) {
                return false;
            } else {
                left.pop();
            }

        }

        if(str[i] === '{') {
            if(str.length === i) {
                return false;
            }

            left.push(str[i]);
        }

        if(str[i] !== '}' && str[i] !== '{') {
            return null;
        }

        //console.log(str)
    }

    return true;
};

`4. Реализовать алгоритм перевода инфиксного выражения в Обратную Польскую Нотацию (ОПН)
Можно взять только числа от 0-9 и основные операции: +,-,*,/
Можно без UI - просто нодовской программой.`;

module.exports.workOpn = function(str) {
    if(typeof str !== 'string') {
        return 1;
    }

    let notValid = __validateInput(str);

    if(notValid) {
        return notValid;
    }

    return __opn(__makeStack(str));
};

// input string validator
function __validateInput(str, ops) {
    let numberStack = [];
    let validSymbols = ['-','+','*','/', '(', ')'];

    for(let i = 0; i < str.length; i++) {
        if(Number(str[i])) {
            if(numberStack.length) return 2;

            numberStack.push(str[i]);
        } else if(validSymbols.includes(str[i])) {
            if(numberStack.length) {
                numberStack.pop();
            }
        } else {
            return 3;
        }
    }

    return 0;
}

function __makeStack(str) {
    const operations = ['-','+','*','/'];

    const priors = {
        '-' : 2,
        '+' : 2,
        '*' : 1,
        '/' : 1
    };

    let output  = [],
        stack   = [];

    for(let i = 0; i < str.length; i++) {

        if(Number(str[i])) {
            output.push(str[i]);
        }

        if(str[i] === '(') {
            stack.push(str[i]);
        }

        if(str[i] === ')') {
            let closed = false;

            while(!closed) {
                output.push(stack.pop());

                if(output[output.length-1] === '(') {
                    output.pop();
                    closed = true;
                }
            }

        }

        if(operations.includes(str[i])) {
            if(!stack.length) {
                stack.push(str[i]);
            } else if(stack.length && priors[stack[stack.length-1]] <= priors[str[i]] ) {

                output.push(stack.pop());
                stack.push(str[i]);

            } else if(stack.length) {
                stack.push(str[i]);
            }
        }
    }

    while (stack.length) {
        output.push(stack.pop());
    }

    return output;
}

function __opn(str) {
    const operations = ['-','+','*','/'];

    let stack = [];

    for(let i = 0; i < str.length; i++) {
        if (Number(str[i])) {
            stack.push(str[i]);
        }

        if(operations.includes(str[i])) {
            let result      = 0;
            let secondNum   = stack.pop();
            let fitstNum    = stack.pop();

            if(str[i] === '*') result = parseFloat(fitstNum) * parseFloat(secondNum);
            if(str[i] === '-') result = parseFloat(fitstNum) - parseFloat(secondNum);
            if(str[i] === '+') result = parseFloat(fitstNum) + parseFloat(secondNum);
            if(str[i] === '/') result = parseFloat(fitstNum) / parseFloat(secondNum);

            stack.push(result);
        }
    }

    return stack[0];
}