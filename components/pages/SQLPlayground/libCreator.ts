import globals from './globals';
import bdWithImports from './bdWithImports';

const libCreator = async (dbname: string) => {
  const strings = await Promise.all(bdWithImports[dbname].types.map(async (module) => {
    const f = () => import(`!!raw-loader!../../../types/${module}/index.d.ts`);
    const p = await f();
    return (p.default);
  }));
  const modulesNew = [{
    content: `import * from 'drizzle-orm';
      declare global {
          ${strings.join(' ')};
        },
    `,
    filePath: 'drizzle-orm.d.ts',
  }];
  modulesNew.push({
    content: globals[dbname],
    filePath: 'file:///global.d.ts',
  });
  return modulesNew;
};

export default libCreator;
