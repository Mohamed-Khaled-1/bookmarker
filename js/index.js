// ========================== General Variables and Declarations ==========================
var SiteName = document.getElementById("site-name");
var SiteUrl = document.getElementById("site-url");
var tableBody = document.getElementById("tableBody");
var boxLayer = document.getElementById("boxLayer");
var submitBoxLayer = document.getElementById("submitBoxLayer");
var DeleteBoxLayer = document.getElementById("DeleteBoxLayer");
var currentDeleteIndex = null;
var siteData = [];

// ========================== Load Data from LocalStorage ==========================
if (localStorage.getItem("siteData") != null) {
  siteData = JSON.parse(localStorage.getItem("siteData"));
  displayBookmarks();
}

// ========================== URL Validator Function ==========================
function urlValid(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

// ========================== Name Validation ==========================
function nameInputValidation() {
  if (SiteName.value.trim().length >= 3) {
    SiteName.classList.add("is-valid");
    SiteName.classList.remove("is-invalid");
    return true;
  } else {
    SiteName.classList.add("is-invalid");
    SiteName.classList.remove("is-valid");
    return false;
  }
}

// ========================== URL Validation ==========================
function urlInputValidation() {
  if (urlValid(SiteUrl.value.trim())) {
    SiteUrl.classList.add("is-valid");
    SiteUrl.classList.remove("is-invalid");
    return true;
  } else {
    SiteUrl.classList.add("is-invalid");
    SiteUrl.classList.remove("is-valid");
    return false;
  }
}

// ========================== Clear Input Fields ==========================
function clearFields(field1, field2) {
  field1.value = "";
  field2.value = "";
}

// ========================== Push Data to Array and LocalStorage ==========================
function pushData(input, array) {
  array.push(input);
  localStorage.setItem("siteData", JSON.stringify(array));
}

// ========================== Display Bookmarks ==========================
function displayBookmarks() {
  var displayContainer = "";
  for (var i = 0; i < siteData.length; i++) {
    displayContainer += `
      <tr>
        <td>${i + 1}</td>
        <td>${siteData[i].sName}</td>
        <td>
          <button onclick="visitBookmark(${i})" class="btn btn-sm text-center btn-visit text-white">
            <i class="fa-solid fa-eye pe-2"></i>visit
          </button>
        </td>
        <td>
          <button onclick="displayDeleteLayer(${i})" class="btn btn-danger  btn-sm text-center text-white">
            <i class="fa-solid fa-trash-can pe-2"></i>delete
          </button>
        </td>
      </tr>`;
  }
  tableBody.innerHTML = displayContainer;
}

// ========================== Delete Bookmark ==========================
function deleteBookmark(index) {
  siteData.splice(index, 1);
  localStorage.setItem("siteData", JSON.stringify(siteData));
  displayBookmarks();
}

// ========================== Visit Bookmark ==========================
function visitBookmark(index) {
  window.open(`${siteData[index].sUrl}`, "_blank");
}

// ========================== Box Display Control ==========================
function displayBoxLayer() {
  boxLayer.classList.remove("d-none");
}

function closeBox() {
  boxLayer.classList.add("d-none");
}

function displaySubmitlayer() {
  submitBoxLayer.classList.remove("d-none");
}

function closeSubmitBox() {
  submitBoxLayer.classList.add("d-none");
}

function displayDeleteLayer(index) {
  currentDeleteIndex = index;
  DeleteBoxLayer.classList.remove("d-none");
}

function closeDeleteBox() {
  DeleteBoxLayer.classList.add("d-none");
}

function confirmDelete() {
  if (currentDeleteIndex !== null) {
    deleteBookmark(currentDeleteIndex);
    currentDeleteIndex = null;
    closeDeleteBox();
  }
}

// ========================== Add Bookmark ==========================
function addBookmark() {
  if (!nameInputValidation() || !urlInputValidation()) {
    displayBoxLayer();
    return;
  } else {
    var siteElemnt = {
      sName: SiteName.value.trim(),
      sUrl: SiteUrl.value.trim(),
    };

    pushData(siteElemnt, siteData);
    clearFields(SiteName, SiteUrl);

    SiteUrl.classList.remove("is-valid");
    SiteName.classList.remove("is-valid");

    displaySubmitlayer();
    displayBookmarks();
  }
}
