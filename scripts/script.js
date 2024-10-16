class Cart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        if(this.items.some(i => i.name === item.name && i.price === item.price)) {
            const existingItem = this.items.find(i => i.name === item.name && i.price === item.price);
            existingItem.quantity = +existingItem.quantity + +item.quantity;
        }else{
            this.items.push(item);
        }
    }

    removeItem(item) {
        const index = this.items.findIndex(i => i.name === item.name && i.price === item.price);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    getTotalQuantity() {
        return this.items.reduce((total, item) => +total + +item.quantity, 0);
    }

    getCompletedQuantity() {
        return this.items.reduce((total, item) => item.completed ? +total + +item.quantity : +total, 0);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
}

class CartItem {
    constructor(name, price, quantity, completed) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.completed = completed ?? false;
    }

    getTotalPrice() {
        return this.price * this.quantity;
    }

    toggleComplete(){
        this.completed = !this.completed;
    }

    complete(){
        this.completed = true;
    }

    uncomplete(){
        this.completed = false;
    }
}

function addToCart(){
    console.log('AddToCart');
    let name = document.getElementById('item').value;
    let price = document.getElementById('price').value;
    let quantity = document.getElementById('quantity').value;
    let item = new CartItem(name, price, quantity);
    Cart.addItem(item);
    updateCart();
}

function updateCart(){
    console.log('updateCart');

    document.getElementById('cartTitle').innerText = 'Cart: ' + Cart.getCompletedQuantity() + '/' + Cart.getTotalQuantity() + ' items';

    let table = document.getElementById('cartTableBody');
    table.innerHTML = '';

    for(let i = 0; i < Cart.items.length; i++){
        let row = table.insertRow('tr');
        row.addEventListener('click', function(){
            Cart.items[i].toggleComplete();
            updateCart();
        });

        let removeButton = row.insertCell('td');
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', function(){
            Cart.removeItem(Cart.items[i]);
            updateCart();
        });
        removeButton.classList.add('btn');
        removeButton.classList.add('btn-danger');
        removeButton.classList.add('w-100');


        let quantity = row.insertCell('td');
        quantity.innerText = Cart.items[i].quantity;

        let price = row.insertCell('td');
        price.innerText = '$' + Cart.items[i].price;

        let name = row.insertCell('td');
        name.innerText = Cart.items[i].name;

        if(Cart.items[i].completed){
            name.style.textDecoration = 'line-through';
            price.style.textDecoration = 'line-through';
            quantity.style.textDecoration = 'line-through';

            name.style.backgroundColor = 'lightgrey';
            price.style.backgroundColor = 'lightgrey';
            quantity.style.backgroundColor = 'lightgrey';
        }
    }
}

Cart = new Cart();

window.addEventListener("load", function() {
    this.document.getElementById("addToCartButton").addEventListener("click", addToCart);
});

var myModal = document.getElementById('exampleModal')
var myInput = document.getElementById('myInput')
myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
  })