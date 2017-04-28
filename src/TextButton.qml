Text {
	property string page;
	active: page === parent.currentPage;
	property object hover: HoverClickMixin { cursor: "pointer"; }
	property bool active;
	color: active ? "#E91E63" : (hover.value ? "#3F51B5" : "#2196F3");
	font.pixelSize: 24;
	onClicked: { this.parent.currentPage = this.page; }

	Behavior on color { Animation {} }
}