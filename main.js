const addBtn = document.getElementById('add');
const finishedBtn = document.getElementById('finished');
const currentBtn = document.getElementById('current');

const notes = JSON.parse(localStorage.getItem('notes'));
    if (notes) {
        notes.forEach(note => {
            addNewNote(note);
        })
    }
    
    addBtn.addEventListener('click', () => {
        addNewNote();
    });
    
    
    let listFirst = document.querySelector('.current-list');
    let listSecond = document.querySelector('.done-list');

    currentBtn.classList.toggle('hidden');

currentBtn.addEventListener('click', () => {
    if (currentBtn.classList.contains('hidden')) {
        currentBtn.classList.remove('hidden');
        addBtn.classList.toggle('hidden');
        finishedBtn.classList.toggle('hidden');

        listFirst.classList.add('hidden');
        listSecond.classList.remove('hidden');
    }else {
        addBtn.classList.remove('hidden');
        finishedBtn.classList.remove('hidden');
        currentBtn.classList.toggle('hidden');
        
        listFirst.classList.remove('hidden');
        listSecond.classList.add('hidden');
    }
});

finishedBtn.addEventListener('click', () => {
    if (finishedBtn.classList.contains('hidden')) {
        currentBtn.classList.remove('hidden');
        finishedBtn.classList.toggle('hidden');
        
        listSecond.classList.add('hidden');
        listFirst.classList.remove('hidden');
    }else {
        addBtn.classList.toggle('hidden');
        finishedBtn.classList.toggle('hidden');
        currentBtn.classList.remove('hidden');
        
        listSecond.classList.remove('hidden');
        listFirst.classList.add('hidden');
    }
});
    
    function addNewNote(text = '') {
        const note = document.createElement('div');
    note.classList.add('note');
    
    note.innerHTML = `
    <div class="notes">
    <div class="tools">
    <button class="done"><i class="fas fa-check"></i></button>
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash"></i></button>
    </div>
    <div class="main ${text? '' : 'hidden'}"></div>
    <textarea class="${text? 'hidden' : ''}"></textarea>
    </div>
    `;
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const doneBtn = note.querySelector('.done');
    
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    let listFirst = document.querySelector('.current-list');
    let listSecond = document.querySelector('.done-list');
    
    textArea.value = text;
    main.innerHTML = marked(text);
    
    doneBtn.addEventListener('click', () => {
        listSecond.appendChild(note);
        doneBtn.classList.add('hidden');
        editBtn.classList.add('hidden');
    })
    
    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
        if(screen.width < 576) {
            listFirst.classList.remove('active');
        }
    });
    
    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS()
    })
    textArea.addEventListener('click', () => {
        if(screen.width < 576) {
            listFirst.classList.add('active');
        }else{
            listFirst.classList.remove('.active');
        }
    });
    window.addEventListener('', (click) => {
        if(screen.width < 576) {
            listFirst.classList.remove('active');
        }
    });
    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        
        main.innerHTML = marked(value);
        
        updateLS()
    });
    listFirst.appendChild(note);
}
function updateLS() {
    const notesText = document.querySelectorAll('textarea');
    
    const notes = [];
    
    notesText.forEach(note => {
        notes.push(note.value);
    });
    
    localStorage.setItem('notes', JSON.stringify(notes));
}