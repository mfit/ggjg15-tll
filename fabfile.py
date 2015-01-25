from fabric.api import run, local, cd, env
from fabric.operations import put
import os

env.use_ssh_config = True
env.hosts = ['games']
code_dir = '/home/zmo/games/dev/www/ggj15'
target_dir = 'tll'

def build():
    """ Execute grunt build and tar-zip the result to dist.tgz  """
    local("grunt build")
    if os.path.isfile('dist.tgz'): local("rm dist.tgz")
    local("tar -czf dist.tgz dist")

def push():
    """ Copy dist.tgz to remote host and unzip there  """

    # with(code_dir):
    #     run("rm dist.tgz")

    put('dist.tgz', code_dir)
    with cd(code_dir):
        run("rm " + target_dir + " -Rf")
        run("tar -xzf dist.tgz")
        run("mv dist " + target_dir)

def deploy():
    build()
    push()
