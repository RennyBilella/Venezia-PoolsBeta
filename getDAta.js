let stripeButton = document.getElementById('checkout-button');
let Showstatus = document.getElementById('addstatus');

function getPrice() {

    axios({
        method: 'post',
        url: 'http://localhost:8080/price',
        data: {
            Price: document.getElementById('price').value
        }
    }).then(function success() {
        stripeButton.classList.remove("DisableBtn");
        stripeButton.classList.add("stripeBtn");
        stripeButton.removeAttribute('disabled');
        Showstatus.innerHTML = '<button class="addSuccess"  id="addstatus" disabled="true">Added! </button>'
    }).catch(err => console.log(err));

}

document.getElementById('lock').addEventListener("click", getPrice);

