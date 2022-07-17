read -p "This will deploy to the main site! Are you sure? " -n 1 -r
    echo # Move to new line
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cd client
        git add .
        git commit -am "frontend deployment"
        git push heroku master
        cd ..
        cd web-backend
        git add .
        git commit -am "backend deployment"
        git push heroku master
        cd ..
    fi