const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

// create element and render cafe

function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('date-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = doc.id;
        db.collection('cafes').doc(id).delete();
    });
}

// getting data
db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
})

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value,
    });
    form.name.value = '';
    form.city.value = '';
})
