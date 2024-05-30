document.addEventListener('DOMContentLoaded', () => {
    const carForm = document.getElementById('carForm');
    const carList = document.getElementById('carList');
    const showSavedCarsBtn = document.getElementById('showSavedCars');
    let cars = JSON.parse(localStorage.getItem('cars')) || [];
    let currentEditIndex = -1;

    carForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const make = document.getElementById('make').value;
        const model = document.getElementById('model').value;
        const year = document.getElementById('year').value;
        const imageURL = document.getElementById('imageURL').value;

        const currentYear = new Date().getFullYear();
        if (year > currentYear) {
            alert('Год не может быть в будущем.');
            return;
        }

        if (currentEditIndex === -1) {
            // Добавить новый автомобиль
            cars.push(new Car(make, model, year, imageURL));
        } else {
            // Обновить существующий автомобиль
            cars[currentEditIndex].make = make;
            cars[currentEditIndex].model = model;
            cars[currentEditIndex].year = year;
            cars[currentEditIndex].imageURL = imageURL;
            currentEditIndex = -1;
        }

        carForm.reset();
        saveAndDisplayCars();
    });

    function saveAndDisplayCars() {
        localStorage.setItem('cars', JSON.stringify(cars));
        displayCars();
    }

    function displayCars() {
        carList.innerHTML = '';
        cars.forEach((car, index) => {
            const carItem = document.createElement('div');
            carItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            carItem.innerHTML = `
                <div class="d-flex align-items-center">
                    ${car.imageURL ? `<img src="${car.imageURL}" alt="Изображение Автомобиля" class="car-img">` : ''}
                    <div>
                        <h5>${car.make} ${car.model}</h5>
                        <p>${car.year}</p>
                    </div>
                </div>
                <div>
                    <button class="btn btn-sm btn-info edit-btn" data-index="${index}">Редактировать</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Удалить</button>
                </div>
            `;
            carList.appendChild(carItem);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                const car = cars[index];
                document.getElementById('make').value = car.make;
                document.getElementById('model').value = car.model;
                document.getElementById('year').value = car.year;
                document.getElementById('imageURL').value = car.imageURL;
                currentEditIndex = index;
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cars.splice(index, 1);
                saveAndDisplayCars();
            });
        });
    }

    showSavedCarsBtn.addEventListener('click', displayCars);

    // Initial display of saved cars
    displayCars();
});
