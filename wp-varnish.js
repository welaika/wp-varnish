// our id for our rows, we can have rows added and removed
// so we need a base
var rowCount = 0;

function createRow(tableID, id, args) {
	var td = [];
	var row = document.createElement('tr');
	var dRow = document.createElement('input');

	dRow.className = "";
	dRow.type = "button";
	dRow.name = "deleteRow";
	dRow.value = "-";
	dRow.id = id;
	dRow.onclick = function () { deleteRow(tableID, id); }

	var args_count = 0;
	jQuery.each( args, function(key, val){ //Probably would be more coherent a plain js for
		var node = {};

		td.push( document.createElement ('td') );

		node = document.createElement ('input');
		node.className = 'regular-text';
		node.type = 'text';
		node.name = "wpvarnish_" + key + "[]";
		node.id = id;
		node.value = val || "";

		td[args_count].appendChild(node);
		row.appendChild(td[args_count]);

		args_count++;
	});

	row.appendChild(dRow);

	return row;
}

function addRow(tableID, id, args) {
	var tbody = document.getElementById(tableID).getElementsByTagName ('tbody')[0];

	rowCount++;
	var row = createRow(tableID, id, args);

	tbody.appendChild (row);
}

function deleteRow(tableID, rowID) {
	try {
		var tbody = document.getElementById(tableID).getElementsByTagName ('tbody')[0];
		var trs = tbody.getElementsByTagName ('tr');

		// the id = 0 we don't want to remove, as it is the header
		for (var i = 1; i < trs.length; i++) {
			// we use our own id, let's not mix up with table ids
			var id = (trs[i].getElementsByTagName ('input')[0]).id;
			if (id == rowID) {
				tbody.deleteRow (i);
				return;
			}
		}
	} catch(e) {
		alert(e);
	}
}
