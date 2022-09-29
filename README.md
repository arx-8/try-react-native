## Start dev

```sh
# install cli tools via asdf
# (for mac users)
cut -d' ' -f1 .tool-versions | grep "^[^\#]" | xargs -I {} asdf plugin add {}
# (for linux users)
cat .tool-versions | cut -d' ' -f1 | grep "^[^\#]" | xargs -i echo {}

asdf install

# install node packages
yarn

# run dev server
yarn ios
yarn android
yarn web
```

## Available scripts

### Update all dependencies

```s
yarn upgrade-interactive
```

When updating the following packages, be careful of other deps.

```sh
# depending jest-expo
@types/jest
jest

# depending expo
@types/react
@types/react-native
react
react-dom
react-native
react-native-safe-area-context
react-native-screens
```
