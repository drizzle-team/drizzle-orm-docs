import globals from './globals';
import bdWithImports from './bdWithImports';

const libCreator = async (dbname: string) => {
  const modulesNew = await Promise.all(bdWithImports[dbname].types.map(async (module) => {
    const f = () => import(`!!raw-loader!../../../types/${module}/index.d.ts`);
    const p = await f();
    return ({
      content: `import * from 'drizzle-orm';
  declare global {
    ${p.default}
  }`,
      filePath: `file:///node_modules/${module}/index.d.ts`,
    });
  }));
  modulesNew.push({
    content: globals[dbname],
    filePath: 'file:///global.d.ts',
  });
  return modulesNew;
};

export default libCreator;
// const libCreator = async (dbname: string) => {
//   const modulesNew = await Promise.all(modules.map(async (module) => {
//     const f = () => import(`!!raw-loader!../../../types/${module}/index.d.ts`);
//     const p = await f();
//     return ({
//       content: `declare module '${module}' {
//         ${p.default}
//       }`,
//       filePath: `file:///node_modules/${module}/index.d.ts`,
//     });
//   }));
//   modulesNew.push({
//     content: globals[dbname],
//     filePath: 'file:///global.d.ts',
//   });
//   return modulesNew;
// };

// export default libCreator;
