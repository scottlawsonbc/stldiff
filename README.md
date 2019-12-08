# stldiff

A simple STL diffing tool created by Scott Lawson.

Try out a [live demo here](https://stldiff.herokuapp.com/). The app may take up to 30 seconds to wake up if it hasn't been run in a while (Heroku free tier deployment).

The demo app shows the diffing output on an example STL. It isn't currently possible to upload custom files. More time would be needed for this feature.

# Development
This is a web app created using the Python [Flask microframework](https://en.wikipedia.org/wiki/Flask_(web_framework)).

The app is just under 150 lines of code in total. Writing the app took around four hours start to finish.

* Python: 42 lines of code
* HTML: 44 lines of code
* JavaScript: 61 lines of code

The interactive 3D model viewer was built using [three.js](https://threejs.org/).

STL diffing functionality is provided by the excellent [csgtool](https://github.com/sshirokov/csgtool). This tool makes it easy to perform constructive solid geometry operations on STL files.

A great deal of valuable advice was found in this [GitHub post about 3D file diffs](https://github.blog/2013-09-17-3d-file-diffs/).
