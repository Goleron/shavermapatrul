class Movie {
    constructor(title, director, year, genre, imageUrl) {
        this.title = title;
        this.director = director;
        this.year = year;
        this.genre = genre;
        this.imageUrl = imageUrl;
    }
}

let movies = [];
let editingIndex = -1;

document.getElementById('movieForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const year = document.getElementById('year').value;
    const genre = document.getElementById('genre').value;
    const imageUrl = document.getElementById('image').value;

    if (!title || !director || year < 1900 || year > new Date().getFullYear() || !genre || !imageUrl) {
        alert("Пожалуйста, введите корректные данные о фильме, включая URL изображения");
        return;
    }

    const movie = new Movie(title, director, year, genre, imageUrl);

    if (editingIndex === -1) {
        movies.push(movie);
    } else {
        movies[editingIndex] = movie;
        editingIndex = -1;
    }

    renderMovies();
    clearForm();
});

function renderMovies() {
    const list = document.getElementById('movieList');
    list.innerHTML = '';

    movies.forEach((movie, index) => {
        const li = document.createElement('li');
        li.style.listStyleType = 'none';

        const imgDiv = document.createElement('div');
        if (movie.imageUrl) {
            const img = document.createElement('img');
            img.src = movie.imageUrl;
            img.alt = `Изображение фильма: ${movie.title}`;
            img.style.width = '500px';
            img.style.height = 'auto';
            imgDiv.appendChild(img);
        }
        li.appendChild(imgDiv);

        const infoDiv = document.createElement('div');
        infoDiv.textContent = `${movie.title} (Режиссер: ${movie.director}, Год: ${movie.year}, Жанр: ${movie.genre}) `;
        li.appendChild(infoDiv);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.onclick = function() { deleteMovie(index); };
        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        editButton.onclick = function() { editMovie(index); };

        li.appendChild(editButton);
        li.appendChild(deleteButton);

        list.appendChild(li);
    });
}

function deleteMovie(index) {
    movies.splice(index, 1);
    renderMovies();
}

function editMovie(index) {
    const movie = movies[index];
    document.getElementById('title').value = movie.title;
    document.getElementById('director').value = movie.director;
    document.getElementById('year').value = movie.year;
    document.getElementById('genre').value = movie.genre;
    document.getElementById('image').value = movie.imageUrl;
    editingIndex = index;
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('director').value = '';
    document.getElementById('year').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('image').value = '';
}

function init() {
    renderMovies();
}

init();
