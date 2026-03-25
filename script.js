const API_URL = "https://inventory-management-api-sage.vercel.app/api/items";

const itemForm = document.getElementById("item-form");
const itemIdInput = document.getElementById("item-id");
const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const quantityInput = document.getElementById("quantity");
const priceInput = document.getElementById("price");
const supplierInput = document.getElementById("supplier");
const itemTableBody = document.getElementById("item-table-body");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
const refreshBtn = document.getElementById("refresh-btn");
const messageBox = document.getElementById("message");

document.addEventListener("DOMContentLoaded", getItems);
refreshBtn.addEventListener("click", getItems);

itemForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = itemIdInput.value;

  const itemData = {
    name: nameInput.value.trim(),
    category: categoryInput.value.trim(),
    quantity: Number(quantityInput.value),
    price: Number(priceInput.value),
    supplier: supplierInput.value.trim()
  };

  if (!itemData.name || !itemData.category || !itemData.supplier) {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  if (itemData.quantity < 0 || itemData.price < 0) {
    showMessage("Quantity and price must be non-negative.", "error");
    return;
  }

  try {
    if (id) {
      await updateItem(id, itemData);
    } else {
      await createItem(itemData);
    }

    resetForm();
    getItems();
  } catch (error) {
    showMessage(error.message || "Something went wrong.", "error");
  }
});

cancelEditBtn.addEventListener("click", resetForm);

async function getItems() {
  itemTableBody.innerHTML = `
    <tr>
      <td colspan="7" class="empty">Loading items...</td>
    </tr>
  `;

  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch items");
    }

    renderItems(result.data || []);
  } catch (error) {
    itemTableBody.innerHTML = `
      <tr>
        <td colspan="7" class="empty">Failed to load items</td>
      </tr>
    `;
    showMessage(error.message || "Failed to fetch data", "error");
  }
}

function renderItems(items) {
  if (!items.length) {
    itemTableBody.innerHTML = `
      <tr>
        <td colspan="7" class="empty">No inventory items found.</td>
      </tr>
    `;
    return;
  }

  itemTableBody.innerHTML = items
    .map(
      (item) => `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.quantity}</td>
        <td>$${Number(item.price).toFixed(2)}</td>
        <td>${item.supplier}</td>
        <td>
          <button class="btn btn-edit" onclick="startEdit(${item.id}, '${escapeText(item.name)}', '${escapeText(item.category)}', ${item.quantity}, ${item.price}, '${escapeText(item.supplier)}')">Edit</button>
          <button class="btn btn-delete" onclick="deleteItem(${item.id})">Delete</button>
        </td>
      </tr>
    `
    )
    .join("");
}

async function createItem(itemData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(itemData)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create item");
  }

  showMessage("Item added successfully.", "success");
}

async function updateItem(id, itemData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(itemData)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update item");
  }

  showMessage("Item updated successfully.", "success");
}

async function deleteItem(id) {
  const confirmDelete = confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete item");
    }

    showMessage("Item deleted successfully.", "success");
    getItems();
  } catch (error) {
    showMessage(error.message || "Failed to delete item", "error");
  }
}

function startEdit(id, name, category, quantity, price, supplier) {
  itemIdInput.value = id;
  nameInput.value = name;
  categoryInput.value = category;
  quantityInput.value = quantity;
  priceInput.value = price;
  supplierInput.value = supplier;

  formTitle.textContent = "Edit Item";
  submitBtn.textContent = "Update Item";
  cancelEditBtn.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function resetForm() {
  itemForm.reset();
  itemIdInput.value = "";
  formTitle.textContent = "Add New Item";
  submitBtn.textContent = "Add Item";
  cancelEditBtn.classList.add("hidden");
}

function showMessage(message, type) {
  messageBox.textContent = message;
  messageBox.className = `message ${type}`;
  messageBox.classList.remove("hidden");

  setTimeout(() => {
    messageBox.classList.add("hidden");
  }, 3000);
}

function escapeText(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, "&quot;");
}