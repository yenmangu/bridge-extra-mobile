export interface TableSize {
	name: string;
	class: string;
	font: string;
}
export interface Column {
	field: string;
	header: string;
}
export interface TableConfig {
	dataTypeString: string;
	tableName: string;
	visibleRows: number;
	rowsPerPage: number[];
	extraClasses: string[];
	minWidth: string;
}
