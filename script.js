// Sample book data for the OpenShelf Digital Library.
// This is a frontend demonstration; the books are not stored in a database.

const books = [
    {
        id: 1,
        title: "A Beginner's Guide to Web Development",
        author: "OpenShelf Learning Team",
        category: "Technology",
        coverClass: "cover-technology",
        description: "An introductory learning resource about website structure, styling and interactive features."
    },
    {
        id: 2,
        title: "Understanding the Law",
        author: "OpenShelf Learning Team",
        category: "Law",
        coverClass: "cover-law",
        description: "A general introduction to legal concepts, legal institutions and the role of law in society."
    },
    {
        id: 3,
        title: "Small Habits, Big Progress",
        author: "OpenShelf Learning Team",
        category: "Personal Development",
        coverClass: "cover-development",
        description: "A sample resource about building useful routines, setting goals and continuing to learn."
    },
    {
        id: 4,
        title: "Stories and the Human Experience",
        author: "OpenShelf Reading Collection",
        category: "Literature",
        coverClass: "cover-literature",
        description: "A sample literature entry for readers who enjoy stories, language and different perspectives."
    },
    {
        id: 5,
        title: "Digital Skills for Students",
        author: "OpenShelf Learning Team",
        category: "Technology",
        coverClass: "cover-technology",
        description: "A sample guide to digital literacy, online research and responsible use of technology."
    },
    {
        id: 6,
        title: "Rights, Duties and Society",
        author: "OpenShelf Learning Team",
        category: "Law",
        coverClass: "cover-law",
        description: "A sample introduction to rights, responsibilities and how people participate in society."
    }
];

const bookGrid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const bookCount = document.getElementById("bookCount");
const emptyMessage = document.getElementById("emptyMessage");
const bookDialog = document.getElementById("bookDialog");
const dialogContent = document.getElementById("dialogContent");
const closeDialog = document.getElementById("closeDialog");

// Display the books that match the current search and category.
function displayBooks() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredBooks = books.filter(function (book) {
        const matchesSearch =
            book.title.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" || book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    bookGrid.innerHTML = "";

    filteredBooks.forEach(function (book) {
        const card = document.createElement("article");
        card.className = "book-card";

        card.innerHTML = `
            <div class="book-cover ${book.coverClass}">
                <span class="cover-label">OpenShelf Collection</span>
                <h3>${book.category}</h3>
            </div>
            <span class="category-tag">${book.category}</span>
            <h3>${book.title}</h3>
            <p class="author">By ${book.author}</p>
            <p class="book-description">${book.description}</p>
            <button class="details-button" type="button" data-book-id="${book.id}">
                View details
            </button>
        `;

        bookGrid.appendChild(card);
    });

    bookCount.textContent = `${filteredBooks.length} ${filteredBooks.length === 1 ? "book" : "books"}`;
    emptyMessage.hidden = filteredBooks.length !== 0;
}

// Open a dialog with the selected book's information.
function showBookDetails(bookId) {
    const book = books.find(function (item) {
        return item.id === Number(bookId);
    });

    if (!book) {
        return;
    }

    dialogContent.innerHTML = `
        <p class="dialog-category">${book.category}</p>
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p>${book.description}</p>
        <p><em>This is sample catalogue information for the frontend demonstration.</em></p>
        <a class="dialog-link" href="https://openlibrary.org/search?q=${encodeURIComponent(book.title)}" target="_blank" rel="noopener noreferrer">
            Search for this title on Open Library ↗
        </a>
    `;

    bookDialog.showModal();
}

// Update results when the user types or changes the category.
searchInput.addEventListener("input", displayBooks);
categoryFilter.addEventListener("change", displayBooks);

// Use event delegation for the View details buttons.
bookGrid.addEventListener("click", function (event) {
    const button = event.target.closest("[data-book-id]");

    if (button) {
        showBookDetails(button.dataset.bookId);
    }
});

closeDialog.addEventListener("click", function () {
    bookDialog.close();
});

bookDialog.addEventListener("click", function (event) {
    if (event.target === bookDialog) {
        bookDialog.close();
    }
});

// Show all books when the page first loads.
displayBooks();
