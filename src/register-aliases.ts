import moduleAlias from "module-alias";
import path from "path";

const rootPath = path.resolve(__dirname);

moduleAlias.addAliases({
  "@": path.join(rootPath),
  "@common": path.join(rootPath, "common"),
  "@modules": path.join(rootPath, "modules"),
  "@config": path.join(rootPath, "config"),
});
