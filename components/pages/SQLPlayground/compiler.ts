import { ModuleKind, transpile } from 'typescript';
import bdWithImports from './bdWithImports';

let query: any;
let table: any;
function tsToJs(ts: string, type: string): string {
  const newString = `${type} = ${ts};`;
  let js = transpile(newString, { module: ModuleKind.ES2020 });
  js = js.replace(/^\s*export {};?$/m, '');
  js = js.replace(/^\s*import .+ from .+$/m, '');
  return js;
}

function doEval(longArgumentNameToPreventConflicts: {
  ts: string;
  instance: any;
}, type: string) {
  const db = longArgumentNameToPreventConflicts.instance;
  query = null;
  try {
    eval(tsToJs(longArgumentNameToPreventConflicts.ts, type));
  } catch (e) {
    console.log(e);
  }
  return {
    db, query,
  };
}

export async function compile(ts: string, dialect: string, type: string) {
  const imports = bdWithImports[dialect];
  const packageWithDrizzle = await imports.importFunc();
  const { packages } = imports;
  await Promise.all(packages.map(async (p) => {
    const module = await p();
    Object.keys(module).forEach((key) => {
      (window as { [key: string]: any })[key] = module[key];
    });
  }));
  const Drizzle = packageWithDrizzle.drizzle as any;
  const instance = new Drizzle(null);
  doEval({ ts, instance }, type);
  return { query, table };
}
