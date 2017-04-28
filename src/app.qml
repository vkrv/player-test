Item {
	anchors.fill: context;

	Resource {
		url: "";
	}

	Row {
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
		width: 90%;
		x: 5%;
		color: "#CCCCCC";
		height: 600;
		y: 80;

		ShakaPlayer {
			width: 100%; height: 100%;
			source: "http://content.jwplatform.com/videos/SJnBN5W3-mjpS2Ylx.mp4";
		}
	}
}
