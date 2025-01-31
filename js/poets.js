document.addEventListener('DOMContentLoaded', () => {
    fetch('/data/poets.json')
        .then(response => response.json())
        .then(poets => {
            const container = document.getElementById('poets-container');
            poets.forEach(poet => {
                const card = document.createElement('div');
                card.className = 'col-md-4';
                card.innerHTML = `
                    <div class="card mb-4 shadow-sm">
                        <div class="card-body text-center">
                            <h5 class="card-title">${poet.autor}</h5>
                            <p class="card-text">${poet.obra} (${poet.fecha})</p>
                            <a href="#" class="btn btn-outline-info" 
                                data-bs-toggle="modal" data-bs-target="#poetModal" 
                                data-poet='${JSON.stringify(poet)}'>Read More</a>
                        </div>
                    </div>
                `;

                container.appendChild(card);
            });

            const modal = document.getElementById('poetModal');
            modal.addEventListener('show.bs.modal', event => {
                const button = event.relatedTarget;
                const poet = JSON.parse(button.getAttribute('data-poet'));
                const modalTitle = modal.querySelector('.modal-title');
                const modalBody = modal.querySelector('.modal-body');

                modalTitle.textContent = poet.autor;
                modalBody.innerHTML = `
                    <p><strong>Work: </strong>${poet.obra}</p>
                    <p><strong>Year: </strong>${poet.fecha}</p>
                    <p><strong>Poem: </strong>${poet.poema.replace(/\//g, '<br>')}</p>
                `;
            });
        })
        .catch(error => console.error(error))
});