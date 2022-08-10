# Filtre

A filtering assistant for Chrome that will make your search for viewed products effortless.

Filtre stores your filtering history while you browse the web and will suggest your most frequently used filters on your next visit.

## Development

### Download Filtre

Run the following commands in your terminal to clone Filtre:

```
git clone https://github.com/sunanmau5/filtre.git
cd filtre
yarn install
```

### Build Filtre

1. Run the following commands in your terminal to build Filtre. An extension you can run will be generated in the `dist` directory

```
yarn run build
```

2. Open Chrome and navigate to `chrome://extensions/`
3. Toggle on `Developer mode` in the top right corner
4. Click `Load unpacked`
5. Select the entire `dist` folder
