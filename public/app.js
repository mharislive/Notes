const formTitle = $(".modal-title");
const noteLabel = $("#note-label");
const addModalButton = $("#add-modal");
const updateModalButton = $(".update-modal");
const noteModal = $("#note-modal");
const formBtn = $(".form-btn");
const note = $("#note");
const content = $("#content");
const modalBody = $(".modal-body");
const searchForm = $(".search-form");
const clearBtn = $(".clear");
const searchInput = $("#search-text");

addModalButton.on("click", function() {
  clearError();
  formTitle.text("Add Note");
  formBtn.removeClass("update").addClass("add");
  note.val("");
  $("#note-modal").modal("toggle");
});

$(document).on("click", ".update-modal", function() {
  clearError();
  const el = $(this);
  const id = el.parent().data("id");
  updateModalHandler(id);
});

$(document).on("click", ".delete", function() {
  const el = $(this);
  const id = el.parent().data("id");
  deleteNote(id);
});

formBtn.on("click", function() {
  const noteText = note.val();
  if (formBtn.hasClass("add")) {
    saveNote(noteText);
  } else if (formBtn.hasClass("update")) {
    updateNote(noteText, $(this).data("id"));
  }
});

searchForm.on("submit", async function(e) {
  e.preventDefault();
  let searchText = searchInput.val();
  if (searchText) {
    searchText = searchText.toLowerCase().trim();
    await searchNotes(searchText);
    searchTextHTML(searchText);
  }
});

clearBtn.on("click", function() {
  clearSearch();
});

async function updateModalHandler(id) {
  const title = await getNote(id);
  formTitle.text("Update Note");
  formBtn.removeClass("add").addClass("update");
  formBtn.attr("data-id", id);

  note.val(title);
  $("#note-modal").modal("toggle");
}

async function getNotes() {
  try {
    let response = await fetch(`/api/notes`);
    let jsonData = await response.json();
    const { data, error } = jsonData;

    if (error) {
      content.html(`<div class="card mb-4">
          <div class="card-body">
            ${error}
          </div>
        </div>`);
    } else {
      let html = "";
      data.forEach(item => {
        html += `<div class="card mb-4">
					<div class="card-header text-right" data-id=${item._id}>
						<button class="btn btn-sm btn-warning update-modal">Edit</button>
						<button class="btn btn-sm btn-danger delete">Delete</button>
					</div>
          <div class="card-body">
            <pre>${item.title}</pre>
          </div>
        </div>`;
      });
      content.html(html);
    }
  } catch (err) {
    console.log(err);
  }
}

async function getNote(id) {
  try {
    let response = await fetch(`/api/notes/${id}`);
    let jsonData = await response.json();
    const { data, error } = jsonData;
    return data.title;
  } catch (err) {
    console.log(err);
  }
}

async function searchNotes(text) {
  try {
    const searchData = {
      text
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(searchData)
    };
    let response = await fetch(`/api/notes/search`, options);
    let jsonData = await response.json();
    const { data, error } = jsonData;

    if (error) {
      content.html(`<div class="card mb-4">
          <div class="card-body">
            ${error}
          </div>
        </div>`);
    } else {
      let html = "";
      data.forEach(item => {
        html += `<div class="card mb-4">
					<div class="card-header text-right" data-id=${item._id}>
						<button class="btn btn-sm btn-warning update-modal">Edit</button>
						<button class="btn btn-sm btn-danger delete">Delete</button>
					</div>
          <div class="card-body">
            <pre>${item.title}</pre>
          </div>
        </div>`;
      });
      content.html(html);
    }
  } catch (err) {
    console.log(err);
  }
}

async function saveNote(note) {
  try {
    const data = { title: note };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    let response = await fetch(`/api/notes`, options);
    let jsonData = await response.json();
    const { error } = jsonData;
    if (error) {
      showError(error);
    } else {
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

async function updateNote(note, id) {
  try {
    const data = { title: note };
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    let response = await fetch(`/api/notes/${id}`, options);
    let jsonData = await response.json();
    const { error } = jsonData;
    if (error) {
      showError(error);
    } else {
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteNote(id) {
  try {
    const options = {
      method: "DELETE"
    };
    let response = await fetch(`/api/notes/${id}`, options);
    let jsonData = await response.json();
    const { data, error } = jsonData;
    if (error) {
      console.log(error);
    } else {
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

function searchTextHTML(text) {
  $("#search-result").remove();
  const html = `<p class="search-result">Search result for term: ${text}</p>`;
  content.prepend(html);
}

function clearSearchTextHTML() {
  $("#search-result").remove();
}

function clearSearch() {
  clearSearchTextHTML();
  location.reload();
}

function showError(errMsg) {
  const html = `<div class="alert alert-danger" id="error" role="alert">${errMsg}</div>`;
  modalBody.prepend(html);
}

function clearError() {
  $("#error").remove();
}

$(function() {
  getNotes();
});
