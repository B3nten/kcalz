// Playlist Example
{
	"payload": [ // An array of archives
		{
			"archive": {
				"id": "344724407152804432_1", // This should be the fauna db playlist id (in the event that there are various archives it should be followed by a "_#" denoting the archive number)
				"name": "My Playlist MP3 (Part 1)", // Archive download name (used for download link in email)
				"key": "downloads/344724407152804432_1.zip" // Amazon bucket key (path), where the finished archive will reside.  The archive name must be the same as the archive id
			},
			"files": [ // An array of files to be archived
				{
					"key": "IMT012_01__CyberStreets.mp3", // Amazon bucket key (path) to the file for archiving
					"fileName": "IMT012_01__CyberStreets.mp3" // The name of the file in the archive (what you will see when you unzip the archive)
				},
				{
					"key": "IMT012_02__MusicInTheMachine.mp3",
					"fileName": "IMT012_02__MusicInTheMachine.mp3"
				}
			]
		},
		{
			"archive": {
				"id": "344724407152804432_2",
				"name": "My Playlist MP3 (Part 2)",
				"key": "downloads/344724407152804432_2.zip"
			},
			"files": [
				{
					"key": "IMT012_03__NeonLights.mp3",
					"fileName": "IMT012_03__NeonLights.mp3"
				},
				{
					"key": "IMT012_04__LastBit.mp3",
					"fileName": "IMT012_04__LastBit.mp3"
				}
			]
		}
	],
	"referenceName": "My Playlist", // Playlist name
	"isPlaylist": true, // Playlists and Albums require different email responses
	"email": "andrew@droplab.com" // Email for notification once the archive is finished (for playlists this should be the user's email, for albums this should be an administrative email)
}

// Album Example (single archive)
{
	"payload": [ // An array of archives
		{
			"archive": {
				"id": "ckuz5pghc8s4709695eqws50j_All_aiff", // This should be the album id followed by an 'All' if it includes all tracks and then followed by its format (mp3/aiff)
				"name": "A World Lost - aiff (All)", // Archive download name (used for download link in email)
				"key": "downloads/ckuz5pghc8s4709695eqws50j_All_aiff.zip" // Amazon bucket key (path), where the finished archive will reside.  The archive name must be the same as the archive id
			},
			"files": [ // An array of files to be archived
				{
					"key": "audio/IMT012_01__CyberStreets.mp3", // Amazon bucket key (path) to the file for archiving
					"fileName": "IMT012_01__CyberStreets.mp3" // The name of the file in the archive (what you will see when you unzip the archive)
				},
				{
					"key": "audio/IMT012_02__MusicInTheMachine.mp3",
					"fileName": "IMT012_02__MusicInTheMachine.mp3"
				}
			]
		}
	],
	"referenceName": "A World Lost", //Album name
	"isPlaylist": false, // Playlists and Albums require different email responses
	"email": "andrew@droplab.com" // Email for notification once the archive is finished (for playlists this should be the user's email, for albums this should be an administrative email)
}

// Album Example (batched)
{
	"payload": [ // An array of archives
		{
			"archive": {
				"id": "ckuz5pghc8s4709695eqws50j_mp3", // This should be the album id followed by an 'All' if it includes all tracks and then followed by its format (mp3/aiff)
				"name": "A World Lost - mp3", // Archive download name (used for download link in email)
				"key": "downloads/ckuz5pghc8s4709695eqws50j_mp3.zip" // Amazon bucket key (path), where the finished archive will reside.  The archive name must be the same as the archive id
			},
			"files": [ // An array of files to be archived
				{
					"key": "audio/IMT012_01__CyberStreets.mp3", // Amazon bucket key (path) to the file for archiving
					"fileName": "IMT012_01__CyberStreets.mp3" // The name of the file in the archive (what you will see when you unzip the archive)
				},
				{
					"key": "audio/IMT012_02__MusicInTheMachine.mp3",
					"fileName": "IMT012_02__MusicInTheMachine.mp3"
				}
			]
		},
		{
			"archive": {
				"id": "ckuz5pghc8s4709695eqws50j_aiff", // This should be the album id followed by an 'All' if it includes all tracks and then followed by its format (mp3/aiff)
				"name": "A World Lost - aiff", // Archive download name (used for download link in email)
				"key": "downloads/ckuz5pghc8s4709695eqws50j_aiff.zip" // Amazon bucket key (path), where the finished archive will reside.  The archive name must be the same as the archive id
			},
			"files": [ // An array of files to be archived
				{
					"key": "audio/IMT012_01__CyberStreets.aiff", // Amazon bucket key (path) to the file for archiving
					"fileName": "IMT012_01__CyberStreets.aiff" // The name of the file in the archive (what you will see when you unzip the archive)
				},
				{
					"key": "audio/IMT012_02__MusicInTheMachine.aiff",
					"fileName": "IMT012_02__MusicInTheMachine.aiff"
				}
			]
		},
		{
			"archive": {
				"id": "ckuz5pghc8s4709695eqws50j_All_mp3", // This should be the album id followed by an 'All' if it includes all tracks and then followed by its format (mp3/aiff)
				"name": "A World Lost - mp3 (All)", // Archive download name (used for download link in email)
				"key": "downloads/ckuz5pghc8s4709695eqws50j_All_mp3.zip" // Amazon bucket key (path), where the finished archive will reside.  The archive name must be the same as the archive id
			},
			"files": [ // An array of files to be archived
				{
					"key": "audio/IMT012_01__CyberStreets.mp3", // Amazon bucket key (path) to the file for archiving
					"fileName": "IMT012_01__CyberStreets.mp3" // The name of the file in the archive (what you will see when you unzip the archive)
				},
				{
					"key": "audio/IMT012_02__MusicInTheMachine.mp3",
					"fileName": "IMT012_02__MusicInTheMachine.mp3"
				}
			]
		},
		{
			"archive": {
				"id": "ckuz5pghc8s4709695eqws50j_All_aiff", // This should be the album id followed by an 'All' if it includes all tracks and then followed by its format (mp3/aiff)
				"name": "A World Lost - aiff (All)", // Archive download name (used for download link in email)
				"key": "downloads/ckuz5pghc8s4709695eqws50j_All_aiff.zip" // Amazon bucket key (path), where the finished archive will reside.  The archive name must be the same as the archive id
			},
			"files": [ // An array of files to be archived
				{
					"key": "audio/IMT012_01__CyberStreets.aiff", // Amazon bucket key (path) to the file for archiving
					"fileName": "IMT012_01__CyberStreets.aiff" // The name of the file in the archive (what you will see when you unzip the archive)
				},
				{
					"key": "audio/IMT012_02__MusicInTheMachine.aiff",
					"fileName": "IMT012_02__MusicInTheMachine.aiff"
				}
			]
		}
	],
	"referenceName": "A World Lost", //  Album name
	"isPlaylist": false, // Playlists and Albums require different email responses
	"email": "andrew@droplab.com" // Email for notification once the archive is finished (for playlists this should be the user's email, for albums this should be an administrative email)
}