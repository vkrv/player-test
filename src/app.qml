Item {
	anchors.fill: context;

	Resource {
		url: "";
	}

	Row {
		id: menu;
		y: 20;
		spacing: 20;
		anchors.horizontalCenter: parent.horizontalCenter;
		property string currentPage;

		TextButton {
			page: "shaka";
			text: "Shaka-Player";
		}
		TextButton {
			page: "jw";
			text: "JWPlayer";
		}
		TextButton {
			page: "vjs";
			text: "VideoJS";
		}
	}
	
	Rectangle {
		width: 90%; x: 5%;
		color: "#CCCCCC";
		height: 600;
		y: 80;

		ShakaPlayer {
			visible: menu.currentPage === "shaka";
			width: 100%; height: 100%;
			source: "http://testapi.start.film/mobile/series/06ded95f-a7e8-3150-8cec-d084d565aae4/watch.m3u8";
		}

		Item { width: 100%; height: 100%;
			visible: menu.currentPage === "jw";
			JWPlayer {
				width: 100%; height: 100%;
				source: "http://testapi.start.film/mobile/series/06ded95f-a7e8-3150-8cec-d084d565aae4/watch.m3u8";
			}
		}
	}
}
