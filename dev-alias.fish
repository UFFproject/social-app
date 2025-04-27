functions -q uff; and functions -e uff

function uff
    docker exec -it uff-main $argv
end
