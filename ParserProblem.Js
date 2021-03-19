var fs = require('fs');

//Enter file name here
var file = 'SampleBill.txt';

fs.readFile(file, 'utf8', (error, data) => {

    if (error) {
        throw error;
    }
    data = data.toString();
    //Create a JSON array with regex expression
    let ParsedData = {
        customerNo: data.match(/\d+ - \d+/m)[0].split(" - ")[0].trim(),
        accountNo: data.match(/\d+ - \d+/m)[0].split(" - ")[1].trim(),
        billPeriod: data.match(/[a-z]{3}\s\d{1,2},\s\d{4}\s[a-z]{2}\s[a-z]{3}\s\d{1,2},\s\d{4}/i)[0].trim(),
        billDate: data.match(/[a-z]{3}\s\d{1,2},\s\d{4}/i)[0].trim(),
        newCharges: data.match(/[A-Z][a-z]{4}\s[a-z]{3}\s[a-z]{7}\s{30}\$\d{1,3},\d{0,3}.\d{0,2}/)[0].substr(47).trim(),
    };


    //Print the required fields
    console.log("Customer number: " + ParsedData.customerNo);
    console.log("Account number: " + ParsedData.accountNo);
    console.log("Billing period: " + ParsedData.billPeriod);
    console.log("Bill date: " + ParsedData.billDate);
    console.log("New Charges: " + ParsedData.newCharges);

});
