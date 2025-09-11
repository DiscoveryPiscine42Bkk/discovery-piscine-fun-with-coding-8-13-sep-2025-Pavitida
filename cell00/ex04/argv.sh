if [ "$#" -eq 0 ]; then
  echo "No arguments supplied"
else
  for v in "$1" "$2" "$3"; do
    [ -n "$v" ] && echo "$v"
  done
fi
