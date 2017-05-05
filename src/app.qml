Item {
	anchors.fill: context;

	Resource {
		id: resource;

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

			log("playlist", playlist)

			jwp.loadPlaylist(playlist)

			btm.source = playlist[0].file
			theo.source = playlist[0].file

			plView.model.append(plModel)

		}
	}

	TextInput {
		x: 5%;
		width: 90%;
		y: 20;
		placeholder.text: "Series test URL";

		onTextChanged: {
			resource.url = value;
		}
	}
	
	Column {
		id: playerRect;
		width: 60%; x: 5%;
		y: 80;
		spacing: 20;


		TextButton {
			text: "Shaka-Player";
		}

		ShakaPlayer {
			id: shakap;
			width: 100%; height: width * 0.75;
			source: "//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";
		}

		TextButton {
			text: "JWPlayer";
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

		TextButton {
			text: "Bitmovin";
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

		TextButton {
			text: "TheOPlayer";
		}

		Item {
			width: 100%; height: width * 0.75;
			onVisibleChanged: {
				theo.play(value)
			}
			TheOPlayer {
				id: theo;
//				source: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm";
				width: 100%; height: 100%;
			}
		}

		TextButton {
			text: "VideoJS";
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
