const buttons = document.querySelectorAll('.calculator button');
const display = document.querySelector('.calculator input');

display.addEventListener('input', () => {
    // Remove any invalid characters
    display.value = display.value.replace(/[^0-9+\-*/().]/g, '');
});

// Evaluate the expression when the user presses "Enter"
display.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        try {
            // Evaluate the input using eval
            const result = eval(display.value);

            // Update the display with the result
            display.value = result;
        } catch {
            // Display an error if the input is invalid
            display.value = 'Error';
        }
    }
});

let memory = 0;      // Stores the memory value
let currentInput = ''; // Stores the current input

// Add event listener to all buttons
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const buttonText = event.target.innerText; // Get the text of the clicked button

        switch (buttonText) {
            case 'AC': // Clear all input
                currentInput = '';
                display.value = '0';
                break;

            case 'DEL': // Delete the last character
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput || '0';
                break;

            case '=': // Evaluate the expression
                try {
                    currentInput = eval(currentInput); // Evaluate the current input string
                    display.value = currentInput;
                } catch {
                    display.value = 'Error';
                }
                break;

            case 'M+': // Add the current value to memory
                memory += parseFloat(currentInput) || 0;
                break;

            case 'M-': // Subtract the current value from memory
                memory -= parseFloat(currentInput) || 0;
                break;

            case 'MR': // Recall memory value
                display.value = memory;
                break;

            case 'MC': // Clear memory
                memory = 0;
                break;

            default: // For numbers and operators
                currentInput += buttonText;
                display.value = currentInput;
        }
    });
});
