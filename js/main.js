window.onload = function() {
  function getCharacter() {
    fetch("https://rickandmortyapi.com/api/character")
      .then(response => {
        return response.json();
      })
      .then(data => {
        var results = data.results;
        var page = data.info;
        let output = "";
        for (let item of results) {
          output += `
          <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                  <img class="card-img-top" src="${
                    item.image
                  }" alt="Card image cap">
                  <div class="card-body">
                      <div class="card-title">
                          <strong> ${item.name}</strong>
                      </div>
                      <ul class="list-group">
                          <li class="list-group-item">
                              <b>Gender</b>: <span class="float-right">Male</span>
                          </li>
                          <li class="list-group-item">
                              <b>Species</b>: <span class="float-right">Male</span>
                          </li>
                          <li class="list-group-item">
                              <b>Date</b>: <span class="float-right">${new Date(
                                item.created
                              )}</span>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          `;
        }
        document.getElementById("itemsContainer").innerHTML = output;
        document.getElementById("pagination").innerHTML = `
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <a class="page-link" href="${page.prev}" tabindex="-1">
                Previous
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" onclick="getNext('${page.next}')" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>`;
      });
  }
  getCharacter();
};

function getNext(url) {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      var results = data.results;
      var page = data.info;
      console.log(page);
      let output = "";
      for (let item of results) {
        output += `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" src="${
                  item.image
                }" alt="Card image cap">
                <div class="card-body">
                    <div class="card-title">
                        <strong> ${item.name}</strong>
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <b>Gender</b>: <span class="float-right">Male</span>
                        </li>
                        <li class="list-group-item">
                            <b>Species</b>: <span class="float-right">Male</span>
                        </li>
                        <li class="list-group-item">
                            <b>Date</b>: <span class="float-right">${new Date(
                              item.created
                            )}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        `;
      }
      document.getElementById("itemsContainer").innerHTML = output;
      document.getElementById("pagination").innerHTML = `
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="${page.prev}" tabindex="-1">
              Previous
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" onclick="getNext('${page.next}')" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>`;
    });
}

let filterInput = document.getElementById("filterInput");
filterInput.addEventListener("keyup", filterCharacter);

function filterCharacter() {
  let filterValue = document.getElementById("filterInput").value.toUpperCase();
  // console.log(filterValue);

  let itemsContainer = document.getElementById("itemsContainer");

  let item = itemsContainer.querySelectorAll(".col-md-4");

  for (let i = 0; i < item.length; i++) {
    let a = item[i].getElementsByClassName("card")[0];

    if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      item[i].style.display = "";
    } else {
      item[i].style.display = "none";
    }
  }
}
