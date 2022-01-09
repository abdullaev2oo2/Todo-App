// variables
const addBtn = document.getElementById('add');
const finishedBtn = document.getElementById('finished');
const currentBtn = document.getElementById('current');

let listFirst = document.querySelector('.current-list');
let listSecond = document.querySelector('.done-list');


listSecond.classList.add('hidden');
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

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach(note => {
        if(note.includes('class=done')){
            const noteValue = note.replace('class=done', '');
            addToFinished(noteValue);
        }else if(note.includes('hidden')){
            const noteValue = note.replace('hidden', '');
            addToFinished(noteValue);
        }else {
            addNewNote(note)
        }
    })
};
addBtn.addEventListener('click', () => {
    addNewNote();
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
            textArea.classList.add('class=done');
        })
        
        editBtn.addEventListener('click', () => {
            main.classList.toggle('hidden');
            textArea.classList.toggle('hidden');
        });
        
        deleteBtn.addEventListener('click', () => {
            note.remove();
            updateLS()
        })
        textArea.addEventListener('input', (e) => {
            const { value } = e.target;
            
            main.innerHTML = marked(value);
            
            updateLS()
        });
        listFirst.appendChild(note);
}

function addToFinished(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');
    
    note.innerHTML = `
    <div class="notes">
    <div class="tools">
    <button class="delete"><i class="fas fa-trash"></i></button>
    </div>
    <div class="main ${text? '' : 'hidden'}"></div>
    <textarea class="${text? 'hidden' : ''}"></textarea>
    </div>
    `;

    const deleteBtn = note.querySelector('.delete');

    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    let listSecond = document.querySelector('.done-list');
        
    textArea.value = text;
    main.innerHTML = marked(text);

    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS()
    })
    listSecond.appendChild(note);
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');
    const notes = [];
    
    notesText.forEach(note => {
        notes.push(note.value + note.className);
    });
    
    localStorage.setItem('notes', JSON.stringify(notes));
}

const contactBtn = document.querySelector('.contact');
const closeBtn = document.querySelector('.close');
const panel = document.querySelector('.contact-me');

contactBtn.addEventListener('click', () => {
    if(contactBtn.classList.contains('hidden')) {
        contactBtn.classList.remove('hidden')
    }else {
        panel.classList.add('opened')
        contactBtn.classList.add('hidden')
    }
})

closeBtn.addEventListener('click', () => {
        panel.classList.remove('opened')
        contactBtn.classList.remove('hidden')
    }
)
