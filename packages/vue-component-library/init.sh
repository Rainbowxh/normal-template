cd packages

mkdir components core docs hooks theme utils

for i in components core docs hooks theme utils; do
  cd $i
  pnpm init
  cd ..
done
