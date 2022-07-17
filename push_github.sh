echo "Enter the commit message: "
IFS= read -r message

git add .
git commit -m "$message"
git push