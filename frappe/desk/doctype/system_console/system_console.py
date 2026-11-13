# Copyright (c) 2020, Frappe Technologies and contributors
# License: MIT. See LICENSE

import json

import frappe
from frappe.model.document import Document
from frappe.utils.response import json_handler
from frappe.utils.safe_exec import read_sql, safe_exec


class SystemConsole(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		commit: DF.Check
		console: DF.Code | None
		output: DF.Code | None
		show_processlist: DF.Check
		type: DF.Literal["Python", "SQL"]
	# end: auto-generated types

	def run(self):
		raise frappe.PermissionError("System Console is disabled by HubTech security policy.")


@frappe.whitelist(methods=["POST"])
def execute_code(doc: str):
	raise frappe.PermissionError("System Console is disabled by HubTech security policy.")


@frappe.whitelist()
def show_processlist():
	raise frappe.PermissionError("System Console is disabled by HubTech security policy.")


def _show_processlist():
	if frappe.db.db_type == "sqlite":
		return []

	return frappe.db.multisql(
		{
			"postgres": """
			SELECT pid AS "Id",
				query_start AS "Time",
				state AS "State",
				query AS "Info",
				wait_event AS "Progress"
			FROM pg_stat_activity""",
			"mariadb": "show full processlist",
		},
		as_dict=True,
	)
