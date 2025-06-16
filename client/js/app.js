async function loadChefsForSelect() {
    const response = await fetch('http://localhost:3000/api/chefs');
    const chefs = await response.json();
    const select = document.getElementById('chef_id');
    
    chefs.forEach(chef => {
        const option = document.createElement('option');
        option.value = chef.chef_id;
        option.textContent = chef.bio || `Шеф #${chef.chef_id}`;
        select.appendChild(option);
    });
}


async function loadRecipesForSelect() {
    const response = await fetch('http://localhost:3000/api/recipes');
    const recipes = await response.json();
    const select = document.getElementById('recipe_id');
    
    recipes.forEach(recipe => {
        const option = document.createElement('option');
        option.value = recipe.recipe_id;
        option.textContent = recipe.title;
        select.appendChild(option);
    });
}


function openEditRecipeModal(recipe) {
    const modal = document.getElementById('editRecipeModal');
    document.getElementById('edit_recipe_id').value = recipe.recipe_id;
    document.getElementById('edit_title').value = recipe.title;
    document.getElementById('edit_cooking_time').value = recipe.cooking_time;
    document.getElementById('edit_difficulty').value = recipe.difficulty;
    modal.style.display = 'block';
}


document.querySelectorAll('.close').forEach(btn => {
    btn.onclick = function() {
        this.closest('.modal').style.display = 'none';
    };
});


window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

async function loadChefs() {
    const response = await fetch('http://localhost:3000/api/chefs');
    const data = await response.json();
    const container = document.getElementById('chefs');
    
    container.innerHTML = data.map(chef => `
        <div class="recipe-item">
            <h3>${chef.bio || 'Шеф-повар'}</h3>
            <p>Специализация: ${chef.specialization || 'Не указана'}</p>
            <p>Рейтинг: ${chef.rating || 'Нет оценок'}</p>
        </div>
    `).join('');
}

async function loadRecipes() {
    const response = await fetch('http://localhost:3000/api/recipes');
    const data = await response.json();
    const container = document.getElementById('recipes');
    
    container.innerHTML = data.map(recipe => `
        <div class="recipe-item">
            <h3>${recipe.title}</h3>
            <p>Время готовки: ${recipe.cooking_time} мин</p>
            <p>Сложность: ${recipe.difficulty}</p>
            <p>Автор: ${recipe.chef_name}</p>
            <button onclick="deleteRecipe(${recipe.recipe_id})">Удалить</button>
            <button onclick="openEditRecipeModal(${JSON.stringify(recipe).replace(/"/g, '&quot;')})">Редактировать</button>
            <button onclick="showGroceryList(${recipe.recipe_id})">Список покупок</button>
        </div>
    `).join('');
}

async function showGroceryList(recipeId) {
    const response = await fetch(`http://localhost:3000/api/recipes/${recipeId}/grocery-list`);
    const items = await response.json();
    alert(items.map(item => `${item.name}: ${item.amount}`).join('\n'));
}


async function loadRecommendations() {
    const response = await fetch('http://localhost:3000/api/users/1/recommendations');
    const data = await response.json();
    const container = document.getElementById('recommendations');
    
    if (data.length === 0) {
        container.innerHTML = '<p>Пройдите мастер-классы, чтобы получить рекомендации</p>';
        return;
    }

    container.innerHTML = data.map(item => `
        <div class="recipe-item">
            <h3>${new Date(item.schedule).toLocaleString()}</h3>
            <p>Шеф-повар: ${item.chef_name}</p>
            <p>Цена: ${item.price} ₽</p>
            <button onclick="registerToClass(${item.class_id})">Записаться</button>
        </div>
    `).join('');
}


async function loadMasterclasses() {
    const response = await fetch('http://localhost:3000/api/masterclasses');
    const data = await response.json();
    const container = document.getElementById('masterclasses');
    
    container.innerHTML = data.map(item => `
        <div class="recipe-item">
            <h3>${new Date(item.schedule).toLocaleString()}</h3>
            <p>Рецепт: ${item.recipe_title}</p>
            <p>Участников: ${item.max_participants || 'не ограничено'}</p>
            <button onclick="deleteMasterclass(${item.class_id})">Удалить</button>
            <button onclick="openEditMasterclassModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">Редактировать</button>
            <button onclick="registerToClass(${item.class_id})">Записаться</button>
        </div>
    `).join('');
}


