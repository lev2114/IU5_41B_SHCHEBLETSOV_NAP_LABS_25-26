window.onload = function () {

    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;

    const outputElement = document.getElementById("result");
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    let useSeparator = false;

    /* Ввод цифр */

    function onDigitButtonClicked(digit) {

        if (!selectedOperation) {

            if (digit === '.' && a.includes('.')) return;

            a += digit;
             outputElement.innerHTML = formatNumber(a) || 0;
        }
        else {

            if (digit === '.' && b.includes('.')) return;

            b += digit;
             outputElement.innerHTML = formatNumber(b);;
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function () {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    /* Операции */

    function selectOperation(operation) {

        if (a === '') return;

        if (b !== '') {

            switch(selectedOperation) {
                case '+': a = (+a) + (+b); break;
                case '-': a = (+a) - (+b); break;
                case 'x': a = (+a) * (+b); break;
                case '/':
                    if (+b === 0) {
                        outputElement.innerHTML = "Ошибка";
                        clear();
                        return;
                    }
                    a = (+a) / (+b);
                    break;
            }

            a = a.toString();
            b = '';
            outputElement.innerHTML = a;
        }

        selectedOperation = operation;
    };

    document.getElementById("btn_op_mult").onclick = () => selectOperation('x');
    document.getElementById("btn_op_plus").onclick = () => selectOperation('+');
    document.getElementById("btn_op_minus").onclick = () => selectOperation('-');
    document.getElementById("btn_op_div").onclick = () => selectOperation('/');

    /* Очистка  */

    function clear() {
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
    }

    document.getElementById("btn_op_clear").onclick = function () {
        clear()
        outputElement.innerHTML = 0;
    };

    /* Смена знака (+/-) */

    document.getElementById("btn_op_sign").onclick = function () {

        if (!selectedOperation) {
            if (a === '') return;
            a = (-parseFloat(a)).toString();
             outputElement.innerHTML = formatNumber(a);;
        }
        else {
            if (b === '') return;
            b = (-parseFloat(b)).toString();
             outputElement.innerHTML = formatNumber(b);;
        }
    };

    /* Проценты (%) */

    document.getElementById("btn_op_percent").onclick = function () {

        if (!selectedOperation) {
            if (a === '') return;
            a = (parseFloat(a) / 100).toString();
             outputElement.innerHTML = formatNumber(a);;
        }
        else {
            if (b === '') return;
            b = (parseFloat(b) / 100).toString();
             outputElement.innerHTML = formatNumber(b);;
        }
    };

    /* Вычисление */

    document.getElementById("btn_op_equal").onclick = function () {

        if (a === '' || b === '' || !selectedOperation) return;

        let numA = parseFloat(a);
        let numB = parseFloat(b);

        switch (selectedOperation) {

            case 'x':
                expressionResult = numA * numB;
                break;

            case '+':
                expressionResult = numA + numB;
                break;

            case '-':
                expressionResult = numA - numB;
                break;

            case '/':
                if (numB === 0) {
                    outputElement.innerHTML = "Ошибка";
                    clear();
                    return;
                }
                expressionResult = numA / numB;
                break;
        }

        a = expressionResult.toString();
        b = '';
        selectedOperation = null;

         outputElement.innerHTML = formatNumber(a);;
    };

    /* ссылка на гит*/

    document.getElementById("btn_github").onclick = function () {
        window.open("https://github.com/lev2114/IU5_41B_SHCHEBLETSOV_NAP_LABS_25-26#", "_blank");
    };

    let isDark = false;

    /* тёмная тема */

    document.getElementById("btn_change_back").onclick = function () {

        if (!isDark) {
            document.body.classList.add("dark-theme");
            isDark = true;
        } else {
            document.body.classList.remove("dark-theme");
            isDark = false;
        }
    };

    /* разделители */

    function formatNumber(value) {

        if (!useSeparator) return value;

        let number = parseFloat(value);

        if (isNaN(number)) return value;

        return number.toLocaleString("ru-RU", {
        maximumFractionDigits: 15
        });
    };

    document.getElementById("btn_format").onclick = function () {

        useSeparator = !useSeparator;

        if (!selectedOperation) {
            outputElement.innerHTML = formatNumber(a || "0");
        } else {
            outputElement.innerHTML = formatNumber(b);
        }
    };

    document.getElementById("btn_backspace").onclick = function () {

        if (!selectedOperation) {
            a = a.slice(0, -1);
            outputElement.innerHTML = formatNumber(a) || 0;
        } else {
            b = b.slice(0, -1);
            outputElement.innerHTML = formatNumber(b) || 0;
        }
    };

    document.getElementById("btn_000").onclick = function () {

        if (!selectedOperation) {
            a += "000";
             outputElement.innerHTML = formatNumber(a);
        } else {
            b += "000";
             outputElement.innerHTML = formatNumber(b);
        }
    };

    document.getElementById("btn_op_sqrt").onclick = function () {

        if (!selectedOperation) {
            if (a === '') return;
            if (+a < 0) {
                outputElement.innerHTML = "Ошибка";
                clear();
                return;
            }
            a = Math.sqrt(+a).toString();
            outputElement.innerHTML = formatNumber(a);
        } else {
            if (b === '') return;
            if (+b < 0) {
                outputElement.innerHTML = "Ошибка";
                clear();
                return;
            }
            b = Math.sqrt(+b).toString();
             outputElement.innerHTML = formatNumber(b);
        }
    };

    document.getElementById("btn_op_square").onclick = function () {

        if (!selectedOperation) {
            if (a === '') return;
            a = ((+a) * (+a)).toString();
             outputElement.innerHTML = formatNumber(a)
        } else {
            if (b === '') return;
            b = ((+b) * (+b)).toString();
            outputElement.innerHTML = formatNumber(b)
        }
    };

    document.getElementById("btn_op_factorial").onclick = function () {

        function factorial(n) {
            if (n < 0 || !Number.isInteger(n)) return null;
            let result = 1;
            for (let i = 2; i <= n; i++) {
                result *= i;
            }
            return result;
        }

        if (!selectedOperation) {
            if (a === '') return;
            let res = factorial(+a);
            if (res === null) {
                outputElement.innerHTML = "Ошибка";
                clear();
                return;
            }
            a = res.toString();
             outputElement.innerHTML = formatNumber(a)
        } else {
            if (b === '') return;
            let res = factorial(+b);
            if (res === null) {
                outputElement.innerHTML = "Ошибка";
                clear();
                return;
            }
            b = res.toString();
            outputElement.innerHTML = formatNumber(b)
        }
    };



};
