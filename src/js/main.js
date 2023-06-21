let elements = JSON.parse(localStorage.getItem('elements')) || {};

if (Object.keys(elements).length === 0) {
    for (let i = 1; i <= 5; i++) {
        const elementId = i.toString();
        elements[elementId] = {
            title: `Element ${i}`,
            description: `Opis elementu ${i}`,
            expanded: false
        };
    }
}

const form = document.getElementById('form');
const elementsContainer = document.getElementById('elementsContainer');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');

    const title = titleInput.value;
    const description = descriptionInput.value;

    const newElementId = Date.now().toString();

    elements[newElementId] = { title, description, expanded: false };

    localStorage.setItem('elements', JSON.stringify(elements));

    renderElement(newElementId);

    titleInput.value = '';
    descriptionInput.value = '';
});

function renderElements() {
    elementsContainer.innerHTML = '';

    for (const elementId in elements) {
        renderElement(elementId);
    }
}

function renderElement(elementId) {
    const element = elements[elementId];

    const elementWrapper = document.createElement('div');
    elementWrapper.classList.add('element-wrapper');

    const titleElement = document.createElement('h2');
    titleElement.textContent = element.title;
    elementWrapper.appendChild(titleElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = element.description;
    elementWrapper.appendChild(descriptionElement);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = element.expanded ? 'Zwiń' : 'Rozwiń';
    elementWrapper.appendChild(toggleButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edytuj';
    elementWrapper.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Usuń';
    elementWrapper.appendChild(deleteButton);

    toggleButton.addEventListener('click', function () {
        element.expanded = !element.expanded;
        toggleButton.textContent = element.expanded ? 'Zwiń' : 'Rozwiń';
        descriptionElement.style.display = element.expanded ? 'block' : 'none';
        localStorage.setItem('elements', JSON.stringify(elements));
    });

    editButton.addEventListener('click', function () {
        const newTitle = prompt('Wprowadź nowy tytuł:', element.title);
        const newDescription = prompt('Wprowadź nowy opis:', element.description);

        if (newTitle && newDescription) {
            element.title = newTitle;
            element.description = newDescription;
            titleElement.textContent = newTitle;
            descriptionElement.textContent = newDescription;
            localStorage.setItem('elements', JSON.stringify(elements));
        }
    });

    deleteButton.addEventListener('click', function () {
        if (confirm('Czy na pewno chcesz usunąć ten element?')) {
            delete elements[elementId];
            elementWrapper.remove();
            localStorage.setItem('elements', JSON.stringify(elements));
        }
    });

    if (!element.expanded) {
        descriptionElement.style.display = 'none';
    }

    elementsContainer.appendChild(elementWrapper);
}

renderElements();
