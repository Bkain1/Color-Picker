function onload() {
    var rText = document.getElementById("rText");
    var gText = document.getElementById("gText");
    var bText = document.getElementById("bText");
    var lText = document.getElementById("lText");

    var cRed = 0;
    var cBlue = 0;
    var cGreen = 0;
    var cL = 0;
    var max = 0;

    var rgbTextString = "";
    var colorTextString = "";

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

        lText.style.display = "block";
        lValue.style.display = "block";

    } else if (colorSelect == "maxwell") {
        // Converting to Maxwell Hues
        rText.innerHTML = "Red: ";
        gText.innerHTML = "Green: ";
        bText.innerHTML = "Blue: ";

        lText.style.display = "none";
        lValue.style.display = "none";
    }
}

function submitForm() {
    var rValue = document.getElementById("rValue").value;
    var gValue = document.getElementById("gValue").value;
    var bValue = document.getElementById("bValue").value;
    var lValue = document.getElementById("lValue");

    if (lValue.style.display == "block") {
        console.log("block: true");
        lValue = lValue.value;
    } else {
        lValue = 1;
    }
    

    if (isNaN(rValue) || isNaN(gValue) || isNaN(bValue) || isNaN(lValue)) {
        // Invalid input, escape
        window.alert("Please only enter numbers into the text boxes.");
    } else if (rValue == "" || gValue == "" || bValue == "" || lValue == "") {
        // Nothing entered
        window.alert("Please enter numbers into all text boxes.");
    } else {
        rValue = parseFloat(rValue);
        gValue = parseFloat(gValue);
        bValue = parseFloat(bValue);
        lValue = parseFloat(lValue);

        // Valid input
        if (colorSelect == "rgb") {
            // Converting to RGB

            // Test for valid range (0 to 1)
            if (Math.min(rValue, bValue, gValue, lValue) < 0 || Math.max(rValue, bValue, gValue, lValue) > 1) {
                window.alert("Please enter only values from 0 to 1.");
            } else {
                // Test if all values add to 1.0
                if (rValue + gValue + bValue == 1) {
                    // Convert
                    convertRGB(rValue, gValue, bValue, lValue);
                } else {
                    // Values do not add up to 1
                    window.alert("Please ensure rho, gamma, and beta values add up to 1.0.");
                }
            }
        } else if (colorSelect == "maxwell") {
            // Converting to Maxwell Hues

            // Test for valid range (0 to 1)
            if (rValue < 0 || rValue > 1 || gValue < 0 || gValue > 1 || bValue < 0 || bValue > 1) {
                window.alert("Please enter only values from 0 to 1.");
            } else {
                // Convert
                convertMaxwell(rValue, gValue, bValue); 
            }
        }
    }
}

function convertRGB(r, g, b, l) {

    max = (Math.max(r, g, b));

    cRed = (l / max) * r
    cGreen = (l / max) * g
    cBlue = (l / max) * b


    rgbString = "rgb(" + cRed * 255 + "," + cGreen * 255 + "," + cBlue * 255 + ")";
    colorTextString = "RGB Value: (" + cRed + ", " + cGreen + ", " + cBlue + ")";

    colorDisplay.style.backgroundColor = rgbString;
    document.getElementById("convertedText").innerHTML = colorTextString;
}

function convertMaxwell(r, g, b) {
    cL = Math.max(r, g, b);
    cRed = (1 / (r + g + b)) * r;
    cGreen = (1 / (r + g + b)) * g;
    cBlue = (1 / (r + g + b)) * b;

    rgbString = "rgb(" + r * 255 + "," + g * 255 + "," + b * 255 + ")";
    colorTextString = "Barycentric Maxwell Hues Value: (" + cRed + ", " + cGreen + ", " + cBlue + ", " + cL + ")";

    colorDisplay.style.backgroundColor = rgbString;
    document.getElementById("convertedText").innerHTML = colorTextString;
}