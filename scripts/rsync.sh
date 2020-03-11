REPO="$(cd $(dirname $(dirname $0)) && pwd -P)"

rsync -avzh $REPO --exclude-from $REPO/.gitignore lg-labtop:/mnt/c/Users/qoontree/Documents
