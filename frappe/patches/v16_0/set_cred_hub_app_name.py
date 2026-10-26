import frappe


def execute():
	# Sites created before the rename keep the old default "Frappe", which wins over the
	# "Cred Hub" fallback and shows up in the browser tab and in e-mails
	for doctype in ("Website Settings", "System Settings"):
		if frappe.db.get_single_value(doctype, "app_name") in (None, "", "Frappe"):
			frappe.db.set_single_value(doctype, "app_name", "Cred Hub")
