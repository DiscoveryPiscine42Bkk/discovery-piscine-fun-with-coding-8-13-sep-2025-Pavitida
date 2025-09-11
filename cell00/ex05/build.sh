if [ "$#" -eq 0 ]; then
  echo "No arguments supplied"
  exit 0
fi

for n in "$@"; do
  mkdir -p "ex$n"
done
