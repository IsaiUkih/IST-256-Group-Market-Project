function renderCatalog(list) {
  const $grid = $("#productGrid").empty();
  if (!list || list.length === 0) {
    $grid.append('<div class="col-12"><div class="alert alert-warning mb-0">No products found.</div></div>');
    return;
  }

  list.forEach(item => {
    // Use placeholder if image not found
    const imgPath = `./images/${item.img}`;
    const imgTag = `<img src="${imgPath}" alt="${item.name}" class="img-fluid" style="max-height:90px; object-fit:contain"
                    onerror="this.onerror=null;this.src='https://via.placeholder.com/90?text=${encodeURIComponent(item.name)}';">`;

    const card = $(`
      <div class="col-12 col-md-6 col-lg-6">
        <div class="card card-product h-100">
          <div class="row g-0">
            <div class="col-4 d-flex align-items-center justify-content-center p-2">
              ${imgTag}
            </div>
            <div class="col-8">
              <div class="card-body">
                <h6 class="card-title mb-1" style="cursor:pointer">${item.name}</h6>
                <p class="mb-1 small text-muted">${item.category}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="fw-bold">$${formatCurrency(item.price)}</div>
                  <div>
                    <input type="number" class="form-control form-control-sm d-inline-block qty-input" min="1" value="1" style="width:80px;">
                    <button class="btn btn-sm btn-primary ms-2 add-btn">Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);

    card.data("product", item);
    $grid.append(card);
  });
}
