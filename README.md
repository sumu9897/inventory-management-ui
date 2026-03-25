# 📦 Inventory Dashboard

A lightweight, browser-based inventory management application that connects to a REST API for full CRUD operations — no frameworks, no build tools, just clean HTML, CSS, and JavaScript.

---

## 🖥️ Live Preview

Open `index.html` directly in your browser or serve it with any static file server.

---

## ✨ Features

- **View all inventory items** in a clean, responsive table
- **Add new items** via a structured form
- **Edit existing items** with inline form pre-filling
- **Delete items** with a confirmation prompt
- **Real-time feedback** with success/error message banners
- **Refresh button** to manually re-fetch inventory data
- Fully **responsive layout** for mobile and desktop

---

## 📁 Project Structure

```
├── index.html     # Main HTML structure and layout
├── style.css      # All styling — responsive, clean UI
└── script.js      # API calls and DOM interactions
```

---

## 🔌 API

All data is fetched from and sent to:

```
https://inventory-management-api-sage.vercel.app/api/items
```

### Endpoints Used

| Method   | Endpoint            | Description          |
|----------|---------------------|----------------------|
| `GET`    | `/api/items`        | Fetch all items      |
| `POST`   | `/api/items`        | Create a new item    |
| `PUT`    | `/api/items/:id`    | Update an item by ID |
| `DELETE` | `/api/items/:id`    | Delete an item by ID |

### Item Object Structure

```json
{
  "id": 1,
  "name": "Wireless Mouse",
  "category": "Electronics",
  "quantity": 50,
  "price": 29.99,
  "supplier": "TechSupplies Co."
}
```

---

## 🚀 Getting Started

### Option 1 — Open directly

Just double-click `index.html` to open it in your browser.


## 🧩 How It Works

### On Page Load
`getItems()` is called automatically via `DOMContentLoaded`, fetching all inventory items from the API and rendering them into the table.

### Adding an Item
Fill in the form fields (Name, Category, Quantity, Price, Supplier) and click **Add Item**. The form data is sent as a `POST` request. On success, the table refreshes automatically.

### Editing an Item
Click the **Edit** button on any row. The form pre-fills with that item's data, the title changes to *"Edit Item"*, and a **Cancel Edit** button appears. Submitting sends a `PUT` request to update the item.

### Deleting an Item
Click **Delete** on any row. A browser confirmation dialog appears before the `DELETE` request is sent.

### Validation
Client-side validation ensures:
- Name, Category, and Supplier fields are not empty
- Quantity and Price are non-negative numbers

---

## 📱 Responsive Design

The layout adapts for smaller screens:
- The form grid switches from 2-column to 1-column
- The table scrolls horizontally on small viewports
- The header and controls stack vertically

---

## 🛠️ Customisation

### Changing the API URL
Update the constant at the top of `script.js`:

```js
const API_URL = "https://inventory-management-api-sage.vercel.app/api/items";
```

### Styling
All colours and styles are in `style.css`. The primary brand colour (`#1f3c88`) is used throughout — search and replace it to retheme the entire dashboard instantly.

---
