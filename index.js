function onload() {
    var rText = document.getElementById("rText");
    var gText = document.getElementById("gText");
    var bText = document.getElementById("bText");

    // Get the selected conversion
    changeColor();

    var colorDisplay = document.getElementById("colorDisplay");
}

function changeColor() {
    // Get the selected conversion
    colorSelect = document.querySelector('input[name="colorSelect"]:checked').value;

    if (colorSelect == "rgb") {
        // Converting to RGB
        rText.innerHTML = "Rho: ";
        gText.innerHTML = "Gamma: ";
        bText.innerHTML = "Beta: ";
    } else if (colorSelect == "maxwell") {
        // Converting to Maxwell Hues
        rText.innerHTML = "Red: ";
        gText.innerHTML = "Green: ";
        bText.innerHTML = "Blue: ";
    }
}

function submitForm() {
    var rValue = document.getElementById("rValue").value;
    var gValue = document.getElementById("gValue").value;
    var bValue = document.getElementById("bValue").value;

    if (isNaN(rValue) || isNaN(gValue) || isNaN(bValue)) {
        // Invalid input, escape
        window.alert("Please only enter numbers into the text boxes.");
    } else if (rValue == "" || gValue == "" || bValue == "") {
        // Nothing entered
        window.alert("Please enter numbers into the text boxes.");
    } else {
        rValue = parseFloat(rValue);
        gValue = parseFloat(gValue);
        bValue = parseFloat(bValue);

        // Valid input
        if (colorSelect == "rgb") {
            // Converting to RGB

            // Test for valid range (0 to 1)
            if (rValue < 0 || rValue > 1 || gValue < 0 || gValue > 1 || bValue < 0 || bValue > 1) {
                window.alert("Please enter only values from 0 to 1.");
            } else {
                // Test if all values add to 1.0
                if (rValue + gValue + bValue == 1) {
                    // Convert
                    convert("rgb", rValue, gValue, bValue);
                } else {
                    // Values do not add up to 1
                    window.alert("Please ensure all values add up to 1.0.");
                }
            }
        } else if (colorSelect == "maxwell") {
            // Converting to Maxwell Hues

            // Test for valid range (0 to 255)
            if (rValue < 0 || rValue > 255 || gValue < 0 || gValue > 255 || bValue < 0 || bValue > 255) {
                window.alert("Please enter only values from 0 to 255.");
            } else {
                // Convert
                convert("maxwell", rValue, gValue, bValue); 
            }
        }
    }
}

function convert(convertingTo, r, g, b) { 
    var cRed = 0;
    var cGreen = 0;
    var cBlue = 0;

    var rgbString = "";
    var colorTextString = "";

    console.log("R: " + r);
    console.log("G: " + g);
    console.log("B: " + b);
    console.log("Converting to: " + colorSelect);

    if (convertingTo == "rgb") {
        cRed = (r * 255);
        cGreen = (g * 255);
        cBlue = (b * 255);

        rgbString = "rgb(" + cRed + "," + cGreen + "," + cBlue + ")";
        colorTextString = "RGB Value: (" + cRed + ", " + cGreen + ", " + cBlue + ")";
    } else {
        cRed = (1 / (r + g + b)) * r;
        cGreen = (1 / (r + g + b)) * g;
        cBlue = (1 / (r + g + b)) * b;
        
        rgbString = "rgb(" + r + "," + g + "," + b + ")";
        colorTextString = "Barycentric Maxwell Hues Value: (" + cRed + ", " + cGreen + ", " + cBlue + ")";
    }

    console.log(cRed + ", " + cGreen + ", " + cBlue);
    colorDisplay.style.backgroundColor = rgbString;
    
    document.getElementById("convertedText").innerHTML = colorTextString;
}