// function calculateGrade() {
//     var marks = parseInt(document.getElementById("marksInput").value);

//     if (isNaN(marks) || marks < 0 || marks > 100) {
//         document.getElementById("gradeOutput").textContent = "Please enter a valid mark between 0 and 100.";
//         return;
//     }

//     var grade;
//     if (marks > 79) {
//         grade = 'A';
//     } else if (marks >= 60) {
//         grade = 'B';
//     } else if (marks >= 50) {
//         grade = 'C';
//     } else if (marks >= 40) {
//         grade = 'D';
//     } else {
//         grade = 'E';
//     }

//     document.getElementById("gradeOutput").textContent = "Grade: " + grade;
// }

function calculateGrade() {
    var marks = parseInt(document.getElementById("marksInput").value);

    if (isNaN(marks) || marks < 0 || marks > 100) {
        displayPopup("&#9888 Please enter a valid mark between 0 and 100.","red");
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
        color = 'red';
    } else {
        grade = 'E';
        color = 'black';
    }

    displayPopup("Grade: " + grade, color);
    
}

function checkSpeed() {
    var speed = parseInt(document.getElementById("speedInput").value);
    var demeritPoints = 0;

    if (isNaN(speed) || speed < 0) {
        displayPopup( "&#9888 Please enter a valid speed.");
        return;
    }

    if (speed <= 70) {
        document.getElementById("resultOutput").textContent = "Ok";
    } else {
        demeritPoints = Math.floor((speed - 70) / 5);
        if (demeritPoints > 12) {
            document.getElementById("resultOutput").textContent = "License suspended";
        } else {
            document.getElementById("resultOutput").textContent = "Points: " + demeritPoints;
        }
    }
}

function calculateNetSalary() {
    var basicSalary = parseFloat(document.getElementById("basicSalaryInput").value);
    var benefits = parseFloat(document.getElementById("benefitsInput").value);

    if (isNaN(basicSalary) || isNaN(benefits)) {
        document.getElementById("resultsOutput").innerHTML = "Please enter valid numbers for salary and benefits.";
        return;
    }

    // Tax rates from KRA
    var taxRates = [
        { min: 0, max: 24000, rate: 10 },
        { min: 24001, max: 32333, rate: 15 },
        { min: 32334, max: 40385, rate: 20 },
        { min: 40386, max: 48333, rate: 25 },
        { min: 48334, max: Infinity, rate: 30 }
    ];

    // NHIF and NSSF rates
    var nhifRate = 0.015; // 1.5%
    var nssfRate = 0.06;  // 6%

    // Calculate gross salary
    var grossSalary = basicSalary + benefits;

    // Calculate PAYE (Tax)
    var taxableIncome = grossSalary - 24000; // Basic allowance exempted
    var tax = 0;
    for (var i = 0; i < taxRates.length; i++) {
        if (taxableIncome <= 0) break;
        var rateInfo = taxRates[i];
        var taxableAmount = Math.min(taxableIncome, rateInfo.max - rateInfo.min);
        tax += taxableAmount * (rateInfo.rate / 100);
        taxableIncome -= taxableAmount;
    }

    
    var nhifDeductions = Math.min(1700, grossSalary * nhifRate); // Calculate NHIF Deductions

    
    var nssfDeductions = Math.min(1800, grossSalary * nssfRate); // Calculate NSSF Deductions

    
    var netSalary = grossSalary - tax - nhifDeductions - nssfDeductions; // Calculate Net Salary

    // Display results
    var resultsHTML = "<p>Gross Salary: KES " + grossSalary.toFixed(2) + "</p>";
    resultsHTML += "<p>Tax (PAYE): KES " + tax.toFixed(2) + "</p>";
    resultsHTML += "<p>NHIF Deductions: KES " + nhifDeductions.toFixed(2) + "</p>";
    resultsHTML += "<p>NSSF Deductions: KES " + nssfDeductions.toFixed(2) + "</p>";
    resultsHTML += "<p>Net Salary: KES " + netSalary.toFixed(2) + "</p>";
    document.getElementById("resultsOutput").innerHTML = resultsHTML;
}


function displayPopup(message, color) {
    var popupContainer = document.getElementById("popupContainer");
    var popupContent = document.getElementById("popupContent");
    popupContent.innerHTML = message;
    popupContainer.style.display = "block";
    popupContainer.style.color = color;


    var popupClose = document.getElementById("popupClose");
    popupClose.addEventListener("click", function() {
        popupContainer.style.display = "none";
        document.getElementById("marksInput").value = "";
    });
}