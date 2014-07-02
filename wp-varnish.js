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

	args.node = {};

	var count = 0;
	jQuery.each( args, function(key, val){
		if ( key === 'node' ) return

		td.push( document.createElement ('td') );

		args.node = document.createElement ('input');
		args.node.className = 'regular-text';
		args.node.type = 'text';
		args.node.name = "wpvarnish_" + key + "[]";
		args.node.id = id;
		args.node.value = val || "";

		td[count].appendChild(args.node);
		row.appendChild(td[count]);

		count++;
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
