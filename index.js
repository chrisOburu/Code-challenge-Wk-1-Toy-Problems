function calculateGrade() {
    let marks = parseInt(document.getElementById("marksInput").value);

    if (isNaN(marks) || marks < 0 || marks > 100) {
        displayPopup("&#9432 Please enter a valid mark between 0 and 100.", "gradeCalculator","red","marksInput");
        return;
    }

    let grade;
    let color;
    if (marks > 79) {
        grade = 'A';
        color = 'green';
    } else if (marks >= 60) {
        grade = 'B';
        color = 'blue';
    } else if (marks >= 50) {
        grade = 'C';
        color = 'orange';
    } else if (marks >= 40) {
        grade = 'D';
        color = 'yellow';
    } else {
        grade = 'E';
        color = 'red';
    }

    displayPopup("Grade: " + grade, "gradeCalculator",color,"marksInput");
}

function checkSpeed() {
    let speed = parseInt(document.getElementById("speedInput").value);
    let demeritPoints = 0;

    if (isNaN(speed) || speed < 0) {
        displayPopup("&#9432 Please enter a valid speed.", "speedChecker","red","speedInput");
        return;
    }

    if (speed <= 70) {
        displayPopup("OK", "speedChecker","green");
    } else {
        demeritPoints = Math.floor((speed - 70) / 5);
        if (demeritPoints > 12) {
            displayPopup("&#9888 License suspended", "speedChecker","red","speedInput");
        } else {
            displayPopup("Points: " + demeritPoints, "speedChecker","blue","speedInput");
        }
    }
}

function calculateNetSalary() {
    let basicSalary = parseFloat(document.getElementById("basicSalaryInput").value);
    let benefits = parseFloat(document.getElementById("benefitsInput").value);

    if (isNaN(basicSalary) || isNaN(benefits)) {
        displayPopup("&#9432 Please enter valid numbers for salary and benefits.", "netSalaryCalculator","red","basicSalaryInput");
        return;
    }

    
    // Tax rates from KRA
    let taxRates = [
        { min: 0, max: 24000, rate: 10 },
        { min: 24001, max: 32333, rate: 15 },
        { min: 32334, max: 40385, rate: 20 },
        { min: 40386, max: 48333, rate: 25 },
        { min: 48334, max: Infinity, rate: 30 }
    ];

    // NHIF and NSSF rates
    let nhifRate = 0.015; // 1.5%
    let nssfRate = 0.06;  // 6%

    // Calculate gross salary
    let grossSalary = basicSalary + benefits;

    // Calculate PAYE (Tax)
    let taxableIncome = grossSalary - 24000; // Basic allowance exempted
    let tax = 0;
    for (let i = 0; i < taxRates.length; i++) {
        if (taxableIncome <= 0) break;
        let rateInfo = taxRates[i];
        let taxableAmount = Math.min(taxableIncome, rateInfo.max - rateInfo.min);
        tax += taxableAmount * (rateInfo.rate / 100);
        taxableIncome -= taxableAmount;
    }

    
    let nhifDeductions = Math.min(1700, grossSalary * nhifRate); // Calculate NHIF Deductions

    
    let nssfDeductions = Math.min(1800, grossSalary * nssfRate); // Calculate NSSF Deductions

    
    let netSalary = grossSalary - tax - nhifDeductions - nssfDeductions; // Calculate Net Salary

    // Display results
    let resultsHTML = "Gross Salary: KES " + grossSalary.toFixed(2);
    resultsHTML += "<br>Tax (PAYE): KES " + tax.toFixed(2);
    resultsHTML += "<br>NHIF Deductions: KES " + nhifDeductions.toFixed(2);
    resultsHTML += "<br>NSSF Deductions: KES " + nssfDeductions.toFixed(2);
    resultsHTML += "<br>Net Salary: KES " + netSalary.toFixed(2);

    displayPopup(resultsHTML, "netSalaryCalculator","green","basicSalaryInput");
}


    
    


function displayPopup(message, containerId,color,valueInput,valueInput2="benefitsInput") {
    let popupContainer = document.getElementById(containerId).querySelector(".popup-container");
    let popupContent = popupContainer.querySelector(".popup-content");
    popupContent.innerHTML = message;
    popupContainer.style.display = "block";
    popupContent.style.backgroundColor = color;
    popupContent.style.color = "white";

    let popupClose = popupContainer.querySelector(".popup-close");
    popupClose.addEventListener("click", function() {
        popupContainer.style.display = "none";
        document.getElementById(valueInput).value = "";
        document.getElementById(valueInput2).value = "";
    });
}
