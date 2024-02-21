export class Loader {
  constructor(loader, config) {
    this.loader = loader;
    this.config = config;
    this.resources = {};
  }

  preload() {
    for (const asset of this.config.loader) {
      if (!Object.keys(this.loader.resources).includes(asset.key)) {
        this.loader.add(asset.key, asset.data);
      }
    }

    return new Promise((resolve) => {
      this.loader.load((loader, resources) => {
        this.resources = resources;
        resolve();
      });
    });
  }
}
