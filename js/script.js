const url = 'https://randomuser.me/api/?nat=us&results=12&inc=name,location,email,dob,cell,picture';
const gallery = document.getElementById('gallery');
let users = []; 
//fetch function
fetch(url) 
    //.then(checkStatus) 
    .then((response) => response.json()) 
    .then((data) => {
        displayUsers(data.results)
        users = data.results
    })
    //.catch((error) => console.log('There has been an error', error));

// 12 random users 
function displayUsers(data){
   // gallery.innerHTML = '';
    //for (let i=0; i<data.length; i++) {
    const cards = data.forEach((item, index)=>{
        const html =
        `<div class="card" data-index=${index}>
            <div class="card-img-container">
            <img class="card-img" src="${item.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
         <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
            <p class="card-text">${item.email}</p>
            <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
        </div>`;
        gallery.insertAdjacentHTML('beforeend', html)
    }) 
    modalOpen()
};
const generateModal = (person) => {
    const isoDate = person.dob.date.split('T')[0].split('-');
    const birthday = `${isoDate[1]}/${isoDate[2]}/${isoDate[0]}`;

//function modal(person){
    const htmlModal = 
    `<div class="modal-container">
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src=" ${person.picture.large} " alt="profile picture">
            <h3 id="name" class="modal-name cap"> ${person.name.first} ${person.name.last} </h3>
            <p class="modal-text"> ${person.email}</p>
            <hr>
            <p class="modal-text"> ${person.cell} </p>
            <p class="modal-text"> ${person.location.city}, ${person.location.state} </p>
            <p class="modal-text"> Birthday: ${birthday} </p>
        </div>`;
        gallery.insertAdjacentHTML('beforeend', htmlModal)

        modalClose();
}
function modalOpen() {
    const cardElement = document.getElementsByClassName('card')
    const cards = [...cardElement]
      cards.forEach((card) => {
        card.addEventListener('click', (e) => {
        let index = card.getAttribute('data-index')
        generateModal(users[index])
    });
    })
}
const modalClose = () => {
    const closeBtn = document.querySelector('#modal-close-btn');
    const modal = document.querySelector('.modal-container');
    closeBtn.addEventListener('click', (e) => {
      modal.remove();
    });
};