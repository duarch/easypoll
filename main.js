document.getElementById("question").addEventListener("input", updateValue);
document.getElementById("opt1").addEventListener("input", updateValue);
document.getElementById("opt2").addEventListener("input", updateValue);
const choices = document.getElementById("qtChoices")
const log = document.getElementById("values");
let resultText = []

function updateValue() {
    let i = this.name
    let qt = this.value.length;
    let nextTag = this.nextSibling
    let updateText
    if (qt >= 0) {
        var maxLen = this.getAttribute("maxlength")
        var ctChar = -maxLen + qt;
        if (ctChar == -maxLen) {
            nextTag.textContent = ""
        } else {
            nextTag.textContent = `${ctChar}`;
        }
        updateText = `${this.value}`
        generateText(updateText, i)
    } else {
        nextTag.textContent = "";
    }
}

function generateText(x, y) {
    resultText[y] = x
    const concatObject = (obj, separator) =>
        Object.values(obj)
        .filter((val) => val)
        .join(separator);
    log.textContent = ("/easypoll " + "\"" + concatObject(resultText, "\" \"") + "\"")
}

function addElement() {
    let qtc = choices.value
    if (qtc <= 6) {
        qtc++
        choices.value = qtc
        createNewElement(qtc)
    } else {
        return
    }
}

function removeElement() {
    let qtc = choices.value
    if (qtc >= 3) {
        qtc--
        choices.value = qtc
        deleteLastElement(qtc)
    } else {
        return
    }
}

function createNewElement(qtc) {
    // First create a DIV element.
    var txtNewInputBox = document.createElement("div");
    txtNewInputBox.setAttribute("class", "col-sm-12 visible")
    txtNewInputBox.setAttribute("id", `c${qtc}`)
    txtNewInputBox.setAttribute("name", `${qtc}`)

    // Then add the content (a new input box) of the element.
    txtNewInputBox.innerHTML = `<label class="col-sm-2 col-form-label fw-bolder">Choice ${qtc}:</label>
                <input class="form-control col-sm-4" placeholder="Enter another option" name="${qtc}" id="opt${qtc}" maxlength="30" type="text" /><label style="color: red" class="form-label col-1" name="counter" id="counter${qtc}"></label>`

    // Finally put it where it is supposed to appear.
    document.getElementById("easyform").appendChild(txtNewInputBox);
    txtNewInputBox.childNodes[2].addEventListener("input", updateValue);
}

function deleteLastElement(qtc) {
    var select = document.getElementById("easyform")
    var idel = qtc + 1
    resultText[idel] = ""
    const concatObject = (obj, separator) =>
        Object.values(obj)
        .filter((val) => val)
        .join(separator);
    log.textContent = ("/easypoll " + "\"" + concatObject(resultText, "\" \"") + "\"")

    select.removeChild(select.lastChild)
}

function resetForm() {
    var tempValue = choices.value
    document.getElementById("easyform").reset();
    choices.value = tempValue
    resultText = []
    log.textContent = "";

    document.getElementsByName("counter").forEach(element => {
        element.textContent = ""
    });
}

// From ClipboardJS
var btnClipboard = document.getElementById('btn-clipboard');
var clipboard = new ClipboardJS(btnClipboard);