var dbName = "poslite"
var lsDB = new localStorageDB(dbName, localStorage)

if (lsDB.isNew()) {
	lsDB.createTable("products", ["product_code", "product_name", "product_category", "product_price"])
	lsDB.createTable("sales", ["reference", "timestamp", "datetime", "data", "total", "payment", "change", "paid", "customer_name", "payment_type"])

	lsDB.createTable("config", ["key", "value"])
	lsDB.insert("config", { key: "merchant_name", value: "POS LITE" })
	lsDB.insert("config", { key: "merchant_code", value: "PL" })
	lsDB.insert("config", { key: "merchant_logo", value: "https://i.ibb.co.com/cK1Ss7vL/poslite-logo.png" })
	lsDB.insert("config", { key: "merchant_address", value: "Jl Karangploso No 1, Kabupaten Malang, Jawa Timur, Indonesia, 081234567890" })
	lsDB.insert("config", { key: "pic_name", value: "POS LITE" })
	lsDB.insert("config", { key: "pic_code", value: "PL" })
	lsDB.insert("config", { key: "receipt_footer", value: "Thank You\n\nWifi: Singotech\nPass: 1234567890" })
	lsDB.insert("config", { key: "payment_types", value: "cash,qris,bank_transfer" })

	lsDB.commit()
} else {
	migrateProductCategoryColumn()
	migrateSalesPaidColumn()
	ensurePaymentTypeConfig()
}

function migrateProductCategoryColumn() {
	if (!lsDB.tableExists("products") || lsDB.columnExists("products", "product_category")) {
		return
	}

	lsDB.alterTable("products", "product_category", "Uncategorized")
	lsDB.commit()
}

function migrateSalesPaidColumn() {
	if (!lsDB.tableExists("sales")) {
		return
	}

	if (!lsDB.columnExists("sales", "paid")) {
		lsDB.alterTable("sales", "paid", false)
		lsDB.queryAll("sales").forEach(function (transaction) {
			lsDB.update("sales", { ID: transaction.ID }, function () {
				return { paid: Number(transaction.payment) >= Number(transaction.total) }
			})
		})
	}

	if (!lsDB.columnExists("sales", "customer_name")) {
		lsDB.alterTable("sales", "customer_name", "")
	}
	if (!lsDB.columnExists("sales", "payment_type")) {
		lsDB.alterTable("sales", "payment_type", "cash")
	}
	if (lsDB.rowCount("sales") > 0) {
		lsDB.update("sales", function (transaction) {
			return !transaction.payment_type
		}, function () {
			return { payment_type: "cash" }
		})
	}
	lsDB.commit()
}

function newSessionDB() {
	lsDB = new localStorageDB(dbName, localStorage)
	migrateProductCategoryColumn()
	migrateSalesPaidColumn()
	ensurePaymentTypeConfig()
	return lsDB
}

function ensurePaymentTypeConfig() {
	if (!lsDB.tableExists("config")) {
		return
	}
	var configuredTypes = lsDB.queryAll("config", { query: { key: "payment_types" } })
	if (configuredTypes.length === 0) {
		lsDB.insert("config", { key: "payment_types", value: "cash,qris,bank_transfer" })
		lsDB.commit()
	}
}

function queryConfig(keyToSearch) {
	lsDB = newSessionDB()
	search = lsDB.queryAll("config", {
		query: {
			key: keyToSearch
		}
	})
	if (search.length == 0) {
		return ""
	}

	return search[0].value

}
