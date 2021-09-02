/*========== get div Function ===============*/
const getDiv = id => document.getElementById(id);
/* ========= total Result Count Function  ============= */
const toataCount = (start, end) => total.innerText = `Showing ${start} results of ${end}`;
/* ========= Create Div Function  ============= */
const crateDiv = () => document.createElement('div');

/* ========= Variable  ============= */
const displayContant = getDiv('display-contant');
const spinner = getDiv('spinner');
const inputError = getDiv('error-input');
const inputValue = getDiv('input-field');
const total = getDiv('total');

/* ============ Submin Button ============== */
document.getElementById('submit-btn').addEventListener('click', () => {

    if (inputValue.value === '') {
        inputError.innerText = "Input Field is Requeird";
    } else {
        spinner.classList.remove('d-none')
        const url = `https://openlibrary.org/search.json?q=${inputValue.value}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayBook(data))
        /* ========= Clear Data ============= */
        inputValue.value = '';
        inputError.innerText = '';
        displayContant.textContent = '';
        total.innerText = '';
    }

})

const displayBook = data => {
    /* ========= Chack Data  ============= */
    if (data.numFound === 0) {
        toataCount(0, 0);
        const errorDiv = crateDiv();
        errorDiv.innerHTML = `<p class="text-danger text-center">Result Not Found</p>`
        displayContant.appendChild(errorDiv);
        spinner.classList.add('d-none');

    } else {

        toataCount(data.docs.length, data.numFound);

        data.docs.forEach(book => {
            const div = crateDiv();
            div.classList.add('col-12', 'col-md-4', 'col-lg-3');
            div.innerHTML = `
                <div class="book-item bg-white rounded-3 h-100">
                    <img src="https://covers.openlibrary.org/w/id/${book.cover_i}-M.jpg"
                        class="rounded-3 p-2 book-img" alt="">
                    <div class="book-content p-2">
                        <h5 class="book-title">${book.title}</h5>
                        <p class="book-text mb-0"><b>Author:</b> ${book.author_name?book.author_name[0]:'Unknown Author' } </p>
                        <p class="book-text mb-0"><b>Publisher:</b> ${book.publisher?book.publisher[0]:'Unknown Publisher'}</p>
                        <p class="book-text mb-0"><b>First_Publish_date:</b> ${book.first_publish_year?book.first_publish_year:'Unknown Date'}</p>
                    </div>
                </div>
            `;
            spinner.classList.add('d-none');
            displayContant.appendChild(div);
        })
    }

}