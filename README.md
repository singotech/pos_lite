# POS Lite

A lightweight point-of-sale app built with plain HTML, CSS, and JavaScript. It runs in the browser and stores products, configuration, and sales in that browser's local storage.

## Features

- Scan product barcodes or search products manually at checkout.
- Review a compact checkout cart, confirm before clearing or saving, record paid or unpaid status, take payment, and save or print receipts.
- Add, edit, search, import, and export products with categories. Older catalogs are migrated to an `Uncategorized` default.
- Configure receipt and merchant details, configure checkout payment methods with the `payment_types` comma-separated setting, import/export settings, and reset local data.
- Review, reopen sales in checkout for editing and re-saving, search, and export transactions; receipts display in-page.

New transactions default to Unpaid. When an existing local database is first opened after this update, older transactions are marked paid when their recorded payment covers the total.
Checkout defaults to Cash and provides `cash,qris,bank_transfer` as payment methods. Set Config key `payment_types` to a comma-separated list to customize them.

## Run locally

The app has no build step or package installation. Serve the repository root over HTTP:

```sh
make run
```

Then open <http://localhost:6000>. The scanner requires browser camera permission and a secure context; GitHub Pages and localhost support this.

You can also open individual HTML pages directly, but camera scanning requires HTTP(S). Product and configuration data remain in the browser where the app is opened; use the CSV export/import tools to back up or move them.

## Deploy to GitHub Pages

Publish the repository root as a static site. Keep the HTML pages, `css/`, and `js/` directories together; the app uses relative asset links and needs no server-side runtime.

## Data backup

Export the product catalog and configuration from their respective pages. Export sales transactions from Sales. Imports replace the selected local dataset, so keep a backup before confirming an import or factory reset.
