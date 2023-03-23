interface ViteEnv {
    VITE_API_BASEURL?: string
}
interface ImportMetaEnv extends ViteEnv { }




interface ImportMeta {
    readonly env: ImportMetaEnv
}