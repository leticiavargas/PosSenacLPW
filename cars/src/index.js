import './style.css';
import newCarHTML from './components/newCarHTML';

const table = document.querySelector('table tbody');
const form = document.querySelector('form');

const loadCars = () =>{
    db.collection('cars').onSnapshot((snapshot)=> {
        table.innerHTML = '';
        snapshot.docs.forEach((car) => {
            const newCar = { id: car.id, ...car.data()};
            table.appendChild(newCarHTML(newCar));
        });
    });
}

window.addEventListener('load', loadCars);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const car = {
        modelo: form.modelo.value,
        marca: form.marca.value,
        ano: Number(form.ano.value),
        preco: Number(form.preco.value),
        destaque: false
    }

    db.collection("cars").add(car)
      .then(() => {
          console.log('Cadastrado');
      })
      .catch(err => {
          console.log(`Erro:${err}`);
      });

      
      form.reset();
      form.modelo.focus();
});

table.addEventListener('click', ({target}) => {
    
    const clickedCar = target.parentElement.parentElement;
    console.log(clickedCar);
    const id = clickedCar.getAttribute('data-id');
    console.log(id);
    if(event.target.classList.contains('delete')){
        const excludeCar = clickedCar.cells[0].innerHTML;

        if(confirm(`Tem certeza? ${excludeCar}`)){
            db.collection('cars').doc(id).delete()
                .catch(err => console.log("Erro", err));
        }
    }
    if (target.classList.contains('destak')){
        db.collection('cars').doc(id).update({ destaque: !clickedCar.classList.contains('stared') })
        .catch(err => console.log('Erro', error));
    }
        
});