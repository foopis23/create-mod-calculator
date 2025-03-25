# create tmp dir
mkdir -p tmp

cd ./tmp

# clone create repo
git clone https://github.com/PixiGeko/Minecraft-default-assets.git
git clone https://github.com/Creators-of-Create/Create.git

cd ..

# clean up old data
rm -rf ./data
rm -rf ./assets

mkdir ./data
mkdir ./data/create
mkdir ./data/minecraft
mkdir ./assets
mkdir ./assets/create
mkdir ./assets/minecraft

# move new data
mv ./tmp/Create/src/generated/resources/data/create/recipes/ ./data/create/recipes
mv ./tmp/Create/src/generated/resources/assets/create/lang/ ./assets/create/lang
mv ./tmp/Minecraft-default-assets/assets/minecraft/lang/ ./assets/minecraft/lang

# clean up
rm -rf ./tmp
