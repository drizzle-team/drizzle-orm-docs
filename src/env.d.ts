/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly PUBLIC_INKEEP_API_KEY: string;
  readonly PUBLIC_INKEEP_INTEGRATION_ID: string;
  readonly PUBLIC_INKEEP_ORG_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
