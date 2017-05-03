Item {
	anchors.fill: context;

	Resource {
		url: "http://testapi.start.film/mobile/series/06ded95f-a7e8-3150-8cec-d084d565aae4";

		onDataChanged: {
			var playlist = [];
			var plModel = []
			var obj = JSON.parse(value);
			log(obj)
			var items = obj.items[0].items;
			for (var index in items)
			{
				let item = items[index]
				playlist.push({
					title: item.title,
					file: item.video_src,
					image: '\"' + item.packshot.image_1x + '\"',
					description: item.description 
					})
				plModel.push({
					title: item.title,
					file: item.video_src,
					image: item.packshot.image_1x,
					description: item.description 
					})

			}

			shakap.source = playlist[0].file

			log("playlist", playlist)

			jwp.loadPlaylist(playlist)

			btm.source = playlist[0].file

			plView.model.append(plModel)

		}
	}

	Row {
		id: menu;
		y: 20;
		spacing: 20;
		anchors.horizontalCenter: parent.horizontalCenter;
		property string currentPage: "jw";

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
		TextButton {
			page: "btm";
			text: "Bitmovin";
		}
	}
	
	Column {
		id: playerRect;
		width: 60%; x: 5%;
		y: 80;
		property string currentPlayer: menu.currentPage;
		spacing: 20;

		ShakaPlayer {
			id: shakap;
			width: 100%; height: width * 0.75;
			source: "//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";
		}

		Item {
			width: 100%; height: width * 0.75;
			onVisibleChanged: {
				jwp.play(value)
			}
			JWPlayer {
				id: jwp;
				width: 100%; height: 100%; 
			}
		}

		Item { 
			width: 100%; height: width * 0.75;
			onVisibleChanged: {
				btm.play(value)
			}
			Bitmovin {
				id: btm;
				width: 100%; height: 100%;
			}
		}

		Item {
			width: 100%; height: width * 0.75;
			onVisibleChanged: {
				vjs.play(value)
			}
			VideoJS {
				id: vjs;
				source: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm";
				width: 100%; height: 100%;
			}
		}
	}

	Rectangle {
		width: 25%;
		height: 600;
		y: 80; x: 70%;
		color: "#EEE";

		OverflowMixin { value: OverflowMixin.Scroll; }

		ListView {
			id: plView;
			width: 100%;
			height: contentHeight;
			spacing: 10;
			model: ListModel {}
			delegate: WebItem {
				height: 100;
				width: 100%;
				property string videoUrl: model.file;

				onClicked: {
					btm.source = this.videoUrl;
				}

				Image {
					height: 100%;
					source: model.image;
				}

				Text {
					y: 10;
					x: parent.height * 2;
					text: model.title;
				}
			}
		}
	}
}
