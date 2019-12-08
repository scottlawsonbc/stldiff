import os
import sys
import flask
from stl import mesh


app = flask.Flask(__name__, static_folder="static/dist", template_folder="static")


def diff(stl):
    cmds = [
        f'./bin/csgtool subtract {stl["new"]} {stl["original"]} {stl["added"]}',
        f'./bin/csgtool subtract {stl["original"]} {stl["new"]} {stl["removed"]}',
        f'./bin/csgtool intersect {stl["new"]} {stl["original"]} {stl["unchanged"]}',
    ]
    for cmd in cmds:
        os.system(cmd)
    for key in ('added', 'removed', 'unchanged'):
        vol, _, _ = mesh.Mesh.from_file(stl[key]).get_mass_properties()
        stl[key + '_volume'] = max(vol, 0)


@app.route('/')
def index():
    stl = {
        'new': f'{app.static_folder}/frame-vertex-with-foot.stl',
        'original': f'{app.static_folder}/frame-vertex-without-foot.stl',
        'added': f'{app.static_folder}/added.stl',
        'removed': f'{app.static_folder}/removed.stl',
        'unchanged': f'{app.static_folder}/unchanged.stl',
    }
    diff(stl)
    return flask.render_template('index.html', stl=stl)


@app.route('/<path:path>')
def model(path):
    return flask.send_from_directory(app.static_folder, path)


if __name__ == '__main__':
    app.run()