document.getElementById('editRecipeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('edit_title').value,
        cooking_time: parseInt(document.getElementById('edit_cooking_time').value),
        difficulty: document.getElementById('edit_difficulty').value,
        chef_id: 1 // Замените на актуальный ID
    };

    const recipeId = document.getElementById('edit_recipe_id').value;

    try {
        const response = await fetch(`http://localhost:3000/api/recipes/${recipeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
        });
        
        if (response.ok) {
        alert('Рецепт обновлён!');
        document.getElementById('editRecipeModal').style.display = 'none';
        loadRecipes();
        }
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
});


function openEditMasterclassModal(masterclass) {
    const modal = document.getElementById('editMasterclassModal');
    document.getElementById('edit_class_id').value = masterclass.class_id;
    document.getElementById('edit_chef_id').value = masterclass.chef_id; // Сохраняем chef_id
    document.getElementById('edit_recipe_id').value = masterclass.recipe_id; // Сохраняем recipe_id
    document.getElementById('edit_schedule').value = masterclass.schedule.slice(0, 16);
    document.getElementById('edit_price').value = masterclass.price;
    document.getElementById('edit_max_participants').value = masterclass.max_participants || '';
    modal.style.display = 'block';
}


document.getElementById('editMasterclassForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        schedule: new Date(document.getElementById('edit_schedule').value).toISOString(),
        price: parseFloat(document.getElementById('edit_price').value),
        max_participants: parseInt(document.getElementById('edit_max_participants').value) || null,
        chef_id: parseInt(document.getElementById('edit_chef_id').value), // Берем из скрытого поля
        recipe_id: parseInt(document.getElementById('edit_recipe_id').value) // Берем из скрытого поля
    };

    const classId = document.getElementById('edit_class_id').value;

    try {
        const response = await fetch(`http://localhost:3000/api/masterclasses/${classId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
        });
        
        if (response.ok) {
        alert('Мастер-класс обновлён!');
        document.getElementById('editMasterclassModal').style.display = 'none';
        loadMasterclasses();
        }
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
});


async function registerToClass(classId) {
    try {
        const response = await fetch('http://localhost:3000/api/user_classes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: 1,
                class_id: classId
            })
        });
        alert('Вы успешно записаны!');
        loadRecommendations();
    } catch (error) {
        alert('Ошибка записи: ' + error.message);
    }
}


async function loadChefsForRecipeForm() {
    try {
        const response = await fetch('http://localhost:3000/api/chefs');
        const chefs = await response.json();
        const select = document.getElementById('chef_id');
        
        select.innerHTML = '<option value="">Выберите шеф-повара</option>';
        
        chefs.forEach(chef => {
        const option = document.createElement('option');
        option.value = chef.chef_id;
        option.textContent = chef.bio || `Шеф #${chef.chef_id}`;
        select.appendChild(option);
        });
    } catch (error) {
        console.error('Ошибка загрузки поваров:', error);
    }
}


async function deleteRecipe(recipeId) {
    if (!confirm('Удалить рецепт?')) return;
    
    try {
        const response = await fetch(`http://localhost:3000/api/recipes/${recipeId}`, {
        method: 'DELETE'
        });
        if (response.ok) {
        alert('Рецепт удалён!');
        loadRecipes(); // Обновляем список
        } else {
        throw new Error(await response.text());
        }
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
}


async function deleteMasterclass(classId) {
    if (!confirm('Удалить мастер-класс?')) return;
    
    try {
        const response = await fetch(`http://localhost:3000/api/masterclasses/${classId}`, {
        method: 'DELETE'
        });
        if (response.ok) {
        alert('Мастер-класс удалён!');
        loadMasterclasses(); // Обновляем список
        }
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
}



document.getElementById('addMasterclassForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        chef_id: parseInt(document.getElementById('chef_id').value),
        recipe_id: parseInt(document.getElementById('recipe_id').value),
        schedule: new Date(document.getElementById('schedule').value).toISOString(),
        price: parseFloat(document.getElementById('price').value),
        max_participants: parseInt(document.getElementById('max_participants').value) || null
    };

    try {
        const response = await fetch('http://localhost:3000/api/masterclasses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Мастер-класс создан!');
            loadMasterclasses();
            document.getElementById('addMasterclassForm').reset();
        } else {
            throw new Error('Ошибка сервера');
        }
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
});


document.getElementById('addRecipeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('title').value,
        cooking_time: parseInt(document.getElementById('cooking_time').value),
        difficulty: document.getElementById('difficulty').value,
        chef_id: parseInt(document.getElementById('chef_id').value)
    };

    try {
        const response = await fetch('http://localhost:3000/api/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
        });
        
        if (response.ok) {
        alert('Рецепт добавлен!');
        loadRecipes();
        document.getElementById('addRecipeForm').reset();
        } else {
        throw new Error('Ошибка сервера');
        }
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    loadRecommendations();
    loadMasterclasses();
    loadChefs();
    loadRecipes();
    loadChefsForSelect();
    loadRecipesForSelect();
    loadChefsForRecipeForm();
});