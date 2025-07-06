const calculateBtn = document.getElementById('calculateBtn');
const resultBox = document.getElementById('resultBox');

const subjectInputs = [
    document.getElementById('subject1'),
    document.getElementById('subject2'),
    document.getElementById('subject3'),
    document.getElementById('subject4'),
    document.getElementById('subject5')
];

const errorDisplays = [
    document.getElementById('error1'),
    document.getElementById('error2'),
    document.getElementById('error3'),
    document.getElementById('error4'),
    document.getElementById('error5')
];

const subjectDisplays = [
    document.getElementById('subject1MarksDisplay'),
    document.getElementById('subject2MarksDisplay'),
    document.getElementById('subject3MarksDisplay'),
    document.getElementById('subject4MarksDisplay'),
    document.getElementById('subject5MarksDisplay')
];

const totalMarksDisplay = document.getElementById('totalMarksDisplay');
const averageMarksDisplay = document.getElementById('averageMarksDisplay');
const gradeDisplay = document.getElementById('gradeDisplay');

const subjectNames = ["Subject 1", "Subject 2", "Subject 3", "Subject 4", "Subject 5"];


function hideAllErrors() {
    errorDisplays.forEach(errorP => {
        errorP.classList.add('hidden');
    });
}

function showResults(marks, total, average, grade) {
    for (let i = 0; i < marks.length; i++) {
        subjectDisplays[i].textContent = `${subjectNames[i]}: ${marks[i]}`;
    }

    totalMarksDisplay.textContent = `Total Marks: ${total}`;
    averageMarksDisplay.textContent = `Average Marks: ${average.toFixed(2)}`;
    gradeDisplay.textContent = `Your Grade: ${grade}`;

    resultBox.classList.remove('hidden'); 
}

function calculateGrade() {
    hideAllErrors();
    resultBox.classList.add('hidden'); 

    let marks = [];
    let totalMarks = 0;
    let hasError = false;

    for (let i = 0; i < subjectInputs.length; i++) {
        const inputElement = subjectInputs[i];
        const errorElement = errorDisplays[i];
        const inputValue = inputElement.value.trim(); 
        const mark = parseFloat(inputValue);

        if (inputValue === '' || isNaN(mark) || mark < 0 || mark > 100) {
            errorElement.classList.remove('hidden'); 
            inputElement.classList.add('border-red-500');
            hasError = true;
        } else {
            marks.push(mark);
            totalMarks += mark;
            inputElement.classList.remove('border-red-500'); 
        }
    }

    if (hasError) {
        gradeDisplay.textContent = ""; 
        return;
    }

    const numberOfSubjects = subjectInputs.length;
    const averageMarks = totalMarks / numberOfSubjects;

    let grade;

    if (averageMarks >= 90) {
        grade = "A+";
    } else if (averageMarks >= 80 && averageMarks <= 89) {
        grade = "A";
    } else if (averageMarks >= 70 && averageMarks <= 79) {
        grade = "B";
    } else if (averageMarks >= 60 && averageMarks <= 69) {
        grade = "C";
    } else if (averageMarks >= 50 && averageMarks <= 59) {
        grade = "D";
    } else {
        grade = "F";
    }

    showResults(marks, totalMarks, averageMarks, grade);
}

calculateBtn.addEventListener('click', calculateGrade);

subjectInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        errorDisplays[index].classList.add('hidden'); 
        input.classList.remove('border-red-500'); 
    });
});
