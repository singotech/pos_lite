function parseCSV(text) {
  var rows = [];
  var row = [];
  var field = "";
  var quoted = false;

  for (var i = 0; i < text.length; i++) {
    var character = text[i];
    var next = text[i + 1];

    if (quoted) {
      if (character === '"' && next === '"') {
        field += '"';
        i++;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"' && field === "") {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n" || character === "\r") {
      row.push(field);
      if (row.some(function (value) { return value !== ""; })) {
        rows.push(row);
      }
      row = [];
      field = "";
      if (character === "\r" && next === "\n") {
        i++;
      }
    } else {
      field += character;
    }
  }

  row.push(field);
  if (row.some(function (value) { return value !== ""; })) {
    rows.push(row);
  }
  if (quoted) {
    throw new Error("CSV contains an unclosed quoted field.");
  }
  return rows;
}

function csvEscape(value) {
  var text = value === null || value === undefined ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(text)) {
    text = "'" + text;
  }
  return '"' + text.replace(/"/g, '""') + '"';
}

function timestampedCSVFilename(prefix) {
  var now = new Date();
  var date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("");
  return prefix + "-" + date + "-" + Math.floor(now.getTime() / 1000) + ".csv";
}

function downloadCSV(filename, rows) {
  var contents = rows.map(function (row) {
    return row.map(csvEscape).join(",");
  }).join("\r\n");
  var file = new Blob(["\uFEFF" + contents], { type: "text/csv;charset=utf-8" });
  var link = document.createElement("a");
  var url = window.URL.createObjectURL(file);
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(function () {
    window.URL.revokeObjectURL(url);
  }, 1000);
}
