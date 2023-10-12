const gtinRegex: RegExp = new RegExp("^(\\d{8}|\\d{12,14})$");

function isValidGTIN(code: string) : boolean 
{
    if(!gtinRegex.test(code)) {
        return false;
    }
    else {
        // Add zeros at start to garantee 14 digits
        code = code.padStart(14, '0');

        //Multiply value of each position by
        const multip: number[] = Array.from({length: 13}, (_, i) => 
            parseInt(code[i]) * (i % 2 === 0 ? 3 : 1)
        );
        
        //Add results together to create sum
        const sum = multip.reduce((sum, current) => sum + current, 0);

        //Subtract the sum from nearest equal or higher multiple of ten
        const checkDigit = (10 - (sum % 10)) % 10;
        const numberWithCheckDigit = parseInt(code[13].toString());

        return checkDigit === numberWithCheckDigit;
    }
}

const sampleBarcodes: string[] = ['80176800', '8690793010151','8690504034506','5449000054227', '4545456'];

sampleBarcodes.forEach(element => {
    console.log(element + ' ==> IsValid = ' + isValidGTIN(element))
});
