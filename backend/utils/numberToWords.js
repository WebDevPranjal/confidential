function numberToWords(number) {
    const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    function convertLessThanOneThousand(num) {
        if (num === 0) {
            return "";
        } else if (num < 10) {
            return units[num];
        } else if (num < 20) {
            return teens[num - 10];
        } else if (num < 100) {
            return tens[Math.floor(num / 10)] + " " + convertLessThanOneThousand(num % 10);
        } else {
            return units[Math.floor(num / 100)] + " hundred " + convertLessThanOneThousand(num % 100);
        }
    }

    function convertNumberToWords(num) {
        if (num === 0) {
            return "zero";
        } else {
            return convertLessThanOneThousand(num);
        }
    }

    const thousands = Math.floor(number / 1000);
    const remainder = number % 1000;

    let result = "";

    if (thousands > 0) {
        result += convertLessThanOneThousand(thousands) + " thousand ";
    }

    result += convertNumberToWords(remainder);

    return result.trim();
}

// Example usage:
const number = 654347;
const words = numberToWords(number);
console.log(`${number} in words: ${words}`);
