const form = document.querySelector("form"),
        nextBtn = form.querySelector(".nextBtn"),
        backBtn = form.querySelector(".backBtn"),
        allInput = form.querySelectorAll(".first input");


nextBtn.addEventListener("click", ()=> {
    allInput.forEach(input => {
        if(input.value != ""){
            form.classList.add('secActive');
        }else{
            form.classList.remove('secActive');
        }
    })
});
function showForm(form) {
    const forms = document.querySelectorAll('.form');
    forms.forEach(f => f.style.display = 'none');
    document.querySelector(`.${form}`).style.display = 'block';
}

function validateForm() {
    const formElements = document.querySelectorAll('#registrationForm input[required], #registrationForm select[required]');
    const validationMessages = document.getElementById('validationMessages');
    validationMessages.innerHTML = ''; 

    let isValid = true;

    formElements.forEach(element => {
        if (!element.value.trim()) {
            isValid = false;
            const message = document.createElement('p');
            message.textContent = `Please fill in the ${element.previousElementSibling.innerText.toLowerCase()}`;
            validationMessages.appendChild(message);
        }
    });

    return isValid;
}



backBtn.addEventListener("click", () => form.classList.remove('secActive'));

// const inputs = document.querySelectorAll("input");
const full_nameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const date_of_birthInput = document.getElementById("date-of-birth");
const mobile_numberInput = document.getElementById("mobile-number");
const genderInput= document.getElementById("gender");
const passportInput = document.getElementById("file");
const id_cardInput = document.getElementById("id-card");
const id_numberInput = document.getElementById("number");
const issued_authorityInput = document.getElementById("issued-authority");
const issued_stateInput = document.getElementById("issued-state");
const issued_dateInput = document.getElementById("issued-date");
const expiry_dateInput= document.getElementById("expiry-date");
const address_typeInput = document.getElementById("address");
const nationalityInput = document.getElementById("nationality");
const stateInput= document.getElementById("state");
const districtInput= document.getElementById("district");
const block_numberInput = document.getElementById("block-number");
const ward_numberInput = document.getElementById("ward-number");

async function save() {
    try {
      const newData = {
        full_name: full_nameInput.value.trim(),
        date_of_birth: date_of_birthInput.value,
        email: emailInput.value.trim(),
        mobile_number: mobile_numberInput.value.trim(),
        gender: genderInput.value,
        passport: passportInput.value.trim(),
        id_card: id_cardInput.value.trim(),
        id_number: id_numberInput.value.trim(),
        issued_authority: issued_authorityInput.value.trim(),
        issued_state: issued_stateInput.value.trim(),
        issued_date: issued_dateInput.value,
        expiry_date: expiry_dateInput.value,
        address_type: address_typeInput.value.trim(),
        nationality: nationalityInput.value.trim(),
        state: stateInput.value.trim(),
        district: districtInput.value.trim(),
        block_number: block_numberInput.value.trim(),
        ward_number: ward_numberInput.value.trim(),  
      };
      console.log(newData);
  
      const res = await fetch(`http://localhost:3000/api/v1/nutritionists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const data = await res.json();
      console.log(data);
      if (data.message == "success") {
  
        const submitBtn = document.getElementById("submitBtn");
        editBtn.classList.remove("hidden");
        saveBtn.classList.add("hidden");
        inputs.forEach((input) => {
          input.setAttribute("readonly", "readonly");
          input.style.borderBottom = "1px solid #333";
        });
      }
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }
  
 const submitBtn = document.getElementById("submit-id")
 submitBtn.addEventListener("click", save)